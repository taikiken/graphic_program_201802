# Readme: Task Runner

**Parachute Web 開発 Task Runner**  
インストール, 設定, 使用方法 Document  


Note: **Project** [Project.md](./Project.md)  
本プロジェクトで追加になった項目を記載しています  
**＊初めにお読みください**  


【目次】

1. install  
    1. global  
    1. project  

1. 設定（開発環境）
    1. 階層  

1. Getting started  
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
    
1. Docs
    1. EditorConfig
    1. JSHint
    1. Getting Started
    1. Gulp Task 
    1. Sprite image
    
1. Option
    1. Ncu(npm-check-updates)

---

## 依存主要モジュール

- EditorConfig
- Sass
- Node.js(v5.3.0)
- Bower
- CoffeeScript
- Gulp
- Browsersync
- sprity
- JSHint


## 1. install

global / project それぞれにインストールを行います

### 1.1 global

global に必要モジュールをインストールおよび最新版にします

**[Sass](http://sass-lang.com/)**  

- rubygems-update インストール  
インストール済みの時は不要  


    sudo gem install rubygems-update

El Capitan でインストールエラーになる場合は下記コマンドを試す  

    sudo gem install rubygems-update -n/usr/local/bin
    
- gem update


    sudo update_rubygems
    
- sass インストール


    sudo gem install sass

El Capitan でインストールエラーになる場合は下記コマンドを試す  

    sudo gem install sass -n/usr/local/bin

バージョン確認

    sass -v
    
**[Node.js](https://nodejs.org/)**  

.pkg をダウンロードしインストール

**npm** update  
＊ .pkg インストールでは npm は最新版にならない

    sudo npm install -g npm

**[Bower](http://bower.io/)**  

    sudo npm install -g bower
    
**[CoffeeScript](http://coffeescript.org/)**

    sudo npm install -g coffee-script

**[Gulp](http://gulpjs.com/)**

    sudo npm install -g gulp
    
**[JSHint](http://jshint.com/)**

    sudo npm install -g jshint    
    
### 1.2 Project

Project 用に tools 階層へ node modules をインストールします  
package.json に記述されています

    cd PATH_TO/tools
    sudo npm install

---

## 2. 設定（開発環境）ファイル

**.editorconfig**  
Editor 設定ファイル  
[EditorConfig](http://editorconfig.org/)  

Sublime Text は plugins をインストールし使用します  
[https://github.com/sindresorhus/editorconfig-sublime#readme](https://github.com/sindresorhus/editorconfig-sublime#readme)


**.jshintrc**  
jshint( JavaScript Code Quality Tool ) 設定ファイル

[JSHint.md](tools/docs/JSHint.md)

**package.json**  
tools/package.json  
node module 設定ファイル


**bower.json**
tools/bower.json  
bower(主要JavaScript) 設定ファイル  

### 2.1 階層

ToDo 階層表示 indent

│ **dev**(dev: 開発)  
│  
│   └── _css(Sass編集ファイル, appへコピー + css へリネーム)  
│   │  
│   └── **app**(開発サーバールート)  
│   │  
│   └── bower_exports(Bowerでインストール済みライブラリから抽出)  
│   │  
│   └── scripts(Project library開発)  
│      └── dependencies  
│      └── src  
│    
│   └── scss(Sass: setting, mixin, function)  
│   └── sprite(sprite画像作成フォルダ)  
│   └── **tools**(コマンド実行directory)  
│      └── tasks(Gulp task files)  
│    
│   └── .editorconfig  
│   └── .gitignore  
│   └── .jshintrc  
│     
│ **htdocs**(dist: リリース)  
│      

**.gitignore** に加えるリスト

port.coffee, bower_components 追加

    port.coffee
    bower_components
    
下記要素も必要  
＊ node_modules 

---


## 3. Getting started

[tools/Readme.md](tools/Readme.md)

### install

**基本手順**

**1.** npm module install


    sudo npm install 

**2.** bower install

    cd ./_src/tools
    bower install

    # bower install 終了後に必要ファイルを選別を行います

    gulp bower:exports
   

あるいは下記コマンドで上記3コマンドを全て自動実行します

    npm run bower:install
    

    
**3.** 設定編集

**4.** vendor

- concat するライブラリを選別
- そのままコピーするライブラリを選別

設定終了後コマンドを実行する

    gulp vendor:init

**5.** 開発


    gulp serve:app
    

**【MEMO】**  
2, 3, 4 は処理済みの場合は実行不要


### gulp task

**[gulpfile.coffee](tools/gulpfile.coffee)**

#### 開発
app をサーバールートに watch task 開始

    gulp serve:app
    
あるいは

    npm start
    
watch task 開始 + htdocsへファイルコピー

    gulp app:watch
    
#### リリース
htdocs へコンパイル(minify,...)

    gulp
     
htdocs へコンパイル(minify,...) + htdocs をサーバールート

    gulp serve:htdocs
    
---

## 4. Docs

1. **EditorConfig** [EditorConfig.md](tools/docs/EditorConfig.md)  
エディター設定  
1. **JSHint** [JSHint.md](tools/docs/JSHint.md)  
JavaScript設定  
1. **Getting Started** [tools/Readme.md](tools/Readme.md)  
開発手順  
1. **Gulp Task** [Task.md](tools/docs/Task.md)  
Gulp Task 作成方法  
1. **Sprite image** [Sprite.md](tools/docs/Sprite.md)  
スプライト画像作成 / 使用方法  
1. **Gulp Task 一覧** [List.md](tools/docs/List.md)  
Gulp Task 一覧
1. **Babel** [Babel.md](tools/docs/Babel.md)  
ES6 開発手順
1. **React** [React.md](tools/docs/React.md)  
React 開発概要

## 5. Option

1. **Ncu(npm-check-updates)** [Ncu.md](tools/docs/Ncu.md)


