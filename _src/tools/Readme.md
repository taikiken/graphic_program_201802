
# 3. Getting started

- 前準備
- 開発

1. node module install
1. bower install
1. Gulp 設定
    1. port.coffee 作成
    1. setting.coffee 編集
    1. vendor.coffee 編集
    1. vendor.js 作成, ibs(bower インストール済)配置
1. Scss 設定
    1. scss/setting.scss
1. 開発
1. リリース
1. Appendix
    1. CSS
    1. JavaScript
    1. Sprite image
    1. HTML
    
**階層移動**  
tools でコマンド実行

    cd PATH_TO/tools
    

**基本手順**

**1.** npm module install


    sudo npm install 

**2.** bower install


    bower install
    gulp bower exports
   
    
**3.** 設定編集

**4.** vendor


    gulp vendor:init

**5.** 開発


    gulp serve:app
    

【MEMO】  
2, 3, 4 は処理済みの場合は実行不要

## 3.1 Node module

＊ **要** global へ依存 module インストール済

    sudo npm install

## 3.2 Bower

基本 JavaScript library download

    bower install
    
download 済 library から必要ファイルのみ抽出

    gulp bower exports

## 3.3 Gulp 設定

### 3.3.1 port.coffee

[port.coffee](tasks/port.coffee)

1. _port.coffee を port.coffee へ別名保存 
1. port number 設定  
1. **.gitignore** へ port.coffee 追加（追加済）  

### 3.3.2 setting.coffee

[setting.coffee](./setting.coffee)

- **階層**  
    - libs 階層を指定
    - sprite(画像, scss)出力階層指定

- **AUTO_PREFIX_BROWSERS**  
    - サポート Browser にあわせます

- **replace pattern** 設定  
    - 追加のみ可

- **compression** image最適化設定  
    - default から変更が必要な時に編集  
【参考】  
[imagemin](https://www.npmjs.com/package/imagemin)  
[gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)  

- **compress** HTML / CSS圧縮設定  
    - 圧縮(minify)する時は true 設定

- **indexes** directory indexes 設定  
    - **注意** 有効(true)設定すると directory index が無効になる  

### 3.3.3 vendor.coffee

[vendor.coffee](tasks/vendor.coffee)

- vendor.js  
    - concat library 選別

- libs  
    - libs 階層へ移動する library 選別

### 3.3.4 vendor.js / libs

    gulp vendor:init

## 3.4 Scss 設定

### 3.4.1 setting.scss

[setting.scss](../scss/_project-setting.scss)

- **scss/_project-setting.scss** 編集  
preference/_default-setting.scss を override  
AUTO_PREFIX_BROWSERS にあわせ $support-ie8, $support-ie7 を編集  
他、必要にあわせ編集  

## 3.5 開発

**[gulpfile.coffee](gulpfile.coffee)**

app をサーバールートに watch task 開始

    gulp serve:app
    
    
watch task 開始 + htdocsへファイルコピー

    gulp app:watch
    
## 3.6 リリース

htdocs へコンパイル(minify,...)

    gulp
     
htdocs へコンパイル(minify,...) + htdocs をサーバールート

    gulp serve:htdocs
    
## 3.7 Appendix


### 3.7.1 CSS

[css.coffee](tasks/css.coffee)

**[Sass](http://sass-lang.com/)** を使用します

1. _css を app へコピー
1. _css を css へ名称変更
1. 各 .scss @import パス修正

- scss フォルダ  
基本ファイル

scss/_asset.scss を import し各 scss ファイルを開発します

    @import 'PATH_TO/scss/asset';
    
sprite が必要な時は _sprite.scss を import します

    @import 'PATH_TO/css/sprite';
    

[Sprite.md](docs/Sprite.md)
    
#### task

コンパイル + sourceMap + 非圧縮

    gulp css:dev
    
コンパイル + 設定にあわせ圧縮

    gulp css:build
    
### 3.7.2 JavaScript

[js.coffee](tasks/js.coffee)

app/js/_tmp.js を編集し使用します

1. **[JSHint](http://jshint.com/)** で quality check
2. JSHint で問題なければ uglify(minify) します

[JSHind.md](docs/JSHint.md)

#### task

jshint

    gulp js:hint
    
app から htdocs へ JS コピー

    gulp js:copy
    
app から htdocs へ JS 圧縮後コピー

    gulp js:min
    

js:hint + js:copy

    gulp js:dev
    
js:hint + js:min

    gulp js:build

**Document** 作成  
可能な限り JSDoc を記述する  

[YUIDoc](http://yui.github.io/yuidoc/) を使用

### 3.7.3 sprite image

[Sprite.md](docs/Sprite.md)

[sprite.coffee](tasks/sprite.coffee)

**sprite 階層** 配下にまとめたい sprite画像毎に directory 作成

各 directory に画像を配置すると自動生成します

**[sprity](https://www.npmjs.com/package/sprity)** で作成します


#### task

sprite画像, scss 生成

    gulp sprite:build
    
生成後 CSS task を再実行  
watch task 実行中は不要  

### 3.7.4 HTML

#### task

app から htdocs へコピー + 設定にあわせ圧縮

    gulp html:build
