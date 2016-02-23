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
    - [-] ログイン
    - [-] ログアウト

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
    - [] ログイン判定  
    API 未設定
    - [X] ユーザー情報取得 model
    - [X] ユーザーアイコンを ユーザー情報取得後に取得
    - [X] local から token 含むリクエストが成功しない... -> 2016-02-16 解決
    - [X] view
    - [X] UI drop menu

1. 非ログイン
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
    ToDo: Token ありリクエストができるようになったら作成する -> 2016-02-16
    - [X] model
    - [-] view  
    ToDo: 再表示後 form 表示時の React warning
    - [X] paging  
    - [X] send
    - [-] send 後の view
    - [-] edit  
    先送り
    - [] delete
    - [] notice
    - [X] good
    - [X] good delete
    - [X] bad
    - [X] bad delete
    
1. コメント official
    記事IDから取得する
    - [X] model
    - [-] view  
    ToDo: 再表示後 form 表示時の React warning
    - [X] paging  
    - [X] send
    - [X] send 後の view
    - [-] edit
    先送り
    - [] delete
    - [] notice
    - [X] good
    - [X] good delete
    - [X] bad
    - [X] bad delete
        
1. コメント normal
    記事IDから取得する
    - [X] model
    - [-] view  
    ToDo: 再表示後 form 表示時の React warning
    - [X] paging  
    - [X] send
    - [X] send 後の view
    - [-] edit
    先送り
    - [] delete
    - [] notice
    - [X] good
    - [X] good delete
    - [X] bad
    - [X] bad delete
    
1. コメント Form
    - [X] open / close
    
1. ranking
    記事カテゴリーから取得する
    - [X] model
    - [X] view
    
1. video
    記事カテゴリーから取得する
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
    - [-] infinite scroll  
    データが足りないので未テスト
        
1. ranking
    - [X] model
    - [X] view
    
1. video
    - [X] model
    - [-] view
    JSON データ戻り値がnullのため未テスト
    
## 検索
1. 一覧
    - [X] keyword
    - [X] model
    - [X] view
    - [] infinite scroll   


## お知らせ
1. 一覧
    - [] model
    - [] view
    - [] infinite scroll  
    
1. 既読化
    - [] model
    
    
## bookmark
1. 一覧
    - [] model
    - [] view
    - [] infinite scroll  
    
1. 登録
    - [] model
    
1. 削除
    - [] model
    

## signup
1. 登録
    - [X] email detect
    - [X] error 表示
    - [] 基本情報入力
    - [-] thumbnail  
    ToDo: document.body へ drop されたとき問題...
    - [X] 興味のある競技を選択