const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { NODE_ENV } = process.env;
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isHMR = NODE_ENV !== 'production'

module.exports = {
  mode: "development",
  entry: {
    index: [path.join(__dirname, "./src/entry-client.js")]
  },
  output: {
    path: path.join(__dirname, "./dist/client"),
    filename: "[name].js",
    publicPath: '/client/'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/, loader: "css-loader" },
      {
        test: /\.(scss|sass)$/, use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: isHMR } },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"),
      inject: false,
      filename: '../index.html'
    }),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'chunk.[name].css',
    }),
  ]
};

// if (NODE_ENV !== "production") {
//   module.exports.plugins.push(
//     new htmlWebpackPlugin({
//       template: path.join(__dirname, "./index.html")
//     })
//   );
// }
