const fs = require('fs').promises;

async function readFile(path) {
    try {
        return await fs.readFile(path, 'utf-8');
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

async function writeFile(path, data) {
    try {
        await fs.writeFile(path, data, 'utf-8');
    } catch (err) {
        console.error('Error writing file:', err);
        throw err;
    }
}

module.exports = {
    readFile,
    writeFile
};