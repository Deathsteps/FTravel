var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "public", "js"),
  entry: [
    "webpack-dev-server/client?http://localhost:9000", 
    "webpack/hot/dev-server",
    "app"
  ],
  output: {
    publicPath: "http://localhost:9000/",
    path: path.join(__dirname, "public", "assets"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: "react-hot!jsx-loader?harmony"
    },{
      test: /\.css$/,
      loader: "css-loader"
    },{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: [path.join(__dirname, "public", "js")],
    modulesDirectories: ["node_modules"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css")
  ]
};