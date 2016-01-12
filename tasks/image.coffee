###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# image
# image file を最適化し app から htdocs へコピーします
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
files = [
  app + '/**/*.{png,jpg,svg,gif}'
#  '!' + app + '/**/*sprite*/**/*'
]

# compress setting
compression = setting.compression

# copy
# 圧縮せずコピーします, 開発時に watch task と併用し使用します
gulp.task 'image:copy', ->
  return gulp.src files
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** image:copy ***'

# dev
# 随時圧縮します, ファイル数が多くなると非効率になることもあります
gulp.task 'image:dev', ->
  return gulp.src files
  .pipe $.cache $.imagemin compression
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** image:dev ***'

# build
gulp.task 'image:build', ->
  return gulp.src files
  .pipe $.imagemin compression
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** image:build ***'