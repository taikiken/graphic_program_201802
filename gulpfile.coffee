###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###

setting = require './setting'

# gulp / module
gulp = setting.gulp
$ = setting.$

$$ = setting.module

del = $$.del
runSequence = $$.runSequence
bowerFiles = $$.bowerFiles

# prefix
AUTO_PREFIX_BROWSERS = setting.AUTO_PREFIX_BROWSERS

# replace patterns
patterns = setting.patterns

# server
server = setting.server
port = server.port
browserSync = $$.browserSync
reload = $$.reload

# directory
dir = setting.dir
app = dir.app
tmp = dir.tmp
scss = dir.scss
sprite = dir.sprite.root
scripts = dir.scripts
components = dir.bower.components
exports = dir.bower.exports
htdocs = dir.htdocs

# --------------------------------------------
# 外部 task load
# --------------------------------------------

# Load custom tasks from the `tasks` directory
# 不要の時はコメントアウトしてください
# 基本 task読み込み
try
  require( 'require-dir' )( 'tasks' )
catch error
  console.error error

# babel 関連task読み込み
try
  require( 'require-dir' )( 'tasks-babel' )
catch error
  console.error error

# sp 専用 task
try
  require( 'require-dir' )( 'tasks-sp' )
catch error
  console.error error


# --------------------------------------------
# task
# --------------------------------------------

# --------------------------------------------
# babels library
# --------------------------------------------

# babels dev
gulp.task 'babels:dev', (cb) ->
  runSequence(
    'babels:make'
    'webpack:babels:main:dev'
    'bundle:copy'
    cb
  )
  return

# babels dev
gulp.task 'babels:dev:lint', (cb) ->
  runSequence(
    'babels:make:lint'
    'webpack:babels:main:dev'
    'bundle:copy'
    cb
  )
  return

# babels build
gulp.task 'babels:build', (cb) ->
  runSequence(
#    'babels:make'
    # no eslint
    'babels:babel'
    'webpack:babels:main:build'
    'bundle:copy'
    cb
  )
  return

# exe dev
gulp.task 'exe:dev', (cb) ->
  runSequence(
    'exe:make'
    'webpack:babels:exe:dev'
    'bundle:copy'
    cb
  )
  return

# exe dev
gulp.task 'exe:dev:lint', (cb) ->
  runSequence(
    'exe:make:lint'
    'webpack:babels:exe:dev'
    'bundle:copy'
    cb
  )
  return

# exe build
gulp.task 'exe:build', (cb) ->
  runSequence(
#    'exe:make'
    # no eslint
    'exe:babel'
    'webpack:babels:exe:build'
    'bundle:copy'
    cb
  )
  return

# sp
# ---------

# exe dev
gulp.task 'sp:exe:dev', (cb) ->
  runSequence(
    'sp:exe:make'
    'sp:webpack:babels:exe:dev'
    'bundle:copy'
    cb
  )
  return

# exe dev
gulp.task 'sp:exe:dev:lint', (cb) ->
  runSequence(
    'sp:exe:make:lint'
    'sp:webpack:babels:exe:dev'
    'bundle:copy'
    cb
  )
  return

# exe build
gulp.task 'sp:exe:build', (cb) ->
  runSequence(
#    'exe:make'
# no eslint
    'sp:exe:babel'
    'sp:webpack:babels:exe:build'
    'bundle:copy'
    cb
  )
  return

# --------------------------------------------
# server
# --------------------------------------------

# --------------------------------------------
# 【開発】

