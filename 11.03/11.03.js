//To-do list
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    
    // Загрузка задач из localStorage
    loadTasks();
    
    // Добавление задачи
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            
            saveTask(task);
            renderTask(task);
            taskInput.value = '';
        }
    }
    
    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(renderTask);
    }
    
    function renderTask(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', toggleTask);
        
        const span = document.createElement('span');
        span.className = 'task-text' + (task.completed ? ' completed' : '');
        span.textContent = task.text;
        span.addEventListener('dblclick', editTask);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', deleteTask);
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    }
    
    function toggleTask(e) {
        const li = e.target.parentElement;
        const taskId = parseInt(li.dataset.id);
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        
        const task = tasks.find(t => t.id === taskId);
        task.completed = e.target.checked;
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.querySelector('.task-text').classList.toggle('completed');
    }
    
    function editTask(e) {
        const span = e.target;
        const li = span.parentElement;
        const taskId = parseInt(li.dataset.id);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = span.textContent;
        
        li.replaceChild(input, span);
        input.focus();
        
        function saveEdit() {
            const newText = input.value.trim();
            if (newText) {
                let tasks = JSON.parse(localStorage.getItem('tasks'));
                const task = tasks.find(t => t.id === taskId);
                task.text = newText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                
                span.textContent = newText;
                li.replaceChild(span, input);
            } else {
                li.replaceChild(span, input);
            }
        }
        
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') saveEdit();
        });
    }
    
    function deleteTask(e) {
        const li = e.target.parentElement;
        const taskId = parseInt(li.dataset.id);
        
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        li.remove();
    }
});

