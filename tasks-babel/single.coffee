###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# babel(app/**/babel)
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

config = setting.webpackConfig

archives =  [
  app + '/_babel/**/*.js'
  '!' + app + '/_babel/**/_*.js'
  '!' + app + '/_babel/**/*.babel.js'
]

# eslint
gulp.task 'single:eslint', ->
  return gulp.src archives
  .pipe $.changed app + '/**', extension: '.js'
  .pipe $.eslint useEslintrc: true
  .pipe $.eslint.format()
  .pipe $.if !browserSync.active, $.eslint.failAfterError()

# babel, no minify
gulp.task 'single:compile', ->
  return gulp.src archives
  .pipe $.changed app + '/**', extension: '.js'
  .pipe $.babel presets: [ 'es2015', 'react', 'stage-0' ], plugins: ['transform-runtime'], sourceRoot: config.entry
  .pipe $.replaceTask patterns: patterns
  .pipe $.rename suffix: '.babel'
  .pipe gulp.dest app + '/_babel'
  .pipe $.size title: '*** single:compile ***'

# babel minify
gulp.task 'single:babel', ->
  return gulp.src archives
  .pipe $.babel presets: [ 'es2015', 'react', 'stage-0' ], plugins: ['transform-runtime']
  .pipe $.replaceTask patterns: patterns
  .pipe $.rename suffix: '.bundle'
  .pipe $.uglify preserveComments: 'license'
  .pipe gulp.dest app + '/js'
  .pipe $.size title: '*** single:babel ***'


# --------------------------------------------
# webpack

# webpack
webpack = $$.webpack
config = setting.webpackConfig
fs = require 'fs'

# webpack:dev
gulp.task 'single:webpack:dev', () ->
  root = config.entry
  entry = {}

  fs.readdir root + '/_src/app/_babel', (err, files) ->
    if err
      console.error err
    else
      for file in files
        divide = file.split('.')
        if divide[1] is 'babel'
          entry[ file.split('.').shift() ] = root + '/_src/app/_babel/' +file

      conf =
        entry: entry
        output: {
          path: '_src/app/js'
          publicPath: 'js'
          filename: '[name].bundle.js'
          chunkFilename: '[chunkhash].bundle.js'
        }
        plugins: [
          new webpack.optimize.DedupePlugin()
        ]

      webpack conf, ( err, stats ) ->
        if ( err )
          throw new $.util.PluginError( 'webpack', err )

        $.util.log '[webpack]', stats.toString colors: true, progress: true
  return

# webpack:build
gulp.task 'single:webpack:build', () ->
  root = config.entry
  entry = {}

  fs.readdir root + '/_src/app/_babel', (err, files) ->
    if err
      console.error err
    else
      for file in files
        divide = file.split('.')
        if divide[1] is 'babel'
          entry[ file.split('.').shift() ] = root + '/_src/app/_babel/' +file

      conf =
        entry: entry
        output: {
          path: '_src/app/js'
          publicPath: 'js'
          filename: '[name].bundle.js'
          chunkFilename: '[chunkhash].bundle.js'
        }
        plugins: [
          new webpack.optimize.DedupePlugin()
          new webpack.optimize.UglifyJsPlugin compress: warnings: true
        ]

      webpack conf, ( err, stats ) ->
        if ( err )
          throw new $.util.PluginError( 'webpack', err )

        $.util.log '[webpack]', stats.toString colors: true, progress: true
  return


# --------------------------------------------

# dev
gulp.task 'single:dev', ( cb ) ->
  runSequence(
    'single:eslint'
    'single:compile'
    'single:webpack:dev'
    cb
  )
  return


# build
gulp.task 'single:build', ( cb ) ->
  runSequence(
    'single:eslint'
    'single:compile'
    'single:webpack:build'
    cb
  )
  return
