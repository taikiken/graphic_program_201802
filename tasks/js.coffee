###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# js
# app .js へ
# jshint, uglify を行います
# ＊ 複数ファイルを1ファイル は行いません
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
  app + '/**/*.js'
  '!' + app + '/**/*tmp*.js'
  '!' + app + '/**/*.{min,app,pack}.js'
  '!' + app + '/**/*-{min,app,pack}.js'
  '!' + app + '/**/*{min,app,pack}*.js'
  '!' + app + '/**/libs/**/*'
  '!' + app + '/**/*.bundle.js'
  '!' + app + '/**/_babel/**/*.js'
  '!' + app + '/**/*test*.js'
  '!' + app + '/**/_synapse/**/*.js'
  '!' + app + '/**/_brightcove/**/*.js'
  '!' + app + '/**/_js/**/*.js'
]

# jshint
# 圧縮済みファイルは除く
# .jshintrc 使用
gulp.task 'js:hint', ->
  copy = files.slice 0
  copy.push '!' + app + '/**/player/js/**/*.js'
  return gulp.src copy
#  .pipe $.debug 'file'
  .pipe $.jshint()
  .pipe $.jshint.reporter 'jshint-stylish'
  .pipe $.if !browserSync.active, $.jshint.reporter 'fail'

# uglify
gulp.task 'js:min', ->
  copy = files.slice 0
  copy.push '!' + app + '/**/player/js/**/*.js'
  return gulp.src copy
  .pipe $.replaceTask patterns: patterns
  .pipe $.stripDebug()
  .pipe $.debug({ title: "JS:MIN" })
  .pipe $.uglify preserveComments: 'license'
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** js:min ***'

# copy
gulp.task 'js:copy', ->
  return gulp.src files
  .pipe gulp.dest htdocs
  .pipe $.debug({ title: "JS:COPY" })
  .pipe $.size title: '*** js:copy ***'

# --------------------------------------------

# dev
gulp.task 'js:dev', ( cb ) ->
  runSequence(
#    'js:hint'
    'js:copy'
    cb
  )
  return

# dev
gulp.task 'js:dev:hint', ( cb ) ->
  runSequence(
    'js:hint'
    'js:copy'
    cb
  )
  return

# build
gulp.task 'js:build', ( cb ) ->
  runSequence(
#    'js:hint'
    'js:min'
    cb
  )
  return