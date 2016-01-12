# Task 一覧

Gulp task リスト

1. メイン
1. bower
1. clean
1. css
1. html
1. image
1. js
1. lec
1. libs
1. sprite
1. vendor

## メイン

app をサーバールートに watch task 開始

    gulp serve:app
    
    
watch task 開始 + htdocsへファイルコピー

    gulp app:watch
    
    
htdocs へコンパイル(minify,...)

    gulp
     
htdocs へコンパイル(minify,...) + htdocs をサーバールート

    gulp serve:htdocs
    

## bower

bower_components から bower_exports へ必要ファイルのみ抽出する

    gulp bower:exports
    
各 bower_components ライブラリから bower_exports へ必要ファイルのみ抽出する

    gulp bower:bxslider4
    gulp bower:bxslider3
    gulp bower:fancybox
    gulp bower:sagen
    gulp bower:html5shiv
    gulp bower:foundation
    gulp bower:jquery1
    gulp bower:jquery2
    gulp bower:jquery-migrate
    gulp bower:jquery-ui
    gulp bower:jquery.smooth-scroll
    gulp bower:inazumatv
    gulp bower:sass-mediaqueries
    gulp bower:modularized
    gulp bower:heightLine
    gulp bower:matchHeight
    

## clean

htdocs から指定ファイルを削除する

htdocs から .map 削除

    gulp clean:map
    
htdocs から _*.html 削除

    gulp clean:low
    
htdocs から .scss 削除

    gulp clean:scss
    
htdocs から .map + _*.html + .scss 削除
 
    gulp clean:all
    
## css

app 内 scss をコンパイルし sourceMap 付で .tmp と htdocs へ出力する

    gulp css:dev
    
app 内 scss をコンパイルしビルド日付を書込み **設定** にあわせ圧縮し .tmp と htdocs へ出力する

    gulp css:build
    
## html

app 内 .html へビルド日付を書込み **設定** にあわせ圧縮し .tmp と htdocs へ出力する

    gulp html:build
    
## image

app 内 .{png,jpg,svg,gif} を htdocs へコピー

    gulp image:copy
    

app 内 .{png,jpg,svg,gif} を htdocs へ変更時に最適化しコピー

    gulp image:dev


app 内 .{png,jpg,svg,gif} を htdocs へ最適化しコピー

    gulp image:build
    
## js

app 内 .js を JSHint チェック

    gulp js:hint
    
app 内 .js へビルド日付, author を書込み htdocs へ出力
 
    gulp js:copy
    
    
app 内 .js へビルド日付, author を書込み uglify し console.log を削除し htdocs へ出力

    gulp js:min

js:hint + js:copy

    gulp js:dev
    

js:hint + js:min

    gulp js:build
    
## lec

htdocs 内 (html, css, js, svg) の 改行コードを LF にします

    gulp:lec:build
    
## libs
    
app 内 /**/js/libs ファイルを htdocs へコピー

    gulp libs:copy
    
## sprite

sprite 内画像ファイルをスプライト化し app 設定 libs に出力し _sprite.scss を上書き

    gulp sprite:build
    
## vendor

module_exports から指定ファイルを結合(concat)し app 設定 libs に vendor.min.js 名称で出力

    gulp vendor:make
    

module_exports から指定ライブラリを app 設定 libs に出力


    gulp vendor:copy
    
vendor:make + vendor:copy


    gulp vendor:init
    
    
