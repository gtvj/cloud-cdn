var path = require('path');

module.exports = {
    entry: {
        discovery: './src/discovery.js',
        blog: './src/blog.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};