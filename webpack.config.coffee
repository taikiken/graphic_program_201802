module.exports =
  entry: __dirname

  output:
    path: '_src/app/js/bundle'
    publicPath: 'js/bundle'
    filename: '[name].bundle.js'
    chunkFilename: '[chunkhash].bundle.js'