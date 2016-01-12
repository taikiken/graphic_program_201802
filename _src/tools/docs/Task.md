# Gulp Task

**task file format**  
[CoffeeScript](http://coffeescript.org/)

## 目的別にファイルを作成

tasks directory に目的別にファイルを作成

## task 名称

FILE_NAME + TASK_NAME  

separator は **:** or **-**

js.coffee  

    # JSHint を行う
    
    js:hint
    
    js-hint
    
## run-sequence

[run-sequence](https://www.npmjs.com/package/run-sequence)

- 複数 task の実行
- A task 終了後に B task を行う  
- 複数 task 完全終了後に B task を行う  

などの時に使用します  

**[Ex.]**  

    runSequence = require 'run-sequence'
    
    gulp.task 'js:build', ( cb ) ->
      runSequence(
        'js:hint'
        'js:min'
        cb
      )
      return
        

    gulp.task 'default', (cb) ->
      runSequence(
        'sprite:build'
        [
          'libs:copy'
          'html:build'
          'js:build'
          'image:build'
          'css:build'
        ]
        'clean:all'
        cb
      )
      return
      