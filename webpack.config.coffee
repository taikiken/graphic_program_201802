module.exports =
  entry: __dirname

  output:
    path: '_src/app/assets/js/bundle'
    publicPath: 'assets/js/bundle'
    filename: '[name].bundle.js'
    chunkFilename: '[chunkhash].bundle.js'