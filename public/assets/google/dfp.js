// # DFP
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

// ## DFP - update platform
if ( /undotsushin-ios/i.test(window.navigator.userAgent) ) {
  SPBL_ENV.platform = 'app_ios';
} else if ( /undotsushin-android/i.test(window.navigator.userAgent) ) {
  SPBL_ENV.platform = 'app_android';
}

// ## DFP - setTargeting
if ( googletag.pubads ) {
  if ( SPBL_ENV.env ) {
    googletag.pubads().setTargeting("env", SPBL_ENV.env);
  }

  if ( SPBL_ENV.platform ) {
    googletag.pubads().setTargeting("platform", SPBL_ENV.platform);
  }

  if ( SPBL_ENV.page ) {
    googletag.pubads().setTargeting("page", SPBL_ENV.page);
  }

  if ( SPBL_ENV.category ) {
    googletag.pubads().setTargeting("category", SPBL_ENV.category);
  }

  if ( SPBL_ENV.p ) {
    googletag.pubads().setTargeting("p", SPBL_ENV.p);
  }

  if ( SPBL_ENV.provider ) {
    googletag.pubads().setTargeting("provider", SPBL_ENV.provider);
  }
}


document.addEventListener("DOMContentLoaded", function(event) {

  /**
  *
  * config
  *
  */
  googletag.cmd.push(function() {
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs(true);
    googletag.enableServices();
  });

  /**
  * DFPDefileSlot
  *
  * @param  string  slot - DFPのID
  * @param  array   size - 枠のサイズ
  * @param  string  target - 表示するDIV
  */

  var DFPDefileSlot = function( slot, size, target ) {
    if ( document.getElementById( target ) !== null ) {

      googletag.cmd.push(function() {
        googletag.defineSlot( slot, size, target ).addService(googletag.pubads());
      });

      googletag.cmd.push(function() {
        googletag.display( target );
      });

    }
  };


  /**
  *
  * define
  *
  */

  // # desktop
  // ==============================

  // ## desktop - detail
  // ------------------------------
  // title bottom
  DFPDefileSlot(
    '/531683568/article-detail/article-deital-desktop-bigbanner-A',
    [728, 90],
    'div-gpt-ad-article-deital-desktop-bigbanner-A'
  );

  // body insert - left
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-desktop-rectangle-A',
    [300, 250],
    'div-gpt-ad-article-detail-desktop-rectangle-A'
  );

  // body insert - right
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-desktop-rectangle-B',
    [300, 250],
    'div-gpt-ad-article-detail-desktop-rectangle-B'
  );

  // headline bottom - left
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-desktop-rectangle-C',
    [300, 250],
    'div-gpt-ad-article-detail-desktop-rectangle-C'
  );

  // headline bottom - left
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-desktop-rectangle-D',
    [300, 250],
    'div-gpt-ad-article-detail-desktop-rectangle-D'
  );


  // bottom - left
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-desktop-rectangle-E',
    [300, 250],
    'div-gpt-ad-article-detail-desktop-rectangle-E'
  );

  // bottom - right
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-desktop-rectangle-F',
    [300, 250],
    'div-gpt-ad-article-detail-desktop-rectangle-F'
  );


  // # mobile
  // ==============================

  // ## index & list
  // ------------------------------
  // list- bottom
  DFPDefileSlot(
    '/531683568/mobile/mobile_index_bottom',
    [300, 250],
    'div-gpt-ad-1514446255569-0'
  );


  // ## detail
  // ------------------------------
  // body insert
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-mobile-rectangle-A',
    [300, 250],
    'ad-gpt-article-detail-body-insert'
  );

  // body bottom
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-mobile-rectangle-B',
    [300, 250],
    'ad-gpt-article-detail-body-bottom'
  );

  // recommend bottom
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-mobile-rectangle-C',
    [300, 250],
    'ad-gpt-article-detail-recommend-bottom'
  );

  // bottom
  DFPDefileSlot(
    '/531683568/article-detail/article-detailp-mobile-rectangle-D',
    [300, 250],
    'ad-gpt-article-detail-footer'
  );

  // on title CMerTV
  DFPDefileSlot(
    '/531683568/article-detail/article-detail-mobile-on-title-movie',
    [1, 1],
    'div-gpt-ad-1521457341792-0'
  );

  // for app
  var webkit = window.webkit || {};
  var messageHandlers = webkit.messageHandlers || {};
  var onLoadComplete = messageHandlers.onLoadComplete || {};
  var postMessage = onLoadComplete.postMessage;
  if ( typeof postMessage === 'function' ) {
    window.webkit.messageHandlers.onLoadComplete.postMessage('');
    (window.onload = function() {
      setTimeout(function() {
        window.webkit.messageHandlers.onLoadComplete.postMessage('');
      }, 3000);
    });
  }

});


// #UNDO_SPBL-550 Facebook Pixel Code
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '689506531222114');
fbq('track', 'PageView');
