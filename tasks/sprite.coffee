###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# sprite 画像生成
# sprity 使用, https://www.npmjs.com/package/sprity
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
sprity = $$.sprity
argv = $$.argv

# prefix
AUTO_PREFIX_BROWSERS = setting.AUTO_PREFIX_BROWSERS

# compress setting
compression = setting.compression

# compress
compress = setting.compress

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
sprite = dir.sprite.root
scripts = dir.scripts
components = dir.bower.components
exports = dir.bower.exports
htdocs = dir.htdocs

# node module
fs = require 'fs'

# --------------------------------------------
# task
# --------------------------------------------

# ==============================================================
# ここから 使えない

# output path
outPath = dir.sprite.css

###
  orientation: binary-tree, vertical, horizontal
  default: binary-tree

  key(directory name) 指定
###
option = setting.sprite.option

###
  method spriteTask
  name string task name(directory name)

  sprite 階層の directory 名称から sprite 画像を生成する
###
spriteTask = ( name ) ->
  orientation = option[ name ] || 'binary-tree'
  return sprity.src
    src: sprite + '/' + name + '/*.*'
    # style: '_' + name + '.scss'
    # 単独でtask実行時に上書きされるので一時ファイルに出力し concat する
    # sprity が scss を concat してくれるようなので同一ファイルへ書き出す
    style: '_sprite.scss'
    name:'sprite-' + name
    cssPath: '../img/sprite'
    processor: 'sprity-sass'
    prefix: 'sprite-' + name
    orientation: orientation
    margin: 0
#   .pipe $.imagemin compression
  # .pipe $.if( '*.png', gulp.dest( app + '/img/sprite' ), gulp.dest( sprite + '/css' ) )
  .pipe $.if( '*.png', gulp.dest( dir.sprite.img ), gulp.dest( outPath ) )
  .pipe $.size title: '*** sprite:' + name + ' ***'

# sprite:make
# sprite 階層をパース（除く css）
gulp.task 'sprite:make', ->
  return fs.readdir sprite, (err, files) ->
    if err
      console.error err
    else
      # css directory を除く
      spriteTask file for file in files when file isnt 'css'

# http://stackoverflow.com/questions/23023650/is-it-possible-to-pass-a-flag-to-gulp-to-have-it-run-tasks-in-different-ways
#
# command line から階層を指定し sprite を生成
# example
#   gulp sprite:one -n icon -o horizontal
#   gulp sprite:one -n nav -orientation vertical
#   gulp sprite:one -name module
#
# ToDo: 出力 scss を _sprite.scss へ concat を自動化
#
gulp.task 'sprite:one', ->
  name = argv.name || argv.n
  orientation = argv.orientation || argv.o || 'binary-tree'
  return sprity.src
    src: sprite + '/' + name + '/*.*'
    style: '_' + name + '.scss'
    name:'sprite-' + name
    cssPath: '../img/sprite'
    processor: 'sprity-sass'
    prefix: 'sprite-' + name
    orientation: orientation
    margin: 0
#  .pipe $.imagemin compression
  .pipe $.if( '*.png', gulp.dest( dir.sprite.img ), gulp.dest( sprite + '/css' ) )
  .pipe $.size title: '*** sprite:one:( ' + name + ': ' + orientation + ' ) ***'

# css concat
# sprite/css/*.scss と app/css/_sprite.scss を concat し app/css/_sprite.scss へ
#
#
# ToDo: 重複プロパティを削除する！ 方法？
#
gulp.task 'sprite:css:concat', ->
  return gulp.src [
    outPath + '/_sprite.scss'
    sprite + '/css/*.scss'
  ]
  .pipe $.concat '_sprite.scss'
  .pipe gulp.dest outPath
  .pipe $.size title: '*** sprite:css ***'

# ここまで 使えない
# ==============================================================

# ==============================================================
# build
# sprity option で directory 毎に sprite 画像生成可能
# こちらを使う

# css file から画像ファイルまでの path
# 相対, ルート相対で記述
# 今回は 「ルート相対」
cssPath = dir.sprite.img.replace app, ''
gulp.task 'sprite:build', ->
  # sprite directory が空の時走るとエラーになるので
  # fs 一度ファイルがあるのか見る
  fs.readdir sprite, (err, files) ->
    if err
      console.error err
    else
      if files.length > 0
        sprity.src
          src: [ sprite + '/**/*.*', '!' + sprite + '/css/**/*.*' ]
          style: '_sprite.scss'
          name:'sprite'
          cssPath: cssPath
          processor: 'sprity-sass'
          prefix: 'sprite'
#          orientation: 'binary-tree'
          orientation: setting.sprite.option
          margin: 0
          split: true
        .pipe $.if( '*.png', gulp.dest( dir.sprite.img ), gulp.dest( dir.sprite.css ) )
        .pipe $.size title: '*** sprite:build ***'
      else
        console.warn '*** sprite *** no files and directories'

  return;
