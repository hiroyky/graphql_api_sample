const path = require("path");

const config = {
    mode: 'none',
    target: 'node',
    entry: {
        "app": "./src/app.ts",
    },
    output: {
        libraryTarget: "commonjs",
        filename: "[name].js",
        path: path.join(__dirname, "./dist")
    },
    externals: [
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        mainFields: ['browser', 'main', 'module'],
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' }
        ]
   }
};

module.exports = config;