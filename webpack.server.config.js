const path = require("path");
const fs = require("fs");
const { writeFile } = require('./cfs')
const ejs = require("ejs");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  target: "node",
  mode: "development",
  entry: { index: path.join(__dirname, "./src/entry-server.js") },
  output: {
    path: path.join(__dirname, "./dist_server"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
    // publicPath:'/'
  },
  module: {
    rules: [{ test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }]
  },
  devtool: "source-map",
  externals: [nodeExternals()],
  plugins: [
    // new CleanWebpackPlugin({
    //     verbose: true
    // })
  ]
};

const templatePath = require.resolve("./server/index.html");
console.log(templatePath)
ejs.renderFile(templatePath, {
  reactComponents: '<%- reactComponents %>',
  ssrData: '<%- ssrData %>',
  files: ["/dist_client/index.js"]
}, function (err, html) {
  if (err) throw err;
  const target = path.join(module.exports.output.path, 'index.html')
  writeFile(target, html).then(() => {
    console.log('create ' + target)
  })
});
