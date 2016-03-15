/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/14 - 13:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * SP 実機で表示されない
 * 推測： SP mobile browser での React rendering より早く
 * FB が走査している
 * 遅延させて読み込む
 */
( function ( window ) {

  'use strict';

  var
    document = window.document;

  function delay() {
    console.log( 'window.fbAsyncInit', window.fbAsyncInit );
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '842032129256034',
        xfbml      : true,
        version    : 'v2.5'
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/ja_JP/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  function onLoad() {
    //window.removeEventListener( 'load', onLoad );
    setTimeout( delay, 500 );
    //delay();
  }

  //window.addEventListener( 'load', onLoad, false );
  onLoad();

}( window ) );