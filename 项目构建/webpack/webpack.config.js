const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
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
    clean: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
  ]
}
