# Sprite

**sprite 階層** 配下にまとめたい sprite画像毎に directory 作成

各 directory に画像を配置すると自動生成

**Ex.**  

- 画像配置

**sprite**  
&nbsp;&nbsp;|- nav  
&nbsp;&nbsp;&nbsp;&nbsp;- nav_1.png  
&nbsp;&nbsp;&nbsp;&nbsp;- nav_2.png  
&nbsp;&nbsp;&nbsp;&nbsp;- nav_3.png  
&nbsp;&nbsp;&nbsp;&nbsp;- nav_4.png  

- Scss / img

**app**  
&nbsp;&nbsp;|- **css**  
&nbsp;&nbsp;&nbsp;&nbsp;- _sprite.scss  
&nbsp;&nbsp;|  
&nbsp;&nbsp;|- **img**  
&nbsp;&nbsp;&nbsp;&nbsp;|- **sprite**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- sprite-nav.png  
    
**sprite.scss**

    $nav-nav_1: -112px -0px 52px 76px;
    $nav-nav_2: -0px -0px 62px 77px;
    $nav-nav_3: -0px -77px 51px 85px;
    $nav-nav_4: -62px -0px 50px 82px;
    
    @mixin sprite-width($sprite) {
      width: nth($sprite, 3);
    }
    @mixin sprite-height($sprite) {
      height: nth($sprite, 4);
    }
    @function sprite-width($sprite) {
      @return nth($sprite, 3);
    }
    @function sprite-height($sprite) {
      @return nth($sprite, 4);
    }
    @mixin sprite-position($sprite) {
      $sprite-offset-x: nth($sprite, 1);
      $sprite-offset-y: nth($sprite, 2);
      background-position: $sprite-offset-x $sprite-offset-y;
    }
    @mixin sprite($sprite, $display: block) {
      @include sprite-position($sprite);
      background-repeat: no-repeat;
      overflow: hidden;
      display: $display;
      @include sprite-width($sprite);
      @include sprite-height($sprite);
    }
    
    .sprite-nav {
      background-image: url(/img/sprite/sprite-nav.png);
    }
    
**example.scss**  

    @import 'PATH_TO/sprite'
    
    .nav1 {
      @extend .sprite-nav;
      @include sprite( $nav-nav_4 );
    }

    .example {
        @extend .sprite-DIRECTORY_NAME;
        @include sprite( $DIRECTORY_NAME-IMAGE_NAME );
    }
    
## Gulp

**[sprity](https://www.npmjs.com/package/sprity)**

[sprite.coffee](../tasks/sprite.coffee)

sprite画像, scss 生成

    gulp sprite:build
