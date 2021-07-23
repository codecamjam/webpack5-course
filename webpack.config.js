const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    //publicPath: 'auto' in webpack 5 this is set automatically
    //in webpack 4, the default was ''
    publicPath: "dist/",
    //for a cdn
    // publicPath: "http://some-cdn.com/",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
    ],
  },
};
