###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# html
# html file を app から htdocs へコピーします
# compress.html が true の時 minify を行う
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
scripts = dir.scripts
components = dir.bower.components
exports = dir.bower.exports
htdocs = dir.htdocs

# --------------------------------------------
# task
# --------------------------------------------

# build
# test ファイルのみ public へ移動させない
# example.html : static file
# example.tmp.html : build by JSON
gulp.task 'html:build', ->
  return gulp.src [
    app + '/**/about/**/*.html'
    # @since 2017-02-16 wbc 追加
    app + '/**/wbc/**/*.html'
    # @since 2017-11-06 company ignore
    '!' + app + '/**/about/**/company/*.html'
    # @since 2017-12-08 about/index.html ignore
    '!' + app + '/**/about/index.html'
  ]
  .pipe $.replaceTask patterns: patterns
  .pipe $.if compress.html, $.htmlmin collapseWhitespace: true
  .pipe $.debug title: '[HTML]'
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** html:build ***'
