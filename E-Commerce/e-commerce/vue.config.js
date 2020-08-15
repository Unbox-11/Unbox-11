const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  configureWebpack: {
    plugins: [new CompressionPlugin()],
  },
  devServer: {
    proxy:'http://localhost:3000'
  }
};
