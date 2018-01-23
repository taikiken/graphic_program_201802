# stats / スタッツ

## トップの誘導更新 ( `/` )

> ![#image](https://user-images.githubusercontent.com/971124/35177516-618e934a-fdc3-11e7-9e7b-23cfd4c358fb.png)

**確認用URL**

- PC & SP  : `/`
- App : `/stats/webview/`

更新方法は PC / SP / App 共通

### 1. アイコンの用意

- アイコンは svg で用意する
- 単一のsvgに `symbol` で定義する

#### 1-1. アイコンを用意する

- イラレやsketchなどベクターツールでアイコンを用意する

#### 1-2. アイコンの最適化

- イラレで用意した状態では不要な定義が多いため、IcoMoon等のサービスを利用して最適化する

#### 1-3. アイコンの読み込み追加

- 最適化したsvgファイルを `<symbol>` として `/app/templates/_svg.php` に追加する

※ 現在 `_svg.php` は `/app/templates/stats/banners/top/_stats_banner.php` でロードされます

ref. [Icon Font & SVG Icon Sets ❍ IcoMoon](https://icomoon.io/)

### 2. 表示要素の指定

- `/app/templates/stats/banners/top/_stats_banner.php` の冒頭配列を調整する
- アプリでは `/app/templates/stats/banners/top/webview.php` ガロードされます
  - アプリ用のスタイルは SP版のCSSを上書きする形で上記 `webview.php` にインラインで定義されています


## スタッツトップ ( `/stats/` )

__TBD__


## 各コンテンツ ( `/stats/*/` )

各コンテンツを参照
