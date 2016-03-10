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

  'use strict';
  var document = window.document;
  var Sagen = window.Sagen;
  var Browser = Sagen.Browser;
  var Dataset = window.wakegi.Dataset;

  var Detector = ( function() {

    /**
     * PC Browser 判定
     * @class Detector
     * @static
     * @constructor
     */
    function Detector() {
    }

    var p = Detector.prototype;
    p.constructor = Detector;

    /**
     * dataset 設定の条件からブラウザ使用可否判定を行います
     * @static
     * @param {Element} element script#detector dataset 取得 tag
     */
    Detector.check = function( element ) {
      var dataSet = Dataset.parse( element );

      Detector.normalize( dataSet, 'chrome' );
      Detector.normalize( dataSet, 'safari' );
      Detector.normalize( dataSet, 'firefox' );
      Detector.normalize( dataSet, 'ie' );
      Detector.normalize( dataSet, 'edge' );
      Detector.normalize( dataSet, 'ios' );
      Detector.normalize( dataSet, 'android' );

      if ( Browser.Mobile.phone() ) {
        Detector.sp();
      } else if ( Browser.Mobile.tablet() )  {
        Detector.tablet();
      } else {
        Detector.pc();
      }

    };
    /**
     * PC check 準備
     * @param {Object} dataSet dataset object
     */
    Detector.pc = function( dataSet ) {

      if ( Browser.Chrome.is() ) {
        // chrome
        Detector.chrome( dataSet );
      } else if ( Browser.Firefox.is() ) {
        // firefox
        Detector.firefox( dataSet );
      } else if ( Browser.Safari.is() ) {
        // safari
        Detector.safari( dataSet );
      } else if ( Browser.IE.is() ) {
        // ie
        Detector.ie( dataSet );
      } else if ( Browser.Edge.is() ) {
        // edge
        Detector.edge( dataSet );
      } else {
        // unknown browser
        Detector.ignore();
      }

    };
    /**
     * mobile phone check 準備
     * @param {Object} dataSet dataset object
     */
    Detector.sp = function( dataSet ) {

      if ( Browser.iOS.is() ) {
        Detector.ios( dataSet );
      } else if ( Browser.Android.is() ) {
        Detector.android( dataSet );
      } else {
        // unknown browser
        Detector.ignore();
      }

    };
    /**
     * tablet check 準備
     * @param {Object} dataSet dataset object
     */
    Detector.tablet = function( dataSet ) {

      if ( Browser.iOS.is() ) {
        Detector.ios( dataSet );
      } else if ( Browser.Android.is() ) {
        Detector.android( dataSet );
      } else {
        // unknown browser
        Detector.ignore();
      }

    };
    /**
     * dataset に指定キーが存在するか調べ
     * 存在する時は Number 型へ値を変換し
     * 存在しに時は 99999 にします
     *
     * @param {Object} dataSet dataset object
     * @param {string} keyName chrome|safari|firefox|ie|edge
     */
    Detector.normalize = function( dataSet, keyName ) {
      if ( !dataSet.hasOwnProperty( keyName ) ) {
        dataSet[ keyName ] = 99999;
      } else {
        dataSet[ keyName ] = parseFloat( dataSet[ keyName ] );
      }
    };
    /**
     * ios での判定
     * @param {Object} dataSet dataset object
     */
    Detector.ios = function( dataSet ) {
      if ( Browser.iOS.version() < dataSet.ios ) {
        Detector.ignore();
      }
    };
    /**
     * android での判定
     * @param {Object} dataSet dataset object
     */
    Detector.android = function( dataSet ) {
      if ( Browser.Android.version() < dataSet.ios ) {
        Detector.ignore();
      }
    };
    /**
     * chrome での判定
     * @param {Object} dataSet dataset object
     */
    Detector.chrome = function( dataSet ) {
      if ( Browser.Chrome.version() < dataSet.chrome ) {
        Detector.ignore();
      }
    };
    /**
     * firefox での判定
     * @param {Object} dataSet dataset object
     */
    Detector.firefox = function( dataSet ) {
      if ( Browser.Firefox.version() < dataSet.firefox ) {
        Detector.ignore();
      }
    };
    /**
     * safari での判定
     * @param {Object} dataSet dataset object
     */
    Detector.safari = function( dataSet ) {
      if ( Browser.Safari.version() < dataSet.safari ) {
        Detector.ignore();
      }
    };
    /**
     * ie での判定
     * @param {Object} dataSet dataset object
     */
    Detector.ie = function( dataSet ) {
      if ( Browser.IE.version() < dataSet.ie ) {
        Detector.ignore();
      }
    };
    /**
     * edge での判定
     * @param {Object} dataSet dataset object
     */
    Detector.edge = function( dataSet ) {
      if ( Browser.Edge.version() < dataSet.edge ) {
        Detector.ignore();
      }
    };
    /**
     * 条件以下のブラウザで閲覧の場合は redirect させます
     */
    Detector.ignore = function() {
      location.href = '/about/';
    };

    return Detector;

  }() );

  // execute
  Detector.check( document.getElementById( 'detector' ) );

}( window ) );
