var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
  context: path.join(__dirname, "public", "js"),
  entry: "app",
  output: {
    path: path.join(__dirname, "public", "assets"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: "jsx-loader?harmony"
    },{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }]
  },
  resolve: {
    // You can now require('file') instead of require('file.coffee')
    extensions: ["", ".js", ".jsx"],
    root: [path.join(__dirname, "public", "js")],
    modulesDirectories: ["node_modules"]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
}];