# dev app by browserSync
# 【開発】 browserSync + watch
# app で開発を行います
gulp.task 'serve:app', ->
  option =
    notify: false
    # Customize the BrowserSync console logging prefix
    logPrefix: 'DEV'
    # Run as an https by uncommenting 'https: true'
    # Note: this uses an unsigned certificate which on first access
    # will present a certificate warning in the browser.
    # https: true
    server:
      baseDir: [ tmp, app ]
      directory: server.indexes
    # additional option sever launch by ip address
    open: "external"
    port: port

  browserSync option

  # watch
  # sprite image
  gulp.watch [ sprite + '/**/*.{png,jpg,gif,svg}' ], [ 'sprite:build' ]
  # html
  gulp.watch [ app + '/**/*.html', '!' + app + '/**/*tmp*.html', '!' + app + '/**/*test*.html' ], reload
  # scss, css
  gulp.watch [
    app + '/**/*.{scss,css}'
    scss + '/**/*.scss'
    '!' + dir.sp.css + '/**/*.{scss,css}'
  ], [ 'css:dev', reload ]
  # js
  gulp.watch [
    app + '/**/*.js'
    '!' + app + '/**/_babel/*.js'
    '!' + app + '/**/*.bundle.js'
    '!' + app + '/**/*.babel.js'
  ], [ 'js:dev', reload ]
  # image
  gulp.watch [ app + '/**/*.{png,jpg,gif,svg}' ], reload
  # js libs
  gulp.watch [ dir.libs + '/**/*' ], reload
  # font
  gulp.watch [ app + '/**/*.{eot,svg,ttf,woff}' ], reload

  # sp watch
  gulp.watch [
    dir.sp.css + '/**/*.{scss,css}'
    dir.sp.scss + '/**/*.{scss,css}'
  ], [ 'sp:css:dev', reload ]

  # babel: eslint -> babel -> webpack が負荷が高い様子
  # 一時的に watch task から外します
  # ToDo: 解決策が見つかれば watch task へ組み込む
#  gulp.watch [ app + '/**/_babel/*.js' ], [ 'single:dev' ]
  gulp.watch [ app + '/**/*.bundle.js' ], reload
  return

# app watch copy to htdocs
# 【開発】 watch
# ビルド後デプロイ・ディレクトリへ出力
gulp.task 'app:watch', ->
  # watch
  gulp.watch [ sprite + '/**/*.{png,jpg,gif,svg}' ], [ 'sprite:build' ]

#  gulp.watch [ app + '/**/*.html' ], 'html:build'
  gulp.watch [ app + '/**/*.{scss,css}', scss + '/**/*.scss' ], [ 'css:dev' ]
  gulp.watch [ app + '/**/*.js' ], [ 'js:dev' ]
  gulp.watch [ app + '/**/*.{png,jpg,gif,svg}' ], [ 'image:copy' ]
  gulp.watch [ dir.libs + '/**/*' ], [ 'libs:copy' ]
  return

# --------------------------------------------
# 【開発】
# copy only
# とりあえず vagrant で確認作業を行たい人のための
# 1回だけ 必要ファイルを書き出す task
#
# app から デプロイ・ディレクトリへ コピーを行います
# watch なし
gulp.task 'copy', (cb) ->
  runSequence(
    'vendor:init'
    [
      'sprite:build'
      'babels:dev'
      'exe:dev'
      'single:dev'
    ]
    [
      'bundle:copy'
      'libs:copy'
#      'html:build'
      'js:dev'
      'image:copy'
      'font:copy'
      'css:dev'
    ]
#    'clean:all'
    'lec:build'
    cb
  )
  return

# alias copy
# vagrant をサーバーにする時に
# 手っ取り早く確認用ファイルを生成する... ハズ
# eslint を除きました
gulp.task 'dev:init', (cb) ->
  runSequence(
    'vendor:dev'
    'babels:dev'
    'exe:dev'
    'sp:exe:dev'
    'sprite:build'
    'single:dev'
    'bundle:copy'
    'libs:synapse:dev'
#      'html:build'
    'js:dev'
    'image:copy'
    'font:copy'
    'css:dev'
    [
      'sp:sprite:build'
    ]
    [
      'sp:css:dev'
      'sp:image:copy'
    ]
    'libs:copy'
    cb
  )
  return


