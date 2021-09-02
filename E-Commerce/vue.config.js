const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  configureWebpack: {
    plugins: [new CompressionPlugin()],
  },
  devServer: {
    proxy:'http://localhost:3000'
  }
};
