const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PUBLIC_PATH = '/goblin-game/';

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: PUBLIC_PATH
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  module: { /* ... */ },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      base: publicUrl 
    }),
  ],
};