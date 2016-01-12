# [JSHint](http://jshint.com/)

[.jshintrc](../../.jshintrc)

**参考** 「[.jshintrc日本語版](http://qiita.com/Qiita/items/c686397e4a0f4f11683d)」


    {
      "jquery": true,
      "node": true,
      "browser": true,
      "esnext": false,
      "bitwise": true,
      "camelcase": true,
      "curly": true,
      "eqeqeq": true,
      "immed": true,
      "indent": 2,
      "newcap": true,
      "noarg": true,
      "quotmark": "single",
      "undef": true,
      "unused": "vars",
      "strict": true
    }

## 設定抜粋

### indent

- "indent": 2

indent 2 spaces


### quot

- "quotmark": "single"

quot は single quot のみ


### strict

- "strict": true

strict mode, 標準でないJavaScriptを禁止  
'use strict' 必須

    'use strict'

### esnext

- "esnext": false

ES 6(ES 2015) 使用不許可

### bitwise

- "bitwise": true

ビット演算子禁止

許可する場合は /* jslint -W016 */ を記述

    /*! copyright */
    /* jslint -W016 */
    
### camelcase

- "camelcase": true

変数名の名称制限  
変数名は **キャメルケース** or **大文字アンダースコア区切り** のみ  

    // const
    var MOTION_END = 'motionEnd';
    
    // variable
    var windowHeight = 600;
    
### curly

- "curly": true

ループや条件分岐のブロックを{}で囲う

**Error**

    if ( x ) return;
    
**Good**

    if ( x ) {
        return;
    }

### eqeqeq

- "eqeqeq": true

等号, 不等号は ===, !== を使う

**Error**

    if ( x == 100 ) {
        return;
    }

**Good**

    if ( x === 100 ) {
        return;
    }

### immed

- "immed": true

() で囲わない即時間数禁止

    ( function(){
        // code
    }() );
    
### newcap

- "newcap": true

new で呼び出す関数名の1文字目は大文字, それ以外は小文字

**Error**

    function WindowHeight () {
        return 500;
    }
    
    var height = WindowHeight()


    function elementHeight ( height ) {
        this.height = height;
    }
    elementHeight.prototype.get = function () {
        return this.height;
    }
    
    var el = new elementHeight( 100 )
    
**Good**

    function windowHeight () {
        return 500;
    }
    
    var height = windowHeight()


    function ElementHeight ( height ) {
        this.height = height;
    }
    ElementHeight.prototype.get = function () {
        return this.height;
    }
    
    var el = new ElementHeight( 100 )
    
    
### noarg

- "noarg": true

arguments.caller、arguments.calleeを禁止

### undef

- "undef": true

var宣言されていない変数の使用禁止

### unused

- "unused": "vars"

宣言しても使っていない変数があったら警告  
**warning**  

引数は警告しない


