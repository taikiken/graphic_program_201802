###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# webpack
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

# webpack
webpack = $$.webpack

config = setting.webpackConfig

gulp.task 'webpack:babels:main:babel:dev', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
#    new webpack.optimize.UglifyJsPlugin compress: warnings: true
  ]
  conf.entry = conf.entry + '/_src/babels/compile/main.js'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[webpack]', stats.toString colors: true, progress: true
    cb()
  return

gulp.task 'webpack:babels:main:babel:build', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.UglifyJsPlugin compress: warnings: true
  ]
  conf.entry = conf.entry + '/_src/babels/compile/main.js'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[webpack]', stats.toString colors: true, progress: true
    cb()
  return

gulp.task 'webpack:babels:main:license', ->
  return gulp.src [
    './_src/license.txt'
    dir.app + '/js/bundle/main.bundle.js'
  ]
  .pipe $.concat 'main.bundle.js'
  .pipe $.replaceTask patterns: patterns
  .pipe gulp.dest  dir.app + '/js/bundle/'
  .pipe $.size title: '*** license:build ***'

gulp.task 'webpack:babels:main:dev', ( cb ) ->
  runSequence(
    'webpack:babels:main:babel:dev'
    cb
  )
  return

gulp.task 'webpack:babels:main:build', ( cb ) ->
  runSequence(
    'webpack:babels:main:babel:build'
    cb
  )
  return