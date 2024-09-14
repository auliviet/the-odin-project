const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/_assets", to: "assets" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /assets\/.*$/i,
        type: "asset/resource",
        /* do not emit copies of files */
        generator: {
          emit: false,
        },
      },
    ],
  },
  output: {
    filename: "bundle.js",
    assetModuleFilename: "[file]",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
