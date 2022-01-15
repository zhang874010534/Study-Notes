// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F vue cli webpack相关

const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

const needCdn = true

// cdn 外部扩展，通过 cdn 引入，不会被webpack打包
const assetsCDN = {
  // 模块名称和模块作用域命名（对应window里面挂载的变量名称
  externals: {
    moment: 'moment'
  },
  css: [
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js',  // 必须先引入moment，否则报错“TypeError: Cannot read property 'default' of undefined”
    'https://cdn.jsdelivr.net/npm/moment@2.29.1/locale/zh-cn.js', // 需同步引入语言包，否则日期选择控件等将默认显示为英文
  ]
}

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
  configureWebpack: (config) => {
    config.externals = needCdn ? assetsCDN.externals : {}
  },
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config
        .plugin('compression-webpack-plugin')
        .use(require('compression-webpack-plugin'));
    });
    // external cdn   html-webpack-plugin 在public index.html里htmlWebpackPlugin.options.cdn 拿到值
    //使用tag修改参数
    config.plugin('html').tap((args) => {
      console.log(args,'args')
      if (needCdn) {
        args[0].cdn = assetsCDN
      }
      return args
    })
    // header内 css
    // <% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
    //   <link rel="stylesheet" href="<%=css%>" />
    // <% } %>
    // body内 js
    // <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
    //   <script src="<%=js%>"></script>
    // <% } %>
    // 删除prefetch
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
