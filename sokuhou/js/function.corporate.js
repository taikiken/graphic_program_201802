"use strict";!function(n,e){n(function(){var o=n(".sec__corporate"),t=void 0,i=void 0,c="pc",s=void 0,d=function(){if(e.windoWidth>e.breakpoints.sp)"sp"===c&&(t.off("touchend").remove(),i.off("touchend").remove(),o.removeClass("open"),o.find(".sec__body").attr("style",""),c="pc");else if("pc"===c){o.find(">header").append('<p class="m-btn__open">モットみる</p>'),o.find(".sec__body").append('<p class="m-btn__close">とじる</p>'),t=n(".m-btn__open"),i=n(".m-btn__close"),s=function(){for(var n=[],e=0;e<t.length;e++)n[e]=!1;return n}();var d=function(n){var e=o.eq(n),i=e.find(".sec__body"),c=!!e.attr("class").match(/open/);s[n]||(s[n]=!0,c?(t.eq(n).text("モットみる"),i.velocity("slideUp",{duration:500,complete:function(){s[n]=!1}})):(t.eq(n).text("とじる"),i.velocity("slideDown",{duration:500,complete:function(){s[n]=!1}})),e.toggleClass("open"))};t.on("touchend",function(){var n=t.index(this);d(n)}),i.on("touchend",function(){var n=i.index(this);d(n),o.eq(n).velocity("scroll",{duration:500,offset:-62,easing:"swing"})}),c="sp"}};n(window).on("resize",function(){d()});(function(){d()})()})}(jQuery,options);
//# sourceMappingURL=function.corporate.js.map