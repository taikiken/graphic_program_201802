# config_server

サーバによって異なるファイルはこのディレクトリ内で管理する


## .htaccess

- cmsサーバにあげたファイルは、web01 / web02 に同期されるが、`/public/.htaccess` はこの同期対象にはならない
- 変更ある場合はそれぞれの環境にアップする必要があります


## /public/ad_rules/.htaccess

動画広告でミッド / ポストの再生には imasdk.googleapis.com への接続が必要になります。環境にあわせて以下の `.htaccess` の内容にしてください。

### http環境の場合

```
# http  => http://imasdk.googleapis.com
# https => https://imasdk.googleapis.com
Header set Access-Control-Allow-Origin https://imasdk.googleapis.com
Header set Access-Control-Allow-Credentials true
```

### https環境の場合

```
# http  => http://imasdk.googleapis.com
# https => https://imasdk.googleapis.com
Header set Access-Control-Allow-Origin http://imasdk.googleapis.com
Header set Access-Control-Allow-Credentials true
```
