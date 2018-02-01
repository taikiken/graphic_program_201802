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
  * run
  *
  */
  // mobile - list- bottom
  DFPDefileSlot(
    '/531683568/mobile/mobile_index_bottom',
    [300, 250],
    'div-gpt-ad-1514446255569-0'
  );


  /**
  *
  * show
  *
  */
  googletag.cmd.push(function() {
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.enableServices();
  });

});
