const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/backstage/' : '/backstage/',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/mock': {
        target: 'https://staging.bunanapp.com',
        // target: 'https://api.bunanapp.com',
        pathRewrite: {
          '/mock': ''
        }
      },
    }
  },
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config
        .plugin('compression-webpack-plugin')
        .use(require('compression-webpack-plugin'));
    });
    config.plugins.delete('prefetch');
  }
};
