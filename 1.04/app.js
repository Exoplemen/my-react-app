// Задача 1: Получить список постов
        document.getElementById('loadPosts').addEventListener('click', async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) throw new Error('Ошибка загрузки постов');
                
                const posts = await response.json();
                const postsContainer = document.getElementById('postsContainer');
                postsContainer.innerHTML = '';
                
                posts.slice(0, 10).forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                        <small>User ID: ${post.userId}, Post ID: ${post.id}</small>
                    `;
                    postsContainer.appendChild(postElement);
                });
            } catch (error) {
                document.getElementById('postsContainer').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
            }
        });

        // Задача 2: Отправить новые данные
        document.getElementById('postForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const body = document.getElementById('body').value;
            const userId = document.getElementById('userId').value;
            
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        body,
                        userId: parseInt(userId)
                    })
                });
                
                if (!response.ok) throw new Error('Ошибка при создании поста');
                
                const data = await response.json();
                document.getElementById('postResult').innerHTML = `
                    <div class="post">
                        <h3>Новый пост создан!</h3>
                        <p>ID: ${data.id}</p>
                        <h4>${data.title}</h4>
                        <p>${data.body}</p>
                        <small>User ID: ${data.userId}</small>
                    </div>
                `;
                
                // Очищаем форму
                document.getElementById('postForm').reset();
            } catch (error) {
                document.getElementById('postResult').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
            }
        });

        // Задача 3: Получить пост и комментарии параллельно
        document.getElementById('loadPostAndComments').addEventListener('click', async () => {
            const postId = document.getElementById('postId').value;
            if (!postId) {
                alert('Пожалуйста, введите ID поста');
                return;
            }
            
            try {
                // Используем Promise.all для параллельного выполнения запросов
                const [postResponse, commentsResponse] = await Promise.all([
                    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
                    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                ]);
                
                if (!postResponse.ok) throw new Error('Пост не найден');
                if (!commentsResponse.ok) throw new Error('Комментарии не найдены');
                
                const post = await postResponse.json();
                const comments = await commentsResponse.json();
                
                const postDetails = document.getElementById('postDetails');
                postDetails.innerHTML = '';
                
                // Отображаем пост
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <small>User ID: ${post.userId}, Post ID: ${post.id}</small>
                `;
                postDetails.appendChild(postElement);
                
                // Отображаем комментарии
                if (comments.length > 0) {
                    const commentsHeader = document.createElement('h4');
                    commentsHeader.textContent = 'Комментарии:';
                    postDetails.appendChild(commentsHeader);
                    
                    comments.forEach(comment => {
                        const commentElement = document.createElement('div');
                        commentElement.className = 'comment';
                        commentElement.innerHTML = `
                            <strong>${comment.name}</strong> (${comment.email})
                            <p>${comment.body}</p>
                        `;
                        postDetails.appendChild(commentElement);
                    });
                } else {
                    const noComments = document.createElement('p');
                    noComments.textContent = 'Нет комментариев';
                    postDetails.appendChild(noComments);
                }
            } catch (error) {
                document.getElementById('postDetails').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
            }
        });

        // Задача 4: Запрос к API погоды
        document.getElementById('getWeather').addEventListener('click', async () => {
            const city = document.getElementById('city').value;
            if (!city) {
                alert('Пожалуйста, введите город');
                return;
            }
            
            // Используем OpenWeatherMap API (вам нужно зарегистрироваться и получить свой API ключ)
            const apiKey = 'ваш_api_ключ'; // Замените на ваш реальный API ключ
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`);
                if (!response.ok) throw new Error('Город не найден или ошибка сервера');
                
                const data = await response.json();
                const weatherInfo = document.getElementById('weatherInfo');
                
                weatherInfo.innerHTML = `
                    <h3>Погода в ${data.name}, ${data.sys.country}</h3>
                    <p>Температура: ${Math.round(data.main.temp)}°C (ощущается как ${Math.round(data.main.feels_like)}°C)</p>
                    <p>Погода: ${data.weather[0].description}</p>
                    <p>Влажность: ${data.main.humidity}%</p>
                    <p>Ветер: ${data.wind.speed} м/с</p>
                `;
            } catch (error) {
                document.getElementById('weatherInfo').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
            }
        });

        // Задача 5: Случайные изображения
        document.getElementById('loadRandomImage').addEventListener('click', async () => {
            try {
                // Используем Unsplash Source API для случайных изображений
                const response = await fetch('https://source.unsplash.com/random/600x400');
                if (!response.ok) throw new Error('Ошибка загрузки изображения');
                
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = '';
                
                const img = document.createElement('img');
                img.src = response.url;
                img.alt = 'Случайное изображение';
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.borderRadius = '5px';
                
                imageContainer.appendChild(img);
            } catch (error) {
                document.getElementById('imageContainer').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
            }
        });