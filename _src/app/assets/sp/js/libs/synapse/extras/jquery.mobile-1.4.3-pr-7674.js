// Hot-fix for PR #7674
// https://github.com/jquery/jquery-mobile/pull/7674
// 
// this patch is workaround for issue #7572
// https://github.com/jquery/jquery-mobile/issues/7572

$(document).ready(function() {
    $.mobile.panel.prototype._positionPanel = function( scrollToTop ) {
        var self = this,
            panelInnerHeight = self._panelInner.outerHeight(),
            expand = panelInnerHeight > $.mobile.getScreenHeight();
    
        if ( expand || !self.options.positionFixed ) {
            if ( expand ) {
                self._unfixPanel();
                $.mobile.resetActivePageHeight( panelInnerHeight );
            }
            if ( scrollToTop === true ) {
                this.window[ 0 ].scrollTo( 0, $.mobile.defaultHomeScroll );
            }
        } else {
            self._fixPanel();
        }
    }
});
