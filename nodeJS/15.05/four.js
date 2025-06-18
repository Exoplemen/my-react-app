class TaskQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    addTask(task) {
        this.queue.push(task);
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

      async processQueue() {
        this.isProcessing = true;
        
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            try {
                console.log('Начало выполнения задачи');
                await task();
                console.log('Задача успешно выполнена');
            } catch (error) {
                console.error('Ошибка при выполнении задачи:', error.message);
            }
        }
        
        this.isProcessing = false;
    }
}
const queue = new TaskQueue();

queue.addTask(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Задача 1 выполнена');
});
queue.addTask(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Задача 2 выполнена');
});
queue.addTask(async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Задача 3 выполнена');
});