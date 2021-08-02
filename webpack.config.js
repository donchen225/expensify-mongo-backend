const path = require('path');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                }
            ]
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map',
    }
}