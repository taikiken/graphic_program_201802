###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# font
# _src/app/assets/fonts からコピーします
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
  app + '/**/assets/fonts/**/*.{eot,svg,ttf,woff}'
]

# copy
# _src/app/assets/fonts からコピーします, 開発時に watch task と併用し使用します
gulp.task 'font:copy', ->
  return gulp.src files
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** font:copy ***'