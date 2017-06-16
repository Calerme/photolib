var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './lib/app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};