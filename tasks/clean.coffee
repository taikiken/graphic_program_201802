###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# clean
# htdocs 階層から .map 削除
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

###
  @method delDot
  @param string extension name
###
delDot = ( extension ) ->
  return del(
    [
      htdocs + '/**/*.' + extension
    ]
    {
      base: process.cwd()
      dot: true
      force: true
    }
  )
  .then(
    ( paths ) ->
      console.log '*** clean ' + extension + ': ' + paths.length
      if paths.length
        console.log paths.join '\n'
  )

# .map
gulp.task 'clean:map', ->
  return delDot 'map'

# _*.html
gulp.task 'clean:low', ->
  return del(
    [
      htdocs + '/**/_*.html'
    ]
    {
      base: process.cwd()
      dot: true
      force: true
    }
  )
  .then(
    ( paths ) ->
      console.log '*** clean low: ' + paths.length
      if paths.length
        console.log paths.join '\n'
  )

# *.scss
gulp.task 'clean:scss', ->
  return delDot 'scss'


# since 2017-11-06 `/public/about/company/*.html`
gulp.task 'clean:company:html', ->
  return del(
    [
      htdocs + '/about/company/*.html'
    ]
    {
      base: process.cwd()
      dot: true
      force: true
    }
  )
  .then(
    ( paths ) ->
      console.log '*** clean:company ' + paths.length
      if paths.length
        console.log paths.join '\n'
  )

# ------------------------------------------------------

# all
gulp.task 'clean:all', ( cb ) ->
  runSequence(
    [
      'clean:map'
      'clean:low'
      'clean:scss'
      'clean:company:html'
    ]
    cb
  )
  return