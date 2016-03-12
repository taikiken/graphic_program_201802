###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# babels
# eslint, babel
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

# --------------------------------------------
# pc
# --------------------------------------------

files = [
  dir.exe.src + '/**/*.js'
  '!' + dir.exe.src + '/**/_*.js'
]

# eslint
gulp.task 'exe:eslint', ->
  return gulp.src files
  .pipe $.eslint useEslintrc: true
  .pipe $.eslint.format()
  .pipe $.eslint.failAfterError()

# babel
gulp.task 'exe:babel', ->
  return gulp.src files
  .pipe $.babel presets: [ 'es2015', 'react', 'stage-0' ], plugins: ['transform-runtime']
  .pipe $.replaceTask patterns: patterns
  .pipe gulp.dest dir.exe.compile
  .pipe $.size title: '*** exe:babel ***'

# dev
gulp.task 'exe:make', ( cb ) ->
  runSequence(
    'exe:eslint'
    'exe:babel'
    cb
  )
  return

# --------------------------------------------
# sp
# --------------------------------------------

###
  SP 用実行ファイル作成
  webpack の都合上ここに作ります
###

sp_files = [
  dir.sp.exe.src + '/**/*.js'
  '!' + dir.sp.exe.src + '/**/_*.js'
]


# eslint
gulp.task 'sp:exe:eslint', ->
  return gulp.src sp_files
  .pipe $.eslint useEslintrc: true
  .pipe $.eslint.format()
  .pipe $.eslint.failAfterError()

# babel
gulp.task 'sp:exe:babel', ->
  return gulp.src sp_files
  .pipe $.babel presets: [ 'es2015', 'react', 'stage-0' ], plugins: ['transform-runtime']
  .pipe $.replaceTask patterns: patterns
  .pipe gulp.dest dir.exe.compile
  .pipe $.size title: '*** sp:exe:babel ***'

# dev
gulp.task 'sp:exe:make', ( cb ) ->
  runSequence(
    'sp:exe:eslint'
    'sp:exe:babel'
    cb
  )
  return