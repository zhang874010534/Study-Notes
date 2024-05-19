const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
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
  // mode: 'development',
  mode: 'production',
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
      title: 'test',
      filename: 'app.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      templateParameters: { // 替换模板里的数据
        titleName: 'test2'
      },
      // publicPath: 'https://a.com/assets/', // script、style的路径 外部资源的公共路径 配置后会覆盖output里的publicPath
      // minify: false, // 压缩
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'test/[id].css'
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        // test: /index\.css/, // 可指定匹配到的文件才压缩
        // include: /test/,
        // exclude: /test/,
        // parallel: true, // 开启多线程压缩
        // minify: CssMinimizerPlugin.cleanCssMinify, // 使用哪种压缩器
        minimizerOptions: {
          // preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ]
  }
}
