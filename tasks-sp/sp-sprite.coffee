###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# SP
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

# sp directory
sp = dir.sp

# ==============================================================
# build
# sprity option で directory 毎に sprite 画像生成可能

# css file から画像ファイルまでの path
# 相対, ルート相対で記述
# 今回は 「ルート相対」

gulp.task 'sp:sprite:build', ->
# sprite directory が空の時走るとエラーになるので
# fs 一度ファイルがあるのか見る
  fs.readdir sprite, (err, files) ->
    if err
      console.error err
    else
      if files.length > 0
        console.log '*** sp:sprite:build *** start *** files: ' + files.length
        sprity.src
          src: [ sp.sprite.root + '/**/*.*', '!' + sp.sprite.root + '/css/**/*.*' ]
          style: '_sprite.scss'
          name:'sp-sprite'
          cssPath: sp.sprite.path
          processor: 'sprity-sass'
          prefix: 'sp-sprite'
          # sprity の margin bug 捨て画像のため horizontal 変更, 使えなかった
          #orientation: 'horizontal'
          orientation: setting.sprite.option
          margin: 0
          split: true
          'dimension': [
            {ratio: 1, dpi: 72}
            {ratio: 2, dpi: 192}
          ]
        .pipe $.if( '*.png', gulp.dest( sp.sprite.img ), gulp.dest( sp.sprite.css ) )
        .pipe $.size title: '*** sp:sprite:build ***'
      else
        console.warn '*** sp:sprite *** no files and directories'
  return;


# ------------------------------------------------------------------------------
# node 6.2.1
# sprity 出力 css / img 拡張子切り替えができない
# 出力後別タスクでコピーと削除を行う

gulp.task 'sp:sprite:build:shell', ->
# sprite directory が空の時走るとエラーになるので
# fs 一度ファイルがあるのか見る
  fs.readdir sprite, (err, files) ->
    if err
      console.error err
    else
      if files.length > 0
        console.log '*** sp:sprite:build *** start *** files: ' + files.length
        sprity.src
          src: [ sp.sprite.root + '/**/*.*', '!' + sp.sprite.root + '/css/**/*.*' ]
          style: '_sprite.scss'
          name:'sp-sprite'
          cssPath: sp.sprite.path
          processor: 'sprity-sass'
          prefix: 'sp-sprite'
          # sprity の margin bug 捨て画像のため horizontal 変更, 使えなかった
          #orientation: 'horizontal'
          orientation: setting.sprite.option
          margin: 0
          split: true
          'dimension': [
            {ratio: 1, dpi: 72}
            {ratio: 2, dpi: 192}
          ]
        .pipe $.if( '*.png', gulp.dest( sp.sprite.img ), gulp.dest( sp.sprite.css ) )
        .pipe $.size title: '*** sp:sprite:build ***'
        # 終わった後で走らせる
        .pipe $.shell 'gulp sp:sprite:post:clean'
      else
        console.warn '*** sp:sprite *** no files and directories'
  return;

# sp:sprite:build:shell から shell を除く
gulp.task 'sp:sprite:build:only', ->
# sprite directory が空の時走るとエラーになるので
# fs 一度ファイルがあるのか見る
  fs.readdir sprite, (err, files) ->
    if err
      console.error err
    else
      if files.length > 0
        console.log '*** sp:sprite:build *** start *** files: ' + files.length
        sprity.src
          src: [ sp.sprite.root + '/**/*.*', '!' + sp.sprite.root + '/css/**/*.*' ]
          style: '_sprite.scss'
          name:'sp-sprite'
          cssPath: sp.sprite.path
          processor: 'sprity-sass'
          prefix: 'sp-sprite'
          # sprity の margin bug 捨て画像のため horizontal 変更, 使えなかった
          #orientation: 'horizontal'
          orientation: setting.sprite.option
          margin: 0
          split: true
          'dimension': [
            {ratio: 1, dpi: 72}
            {ratio: 2, dpi: 192}
          ]
        .pipe $.if( '*.png', gulp.dest( sp.sprite.img ), gulp.dest( sp.sprite.css ) )
        .pipe $.size title: '*** sp:sprite:build:only ***'
      else
        console.warn '*** sp:sprite *** no files and directories'
  return;

# img/sprite の *.scss を css へコピー
gulp.task 'sp:sprite:move:scss', ->
  return gulp.src sp.sprite.img + '/*.scss'
  .pipe gulp.dest sp.sprite.css

# img/sprite の *.scss を削除
gulp.task 'sp:sprite:del:scss', ->
  return del(
    [
      sp.sprite.img + '/*.scss'
    ]
    {
      base: process.cwd()
      dot: true
      force: true
    }
  )
  .then(
    ( paths ) ->
      console.log '*** sp:sprite:del:scss: ' + paths.length
      if paths.length
        console.log paths.join '\n'
  )

# コピー + 削除 sequence 実行
gulp.task 'sp:sprite:post:clean', (cb) ->
  runSequence(
    'sp:sprite:move:scss'
    'sp:sprite:del:scss'
    cb
  )
  return