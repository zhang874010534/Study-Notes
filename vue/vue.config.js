const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/backstage/' : '/backstage/',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/mock': {
        target: 'https://staging.qq.com',
        // target: 'https://api.qq.com',
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
    
    config.resolve.alias
      .set('@', resolve('src'))
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    
    // https://github.com/vuejs/babel-plugin-transform-vue-jsx
    // https://github.com/ElemeFE/element/issues/14379
    config.module
      .rule('thejs')
      .test(/\.js$/)
      .include
        .add(path.resolve('src'))
        .add(path.resolve('node_modules/element-ui/packages'))
        .end()
      .use('babel-loader')
        .loader('babel-loader')
        .end()
  }
};
