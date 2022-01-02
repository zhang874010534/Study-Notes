module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/githubAction' : '/',
  productionSourceMap: false,
};
