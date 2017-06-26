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
gulp.task 'stats:eslint', ->
  lintFiles = files.slice 0

  return gulp.src lintFiles
  .pipe $.debug title: '[STATS]'
  .pipe $.eslint useEslintrc: true
  .pipe $.eslint.format()
  .pipe $.eslint.failAfterError()
  .pipe $.size title: '*** stats:eslint ***'

# --------------------------------------------
# babel

# babel
gulp.task 'stats:babel', ->
  return gulp.src files
  .pipe $.debug title: '[STATS:BABEL]'
  .pipe $.babel presets: [ 'es2015', 'react', 'stage-0' ], plugins: ['transform-runtime']
  .pipe $.replaceTask patterns: patterns
  .pipe gulp.dest '_src/babels_banners/compile'
  .pipe $.size title: '*** stats:babel ***'

## dev
#gulp.task 'stats:make', ( cb ) ->
#  runSequence(
##    'babels:eslint'
#    'stats:babel'
#    cb
#  )
#  return
#
## dev with lint
#gulp.task 'stats:make:lint', ( cb ) ->
#  runSequence(
#    'babels:eslint'
#    'babels:babel'
#    cb
#  )
#  return

# --------------------------------------------
# webpack


# dev
gulp.task 'stats:pack:dev', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
#    new webpack.optimize.UglifyJsPlugin compress: warnings: true
  ]
  conf.entry = conf.entry + '/_src/babels_banners/compile/banners_with_json.js'
  conf.output.filename = 'banners_with_json.bundle.js'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[stats:webpack]', stats.toString colors: true, progress: true
    cb()
  return

# deploy
gulp.task 'stats:pack:build', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.UglifyJsPlugin compress: warnings: false
  ]
  conf.entry = conf.entry + '/_src/babels_banners/banners_with_json/exe.js'
  conf.output.filename = 'banners_with_json.bundle.js'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[stats:webpack]', stats.toString colors: true, progress: true
    cb()
  return

# --------------------------------------------
# sequence

# dev
gulp.task 'stats:make', ( cb ) ->
  runSequence(
    'stats:babel'
    'stats:pack:dev'
    cb
  )
  return

# dev:lint
gulp.task 'stats:dev:lint', ( cb ) ->
  runSequence(
    'stats:eslint'
    'stats:babel'
    'stats:pack:dev'
    cb
  )
  return


# build
gulp.task 'stats:build', ( cb ) ->
  runSequence(
    'stats:babel'
    'stats:pack:build'
    cb
  )
  return
