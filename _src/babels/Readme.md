# Project library

## UT

global object

## ES2015

babel でコンパイル

## ESLint

Quality check tool

ToDo: valid-jsdoc section のエラー(warning)がウザい問題解決  
JSDoc 形式で docs 書くも warning 消えない  


## ESDoc

Document 出力は ESDoc を使います

[ESDoc](https://esdoc.org/)

plugin `esdoc-es7-plugin` を使用します


    sudo npm install -g esdoc
    sudo npm install -g esdoc-es7-plugin
    

Document 出力

    esdoc -c esdoc.json
    
babels/_docs に出力されます

_docs は gitignore  


docs が必要な時は出力コマンド実行します