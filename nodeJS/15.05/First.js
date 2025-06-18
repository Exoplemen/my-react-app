let axios = require('axios');

async function fetchDataFromAPI() {
    try {
        let response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log('Полученные данные:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
        throw error;
    }
}

fetchDataFromAPI();