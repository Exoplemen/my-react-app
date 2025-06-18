const path = require('path');

function getFileName(fullPath) {
    return path.basename(fullPath);
}

function getFileExt(fullPath) {
    return path.extname(fullPath);
}

module.exports = {
    getFileName,
    getFileExt
};
