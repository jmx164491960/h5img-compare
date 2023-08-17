const path = require('path');
const resolve = path.resolve


module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  }
};

