# JavaScript 開発手順・規約

`_src/babels/src` 配下の開発について...

1. コードスタイル
    1. エディター設定
    1. ES6
    1. React
    1. JSDoc
1. ESLint（チェックツール）
1. task

## コードスタイル

### エディター設定
@see {[EditorConfig](./EditorConfig.md)}, {[.editorconfig](../../../.editorconfig)}

- 2spaces indent
- `lf` end of line
- `UTF-8` character set
- 余分なスペースやタブなどを削除
- 末尾に空行を追加

### ES6

ES6 {[ECMAScript 6](https://github.com/lukehoban/es6features#readme)} コード記述を推奨します。

babel {[babel]{https://babeljs.io/}} でコンパイルし
 webpack {[webpack](https://webpack.github.io/)} でパッキングを行います。

【使用バージョン】

開発当初 `flowtype` {[flowtype](https://flowtype.org/)} を使用しましたが、
現在は `React JSX` {[React](https://facebook.github.io/react/)} で行っています。

新規コードでの `flowtype` 使用を止めます。

### React

React.md {[React.md](React.md)}

### JSDoc

JSDoc を記述します。（必須）

ESDoc {[ESDoc](https://esdoc.org/)} 形式で記述します。

ESDoc document {[../../babels/Readme.md](../../babels/Readme.md#ESDoc)}

ドキュメント出力
```
npm run esdoc
```

`_src/babels/_docs` に出力します。

## ESLint（チェックツール）

ESLint {[ESLint](http://eslint.org/)} 使用しチェックを行います

eslint:recommended {[eslint:recommended](http://eslint.org/docs/user-guide/migrating-to-1.0.0)} を拡張します。

`ERROR` が無いように作成する必要があります。

設定ファイル

- .eslintrc {[.eslintrc](../../../.eslintrc)}
- eslint.extends.yml {[eslint.extends.yml](../../../eslint.extends.yml)}

## task

### ES6 関連

babels.coffee {[babels.coffee](../../../tasks-babel/babels.coffee)},
webpack.coffee {[webpack.coffee](../../../tasks-babel/webpack.coffee)}

**開発**

1. ESLint
`$ gulp babels:eslint`
1. babel
`$ gulp babels:babel`
1. webpack
`$ gulp webpack:babels:main:babel:dev`

1, 2, 3 をまとめて実行する
```
$ gulp babels:dev:lint
```

2, 3 (ESLint抜き) をまとめて実行する
```
$ gulp babels:dev
```

**ビルド**
``` 
$ gulp babels:build
```