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

# --------------------------------------------
# module
# --------------------------------------------

# webpack
webpack = $$.webpack

config = setting.webpackConfig

# --------------------------------------------
# exe 実行 file -- sp --
# --------------------------------------------
# dev
gulp.task 'sp:webpack:babels:exe:babel:dev', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
  ]
  conf.entry = conf.entry + '/_src/babels_exe_sp/compile/sp-exe.js'
  conf.output.filename = 'sp-exe.bundle.js'
  conf.output.path = '_src/app/assets/sp/js/bundle'
  conf.output.publicPath = 'assets/sp/js/bundle'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[webpack]', stats.toString colors: true, progress: true
    cb()
  return

# deploy
gulp.task 'sp:webpack:babels:exe:babel:build', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.UglifyJsPlugin compress: warnings: false
  ]
  conf.entry = conf.entry + '/_src/babels_exe_sp/compile/sp-exe.js'
  conf.output.filename = 'sp-exe.bundle.js'
  conf.output.path = '_src/app/assets/sp/js/bundle'
  conf.output.publicPath = 'assets/sp/js/bundle'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[webpack]', stats.toString colors: true, progress: true
    cb()
  return

gulp.task 'sp:webpack:babels:exe:dev', ( cb ) ->
  runSequence(
    'sp:webpack:babels:exe:babel:dev'
    cb
  )
  return

gulp.task 'sp:webpack:babels:exe:build', ( cb ) ->
  runSequence(
    'sp:webpack:babels:exe:babel:build'
    cb
  )
  return
