var path = require('path');

module.exports = {
    entry: './src/base.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};