const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");
const name = pkg.name;

module.exports = {
  entry: "/index.js",
  output: {
    // filename: "index.js",
    // path: path.resolve(__dirname, "dist"),
    // libraryTarget: "umd",
    path: path.resolve(__dirname),
    filename: `${name}.min.js`,
    library: name,
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
};
