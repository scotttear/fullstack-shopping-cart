const path = require('path')

module.exports = {
  entry: {
    server: ['./server/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '..', 'server', 'build'),
    filename: '[name].js',
  },
  target: 'node',
}
