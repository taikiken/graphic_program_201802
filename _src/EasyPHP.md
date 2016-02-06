# 簡易 PHP サーバー

PHP built-in server を使いルーティング・テスト用に簡易的なPHPサーバーを立てます。

**PHP Docs**  
[Built-in web server](http://php.net/manual/en/features.commandline.webserver.php)

**gulp plugins**  
[gulp-connect-php](https://www.npmjs.com/package/gulp-connect-php)


## 依存ファイル
- PHP インストール 必須

## Getting Start

1. gulp-connect-php インストール

    ```npm install gulp-connect-php```
    
1. php.ini までパスを通す
    1. _php_ini.coffee を php_ini.coffee へ別名保存
    1. php.ini までの **フルパス** を設定  
    ちなみに MAMP だと  
    ```/Applications/MAMP/bin/php/php5.6.10/conf/php.ini```
    

1. ui.css のシンボリックリンクを設定する  
    
    ```ln -s _src/.tmp/assets/css/ui.css _src/app/assets/css/ui.css```
    
    
1. gulp task  
    
    ```gulp serve:php```  


port.coffee 設定の port + 2 で起動します  

http://0.0.0.0:PORT_NUMBER  
http://0.0.0.0 は IP アドレス(192.168.n.nnn)でアクセス可能です


    http://0.0.0.0:PORT_NUMBER/tmp/test.index.html