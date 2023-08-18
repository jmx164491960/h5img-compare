const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: {
    'content': './src/script/content',
    'popup': './src/script/popup',
  },
  watch: true,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dev'),
    clean: true,
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/, //Regular expression 
        use: {
          loader: "babel-loader",
        }
      },
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   include: delays.map(item => path.resolve(__dirname, item)),
      // },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          {
            loader: 'css-loader'
          },
          'sass-loader'
        ]
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        // webpack5 内置了 asset 模块, 用来代替 file-loader & url-loader & raw-loader 处理静态资源
        test: /\.png|jpg|gif|jpeg|svg/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'images/[base]',
        },
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Popup',
      template: 'src/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
      inject: 'body',
      hot: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/copy'),
          to: path.resolve(__dirname, 'dev')
        }
      ]
    })
    // new BundleAnalyzerPlugin()
  ]
});