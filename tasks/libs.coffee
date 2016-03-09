###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# libs
# app/**/js/libs copy to htdocs
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

# --------------------------------------------
# task
# --------------------------------------------

# copy
# * image:build, css:build の前に実行！
gulp.task 'libs:copy', ->
  return gulp.src [
    app + '/**/js/libs/html5shiv/*'
    app + '/**/js/libs/sagen/*'
  ]
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** libs:copy ***'

# synapse dev
gulp.task 'libs:synapse:dev', ->
  return gulp.src [
    app + '/**/js/libs/**/synapse/**/*.js'
    '!' + app + '/**/js/libs/**/synapse/**/*.min.js'
    '!' + app + '/**/js/libs/**/synapse/**/jquery*.js'
  ]
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** libs:synapse:dev ***'


# synapse build
gulp.task 'libs:synapse:build', ->
  return gulp.src [
    app + '/**/js/libs/**/synapse/**/*.min.js'
    '!' + app + '/**/js/libs/**/synapse/**/jquery*.js'
  ]
  .pipe $.rename (path) ->
    path.basename = path.basename.replace '.min', ''
  .pipe gulp.dest htdocs
  .pipe $.size title: '*** libs:synapse:dev ***'