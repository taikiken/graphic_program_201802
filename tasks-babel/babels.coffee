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

files = [
  dir.babels.src + '/**/*.js'
  '!' + dir.babels.src + '/**/_*.js'
]

# eslint
gulp.task 'babels:eslint', ->
  lintFiles = files.slice 0
  lintFiles.push '!' + dir.babels.src + '/**/VideojsImaNode.js'

  return gulp.src lintFiles
  .pipe $.eslint useEslintrc: true
  .pipe $.eslint.format()
  .pipe $.eslint.failAfterError()
  .pipe $.size title: '*** babels:eslint ***'

# babel
gulp.task 'babels:babel', ->
  return gulp.src files
  .pipe $.babel presets: [ 'es2015', 'react', 'stage-0' ], plugins: ['transform-runtime']
  .pipe $.replaceTask patterns: patterns
  .pipe gulp.dest dir.babels.compile
  .pipe $.size title: '*** babels:babel ***'

# dev
gulp.task 'babels:make', ( cb ) ->
  runSequence(
#    'babels:eslint'
    'babels:babel'
    cb
  )
  return

# dev with lint
gulp.task 'babels:make:lint', ( cb ) ->
  runSequence(
    'babels:eslint'
    'babels:babel'
    cb
  )
  return
