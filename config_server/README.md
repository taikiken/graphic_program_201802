# config_server

サーバによって異なるファイルはこのディレクトリ内で管理する


## .htaccess

- cmsサーバにあげたファイルは、web01 / web02 に同期されるが、`/public/.htaccess` はこの同期対象にはならない
- 変更ある場合はそれぞれの環境にアップする必要があります


## /public/ad_rules/.htaccess

動画広告でミッド / ポストの再生には imasdk.googleapis.com への接続が必要になります。

```
# imasdk.googleapis.com へのアクセスを許可する http / https両方を許可したいので `*` で指定
Header set Access-Control-Allow-Origin *
Header set Access-Control-Allow-Credentials true
```
