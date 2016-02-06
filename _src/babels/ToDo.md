# JS 進捗

- 基本設計済み
- 共通機能 60%  
    ToDo: GET 以外のネットワーク機能
- View に合わせたデータ取得とUI連携

## Router
1. Home(index)
    - []

1. single 記事詳細
    - []

1. category
    - [X]
    - [X] slug あり

1. search
    - []

1. 新規登録
    - []
    - [] 基本情報入力
    - [] 興味のある競技を選択
    
1. ログイン / ログアウト
    - [] ログイン
    - [] ログアウト

1. パスワード
    - [] リセット
    - [] 再設定

1. マイページ
    - [] default ブックマーク一覧
    - [] アクティビティ

1. お知らせ
    - []

1. 設定
    - [] プロフィール
    - [] 好きな競技
    - [] ソーシャル
    - [] 退会

## Pagination
1. 対象URL 特定
    - [] 対象URL 特定
    - [] location.search からリクエスト作成
    - [] view

## header
**user** popup

1. ログイン
    - [] model
    データ取得要？  
    ユーザーアイコンはApiで取得？  
    local から token 含むリクエストが成功しない...
    - [X] view
    - [X] UI drop menu

1. 非ログイン
    - [] model
    データ取得要？
    登録済みでログアウトしたユーザのリンク違う？
    - [X] view

## index
1. pickup
    - [X] model
    - [X] view
    
1. headline
    - [X] model
    - [X] view
    
1. 一覧
    - [X] model
    - [X] view
    - [X] paging
    
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
    - [] view
    
1. bookmark
    - [] model
    - [] view
    - [] add
    - [] delete
    
1. 関連記事
    - [X] model
    - [] view
    
1. コメント self
    - [] model
    - [] view
    - [] send
    - [] edit
    - [] delete
    - [] good
    - [] good delete
    - [] bad
    - [] bad delete
    
1. コメント official
    記事IDから取得する
    - [X] model
    - [] view
    - [-] paging  
        データが足りないので未テスト
    - [] send
    - [] edit
    - [] delete
    - [] good
    - [] good delete
    - [] bad
    - [] bad delete
        
1. コメント normal
    記事IDから取得する
    - [X] model
    - [] view
    - [-] paging  
        データが足りないので未テスト
    - [] send
    - [] edit
    - [] delete
    - [] good
    - [] good delete
    - [] bad
    - [] bad delete
    
1. コメント Form
    クリックで Form 表示  
    同じ form を状態に合わせ 表示・非表示  
    ユーザー視線では Form が移動したように見える
    - [] UI
    
1. ranking
    記事カテゴリーから取得する
    - [X] model
    - [] view
    
1. video
    記事カテゴリーから取得する
    - [X] model
    - [] view

   
## カテゴリー
1. URLからslug抽出
    - [X]

## カテゴリー all
1. 一覧
    - [X] model
    - [X] view
    - [X] paging
        
1. ranking
    - [X] model
    - [X] view
    
1. video
    - [X] model
    - [X] view

## カテゴリー slug あり
1. 一覧
    - [X] model
    - [X] view
    - [-] paging  
    データが足りないので未テスト
        
1. ranking
    - [X] model
    - [X] view
    
1. video
    - [X] model
    - [X] view
    
## 検索
1. 一覧
    - [] keyword
    - [] model
    - [] view
    - [] paging   


## お知らせ
1. 一覧
    - [] model
    - [] view
    - [] paging  
    
1. 既読化
    - [] model
    
    
## bookmark
1. 一覧
    - [] model
    - [] view
    - [] paging  
    
1. 登録
    - [] model
    
1. 削除
    - [] model
    
## Pagination
[デザイン / ウェブ PC版 デザイン調整 #79](https://github.com/undotsushin/undotsushin/issues/79)

- お知らせ
- ブックマーク一覧
- アクティビティ一覧
- 記事検索結果一覧

