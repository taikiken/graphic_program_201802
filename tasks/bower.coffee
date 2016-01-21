###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# bower
# bower_components から必要ファイルを bower_exports へコピーします
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

###
  2015-12-27
  main-bower-files を使用した自動化を試みるも
  希望動作を作成できなかった
    ＊file directory 別にdest directoryを切り替える

  個別にtaskを作りrunSequenceでまとめて実行するを採用

  jquery1 jQuery 1系最新
  jquery2 jQuery 2系最新
###

#files = (eventStream) ->
#  eventStream.map (file, cb) ->
##    console.log file.path.indexOf( base ) isnt -1, file.path
#    if file.path.indexOf( 'sagen.js' ) isnt -1
#      console.log file.path.indexOf( 'sagen.js' ) isnt -1, file.path
#      gulp.dest '../library/sagen.js/'
#    cb()
## Bower Files
#gulp.task 'bower', ->
#  gulp
#    .src bowerFiles()
##    .pipe $.debug title: 'file'
##    .pipe files(eventStream)
#    .pipe eventStream.map ( file, callback ) ->
#      if file.path.indexOf( 'sagen.js' ) isnt -1
#        console.log file.path.indexOf( 'sagen.js' ) isnt -1, file.path
#      callback( null, file )
##    .pipe $.if files(eventStream, 'sagen.js'), gulp.dest '../library/sagen.js'
##    .pipe gulp.dest '../library/components'
#    .pipe $.size title: '*** bower ***'
#  return

###
  fancybox, foundation がコピーできない
  dist, libs 階層を消せない
  ＊不採用
###
#gulp.task 'bower:test', ->
#  files = bowerFiles()
#  files[ i ] = file.replace 'bower_components', 'bower_components/**', file for file, i in files
#
#  gulp
#  .src files
#  .pipe gulp.dest exports
#  .pipe $.size title: '*** bower:test ***'
#  return


# bxSlider 4
gulp.task 'bower:bxslider4', ->
  return gulp
    .src [
        components + '/bxslider4/dist/*.min.*'
        components + '/bxslider4/dist/**/images/*'
        components + '/bxslider4/dist/**/vendor/*'
      ]
    .pipe gulp.dest exports + '/bxslider4'
    .pipe $.size title: '*** bower:bxslider4 ***'

# bxSlider 3
gulp.task 'bower:bxslider3', ->
  return gulp
  .src [
      components + '/bxslider3/*.js'
      '!' + components + '/bxslider3/source/*'
      components + '/bxslider3/**/bx_styles/*'
    ]
  .pipe gulp.dest exports + '/bxslider3'
  .pipe $.size title: '*** bower:bxslider3 ***'

# fancybox
gulp.task 'bower:fancybox', ->
  return gulp
  .src [
    components + '/fancybox/source/*.pack.js'
    components + '/fancybox/source/*.{gif,png,css}'
    components + '/fancybox/source/**/helpers/*'
  ]
  .pipe gulp.dest exports + '/fancybox'
  .pipe $.size title: '*** bower:fancybox ***'

# sagen
gulp.task 'bower:sagen', ->
  return gulp
  .src [
    components + '/sagen.js/libs/*.min.js'
  ]
  .pipe gulp.dest exports + '/sagen'
  .pipe $.size title: '*** bower:sagen ***'

# html5shiv
gulp.task 'bower:html5shiv', ->
  return gulp
  .src [
    components + '/html5shiv/dist/*.min.js'
  ]
  .pipe gulp.dest exports + '/html5shiv'
  .pipe $.size title: '*** bower:html5shiv ***'

# foundation
gulp.task 'bower:foundation', ->
  return gulp
  .src [
    components + '/foundation/**/js/foundation/foundation*.js'
    components + '/foundation/**/scss/foundation/components/*.scss'
  ]
  .pipe gulp.dest exports + '/foundation'
  .pipe $.size title: '*** bower:foundation ***'

# jquery1
gulp.task 'bower:jquery1', ->
  return gulp
  .src [
    components + '/jquery1/dist/*.min.*'
  ]
  .pipe gulp.dest exports + '/jquery1'
  .pipe $.size title: '*** bower:jquery1 ***'

# jquery2
gulp.task 'bower:jquery2', ->
  return gulp
  .src [
    components + '/jquery2/dist/*.min.*'
  ]
  .pipe gulp.dest exports + '/jquery2'
  .pipe $.size title: '*** bower:jquery2 ***'

