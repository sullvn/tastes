const path = require('path')

module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      stories: path.resolve(__dirname, '../stories'),
      test: path.resolve(__dirname, '../test'),
    },
  },
}
