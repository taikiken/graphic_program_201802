###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# vendor
# bower_exports から必要ファイルを
# concat, copy し app へ配置します
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
  vendors へ concat 対象ファイルを追加・変更・削除

  ＊ jQuery は map 記述が残っているので削除を忘れないように！
  ＊ jquery.matchHeight-min.js copyright コメントが消去されるので ** -> *! へ変更する
###

# vendor.min.js
vendors = []
#vendors.push exports + '/jquery2/*.js'
#vendors.push exports + '/jquery-migrate/*.js'
vendors.push exports + '/jquery.smooth-scroll/*.js'
vendors.push exports + '/matchHeight/*.js'

gulp.task 'vendor:build', ->
  return gulp.src vendors
  .pipe $.concat 'vendor.min.js'
  .pipe $.uglify preserveComments: 'license'
  .pipe gulp.dest dir.libs
  .pipe $.size title: '*** vendor:build ***'


###
  polyfill for IE
  promise + fetch
###
gulp.task 'vendor:react:build', ->
  return gulp.src [
    exports + '/es6-promise/promise.js'
    exports + '/fetch/fetch.js'
    exportsPath + '/react/react.min.js'
    exportsPath + '/react/react-dom.min.js'
  ]
  .pipe $.concat 'vendor.react.js'
  .pipe $.uglify preserveComments: 'license'
  .pipe gulp.dest dir.libs
  .pipe $.size title: '*** vendor:react:build ***'

###
  copy します
  libs へ対象ディレクトリを追加・変更・削除
###
# copy libraries
exportsPath = exports + '/**'
libraries = []
libraries.push exportsPath + '/jquery2/**/*.js'
libraries.push exportsPath + '/sagen/**/sagen.min.js'
libraries.push exportsPath + '/html5shiv/**/*'
libraries.push exportsPath + '/fancybox/**/*'
libraries.push exportsPath + '/bxslider4/**/*'
#libraries.push exportsPath + '/react/**/*'

gulp.task 'vendor:copy', ->
  return gulp.src libraries
  .pipe gulp.dest dir.libs
  .pipe $.size title: '*** vendor:copy ***'

# vendor.min.js + copy
gulp.task 'vendor:init', ['vendor:build', 'vendor:copy', 'vendor:react:build'], ->
  return
