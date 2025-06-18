const { readFile, writeFile } = require('./fileManager');

async function main() {
    try {
        await writeFile('./test.txt', 'Hello, Node.js!');
        console.log('File written successfully');

        const content = await readFile('./test.txt');
        console.log('File content:', content);
    } catch (err) {
        console.error('Error:', err);
    }
}

main();