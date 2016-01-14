###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# style guide
#   SC5 で css document を出力します
#
#     sudo npm install sc5-styleguide
#
#   package.json 記載済み
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

sc5 = require 'sc5-styleguide'

# --------------------------------------------
# task
# --------------------------------------------

dir.guide = '_src' + '/sc5-guide';

scssFiles = [
  scss + '/**/*.scss'
  app + '/**/*.scss'
  '!' + app + '/api/**/*.scss'
]

sc5Port = port + 1;

# generate + server
gulp.task 'sc5:generate', ->
  return gulp.src scssFiles
  .pipe $.plumber()
  .pipe sc5.generate( {
    title: 'Style Guide'
    server: true
    rootPath: dir.guide
    overviewPath: './_src/scss/Overview.md'
    port: sc5Port
  } )
  .pipe( gulp.dest dir.guide )
  .pipe $.size title: '*** sc5:generate ***'

# generate + no server
gulp.task 'sc5:generate:only', ->
  return gulp.src scssFiles
  .pipe $.plumber()
  .pipe sc5.generate( {
    title: 'Style Guide'
    server: false
    rootPath: dir.guide
    overviewPath: './_src/scss/Overview.md'
    port: sc5Port
  } )
  .pipe( gulp.dest dir.guide )
  .pipe $.size title: '*** sc5:generate:only ***'


# apply
gulp.task 'sc5:apply', ->
  return gulp.src scssFiles
  .pipe $.plumber()
  .pipe $.sass( precision: 10 ).on 'error', $.sass.logError
  .pipe $.autoprefixer browsers: AUTO_PREFIX_BROWSERS
  .pipe $.replaceTask patterns: patterns
#  .pipe( gulp.dest tmp )
  .pipe sc5.applyStyles()
  .pipe( gulp.dest dir.guide )
  .pipe $.size title: '*** sc5:apply ***'

# generate + server + apply
gulp.task 'sc5:guide', [ 'sc5:generate', 'sc5:apply' ], ->
  return

# watch + server
gulp.task 'sc5:watch', [ 'sc5:guide' ], ->
  gulp.watch scssFiles, [ 'sc5:guide' ]
  return

# no watch + no server
gulp.task 'sc5:make', [ 'sc5:generate:only', 'sc5:apply' ], ->
  return