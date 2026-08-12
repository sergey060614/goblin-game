const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Проверяем, запущена ли команда сборки на продакшн (yarn build) или локальный сервер (yarn dev)
const isProduction = process.env.NODE_ENV === "production";
// Локально используем "/", для GitHub Pages используем "/goblin-game/"
const PUBLIC_PATH = isProduction ? "/goblin-game/" : "/";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: PUBLIC_PATH
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
    // Принудительно открываем корень, чтобы dev-server не путался в путях
    devMiddleware: {
      publicPath: "/"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|cur)$/i, 
        type: 'asset/resource', // ✅ Формат .cur теперь будет отлично обрабатываться!
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // Динамический базовый URL для тегов внутри HTML
      base: PUBLIC_PATH
    })
  ]
};
