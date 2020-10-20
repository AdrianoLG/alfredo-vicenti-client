var path = require('path');

module.exports = {
    externals: [
        'foundation-sites'
    ],
    test: /.(?:sass|scss)$/,
    use: [
        'style-loader',
        'css-loader', {
        loader: 'sass-loader',
        query: {
            includePaths: [path.resolve(__dirname, 'node_modules')]
        }
        }
    ]
}