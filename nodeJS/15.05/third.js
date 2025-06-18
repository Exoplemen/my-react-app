let fs = require('fs').promises;
let path = require('path');

async function mergeFilesFromDirectory(directoryPath) {
    try {
        let files = await fs.readdir(directoryPath);

        let fileStats = await Promise.all(
            files.map(file => fs.stat(path.join(directoryPath, file)))
        );
        
        let fileNames = files.filter((file, index) => fileStats[index].isFile());

        let contents = await Promise.all
            fileNames.map(file => fs.readFile(path.join(directoryPath, file), 'utf-8'));
        
        let mergedContent = contents.join('\n');
        console.log('Объединенное содержимое:', mergedContent);
        
        return mergedContent;
    } catch (error) {
        console.error('Ошибка при чтении файлов:', error.message);
        throw error;
    }
}

mergeFilesFromDirectory('./data');