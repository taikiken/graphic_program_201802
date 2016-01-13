/*!
 * Copyright (c) 2011-@@year inazumatv.com, @@copyright.
 * @author (at)taikiken / http://inazumatv.com
 * @date @@buildTime
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
( function( window ) {

  "use strict";

  var trailingSlash = /\/$/;

  var routeStripper = /^[#\/]|\s+$/g;

  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  var namedParam = /<(\w+|[A-Za-z_-]+:\w+)>/g;

  var genericParam = /([A-Za-z_-]+):(\w+)/;

  var filePattern = /\w+\.[a-zA-Z0-9]{3,64}/;

  var optionalParam = /\((.*?)\)/g;

  var splatParam = /\*\w+/g;



}( window ) );
