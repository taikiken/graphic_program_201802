###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###

# ------------------------------------------------------
# package
# ------------------------------------------------------
pkg = require './package.json'

# ------------------------------------------------------
# Node / Gulp module
# ------------------------------------------------------
# Include Gulp & tools we'll use
gulp = require 'gulp'
$ = do require 'gulp-load-plugins'
del = require 'del'
sprity = require 'sprity'
argv = require( 'yargs' ).argv
bowerFiles = require 'main-bower-files'
runSequence = require 'run-sequence'
eventStream = require 'event-stream'
browserSync = require 'browser-sync'
reload = browserSync.reload

###
  gulp-load-plugins を使用した
  $.util.log が syntax error になるので...
###
$.util = require 'gulp-util'

###
  for babel module
###
webpack = require 'webpack'
webpackConfig = require './webpack.config'

# ------------------------------------------------------
# directory
# ------------------------------------------------------

# dev root
app = '_src/app'

# scss module
scss = '_src/scss'

# sprite
sprite = '_src/sprite'

# tmp, dev compiled css directory
tmp = '_src/.tmp'

# scripts, project js library
scripts = '_src/scripts'
src = scripts + '/src'
dependencies = scripts + '/dependencies'

# bower
components = '_src/tools/bower_components'
exports = '_src/bower_exports'


# dist root
htdocs = 'public'


# babel
babels =
  src: '_src/babels/src'
  compile: '_src/babels/compile'

# babel 実行ファイル
exe =
  src: '_src/babels_exe/src'
  compile: '_src/babels_exe/compile'

# libs
# bower_exports から concat せず使用するライブラリの設置階層
libs = app + '/assets/js/libs'

# sprite css, image output path
# _sprite.scss の出力場所
spriteCssPath = app + '/assets/css'

# sprite 画像の出力場所
spriteImgPath =  app + '/assets/images/sprite'

# ------------------------------------------------------
# directory SP
# ------------------------------------------------------
sp =
  # sp 用 scss library
  scss: '_src/scss_sp'
  # sp 用 sprite directory
  sprite:
    root: '_src/sprite_sp'
    css: app + '/assets/sp/css'
    img: app + '/assets/sp/images/sprite'
    path: '/assets/sp/images/sprite'
  js: app + '/assets/sp/js'
  css: app + '/assets/sp/css'
  images: app + '/assets/sp/images'
  exe:
    src: '_src/babels_exe_sp/src'
    compile: '_src/babels_exe_sp/compile'


# ------------------------------------------------------
# Sass prefix (Browser vendor prefix)
# ------------------------------------------------------
AUTO_PREFIX_BROWSERS = [
  'ie >= 11'
  'ie_mob >= 10'
  'ff >= 44'
  'chrome >= 48'
  'safari >= 9'
  'opera >= 34'
  'ios >= 8.4'
  'android >= 4.2'
  'bb >= 10'
]

# ------------------------------------------------------
# patterns for replace
# ------------------------------------------------------
patterns = [
  {
    match: 'buildTime'
    replacement: new Date().toLocaleString()
  }
  {
    match: 'year'
    replacement: new Date().getFullYear()
  }
  {
    match: 'version'
    replacement: pkg.version
  }
  {
    match: 'copyright'
    replacement: 'Parachute'
  }
]

# ------------------------------------------------------
# compression
# image optimize level setting
# ------------------------------------------------------
###
  optimizationLevel: default 3

  圧縮効率は下記設定の方が大きい
  progressive: true
  interlaced: true
###
compression =
  optimizationLevel: 5
  progressive: false
  interlaced: false

# ------------------------------------------------------
# compress
# html / css minify するかしないか
# true: minifyする
#
#   default =
#     html: false
#     css:  false
# ------------------------------------------------------
compress =
  html: false
  css: true

# ------------------------------------------------------
# sprite orientation
#
# sprite 階層毎に orientation 設定
# ------------------------------------------------------
###
  orientation: binary-tree, vertical, horizontal

  key: directory name
  value:  binary-tree | vertical | horizontal
  default: binary-tree

  ToDo: directory 毎に orientation 設定可能にする
###
option =
  xxx: 'vertical'

# ------------------------------------------------------
# server (browserSync)
# ------------------------------------------------------
###
  _port.coffee を port.coffee へ rename します
  port.coffee の port 値を環境に合わせ変更します
  port.coffee を .gitignore に加えます
###
try
  port = require './port'
catch error
  port = { port : 61000 }

###
  indexes

  directory indexes を設定します
  * 【注意】directory index が無効になってしまうので default false にしてます
###
indexes = false

# ------------------------------------------------------
# exports
# ------------------------------------------------------

module.exports =
  dir:
    src: './_src'
    app: app
    scss: scss
    tmp: tmp
    libs: libs
    scripts:
      src: src
      dependencies: dependencies
    bower:
      components: components
      exports: exports
    sprite:
      css: spriteCssPath
      img: spriteImgPath
      root: sprite
    htdocs: htdocs
    babels: babels
    exe: exe
    # SP
    sp: sp

  gulp: gulp
  $: $

  module:
    del: del
    bowerFiles: bowerFiles
    runSequence: runSequence
    eventStream: eventStream
    browserSync: browserSync
    reload: reload
    sprity: sprity
    argv: argv
    webpack: webpack

  server:
    port: port.port
    indexes: indexes

  AUTO_PREFIX_BROWSERS: AUTO_PREFIX_BROWSERS
  patterns: patterns

  webpackConfig: webpackConfig

  compress: compress
  compression: compression
  sprite:
    option: option


