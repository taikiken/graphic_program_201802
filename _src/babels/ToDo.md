# JS 進捗

- 基本設計済み
- 共通機能 60%  
    ToDo: GET 以外のネットワーク機能
- View に合わせたデータ取得とUI連携

## header
**user** popup

1. ログイン
    - [] model
    - [] view

1. 非ログイン
    - [] model
    - [] view

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
    
1. 一覧
    - [] model
    - [] view
    - [] paging
        
1. ranking
    - [] model
    - [] view
    
1. video
    - [] model
    - [] view
