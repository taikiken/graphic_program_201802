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

###
  汎用カルーセル開発
  target: babels_motorsports
###

setting = require '../setting'

# gulp / module
gulp = setting.gulp
$ = setting.$

$$ = setting.module

del = $$.del
runSequence = $$.runSequence
bowerFiles = $$.bowerFiles
eventStream = $$.eventStream

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
  dir.src + '/babels_motorsports/src/**/*.{js,jsx}'
]

# eslint
gulp.task 'motorsports:eslint', ->
  copy = files.slice(0)
  copy.push '!' + dir.src + '/babels_motorsports/src/**/gsap/**/*.{js,jsx}'
  return gulp.src copy
    .pipe $.eslint useEslintrc: true
    .pipe $.eslint.format()
    .pipe $.eslint.failAfterError()
    .pipe $.size title: '*** motorsports:eslint ***'

# babel
gulp.task 'motorsports:babel', ->
  return gulp.src files
  .pipe $.babel()
  .pipe $.replaceTask patterns: patterns
  .pipe gulp.dest dir.src + '/babels_motorsports/compile'
  .pipe $.size title: '*** motorsports:babel ***'

# webpack
webpack = $$.webpack

config = setting.webpackConfig

# dev
gulp.task 'motorsports:pack:dev', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
  ]
  conf.entry = conf.entry + '/_src/babels_motorsports/compile/motorsports_app.js'
  conf.output.path = '_src/babels_motorsports/dest';
  conf.output.filename = 'motorsports_app.bundle.js'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[webpack]', stats.toString colors: true, progress: true
    cb()
  return

# dev build
gulp.task 'motorsports:pack:build', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.UglifyJsPlugin compress: warnings: false
  ]
  conf.entry = conf.entry + '/_src/babels_motorsports/compile/motorsports_app.js'
  conf.output.path = '_src/babels_motorsports/dest';
  conf.output.filename = 'motorsports_app.bundle.js'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[webpack]', stats.toString colors: true, progress: true
    cb()
  return

# concat dependencies
# 依存ライブラリ
dependencies = []
#dependencies.push dir.src + '/babels_motorsports/dependencies/gsap/src/minified/TweenMax.min.js'

gulp.task 'motorsports:concat:dev', ->
  clone = dependencies.slice(0)
#  clone.push dir.src + '/babels_motorsports/dependencies/moku/moku.js'
  clone.push dir.src + '/babels_motorsports/dest/motorsports_app.bundle.js'

  return gulp.src clone
    .pipe $.concat 'motorsports_app.bundle.js'
    .pipe gulp.dest dir.app + '/assets/js'
    .pipe gulp.dest './public/assets/js'
    .pipe $.size title: '*** motorsports:concat:dev ***'

# concat build
gulp.task 'motorsports:concat:build', ->
  clone = dependencies.slice(0)
#  clone.push dir.src + '/_src/babels_motorsports/dependencies/moku/moku.min.js'
  clone.push dir.src + '/_src/babels_motorsports/dest/motorsports_app.bundle.js'

  return gulp.src clone
    .pipe $.concat 'motorsports_app.bundle.js'
    .pipe gulp.dest dir.app + '/assets/js'
    .pipe gulp.dest './public/assets/js'
    .pipe $.size title: '*** motorsports:concat:build ***'

# --------------------------------------------
# exe 実行 file
# --------------------------------------------
# dev
gulp.task 'motorsports:dev', ( cb ) ->
  runSequence(
    'motorsports:eslint'
    'motorsports:babel'
    'motorsports:pack:dev'
    'motorsports:concat:dev'
    cb
  )
  return

# dev
gulp.task 'motorsports:make', ( cb ) ->
  runSequence(
#    'motorsports:eslint'
    'motorsports:babel'
    'motorsports:pack:dev'
    'motorsports:concat:dev'
    cb
  )
  return

# build
gulp.task 'motorsports:build', ( cb ) ->
  runSequence(
    'motorsports:babel'
    'motorsports:pack:build'
    'motorsports:concat:build'
    cb
  )
  return
