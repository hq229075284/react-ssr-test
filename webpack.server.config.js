const path = require("path");
// const fs = require("fs");
// const { writeFile } = require('./cfs')
// const ejs = require("ejs");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LoadablePlugin = require('@loadable/webpack-plugin')
const { NODE_ENV } = process.env;
const isHMR = NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: "node",
  mode: "development",
  entry: { index: path.join(__dirname, "./src/entry-server.js") },
  output: {
    path: path.join(__dirname, "./dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
    // publicPath:'/server'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      // options: { ...require('./babel.config'), plugins: ["@loadable/babel-plugin"], }
    },{
      test: /\.(scss|sass)$/, use: [
        { loader: MiniCssExtractPlugin.loader, options: { hmr: isHMR } },
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  devtool: "source-map",
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
    new LoadablePlugin({
      // filename:'../loadable-stats.json',
      // writeToDisk:true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'chunk.[name].css',
    }),
  ]
};

// const templatePath = require.resolve("./server/index.html");
// console.log(templatePath)
// ejs.renderFile(templatePath, {
//   reactComponents: '<%- reactComponents %>',
//   ssrData: '<%- ssrData %>',
//   files: ["/dist_client/index.js"]
// }, function (err, html) {
//   if (err) throw err;
//   const target = path.join(module.exports.output.path, 'index.html')
//   writeFile(target, html).then(() => {
//     console.log('create ' + target)
//   })
// });