# jquery-migrate
gulp.task 'bower:jquery-migrate', ->
  return gulp
  .src [
    components + '/jquery-migrate/**/*.min.js'
  ]
  .pipe gulp.dest exports + '/jquery-migrate'
  .pipe $.size title: '*** bower:jquery-migrate ***'

# jquery-ui
gulp.task 'bower:jquery-ui', ->
  return gulp
  .src [
    components + '/jquery-ui/jquery-ui.min.js'
  ]
  .pipe gulp.dest exports + '/jquery-ui'
  .pipe $.size title: '*** bower:jquery-ui ***'

# jquery.smooth-scroll
gulp.task 'bower:jquery.smooth-scroll', ->
  return gulp
  .src [
    components + '/jquery.smooth-scroll/*.min.js'
  ]
  .pipe gulp.dest exports + '/jquery.smooth-scroll'
  .pipe $.size title: '*** bower:jquery.smooth-scroll ***'

# inazumatv
gulp.task 'bower:inazumatv', ->
  return gulp
  .src [
    components + '/inazumatv.util.js/libs/*.min.js'
  ]
  .pipe gulp.dest exports + '/inazumatv'
  .pipe $.size title: '*** bower:inazumatv ***'

# sass-mediaqueries
gulp.task 'bower:sass-mediaqueries', ->
  return gulp
  .src [
    components + '/sass-mediaqueries/*.scss'
  ]
  .pipe gulp.dest exports + '/sass-mediaqueries'
  .pipe $.size title: '*** bower:sass-mediaqueries ***'

# modularized
gulp.task 'bower:modularized', ->
  return gulp
  .src [
    components + '/modularized-normalize-scss/*.scss'
    components + '/modularized-normalize-scss/**/base/*.scss'
    components + '/modularized-normalize-scss/**/embed/*.scss'
    components + '/modularized-normalize-scss/**/forms/*.scss'
    components + '/modularized-normalize-scss/**/grouping/*.scss'
    components + '/modularized-normalize-scss/**/html5/*.scss'
    components + '/modularized-normalize-scss/**/links/*.scss'
    components + '/modularized-normalize-scss/**/tables/*.scss'
    components + '/modularized-normalize-scss/**/text-level/*.scss'
  ]
  .pipe gulp.dest exports + '/modularized'
  .pipe $.size title: '*** bower:modularized ***'

# heightLine
gulp.task 'bower:heightLine', ->
  return gulp
  .src [
    components + '/heightLine/*.js'
  ]
  .pipe gulp.dest exports + '/heightLine'
  .pipe $.size title: '*** bower:heightLine ***'

# matchHeight
gulp.task 'bower:matchHeight', ->
  return gulp
  .src [
    components + '/matchHeight/**/*-min.js'
  ]
  .pipe gulp.dest exports + '/matchHeight'
  .pipe $.size title: '*** bower:matchHeight ***'


# react
gulp.task 'bower:react', ->
  return gulp
  .src [
#    components + '/react/react.min.js'
#    components + '/react/react-dom.min.js'
    components + '/react/*.js'
  ]
  .pipe gulp.dest exports + '/react'
  .pipe $.size title: '*** bower:react ***'

# fetch
gulp.task 'bower:fetch', ->
  return gulp
  .src [
#    components + '/fetch/fetch.js'
    components + '/fetch/*.js'
  ]
  .pipe gulp.dest exports + '/fetch'
  .pipe $.size title: '*** bower:fetch ***'

# fetch
gulp.task 'bower:promise', ->
  return gulp
  .src [
    components + '/es6-promise/*.js'
  ]
  .pipe gulp.dest exports + '/es6-promise'
  .pipe $.size title: '*** bower:promise ***'

# bower
gulp.task 'bower:exports', (cb) ->
  runSequence(
    [
      'bower:bxslider4'
      'bower:bxslider3'
      'bower:fancybox'
      'bower:sagen'
      'bower:html5shiv'
      'bower:foundation'
      'bower:jquery1'
      'bower:jquery2'
      'bower:jquery-migrate'
      'bower:jquery-ui'
      'bower:jquery.smooth-scroll'
      'bower:inazumatv'
      'bower:sass-mediaqueries'
      'bower:modularized'
      'bower:heightLine'
      'bower:matchHeight'
      'bower:react'
      'bower:fetch'
      'bower:promise'
    ]
    cb
  )
  return
