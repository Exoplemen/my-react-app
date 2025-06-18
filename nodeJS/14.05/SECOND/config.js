const settings = {
    port: 3000,
    env: 'development'
};

const APP_NAME = 'MyCoolApp';

function getDate() {
    return new Date().toISOString();
}

module.exports = {
    settings,
    APP_NAME,
    getDate
};