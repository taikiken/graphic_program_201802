!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="assets/sp/js/bundle",t(0)}([function(e,t,n){"use strict";var r=n(1);r.SPPage.init()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPPage=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(37),f=n(39),v=n(40),d=n(41),S=n(43),m=n(44),g=n(46),p=n(47),P=n(48),y=n(45),w=n(42),h=n(49),_=n(50),b=n(51),k=n(52),E=n(53),D=n(54),T=n(55),M=n(38),O=(0,l["default"])(),C=self.UT;t.SPPage=function(){function e(t){if((0,a["default"])(this,e),O!==t)throw new Error("SPPage is static Class. not use new SPPage().")}return(0,u["default"])(e,null,[{key:"init",value:function(){C.app.User.init(),T.SPCommentDelete.start();var t=C.app.Router,n=t.factory();n.on(t.INDEX,e.index),n.on(t.CATEGORY,e.category),n.on(t.SINGLE,e.single),n.on(t.SEARCH,e.search),n.on(t.COMMENT,e.comment),n.on(t.COMMENT_REPLY,e.commentReply),n.on(t.SIGNUP,e.signup),n.on(t.LOGIN,e.login),n.on(t.LOGOUT,e.logout),n.on(t.MYPAGE,e.mypage),n.on(t.MYPAGE_ACTIVITIES,e.activities),n.on(t.NOTIFICATIONS,e.notifications),n.on(t.SETTING,e.settings),n.on(t.SETTING_INTEREST,e.interest),n.on(t.SETTING_SOCIAL,e.social),n.on(t.SETTING_DEACTIVATE,e.deactivate),n.route()}},{key:"index",value:function(){c.SPPageTop.start(),D.SPSearchFrom.start(),d.SPIndex.start(),f.SPNav.start("home"),v.SPSyn.start()}},{key:"category",value:function(e){var t=e.slug,n=e.slugType;c.SPPageTop.start(),D.SPSearchFrom.start(),S.SPCategory.start(t,n),f.SPNav.start(t),v.SPSyn.start()}},{key:"single",value:function(e){var t=e.id;c.SPPageTop.start(),D.SPSearchFrom.start(),m.SPSingle.start(t),v.SPSyn.start()}},{key:"comment",value:function(e){c.SPPageTop.start(),D.SPSearchFrom.start(),E.SPComment.user("comment",e.article,e.comment),v.SPSyn.start()}},{key:"commentReply",value:function(e){c.SPPageTop.start(),D.SPSearchFrom.start(),E.SPComment.user("reply",e.article,e.comment,e.article),v.SPSyn.start()}},{key:"search",value:function(e){c.SPPageTop.start(),D.SPSearchFrom.start(),g.SPSearch.start(e.keyword),v.SPSyn.start()}},{key:"signup",value:function(){p.SPSignup.start()}},{key:"login",value:function(){var e=M.Dom.login();if(null!==e){var t=new C.view.login.ViewLogin(e);t.start()}}},{key:"logout",value:function(){if(c.SPPageTop.start(),D.SPSearchFrom.start(),y.SPSidebar.start(),w.SPHeader.start(),C.app.User.sign){var e=M.Dom.logout();if(null!==e){var t=new C.view.login.ViewLogout(e);t.start()}}}},{key:"mypage",value:function(){c.SPPageTop.start(),D.SPSearchFrom.start(),y.SPSidebar.start(),w.SPHeader.start(),C.app.User.sign&&(P.SPUserProfile.start(),h.SPBookmarks.start()),v.SPSyn.start()}},{key:"activities",value:function(){c.SPPageTop.start(),D.SPSearchFrom.start(),y.SPSidebar.start(),w.SPHeader.start(),C.app.User.sign&&(P.SPUserProfile.start(),_.SPActivities.start()),v.SPSyn.start()}},{key:"notifications",value:function(){c.SPPageTop.start(),D.SPSearchFrom.start(),y.SPSidebar.start(),w.SPHeader.start(),C.app.User.sign&&(P.SPUserProfile.start(),b.SPNotifications.start()),v.SPSyn.start()}},{key:"settings",value:function(){c.SPPageTop.start(),D.SPSearchFrom.start(),y.SPSidebar.start(),w.SPHeader.start(),C.app.User.sign&&k.SPSettings.account(),v.SPSyn.start()}},{key:"interest",value:function(){c.SPPageTop.start(),D.SPSearchFrom.start(),y.SPSidebar.start(),w.SPHeader.start(),C.app.User.sign&&k.SPSettings.interest(),v.SPSyn.start()}},{key:"social",value:function(){c.SPPageTop.start(),D.SPSearchFrom.start(),y.SPSidebar.start(),w.SPHeader.start(),v.SPSyn.start()}},{key:"deactivate",value:function(){c.SPPageTop.start(),D.SPSearchFrom.start(),y.SPSidebar.start(),w.SPHeader.start(),C.app.User.sign&&k.SPSettings.deactivate(),v.SPSyn.start()}}]),e}()},function(e,t){"use strict";t["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t.__esModule=!0},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(4),a=r(o);t["default"]=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,a["default"])(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),t.__esModule=!0},function(e,t,n){e.exports={"default":n(5),__esModule:!0}},function(e,t,n){var r=n(6);e.exports=function(e,t,n){return r.setDesc(e,t,n)}},function(e,t){var n=Object;e.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(e,t,n){e.exports={"default":n(8),__esModule:!0}},function(e,t,n){n(9),n(36),e.exports=n(15).Symbol},function(e,t,n){"use strict";var r=n(6),o=n(10),a=n(11),i=n(12),u=n(14),s=n(18),l=n(13),c=n(21),f=n(22),v=n(24),d=n(23),S=n(25),m=n(30),g=n(31),p=n(32),P=n(33),y=n(26),w=n(20),h=r.getDesc,_=r.setDesc,b=r.create,k=m.get,E=o.Symbol,D=o.JSON,T=D&&D.stringify,M=!1,O=d("_hidden"),C=r.isEnum,N=c("symbol-registry"),x=c("symbols"),F="function"==typeof E,U=Object.prototype,V=i&&l(function(){return 7!=b(_({},"a",{get:function(){return _(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=h(U,t);r&&delete U[t],_(e,t,n),r&&e!==U&&_(U,t,r)}:_,j=function(e){var t=x[e]=b(E.prototype);return t._k=e,i&&M&&V(U,e,{configurable:!0,set:function(t){a(this,O)&&a(this[O],e)&&(this[O][e]=!1),V(this,e,w(1,t))}}),t},R=function(e){return"symbol"==typeof e},I=function(e,t,n){return n&&a(x,t)?(n.enumerable?(a(e,O)&&e[O][t]&&(e[O][t]=!1),n=b(n,{enumerable:w(0,!1)})):(a(e,O)||_(e,O,w(1,{})),e[O][t]=!0),V(e,t,n)):_(e,t,n)},H=function(e,t){P(e);for(var n,r=g(t=y(t)),o=0,a=r.length;a>o;)I(e,n=r[o++],t[n]);return e},A=function(e,t){return void 0===t?b(e):H(b(e),t)},B=function(e){var t=C.call(this,e);return t||!a(this,e)||!a(x,e)||a(this,O)&&this[O][e]?t:!0},G=function(e,t){var n=h(e=y(e),t);return!n||!a(x,t)||a(e,O)&&e[O][t]||(n.enumerable=!0),n},L=function(e){for(var t,n=k(y(e)),r=[],o=0;n.length>o;)a(x,t=n[o++])||t==O||r.push(t);return r},W=function(e){for(var t,n=k(y(e)),r=[],o=0;n.length>o;)a(x,t=n[o++])&&r.push(x[t]);return r},J=function(e){if(void 0!==e&&!R(e)){for(var t,n,r=[e],o=1,a=arguments;a.length>o;)r.push(a[o++]);return t=r[1],"function"==typeof t&&(n=t),(n||!p(t))&&(t=function(e,t){return n&&(t=n.call(this,e,t)),R(t)?void 0:t}),r[1]=t,T.apply(D,r)}},K=l(function(){var e=E();return"[null]"!=T([e])||"{}"!=T({a:e})||"{}"!=T(Object(e))});F||(E=function(){if(R(this))throw TypeError("Symbol is not a constructor");return j(v(arguments.length>0?arguments[0]:void 0))},s(E.prototype,"toString",function(){return this._k}),R=function(e){return e instanceof E},r.create=A,r.isEnum=B,r.getDesc=G,r.setDesc=I,r.setDescs=H,r.getNames=m.get=L,r.getSymbols=W,i&&!n(35)&&s(U,"propertyIsEnumerable",B,!0));var Y={"for":function(e){return a(N,e+="")?N[e]:N[e]=E(e)},keyFor:function(e){return S(N,e)},useSetter:function(){M=!0},useSimple:function(){M=!1}};r.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(e){var t=d(e);Y[e]=F?t:j(t)}),M=!0,u(u.G+u.W,{Symbol:E}),u(u.S,"Symbol",Y),u(u.S+u.F*!F,"Object",{create:A,defineProperty:I,defineProperties:H,getOwnPropertyDescriptor:G,getOwnPropertyNames:L,getOwnPropertySymbols:W}),D&&u(u.S+u.F*(!F||K),"JSON",{stringify:J}),f(E,"Symbol"),f(Math,"Math",!0),f(o.JSON,"JSON",!0)},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){e.exports=!n(13)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t,n){var r=n(10),o=n(15),a=n(16),i="prototype",u=function(e,t,n){var s,l,c,f=e&u.F,v=e&u.G,d=e&u.S,S=e&u.P,m=e&u.B,g=e&u.W,p=v?o:o[t]||(o[t]={}),P=v?r:d?r[t]:(r[t]||{})[i];v&&(n=t);for(s in n)l=!f&&P&&s in P,l&&s in p||(c=l?P[s]:n[s],p[s]=v&&"function"!=typeof P[s]?n[s]:m&&l?a(c,r):g&&P[s]==c?function(e){var t=function(t){return this instanceof e?new e(t):e(t)};return t[i]=e[i],t}(c):S&&"function"==typeof c?a(Function.call,c):c,S&&((p[i]||(p[i]={}))[s]=c))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,e.exports=u},function(e,t){var n=e.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},function(e,t,n){var r=n(17);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){e.exports=n(19)},function(e,t,n){var r=n(6),o=n(20);e.exports=n(12)?function(e,t,n){return r.setDesc(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var r=n(10),o="__core-js_shared__",a=r[o]||(r[o]={});e.exports=function(e){return a[e]||(a[e]={})}},function(e,t,n){var r=n(6).setDesc,o=n(11),a=n(23)("toStringTag");e.exports=function(e,t,n){e&&!o(e=n?e:e.prototype,a)&&r(e,a,{configurable:!0,value:t})}},function(e,t,n){var r=n(21)("wks"),o=n(24),a=n(10).Symbol;e.exports=function(e){return r[e]||(r[e]=a&&a[e]||(a||o)("Symbol."+e))}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t,n){var r=n(6),o=n(26);e.exports=function(e,t){for(var n,a=o(e),i=r.getKeys(a),u=i.length,s=0;u>s;)if(a[n=i[s++]]===t)return n}},function(e,t,n){var r=n(27),o=n(29);e.exports=function(e){return r(o(e))}},function(e,t,n){var r=n(28);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var r=n(26),o=n(6).getNames,a={}.toString,i="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],u=function(e){try{return o(e)}catch(t){return i.slice()}};e.exports.get=function(e){return i&&"[object Window]"==a.call(e)?u(e):o(r(e))}},function(e,t,n){var r=n(6);e.exports=function(e){var t=r.getKeys(e),n=r.getSymbols;if(n)for(var o,a=n(e),i=r.isEnum,u=0;a.length>u;)i.call(e,o=a[u++])&&t.push(o);return t}},function(e,t,n){var r=n(28);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t,n){var r=n(34);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){e.exports=!0},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPPageTop=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(38),l=self.TweenLite,c=self.com.greensock.easing;t.SPPageTop=function(){function e(){(0,a["default"])(this,e),this._boundComplete=this.onComplete.bind(this),this._can=!0}return(0,u["default"])(e,[{key:"init",value:function(){var e=s.Dom.pageTop();null!==e&&e.addEventListener("click",this.onClick.bind(this),!1)}},{key:"onClick",value:function(e){if(e.preventDefault(),this._can){var t=this._boundComplete;this._can=!1,l.to(window,.5,{scrollTo:{y:0,autoKill:!1},ease:c.Power4.easeInOut,onComplete:t})}}},{key:"onComplete",value:function(){this._can=!0}}],[{key:"start",value:function(){var t=new e;t.init()}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Dom=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=(0,l["default"])(),f=self.UT,v=f.data.Safety;t.Dom=function(){function e(t){if((0,a["default"])(this,e),c!==t)throw new Error("Dom is static Class. not use new Dom().")}return(0,u["default"])(e,null,[{key:"get",value:function(e){var t=document.getElementById(e);return v.isElement(t)?t:(console.warn("element by "+e+" not found."),null)}},{key:"pageTop",value:function(){return e.get("pageTop")}},{key:"profile",value:function(){return e.get("user-profile-container")}},{key:"search",value:function(){return e.get("head-search-container")}},{key:"service",value:function(){return e.get("side-menu-service")}},{key:"serviceMenu",value:function(){return e.get("side-menu-container")}},{key:"serviceOpener",value:function(){return e.get("menu-opener")}},{key:"ranking",value:function(){return e.get("widget-ranking-container")}},{key:"video",value:function(){return e.get("widget-recommend-container")}},{key:"pickup",value:function(){return e.get("pickup-container")}},{key:"headline",value:function(){return e.get("headline-container")}},{key:"category",value:function(){return e.get("category-container")}},{key:"board",value:function(){return e.get("board-container")}},{key:"boardMore",value:function(){return e.get("board-container-more")}},{key:"related",value:function(){return e.get("single-related-container")}},{key:"singleFooter",value:function(){return e.get("single-footer-container")}},{key:"singleHeader",value:function(){return e.get("single-header-container")}},{key:"commentForm",value:function(){return e.get("comment-form-container")}},{key:"commentSelf",value:function(){return e.get("comment-self-container")}},{key:"commentOfficial",value:function(){return e.get("comment-official-container")}},{key:"commentNormal",value:function(){return e.get("comment-normal-container")}},{key:"signup",value:function(){return e.get("signup-container")}},{key:"login",value:function(){return e.get("login-form-container")}},{key:"logout",value:function(){return e.get("logout-form-container")}},{key:"password",value:function(){return e.get("reset_password-container")}},{key:"passwordResetting",value:function(){return e.get("reset_password-resetting-container")}},{key:"modal",value:function(){return e.get("modal-container")}},{key:"userProfile",value:function(){return e.get("mypage-profile-container")}},{key:"nav",value:function(){return e.get("global-nav-container")}},{key:"settings",value:function(){return e.get("setting-form-container")}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPNav=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.Sagen;t.SPNav=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPNav is static Class. not use new SPNav().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=arguments.length<=0||void 0===arguments[0]?"all":arguments[0],t=c.Dom.nav();null!==t&&null!==e&&"undefined"!=typeof e&&v.Dom.addClass(t,e)}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPSyn=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPSyn=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPSyn is static Class. not use new SPSyn().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.service(),t=c.Dom.serviceOpener(),n=c.Dom.serviceMenu(),r=new v.sp.view.SPViewSyn(e,t,n);r.start()}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPIndex=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(42),f=n(38),v=(0,l["default"])(),d=self.UT;t.SPIndex=function(){function e(t){if((0,a["default"])(this,e),v!==t)throw new Error("SPIndex is static Class. not use new SPIndex().")}return(0,u["default"])(e,null,[{key:"start",value:function(){c.SPHeader.start();var e=f.Dom.headline();if(null!==e){var t=new d.sp.view.home.SPViewHeadLine(e);t.start()}var n=f.Dom.board(),r=f.Dom.boardMore();if(null!==n&&null!==r){var o=new d.sp.view.home.SPViewNews(n,r);o.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPHeader=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPHeader=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPHeader is static Class. not use new SPHeader().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.profile();if(null!==e){var t=new v.sp.view.header.SPViewHeaderUser(e);t.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPCategory=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(42),f=n(38),v=(0,l["default"])(),d=self.UT;t.SPCategory=function(){function e(t){if((0,a["default"])(this,e),v!==t)throw new Error("SPCategory is static Class. not use new SPCategory().")}return(0,u["default"])(e,null,[{key:"start",value:function(e){arguments.length<=1||void 0===arguments[1]?"":arguments[1];c.SPHeader.start();var t=f.Dom.category();if(null!==t){var n=new d.sp.view.category.SPViewCategoryRoot(e,t);n.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPSingle=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(45),f=n(38),v=n(39),d=(0,l["default"])(),S=self.UT,m=0,g=null,p=null,P=null,y=null,w=0;t.SPSingle=function(){function e(t){if((0,a["default"])(this,e),d!==t)throw new Error("SPSingle is static Class. not use new SPSingle().")}return(0,u["default"])(e,null,[{key:"start",value:function(t){w=t;var n=f.Dom.profile(),r=void 0;null!==n&&(r=new S.sp.view.header.SPViewHeaderUser(n),S.app.User.sign?(y=r,r.on(S.view.View.BEFORE_RENDER,e.onHeader)):++m,r.start());var o={related:f.Dom.related(),footer:f.Dom.singleFooter()},a=f.Dom.singleHeader();if(null!==a&&null!==o.footer){var i=new S.view.ViewSingle(t,a,o);P=i,i.on(S.view.View.BEFORE_RENDER,e.before),i.start()}else e.comment()}},{key:"onHeader",value:function(t){y.off(S.view.View.BEFORE_RENDER,e.onHeader),p=t.args[0],e.comment()}},{key:"before",value:function(t){P.off(S.view.View.BEFORE_RENDER,e.before);var n=t.args[0];g=n;var r=n.category.slug;c.SPSidebar.start(r),v.SPNav.start(r),e.comment()}},{key:"comment",value:function(){if(++m,2===m){var e="";null!==p&&"undefined"!=typeof p.profilePicture&&(e=p.profilePicture);var t=w,n=S.view.ViewComments,r=f.Dom.commentForm();if(null!==r){var o=new S.view.comment.ViewCommentForm(r,t,e);o.start()}var a=f.Dom.commentSelf();if(null!==a){var i=new n(t,a,S.app["const"].CommentsType.SELF);null!==p&&(i.user=p),i.start()}var u=f.Dom.commentOfficial();if(null!==u){var s=new n(t,u,S.app["const"].CommentsType.OFFICIAL);null!==p&&(s.user=p),s.start()}var l=f.Dom.commentNormal();if(null!==l){var c=new n(t,l,S.app["const"].CommentsType.NORMAL);null!==p&&(c.user=p),c.start()}}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPSidebar=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPSidebar=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPSidebar is static Class. not use new SPSidebar().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=arguments.length<=0||void 0===arguments[0]?"all":arguments[0],t=c.Dom.ranking();if(null!==t){var n=new v.view.sidebar.ViewRanking(t,null,e);n.start()}var r=c.Dom.video();if(null!==r){var o=new v.view.sidebar.ViewVideos(r,null,e);o.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPSearch=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(42),f=n(45),v=n(38),d=(0,l["default"])(),S=self.UT;t.SPSearch=function(){function e(t){if((0,a["default"])(this,e),d!==t)throw new Error("SPSearch is static Class. not use new SPSearch().")}return(0,u["default"])(e,null,[{key:"start",value:function(e){c.SPHeader.start();var t=v.Dom.board(),n=v.Dom.boardMore();if(null!==t&&null!==n){var r=new S.view.ViewSearch(e,t,n);r.start()}f.SPSidebar.start()}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPSignup=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPSignup=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPSignup is static Class. not use new SPSignup().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.signup();if(null!==e){var t=new v.view.signup.SignupWizard(e);t.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPUserProfile=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPUserProfile=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPUserProfile is static Class. not use new SPUserProfile().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.userProfile();if(null!==e){var t=new v.view.mypage.ViewUserProfile(e);t.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPBookmarks=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPBookmarks=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPBookmarks is static Class. not use new SPBookmarks().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.board(),t=c.Dom.boardMore();if(null!==e&&null!==t){var n=new v.view.mypage.ViewBookmarks(e,t);n.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPActivities=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPActivities=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPActivities is static Class. not use new SPActivities().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.board(),t=c.Dom.boardMore();if(null!==e&&null!==t){var n=new v.view.mypage.ViewActivities(e,t);n.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPNotifications=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPNotifications=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPNotifications is static Class. not use new SPNotifications().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.board(),t=c.Dom.boardMore();if(null!==e&&null!==t){var n=new v.view.mypage.ViewNotifications(e,t);n.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPSettings=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPSettings=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPSettings is static Class. not use new SPSettings().")}return(0,u["default"])(e,null,[{key:"account",value:function(){var e=c.Dom.settings();if(null!==e){var t=new v.view.settings.ViewSettingsIndex(e);t.start()}}},{key:"interest",value:function(){var e=c.Dom.settings();if(null!==e){var t=new v.view.settings.ViewSettingsInterest(e);t.start()}}},{key:"deactivate",value:function(){var e=c.Dom.settings(),t=c.Dom.modal();if(null!==e&&null!==t){var n=new v.view.signup.ViewDeactivate(e,t);n.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPComment=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(45),f=n(38),v=n(39),d=(0,l["default"])(),S=self.UT;t.SPComment=function(){function e(t){if((0,a["default"])(this,e),d!==t)throw new Error("SPComment is static Class. not use new SPComment().")}return(0,u["default"])(e,null,[{key:"user",value:function(t,n,r){var o=arguments.length<=3||void 0===arguments[3]?0:arguments[3],a=f.Dom.profile(),i=void 0,u=void 0,s=function v(a){switch(i.off(S.view.View.BEFORE_RENDER,v),u=a.args[0],t){case"reply":e.reply(u,n,r,o);break;case"comment":default:e.comment(u,n,r)}};if(null!==a){if(i=new S.view.header.ViewHeaderUser(a),S.app.User.sign)i.on(S.view.View.BEFORE_RENDER,s);else switch(t){case"reply":e.reply(null,n,r,o);break;case"comment":default:e.comment(null,n,r)}i.start();var l=f.Dom.modal();if(null!==l){var c=new S.view.modal.ViewLogoutModal(l);c.start()}}Comment.single(n)}},{key:"comment",value:function(e,t,n){var r=f.Dom.commentNormal();if(null!==r){var o=new S.view.ViewCommentSingle(t,n,r);o.user=e,o.start()}}},{key:"reply",value:function(e,t,n,r){var o=f.Dom.commentNormal();if(null!==o){var a=new S.view.ViewCommentSingle(t,n,o,r);a.user=e,a.start()}}},{key:"single",value:function(e){var t=f.Dom.singleHeader(),n=void 0,r=function o(e){n.off(S.view.View.BEFORE_RENDER,o);var t=e.args[0],r=t.category.slug;c.SPSidebar.start(r),v.SPNav.start(r)};null!==t&&(n=new S.view.single.ViewSingleTitle(e,t),n.on(S.view.View.BEFORE_RENDER,r),n.start())}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPSearchFrom=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPSearchFrom=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPSearchFrom is static Class. not use new SPSearchFrom().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.search();if(null!==e){var t=new v.view.header.ViewHeaderSearch(e);t.start()}}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SPCommentDelete=void 0;var o=n(2),a=r(o),i=n(3),u=r(i),s=n(7),l=r(s),c=n(38),f=(0,l["default"])(),v=self.UT;t.SPCommentDelete=function(){function e(t){if((0,a["default"])(this,e),f!==t)throw new Error("SPCommentDelete is static Class. not use new SPCommentDelete().")}return(0,u["default"])(e,null,[{key:"start",value:function(){var e=c.Dom.modal();if(null!==e){var t=new v.view.modal.ViewDeleteModal(e);t.start()}}}]),e}()}]);