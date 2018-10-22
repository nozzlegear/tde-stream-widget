const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader?url=false", "stylus-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};
