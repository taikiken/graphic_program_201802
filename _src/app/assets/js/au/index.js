/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/01/16 - 16:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
(function(window) {
  'use strict';
  var
    document = window.document,
    $ = window.jQuery;
  // picks/au/
  // accordion
  var
    $trigger = $(document.getElementById('js-category-nav__accordion__trigger')),
    $target = $(document.getElementById('js-category-nav__accordion__body__inner'));

  function onClick(event) {
    event.preventDefault();
    $target.slideToggle(400);
    if ($trigger.hasClass('on')) {
      $trigger.removeClass('on');
    } else {
      $trigger.addClass('on');
    }
  }

  $trigger.on('click', onClick);
}(window));
