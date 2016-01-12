###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# scripts
# project library 作成
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

# 依存ライブラリ
dependencies = []
dependencies.push scripts.dependencies + '/xxx'

# library name
scriptsName = 'project-app.js'

# concat file を依存関係を考慮し配列へ
sources = []
sources.push scripts.src + '/project.js'

sources.push scripts.src + '/Main.js'

# hint
gulp.task 'scripts:hint', ->
  return gulp.src scripts.src + '/**/*.js'
  .pipe $.jshint()
  .pipe $.jshint.reporter 'jshint-stylish'

# concat
gulp.task 'scripts:concat', ->
  merged = dependencies.concat sources

  return gulp.src merged
  .pipe $.concat scriptsName
  .pipe $.replaceTask patterns
  .pipe gulp.dest dir.libs
  .pipe $.size title: '*** scripts:concat ***'

# uglify
gulp.task 'scripts:min', ->
  merged = dependencies.concat sources

  return gulp.src merged
  .pipe $.concat scriptsName
  .pipe $.uglify preserveComments: 'license'
  .pipe $.replaceTask patterns
  .pipe $.stripDebug()
  .pipe gulp.dest dir.libs
  .pipe $.size title: '*** scripts:min ***'

# ----------------------------------------------

# dev
gulp.task 'scripts:dev', (cb) ->
  runSequence(
    'scripts:hint'
    'scripts:concat'
    cb
  )
  return

# build
gulp.task 'scripts:build', (cb) ->
  runSequence(
    'scripts:hint'
    'scripts:min'
    cb
  )
  return