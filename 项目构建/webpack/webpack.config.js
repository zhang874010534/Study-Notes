const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  // context: path.resolve(__dirname, 'src'), // 工作目录
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'react-vendor'
    },
    'react-vendor': ['react'],
    test: {
      import: './src/test.js',
      filename: 'app.js'
    }
  },
  output: {
    // path: path.resolve(__dirname, 'build'),
    // publicPath: 'https://a.com/assets/', // 外部资源的公共路径
    clean: true,
    chunkFilename: 'asset_[id].js',
    library: 'my_library'
  },
  mode: 'development',
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