//Интерактивный таймер/секундомер
document.addEventListener('DOMContentLoaded', function() {

    const timerDisplay = document.getElementById('timer-display');
    const timerStart = document.getElementById('timer-start');
    const timerPause = document.getElementById('timer-pause');
    const timerReset = document.getElementById('timer-reset');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const alarm = document.getElementById('alarm');
    
    let timerTime = 0;
    let timerInterval;
    let isTimerRunning = false;

    loadTimerState();

    function updateTimerDisplay() {
        const minutes = Math.floor(timerTime / 60);
        const seconds = timerTime % 60;
        timerDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    timerStart.addEventListener('click', function() {
        if (!isTimerRunning) {
            if (timerTime <= 0) {
                timerTime = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
            }
            
            if (timerTime > 0) {
                isTimerRunning = true;
                timerInterval = setInterval(function() {
                    timerTime--;
                    updateTimerDisplay();
                    saveTimerState();
                    
                    if (timerTime <= 0) {
                        clearInterval(timerInterval);
                        isTimerRunning = false;
                        alarm.play();
                        saveTimerState();
                    }
                }, 1000);
            }
        }
    });

    timerPause.addEventListener('click', function() {
        if (isTimerRunning) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            saveTimerState();
        }
    });
    
    timerReset.addEventListener('click', function() {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timerTime = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
        updateTimerDisplay();
        saveTimerState();
    });
    
    function saveTimerState() {
        const timerState = {
            time: timerTime,
            isRunning: isTimerRunning,
            startTime: isTimerRunning ? Date.now() : null
        };
        localStorage.setItem('timerState', JSON.stringify(timerState));
    }
    
    function loadTimerState() {
        const savedState = localStorage.getItem('timerState');
        if (savedState) {
            const state = JSON.parse(savedState);
            timerTime = state.time;
            
            if (state.isRunning && state.startTime) {
                const elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
                timerTime = Math.max(0, state.time - elapsedSeconds);
                
                if (timerTime > 0) {
                    isTimerRunning = true;
                    timerInterval = setInterval(function() {
                        timerTime--;
                        updateTimerDisplay();
                        saveTimerState();
                        
                        if (timerTime <= 0) {
                            clearInterval(timerInterval);
                            isTimerRunning = false;
                            alarm.play();
                            saveTimerState();
                        }
                    }, 1000);
                } else {
                    isTimerRunning = false;
                    alarm.play();
                }
            }
            
            updateTimerDisplay();
        } else {
            timerTime = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
            updateTimerDisplay();
        }
    }
    
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const stopwatchStart = document.getElementById('stopwatch-start');
    const stopwatchPause = document.getElementById('stopwatch-pause');
    const stopwatchReset = document.getElementById('stopwatch-reset');
    
    let stopwatchTime = 0;
    let stopwatchInterval;
    let isStopwatchRunning = false;
    let stopwatchStartTime;
    
    loadStopwatchState();
    
    function updateStopwatchDisplay() {
        const hours = Math.floor(stopwatchTime / 3600);
        const minutes = Math.floor((stopwatchTime % 3600) / 60);
        const seconds = stopwatchTime % 60;
        stopwatchDisplay.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    stopwatchStart.addEventListener('click', function() {
        if (!isStopwatchRunning) {
            isStopwatchRunning = true;
            stopwatchStartTime = Date.now() - stopwatchTime * 1000;
            stopwatchInterval = setInterval(function() {
                stopwatchTime = Math.floor((Date.now() - stopwatchStartTime) / 1000);
                updateStopwatchDisplay();
                saveStopwatchState();
            }, 1000);
        }
    });

    stopwatchPause.addEventListener('click', function() {
        if (isStopwatchRunning) {
            clearInterval(stopwatchInterval);
            isStopwatchRunning = false;
            saveStopwatchState();
        }
    });
    
    stopwatchReset.addEventListener('click', function() {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        stopwatchTime = 0;
        updateStopwatchDisplay();
        saveStopwatchState();
    });
    
    function saveStopwatchState() {
        const stopwatchState = {
            time: stopwatchTime,
            isRunning: isStopwatchRunning,
            startTime: isStopwatchRunning ? stopwatchStartTime : null
        };
        localStorage.setItem('stopwatchState', JSON.stringify(stopwatchState));
    }
    
    function loadStopwatchState() {
        const savedState = localStorage.getItem('stopwatchState');
        if (savedState) {
            const state = JSON.parse(savedState);
            stopwatchTime = state.time;
            
            if (state.isRunning && state.startTime) {
                isStopwatchRunning = true;
                stopwatchStartTime = state.startTime;
                stopwatchInterval = setInterval(function() {
                    stopwatchTime = Math.floor((Date.now() - stopwatchStartTime) / 1000);
                    updateStopwatchDisplay();
                    saveStopwatchState();
                }, 1000);
            }
            updateStopwatchDisplay();
        }
    }
});
//Галерея изображений с увеличением и перелистыванием
function showLarge(src) {
    document.getElementById('largeImg').src = src;
    document.getElementById('largeImgContainer').style.display = 'flex';
}

function hideLarge() {
    document.getElementById('largeImgContainer').style.display = 'none';
}
//Клавиатурный тренажер
const textToType = "Привет, мир! Это простой тренажер для набора текста.";
    document.getElementById('textToType').innerHTML = '';
        
        
    textToType.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        document.getElementById('textToType').appendChild(span);
    });
        
    function checkText() {
        const userInput = document.getElementById('userInput').value;
        const spans = document.querySelectorAll('#textToType span');
        let allCorrect = true;
            
        spans.forEach((span, index) => {
            if (index < userInput.length) {
                if (userInput[index] === span.textContent) {
                    span.className = 'correct';
                } else {
                    span.className = 'incorrect';
                    allCorrect = false;
                }
            } else {
                span.className = '';
            }
        });
            
        if (userInput.length === textToType.length && allCorrect) {
            document.getElementById('result').textContent = 'Успех! Вы правильно набрали текст.';
        }
    }
//Интерактивная карта с маркерами
const map = L.map('map').setView([55.75, 37.61], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = [];

map.on('click', function(e) {
    const marker = L.marker([e.latlng.lat, e.latlng.lng])
        .addTo(map)
        .bindPopup(`Координаты: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
    
    markers.push(marker);
});

document.getElementById('clearMarkers').addEventListener('click', function() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
});
//Игра "Найди пару"
let cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
        
function startGame() {
    cards = shuffleArray([...cards, ...cards]);

    document.getElementById('game').innerHTML = '';

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.value = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        document.getElementById('game').appendChild(cardElement);
    });
            
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    updateStats();
}
        
function flipCard() {

    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;
            
    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);
            
    if (flippedCards.length === 2) {
        moves++;
        updateStats();
                
        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {

            flippedCards.forEach(card => card.classList.add('matched'));
            flippedCards = [];
            matchedPairs++;
                    
            if (matchedPairs === cards.length / 2) {
                setTimeout(() => alert(`Поздравляем! Вы завершили игру за ${moves} ходов.`), 500);
            }
        } else {

            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove('flipped');
                    card.textContent = '';
                });
                flippedCards = [];
            }, 1000);
        }
    }
}
        
function updateStats() {
    document.getElementById('stats').textContent = `Ходы: ${moves}`;
}
        
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
startGame();