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
  vk header - desktop / mobile
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
  dir.babels.src + '/**/*.{js,jsx}'
  "!" + dir.babels.src + '/**/_*.js'
]

# eslint
gulp.task 'vk:eslint', ->
  copy = files.slice(0)

  return gulp.src copy
    .pipe $.eslint useEslintrc: true
    .pipe $.eslint.format()
    .pipe $.eslint.failAfterError()
    .pipe $.size title: '*** vk:eslint ***'

# babel
gulp.task 'vk:babel', ->
  return gulp.src files
  .pipe $.babel()
  .pipe $.replaceTask patterns: patterns
  .pipe gulp.dest dir.src + '/babels/compile'
  .pipe $.size title: '*** vk:babel ***'

# webpack
webpack = $$.webpack

config = setting.webpackConfig

# dev
gulp.task 'vk:pack:dev', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
  ]
  conf.entry = conf.entry + '/_src/babels/compile/vk_spbl_header.js'
  conf.output.path = '_src/babels/dest';
  conf.output.filename = 'vk_spbl_header.bundle.js'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack', err )

    $.util.log '[webpack]', stats.toString colors: true, progress: true
    cb()
  return

# dev build
gulp.task 'vk:pack:build', ( cb ) ->
  conf = Object.create config

  conf.plugins = [
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.UglifyJsPlugin compress: warnings: false
  ]
  conf.entry = conf.entry + '/_src/babels/compile/vk_spbl_header.js'
  conf.output.path = '_src/babels/dest';
  conf.output.filename = 'vk_spbl_header.bundle.js'

  webpack conf, ( err, stats ) ->
    if ( err )
      throw new $.util.PluginError( 'webpack:vk', err )

    $.util.log '[webpack:vk]', stats.toString colors: true, progress: true
    cb()
  return

# concat dependencies
# 依存ライブラリ
dependencies = []
dependencies.push dir.src + '/bower_exports/sagen/sagen.min.js'
dependencies.push dir.src + '/babels_carousel/dependencies/gsap/src/minified/TweenMax.min.js'
dependencies.push dir.src + '/babels_carousel/dependencies/gsap/src/minified/TweenMax.min.js'
dependencies.push dir.src + '/babels_carousel/dependencies/gsap/src/minified/plugins/ScrollToPlugin.min.js'


gulp.task 'vk:concat:dev', ->
  clone = dependencies.slice(0)
  clone.push dir.src + '/bower_exports/react/react.js'
  clone.push dir.src + '/bower_exports/react/react-dom.js'
  clone.push dir.src + '/babels/dest/vk_spbl_header.bundle.js'

  return gulp.src clone
    .pipe $.concat 'vk_spbl_header.bundle.js'
    .pipe $.debug title: '[VK:CONCAT]'
    .pipe gulp.dest dir.app + '/assets/js'
    .pipe gulp.dest './public/assets/js'
    .pipe $.size title: '*** vk:concat:dev ***'

# concat build
gulp.task 'vk:concat:build', ->
  clone = dependencies.slice(0)
  clone.push dir.src + '/bower_exports/react/react.min.js'
  clone.push dir.src + '/bower_exports/react/react-dom.min.js'
  clone.push dir.src + '/babels/dest/vk_spbl_header.bundle.js'
#  console.log clone
  return gulp.src clone
    .pipe $.concat 'vk_spbl_header.bundle.js'
    .pipe gulp.dest dir.app + '/assets/js'
    .pipe gulp.dest './public/assets/js'
    .pipe $.debug title: '[VK:CONCAT]'
    .pipe $.size title: '*** vk:concat:build ***'

# --------------------------------------------
# exe 実行 file
# --------------------------------------------
# dev
gulp.task 'vk:dev', ( cb ) ->
  runSequence(
    'vk:eslint'
    'vk:babel'
    'vk:pack:dev'
    'vk:concat:dev'
    cb
  )
  return

# dev
gulp.task 'vk:make', ( cb ) ->
  runSequence(
#    'vk:eslint'
    'vk:babel'
    'vk:pack:dev'
    'vk:concat:dev'
    cb
  )
  return

# build
gulp.task 'vk:build', ( cb ) ->
  runSequence(
    'vk:babel'
    'vk:pack:build'
    'vk:concat:build'
    cb
  )
  return
