# Project setting

## 依存主要モジュール

追加モジュール

- ESLint 

**[ESLint](http://eslint.org/)**

    sudo npm install -g eslint


**babel**, **react.js** を使用します

**babel** [Babel](https://babeljs.io/)

**react.js** [React](https://facebook.github.io/react/)

## 階層

for Parachute members  
本プロジェクトでは階層・名称及びファイル配置が変更になっています  

babel コンパイル・エラー回避条件は下記ファイル（ディレクトリ）をプロジェクト・ルートに配置する必要がある様子...  


- package.json
- node_modules
- gulpfile


なので  
node_modules インストールはプロジェクトルートで行います  


必然的に task runner コマンドもプロジェクトルートで行います  

プロジェクト・ルートで **コマンド** 実行してください

### 階層名称変更

htdocs -> **public**  
dev -> **(_src)**  

public: 最終納品フィアルをデプロイします

## HTML 名称

### 静的HTML
example.html

### 動的HTML
example.tmp.html

*.tmp.html 

**tmp** 付きHTMLは JS で JSON を取得します

### テスト用HTML
test.*.html

test が先頭につくHTMLは開発用になります

## JavaScript

### 開発directory

生JS(ES5) と Babel(ES2015)  
が混在するので作業ディレクトリを分けます

**js** 

app/**/js/**/*.js

生JavaScript開発ディレクトリ  

```js``` ディレクトリで行います  

```js/libs```, ```js/bundle``` は使用できません


- task: watch  
JSHint を実行します


- task: build  
JSHint + uglify し public へデプロイします

**(_babel)**

app/**/_babel/**/*.js

ES2015(ES6, ES7)開発ディレクトリ

- task: watch  
ESLint + babel + suffix: '.bundle' し js へ出力します  


- task: build  
ESLint + babel + uglify + suffix: '.bundle' し js へ出力します


**babels**

/_src/babels/src

ES2015(ES6, ES7)ライブラリ開発ディレクトリ

dev + build  
ESLint + babel + webpack + rename 'main.bundle.js' し js/bundle へ出力します

## CSS Document

**SC5 style guide generator**

[SC5](http://demo.styleguide.sc5.io/)

    npm install --save-dev sc5-styleguide
    
package.json に記載済み `npm install` で install 可能です 

    npm install
    


**gulp task**

_src/sc5-guide へdocumentを出力します  

task が成功すると sc5-guide をルートにサーバーが起動します  
port は port.coffee 設定 port + 1 になります  

http://0.0.0.0:port-number で document へアクセスできます

watch なし + server

    gulp sc5:guide
    


watch あり  + server

    gulp sc5:watch
    

watch なし + server なし

    gulp sc5:make
    

開発 watch 系 task `gulp serve:app` には組み込んでいません  
必要な時は別で起動してください  
    
    
負荷が高い時は `sc5:watch` を止め `sc5:make` を手動で走らせてください

### SC5 Syntax

[Overview.md](scss/Overview.md)

こちらもご覧下さい
