###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# babels
# eslint, babel
# --------------------------------------------

setting = require '../setting'

# gulp / module
gulp = setting.gulp
$ = setting.$

$$ = setting.module

del = $$.del
runSequence = $$.runSequence
bowerFiles = $$.bowerFiles
eventStream = $$.eventStream

# webpack
webpack = $$.webpack

config = setting.webpackConfig

# prefix
AUTO_PREFIX_BROWSERS = setting.AUTO_PREFIX_BROWSERS

# replace patterns
patterns = setting.patterns

# server
server = setting.server
browserSync = $$.browserSync
reload = $$.reload

# directory
dir = setting.dir
app = dir.app
tmp = dir.tmp
scss = dir.scss
scripts = dir.scripts
components = dir.bower.components
exports = dir.bower.exports
htdocs = dir.htdocs

# --------------------------------------------
# task
# --------------------------------------------

files = [
  '_src/babels_banners/src/**/*.{js,jsx}'
]

# eslint
gulp.task 'banners:eslint', ->
  lintFiles = files.slice 0

  return gulp.src lintFiles
  .pipe $.debug title: '[STATS]'
  .pipe $.eslint useEslintrc: true
  .pipe $.eslint.format()
  .pipe $.eslint.failAfterError()
  .pipe $.size title: '*** banners:eslint ***'

# --------------------------------------------
# babel

# babel
gulp.task 'banners:babel', ->
  return gulp.src files
  .pipe $.debug title: '[BANNERS:BABEL]'
  .pipe $.babel presets: [ 'es2015', 'react', 'stage-0' ], plugins: ['transform-runtime']
  .pipe $.replaceTask patterns: patterns
  .pipe gulp.dest '_src/babels_banners/compile'
  .pipe $.size title: '*** banners:babel ***'

## dev
#gulp.task 'banners:make', ( cb ) ->
#  runSequence(
##    'babels:eslint'
#    'banners:babel'
#    cb
#  )
#  return
#
## dev with lint
#gulp.task 'banners:make:lint', ( cb ) ->
#  runSequence(
#    'babels:eslint'
#    'babels:babel'
#    cb
#  )
#  return

# --------------------------------------------
# webpack


# dev
gulp.task 'banners:pack:dev', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
#    new webpack.optimize.UglifyJsPlugin compress: warnings: true
  ]
  conf.entry = conf.entry + '/_src/babels_banners/compile/banners_with_json.js'
  conf.output.filename = 'banners_with_json.bundle.js'
  conf.output.publicPath = 'assets/js/bundle'
  conf.output.path = '_src/app/assets/js/bundle'
  console.log('[BANNERS:DEV]', conf);
  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[banners:webpack]', stats.toString colors: true, progress: true
    cb()
  return

# deploy
gulp.task 'banners:pack:build', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.UglifyJsPlugin compress: warnings: false
  ]
  conf.entry = conf.entry + '/_src/babels_banners/compile/banners_with_json.js'
  conf.output.filename = 'banners_with_json.bundle.js'
  conf.output.publicPath = 'assets/js/bundle'
  conf.output.path = '_src/app/assets/js/bundle'
  console.log('[BANNERS:BUILD]', conf.output);
  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[banners:webpack]', stats.toString colors: true, progress: true
    cb()
  return

# --------------------------------------------
# copy
gulp.task 'banners:copy', (cb) ->
  return gulp.src [dir.app + '/**/banners_with_json.bundle.js']
    .pipe $.debug title: '[BANNERS:COPY]'
    .pipe gulp.dest htdocs
    .pipe $.size title: '*** banners:copy ***'

# --------------------------------------------
# sequence

# dev
gulp.task 'banners:dev', ( cb ) ->
  runSequence(
    'banners:babel'
    'banners:pack:dev'
    'banners:copy'
    cb
  )
  return

# dev:lint
gulp.task 'banners:dev:lint', ( cb ) ->
  runSequence(
    'banners:eslint'
    'banners:babel'
    'banners:pack:dev'
    'banners:copy'
    cb
  )
  return


# build
gulp.task 'banners:build', ( cb ) ->
  runSequence(
    'banners:babel'
    'banners:pack:build'
    'banners:copy'
    cb
  )
  return
