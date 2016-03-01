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
        sprity.src
          src: [ sp.sprite.root + '/**/*.*', '!' + sp.sprite.root + '/css/**/*.*' ]
          style: '_sprite.scss'
          name:'sp-sprite'
          cssPath: sp.sprite.path
          processor: 'sprity-sass'
          prefix: 'sp-sprite'
#          orientation: 'binary-tree'
          orientation: setting.sprite.option
          margin: 0
          split: true
        .pipe $.if( '*.png', gulp.dest( sp.sprite.img ), gulp.dest( sp.sprite.css ) )
        .pipe $.size title: '*** sp:sprite:build ***'
      else
        console.warn '*** sp:sprite *** no files and directories'

  return;