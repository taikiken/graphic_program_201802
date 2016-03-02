###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# scss -> css
# scss file を css へコンパイルします
# compress.css が true の時 minify を行う
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
sprite = dir.sprite.root
scripts = dir.scripts
components = dir.bower.components
exports = dir.bower.exports
htdocs = dir.htdocs

# --------------------------------------------
# task
# --------------------------------------------

files = [
  # library
  scss + '/**/*.scss'
  # project root
  app + '/**/*.scss'
  # sp 除外
  '!' + dir.sp.css + '/**/*.{css,scss}'
  # その他 min 済ファイル除外
#  '!' + app + '/**/ui.css'
  '!' + app + '/**/*.min.{css,scss}'
  '!' + app + '/**/*min.{css,scss}'
  '!' + app + '/**/*pack.{css,scss}'
  '!' + app + '/**/js/**/*.{css,scss}'
  '!' + app + '/**/*sprite*/**/*.{css,scss}'
]

# dev
# sourcemap, dest: tmp
gulp.task 'css:dev', ->
  return gulp.src files
  .pipe $.sourcemaps.init()
  .pipe $.changed app + '/**', extension: '.css'
  .pipe $.sass(
    precision: 10
    sourceMap: true
    sourceComments: true
  ).on 'error', $.sass.logError
  .pipe $.autoprefixer browsers: AUTO_PREFIX_BROWSERS
#  .pipe $.if '*.css' && compress.css, $.cssnano
#  .pipe $.sourcemaps.write './'
  # inline map にする
  .pipe $.sourcemaps.write './', {
    addComment: true
    loadMaps: true
    includeContent: false
    sourceRoot: ['../../../app', '../../../scss']
#    sourceMappingURL: ( file ) ->
#      console.log 'file', file.relative, file
#      return file.relative + '.map'
  }
  .pipe gulp.dest tmp
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** css:dev ***'

# build
gulp.task 'css:build', ->
  return gulp.src files
  .pipe $.plumber()
#  .pipe $.changed app + '/**', extension: '.css'
  .pipe $.sass( precision: 10 ).on 'error', $.sass.logError
  .pipe $.autoprefixer browsers: AUTO_PREFIX_BROWSERS
  .pipe $.replaceTask patterns: patterns
  .pipe $.if '*.css' && compress.css, $.cssnano()
  .pipe gulp.dest tmp
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** css:build ***'