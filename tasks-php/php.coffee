###
  @author (at)taikiken / http://inazumatv.com
  Copyright (c) 2011-2015 inazumatv.com

  Licensed under the Apache License, Version 2.0 (the "License");
  https://www.apache.org/licenses/LICENSE-2.0
###
# --------------------------------------------
# php
# PHP server を 0.0.0.0:port + 2 で起動します
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
scripts = dir.scripts
components = dir.bower.components
exports = dir.bower.exports
htdocs = dir.htdocs

# --------------------------------------------
# task
# --------------------------------------------

try
  connectPhp = require 'gulp-connect-php'
catch error
  console.warning 'php task added. npm install again'
  console.error error

try
  php = require '../php_ini'
catch error
  throw new Error 'php_ini.coffee not found.'

gulp.task 'serve:php', ->
  connectPhp.server
    base: app
    hostname: '0.0.0.0'
    port: parseInt( port, 10 ) + 2
    keepalive: true
    ini: php.ini
    router: __dirname + '/../_src/app/router.php'
  return;