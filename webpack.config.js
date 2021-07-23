const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        // type: "asset/resource", //good for massive files
        // type: "asset/inline", //good for svgs and small imgs
        type: "asset", //auto chooses between resource or inline
        //default: if file < 8kb  ? inline : resource
        //you can change that default number with parser
        parser: {
          //condition based on which you should use inline or resource
          dataUrlCondition: {
            maxSize: 3 * 1024,
          }, // in this example, 3kb
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
        //this means that webpack will read content of txt file
        //and give us a JS string
      },
    ],
  },
};
