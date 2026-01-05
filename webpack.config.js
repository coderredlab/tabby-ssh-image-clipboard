const path = require('path')

module.exports = {
    target: 'node',
    entry: './src/index.ts',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json',
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: 'source-map-loader',
            },
        ],
    },
    externals: [
        '@angular/core',
        '@angular/common',
        '@angular/forms',
        '@angular/platform-browser',
        '@ng-bootstrap/ng-bootstrap',
        'rxjs',
        'rxjs/operators',
        'tabby-core',
        'tabby-settings',
        'tabby-terminal',
        'tabby-ssh',
        'electron',
        '@electron/remote',
    ],
}
