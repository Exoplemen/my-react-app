let axios = require('axios');

async function fetchUserAndPosts(userId) {
    try {
        const [userResponse, postsResponse] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
            axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        ]);
        
        console.log('Данные пользователя:', userResponse.data);
        console.log('Посты пользователя:', postsResponse.data);
        
        return {
            user: userResponse.data,
            posts: postsResponse.data
        };
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error.message);
        throw error;
    }
}

fetchUserAndPosts(1)