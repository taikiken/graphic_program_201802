/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 15:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint wrap-iife: [0, "outside"] */
// @since 2016-09-30 desktop/p.php 関連記事
(function() {
  'use strict';
  var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = 'utf-8'; pa.async = true;
  pa.src = window.location.protocol + '//api.popin.cc/searchbox/undotsushin.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
})();