# dev:init から css 関連だけを build にしました
# code comment off
# server に 未圧縮ファイルをアップする時に使用します
# vagrant をサーバーにする時に
# 手っ取り早く確認用ファイルを生成する... ハズ
gulp.task 'dev:build', (cb) ->
  runSequence(
    'vendor:dev'
    'babels:dev'
    'exe:dev'
    'sp:exe:dev'
    'sprite:build'
    'single:dev'
    'bundle:copy'
    'libs:synapse:dev'
#      'html:build'
    'js:dev'
    'image:copy'
    'font:copy'
    'css:build'
    [
      'sp:sprite:build'
    ]
    [
      'sp:css:build'
      'sp:image:copy'
    ]
    'libs:copy'
    cb
  )
  return

# --------------------------------------------
# 【デプロイ】

# build only(default)
# 【デプロイ】 build
gulp.task 'default', (cb) ->
  runSequence(
    'vendor:init'
    'babels:build'
    'sprite:build'
#    'sp:sprite:build'
    'exe:build'
    'sp:exe:build'
    'single:build'
    'bundle:copy'
    'libs:synapse:build'
    #'html:build'
    'js:build'
    'image:build'
    'css:build'
    'font:copy'
#    'sp:css:build'
    # 'sc5:make' - デプロイ時css document再生成, 体制に影響無いので外す
    [
      'sp:sprite:build'
    ]
    [
      'sp:css:build'
      'sp:image:build'
    ]
    'libs:copy'
    'clean:all'
    'lec:build'
    cb
  )
  return

# @from 2016-06-13 sprite 作成不能になったので sprite を外した build task を作る
# build only(default)
# 【デプロイ】 build
gulp.task 'deploy', (cb) ->
  runSequence(
    'vendor:init'
    'babels:build'
#    'sprite:build'
#    'sp:sprite:build'
    'exe:build'
    'sp:exe:build'
    'single:build'
    'bundle:copy'
    'libs:synapse:build'
    #'html:build'
    'js:build'
    'image:build'
    'css:build'
    'font:copy'
#    'sp:css:build'
    # 'sc5:make' - デプロイ時css document再生成, 体制に影響無いので外す
#    [
#      'sp:sprite:build'
#    ]
    [
      'sp:css:build'
      'sp:image:build'
    ]
    'libs:copy'
    'clean:all'
    'lec:build'
    cb
  )
  return

# build htdocs by browserSync
# 【デプロイ】build + browserSync
gulp.task 'serve:htdocs', [ 'default' ], ->
  option =
    notify: false
    # Customize the BrowserSync console logging prefix
    logPrefix: 'BLD'
    # Run as an https by uncommenting 'https: true'
    # Note: this uses an unsigned certificate which on first access
    # will present a certificate warning in the browser.
    # https: true
    server:
      baseDir: htdocs
      directory: server.indexes
    # additional option sever launch by ip address
    open: "external"
    port: port

  browserSync option
  return

#gulp.task 'deploy:test', (cb) ->
#  runSequence(
#    [
#      'bundle:copy'
#      'libs:copy'
##      'html:build'
#      'js:build'
#      'image:build'
#      'css:build'
#    ]
#    'lec:build'
#  )
#  return

# ------------------------------------------------------------

# dev:init へ eslint を追加しました
gulp.task 'dev:init:lint', (cb) ->
  runSequence(
    'vendor:dev'
    'babels:dev:lint'
    'exe:dev:lint'
    'sp:exe:dev:lint'
    'sprite:build'
    'single:dev'
    'bundle:copy'
    'libs:synapse:dev'
#      'html:build'
    'js:dev'
    'image:copy'
    'font:copy'
    'css:dev'
    [
      'sp:sprite:build'
    ]
    [
      'sp:css:dev'
      'sp:image:copy'
    ]
    'libs:copy'
    cb
  )
  return