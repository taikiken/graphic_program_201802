# [EditorConfig](http://editorconfig.org/)

[.editorconfig](../../.editorconfig)

    # editorconfig.org
    root = true
    
    [*]
    indent_style = space
    indent_size = 2
    end_of_line = lf
    charset = utf-8
    trim_trailing_whitespace = true
    insert_final_newline = true
    
    [*.md]
    trim_trailing_whitespace = false

## 設定

default 設定

### 文字コード
UTF-8

### 改行

コード: LF(UNIX)

文書終端に改行コード挿入  

改行文字の前の任意の空白文字を削除  
*.md 除く

### indent
space 2

## 変更

拡張子毎に override します

