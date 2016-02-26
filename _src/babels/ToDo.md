# JS 進捗

- 基本設計済み
- 共通機能 60%  
    ToDo: GET 以外のネットワーク機能
- View に合わせたデータ取得とUI連携

## Router
1. Home(index)
    - [X]

1. single 記事詳細
    - [X]

1. category
    - [X]
    - [X] slug あり

1. search
    - [X]

1. 新規登録
    - [X]  
    hash リンク
    
1. ログイン / ログアウト
    - [X] ログイン
    - [X] ログアウト  

1. パスワード
    - [-] リセット
    - [-] 再設定

1. マイページ
    - [-] default ブックマーク一覧
    - [-] アクティビティ

1. お知らせ
    - [-]

1. 設定
    - [-] プロフィール
    - [-] 好きな競技
    - [-] ソーシャル
    - [-] 退会

## Pagination

**いらないかも**

1. 対象URL 特定
    - [] 対象URL 特定
    - [] location.search からリクエスト作成
    - [] view

## header
**user** popup

1. ログイン
    - [X] ログイン判定  
    ~~API 未設定~~ Cookie 判定
    - [X] ユーザー情報取得 model
    - [X] ユーザーアイコンを ユーザー情報取得後に取得
    - [X] local から token 含むリクエストが成功しない... -> 2016-02-16 解決
    - [X] view
    - [X] UI drop menu
    - [X] お知らせ
    - [-] お知らせ既読  
    機能未策定

1. 非ログイン
    - [X] view
    
1. 検索
    - [X] model
    - [X] view

## index
ToDo: HTML 書き換えに伴う修正対応 on 2016.02.08

1. pickup
    - [X] model
    - [X] view
    
1. headline
    - [X] model
    - [X] view
    
1. 一覧
    - [X] model
    - [X] view
    - [X] infinite scroll
    
1. ranking
    - [X] model
    - [X] view
    
1. video
    - [X] model
    - [X] view
    
## 記事詳細
1. URLからID抽出
    - [X]

1. 記事
    - [X] model
    - [X] view
    - [X] 記事コメント
    
1. bookmark
    - [X] model
    - [X] view
    - [X] add
    - [X] delete
    
1. 関連記事
    - [X] model
    - [X] view
    
1. コメント self  
    - [X] model
    - [X] view  
    - [X] paging  
    - [X] send
    - [X] send 後の view
    - [-] edit  
    先送り
    - [X] delete
    - [] delete view  
    デザインがまだ
    - [-] notice  
    見送り
    - [X] good
    - [X] good delete
    - [X] bad
    - [X] bad delete
    
1. コメント official
    記事IDから取得する
    - [X] model
    - [X] view  
    ToDo: 再表示後 form 表示時の React warning
    - [X] paging  
    - [X] send
    - [X] send 後の view
    - [-] edit  
    先送り
    - [X] delete
    - [] delete view  
    デザインがまだ
    - [-] notice  
    見送り
    - [X] good
    - [X] good delete
    - [X] bad
    - [X] bad delete
        
1. コメント normal
    記事IDから取得する
    - [X] model
    - [X] view  
    ToDo: 再表示後 form 表示時の React warning
    - [X] paging  
    - [X] send
    - [X] send 後の view
    - [-] edit  
    先送り
    - [X] delete
    - [] delete view  
    デザインがまだ
    - [-] notice  
    見送り
    - [X] good
    - [X] good delete
    - [X] bad
    - [X] bad delete
    
1. コメント Form
    - [X] open / close
    - [] cancel button  
    デザインがまだ
    
1. ranking
    記事カテゴリーから取得する
    - [X] model
    - [X] view
    
1. video
    記事カテゴリーから取得する
    - [X] model
    - [X] view

1. bookmark 登録
    - [X] model
    - [X] view
    
1. bookmark 削除
    - [X] model
    - [X] view


## カテゴリー
1. URLからslug抽出
    - [X]

## カテゴリー all
ToDo: HTML 書き換えに伴う修正対応 on 2016.02.08

1. 一覧
    - [X] model
    - [X] view
    - [X] infinite scroll
        
1. ranking
    - [X] model
    - [X] view
    
1. video
    - [X] model
    - [X] view

## カテゴリー slug あり
ToDo: HTML 書き換えに伴う修正対応 on 2016.02.08

1. 一覧
    - [X] model
    - [X] view
    - [X] infinite scroll  
        
1. ranking
    - [X] model
    - [X] view
    
1. video
    - [X] model
    - [X] view
    - [] infinite scroll   
    データ足りないので「次」未テスト
    
## 検索
1. 一覧
    - [X] keyword
    - [X] model
    - [X] view
    - [] infinite scroll   
    データ足りないので「次」未テスト


# プロフィールページ
    
## bookmark
1. 一覧
    - [] model
    - [] view
    - [] infinite scroll  


## お知らせ
[issue:330](https://github.com/undotsushin/undotsushin/issues/330)

1. 一覧
    - [] model
    - [] view
    - [] infinite scroll  
    
1. 既読化
    - [] model
   

## アクティヴィティ
1. 一覧
    - [] model
    - [] view  

# アカウント設定
1. 基本情報
    - [] model
    - [] view  

1. パーソナライズ
    - [] model
    - [] view  
    
1. ソーシャル連携
    - [] model
    - [] view  
    
1. 退会
    - [] model
    - [] view  

# 会員登録

## signup
1. 登録
    - [X] email detect
    - [X] error 表示
    - [X] 基本情報入力
    - [-] thumbnail  
    ToDo: document.body へ drop されたとき問題...
    - [X] 興味のある競技を選択

## login
1. form
    - [X] model
    - [X] view
    
## logout
1. button
    - [X] model
    - [] view  
    デザインがまだ
    
## パスワード
[slack](https://undo-tsushin.slack.com/archives/web-frontenders/p1456448465000002)

> すみません..ちゃんとイシュー更新できてなくて パスワードリマインダ、API処理しなくて大丈夫な箇所です。（再設定のURLの失効化とかあると思うでバックエンドで処理してもらいます）
  ここでのフロントタスクは
  - テンプレ用意する
  - (追々)form post前の(簡易的な)validationかけてあげる
  になるかと思います  :bow:
  
1. リセット  
    - [-] model  
    - [X] view  
    
1. 再設定
    - [-] model
    - [X] view  


# バリデーション
[issues:100](https://github.com/undotsushin/undotsushin/issues/100)

[issues:184](https://github.com/undotsushin/undotsushin/issues/184)

[issues:185](https://github.com/undotsushin/undotsushin/issues/185)