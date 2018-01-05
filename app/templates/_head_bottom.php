<?php

# DFP
# ==============================

?>
<script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
<script>
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

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
</script>

<?php

# Google Analytics
# ==============================

?>
<script>
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-74679267-1', 'auto');
ga('require', 'GTM-KJ33JM9');
ga('require', 'linkid');
ga('require', 'displayfeatures');
ga('send', 'pageview');
</script>
