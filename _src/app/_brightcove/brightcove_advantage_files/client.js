(function(){var k,l=this,n=function(a){return void 0!==a},aa=function(){},q=function(a){var c=typeof a;if("object"==c)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return c;var b=Object.prototype.toString.call(a);if("[object Window]"==b)return"object";if("[object Array]"==b||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==b||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==c&&"undefined"==typeof a.call)return"object";return c},r=function(a){return"string"==typeof a},t=function(a){return"function"==q(a)},ba=function(a,c,b){return a.call.apply(a.bind,arguments)},ca=function(a,c,b){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(b,d);return a.apply(c,b)}}return function(){return a.apply(c,
arguments)}},u=function(a,c,b){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ba:ca;return u.apply(null,arguments)},v=Date.now||function(){return+new Date},x=function(a,c){var b,d=c,e=a.split(".");b=b||l;e[0]in b||!b.execScript||b.execScript("var "+e[0]);for(var f;e.length&&(f=e.shift());)!e.length&&n(d)?b[f]=d:b=b[f]?b[f]:b[f]={}},y=function(a,c){function b(){}b.prototype=c.prototype;a.Ha=c.prototype;a.prototype=new b;a.Ka=function(a,b,f){for(var g=Array(arguments.length-
2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return c.prototype[b].apply(a,g)}};var da="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),ea=function(a,c){for(var b,d,e=1;e<arguments.length;e++){d=arguments[e];for(b in d)a[b]=d[b];for(var f=0;f<da.length;f++)b=da[f],Object.prototype.hasOwnProperty.call(d,b)&&(a[b]=d[b])}};var fa={m:!0,c:!0,s:!0,t:!0};var ga=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ha=function(a,c){return a<c?-1:a>c?1:0};var ia=Array.prototype.indexOf?function(a,c,b){return Array.prototype.indexOf.call(a,c,b)}:function(a,c,b){b=null==b?0:0>b?Math.max(0,a.length+b):b;if(r(a))return r(c)&&1==c.length?a.indexOf(c,b):-1;for(;b<a.length;b++)if(b in a&&a[b]===c)return b;return-1};var z;a:{var ja=l.navigator;if(ja){var ka=ja.userAgent;if(ka){z=ka;break a}}z=""}var A=function(a){var c=z;return-1!=c.indexOf(a)},la=function(){var a="WebKit",c=z;return-1!=c.toLowerCase().indexOf(a.toLowerCase())};var ma=function(a,c){this.x=n(a)?a:0;this.y=n(c)?c:0};ma.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};var na=A("Opera"),B=A("Trident")||A("MSIE"),oa=A("Edge"),C=A("Gecko")&&!(la()&&!A("Edge"))&&!(A("Trident")||A("MSIE"))&&!A("Edge"),D=la()&&!A("Edge"),pa=function(){var a=z;if(C)return/rv\:([^\);]+)(\)|;)/.exec(a);if(oa)return/Edge\/([\d\.]+)/.exec(a);if(B)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(D)return/WebKit\/(\S+)/.exec(a);if(na)return/(?:Version)[ \/]?(\S+)/.exec(a)},qa=function(){var a=l.document;return a?a.documentMode:void 0},ra;
a:{var sa="",ta=pa();ta&&(sa=ta?ta[1]:"");if(B){var ua=qa();if(null!=ua&&ua>parseFloat(sa)){ra=String(ua);break a}}ra=sa}
var va=ra,wa={},E=function(a){var c;if(!(c=wa[a])){var b=a;c=va;var d=0;c=ga(String(c)).split(".");for(var b=ga(String(b)).split("."),e=Math.max(c.length,b.length),f=0;0==d&&f<e;f++){var g=c[f]||"",h=b[f]||"",m=RegExp("(\\d*)(\\D*)","g"),p=RegExp("(\\d*)(\\D*)","g");do{var w=m.exec(g)||["","",""],N=p.exec(h)||["","",""];if(0==w[0].length&&0==N[0].length)break;var d=0==w[1].length?0:parseInt(w[1],10),Fb=0==N[1].length?0:parseInt(N[1],10),d=ha(d,Fb)||ha(0==w[2].length,0==N[2].length)||ha(w[2],N[2])}while(0==
d)}c=d;c=wa[a]=0<=c}return c},ya=function(){var a=9;return Number(xa)>=a},za,Aa=l.document,Ba=qa(),xa=za=Aa&&B?Ba||("CSS1Compat"==Aa.compatMode?parseInt(va,10):5):void 0;!C&&!B||B&&ya()||C&&E("1.9.1");B&&E("9");var F=function(a){return a?a.parentWindow||a.defaultView:window};var Ca=function(){var a=F().top;try{return!!a.location.href||""===a.location.href}catch(c){return!1}};var Da=[],Ea=!1,Fa=function(a){if(Ea)for(var c=0;c<Da.length;c++)a(u(Da[c].Sa,Da[c]))};var Ga=function(a){Ga[" "](a);return a};Ga[" "]=aa;var Ha=!B||ya(),Ia=B&&!E("9");!D||E("528");C&&E("1.9b")||B&&E("8")||na&&E("9.5")||D&&E("528");C&&!E("8")||B&&E("9");var Ja=function(){this.ea=this.ea;this.Aa=this.Aa};Ja.prototype.ea=!1;var G=function(a,c){this.type=a;this.currentTarget=this.target=c;this.defaultPrevented=this.v=!1;this.ma=!0};G.prototype.preventDefault=function(){this.defaultPrevented=!0;this.ma=!1};var H=function(a,c){G.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.Y=this.state=null;if(a){var b=a,d=c,e=this.type=b.type,f=b.changedTouches?b.changedTouches[0]:null;this.target=b.target||b.srcElement;this.currentTarget=d;if(d=b.relatedTarget){if(C){var g;a:{var h="nodeName";try{Ga(d[h]);
g=!0;break a}catch(m){}g=!1}g||(d=null)}}else"mouseover"==e?d=b.fromElement:"mouseout"==e&&(d=b.toElement);this.relatedTarget=d;null===f?(this.offsetX=D||void 0!==b.offsetX?b.offsetX:b.layerX,this.offsetY=D||void 0!==b.offsetY?b.offsetY:b.layerY,this.clientX=void 0!==b.clientX?b.clientX:b.pageX,this.clientY=void 0!==b.clientY?b.clientY:b.pageY,this.screenX=b.screenX||0,this.screenY=b.screenY||0):(this.clientX=void 0!==f.clientX?f.clientX:f.pageX,this.clientY=void 0!==f.clientY?f.clientY:f.pageY,this.screenX=
f.screenX||0,this.screenY=f.screenY||0);this.button=b.button;this.keyCode=b.keyCode||0;this.charCode=b.charCode||("keypress"==e?b.keyCode:0);this.ctrlKey=b.ctrlKey;this.altKey=b.altKey;this.shiftKey=b.shiftKey;this.metaKey=b.metaKey;this.state=b.state;this.Y=b;b.defaultPrevented&&this.preventDefault()}};y(H,G);
H.prototype.preventDefault=function(){H.Ha.preventDefault.call(this);var a=this.Y;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ia)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(c){}};var I="closure_listenable_"+(1E6*Math.random()|0),Ka=0;var La=function(a,c,b,d,e){var f=null;this.listener=a;this.N=f;this.src=c;this.type=b;this.F=!!d;this.H=e;this.key=++Ka;this.w=this.D=!1},Ma=function(a){a.w=!0;a.listener=null;a.N=null;a.src=null;a.H=null};var J=function(a){this.src=a;this.b={};this.U=0};J.prototype.add=function(a,c,b,d,e){var f=a.toString();a=this.b[f];a||(a=this.b[f]=[],this.U++);var g=Na(a,c,d,e);-1<g?(c=a[g],b||(c.D=!1)):(c=new La(c,this.src,f,!!d,e),c.D=b,a.push(c));return c};J.prototype.remove=function(a,c,b,d){a=a.toString();if(!(a in this.b))return!1;var e=this.b[a];c=Na(e,c,b,d);return-1<c?(b=e[c],Ma(b),b=e,Array.prototype.splice.call(b,c,1),0==e.length&&(delete this.b[a],this.U--),!0):!1};
var Oa=function(a,c){var b=c.type;if(b in a.b){var d,e=a.b[b],f=ia(e,c);(d=0<=f)&&Array.prototype.splice.call(e,f,1);d&&(Ma(c),0==a.b[b].length&&(delete a.b[b],a.U--))}};J.prototype.aa=function(a,c,b,d){a=this.b[a.toString()];var e=-1;a&&(e=Na(a,c,b,d));return-1<e?a[e]:null};var Na=function(a,c,b,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.w&&f.listener==c&&f.F==!!b&&f.H==d)return e}return-1};var Pa="closure_lm_"+(1E6*Math.random()|0),Qa={},Ra=0,K=function(a,c,b,d,e){if("array"==q(c))for(var f=0;f<c.length;f++)K(a,c[f],b,d,e);else b=Sa(b),a&&a[I]?a.h.add(String(c),b,!1,d,e):Ta(a,c,b,!1,d,e)},Ta=function(a,c,b,d,e,f){if(!c)throw Error("Invalid event type");var g=!!e,h=L(a);h||(a[Pa]=h=new J(a));b=h.add(c,b,d,e,f);if(!b.N){d=Ua();b.N=d;d.src=a;d.listener=b;if(a.addEventListener)a.addEventListener(c.toString(),d,g);else if(a.attachEvent)a.attachEvent(Va(c.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
Ra++}},Ua=function(){var a=Wa,c=Ha?function(b){return a.call(c.src,c.listener,b)}:function(b){b=a.call(c.src,c.listener,b);if(!b)return b};return c},Xa=function(a,c,b,d,e){if("array"==q(c))for(var f=0;f<c.length;f++)Xa(a,c[f],b,d,e);else b=Sa(b),a&&a[I]?a.h.add(String(c),b,!0,d,e):Ta(a,c,b,!0,d,e)},Ya=function(a,c,b,d,e){if("array"==q(c))for(var f=0;f<c.length;f++)Ya(a,c[f],b,d,e);else b=Sa(b),a&&a[I]?a.h.remove(String(c),b,d,e):a&&(d=!!d,(a=L(a))&&(c=a.aa(c,b,d,e))&&Za(c))},Za=function(a){if("number"!=
typeof a&&a&&!a.w){var c=a.src;if(c&&c[I])Oa(c.h,a);else{var b=a.type,d=a.N;c.removeEventListener?c.removeEventListener(b,d,a.F):c.detachEvent&&c.detachEvent(Va(b),d);Ra--;(b=L(c))?(Oa(b,a),0==b.U&&(b.src=null,c[Pa]=null)):Ma(a)}}},Va=function(a){return a in Qa?Qa[a]:Qa[a]="on"+a},ab=function(a,c,b,d){var e=!0;if(a=L(a))if(c=a.b[c.toString()])for(c=c.concat(),a=0;a<c.length;a++){var f=c[a];f&&f.F==b&&!f.w&&(f=$a(f,d),e=e&&!1!==f)}return e},$a=function(a,c){var b=a.listener,d=a.H||a.src;a.D&&Za(a);
return b.call(d,c)},Wa=function(a,c){if(a.w)return!0;if(!Ha){var b;if(!(b=c))a:{var d;b="window.event";b=b.split(".");d=d||l;for(var e;e=b.shift();)if(null!=d[e])d=d[e];else{b=null;break a}b=d}e=b;d=new H(e,this);b=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(m){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=d.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,g=e.length-1;!d.v&&0<=g;g--){d.currentTarget=e[g];var h=ab(e[g],
f,!0,d);b=b&&h}for(g=0;!d.v&&g<e.length;g++)d.currentTarget=e[g],h=ab(e[g],f,!1,d),b=b&&h}return b}return $a(a,new H(c,this))},L=function(a){a=a[Pa];return a instanceof J?a:null},bb="__closure_events_fn_"+(1E9*Math.random()>>>0),Sa=function(a){if(t(a))return a;a[bb]||(a[bb]=function(c){return a.handleEvent(c)});return a[bb]};Fa(function(a){Wa=a(Wa)});var M=function(){return Math.round(v()/1E3)},cb=function(a){return window.performance&&window.performance.timing&&window.performance.timing.domLoading&&0<window.performance.timing[a]?Math.round(window.performance.timing[a]/1E3):null},db=function(){return{domLoading:cb("domLoading"),domComplete:cb("domComplete"),unloadEventStart:cb("unloadEventStart")}};window.console&&"function"===typeof window.console.log&&u(window.console.log,window.console);var eb=function(a){if(/^\s*$/.test(a))return!1;var c=/\\["\\\/bfnrtu]/g,b=/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,d=/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,e=/^[\],:{}\s\u2028\u2029]*$/;return e.test(a.replace(c,"@").replace(b,"]").replace(d,""))},fb=function(a){a=String(a);if(eb(a))try{return eval("("+a+")")}catch(c){}throw Error("Invalid JSON string: "+a);},gb=function(a){this.O=a};
gb.prototype.C=function(a){var c=[];hb(this,a,c);return c.join("")};
var hb=function(a,c,b){if(null==c)b.push("null");else{if("object"==typeof c){if("array"==q(c)){var d=a;a=c;c=a.length;b.push("[");for(var e="",f=0;f<c;f++)b.push(e),e=a[f],hb(d,d.O?d.O.call(a,String(f),e):e,b),e=",";b.push("]");return}if(c instanceof String||c instanceof Number||c instanceof Boolean)c=c.valueOf();else{b.push("{");f="";for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&(e=c[d],"function"!=typeof e&&(b.push(f),ib(d,b),b.push(":"),hb(a,a.O?a.O.call(c,d,e):e,b),f=","));b.push("}");
return}}switch(typeof c){case "string":ib(c,b);break;case "number":b.push(isFinite(c)&&!isNaN(c)?String(c):"null");break;case "boolean":b.push(String(c));break;case "function":b.push("null");break;default:throw Error("Unknown type: "+typeof c);}}},jb={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},kb=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,ib=function(a,c){c.push('"',a.replace(kb,function(a){var c=
jb[a];c||(c="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),jb[a]=c);return c}),'"')};var lb=function(){var a;if(!a)return this;var c=a.Ma(),b=a.Na(),d=a.ha(),e=a.ga();a=a.$();c&&(this.er=c.C());b&&(this.vi=b.C());null!=d&&(this.tagstamp=d);null!=e&&(this.playstamp=e);null!=a&&(this.lactstamp=a);return this};var mb=null,nb=function(){var a="google_video_inner_static_iframe",c=document;if(c.body){var b;try{b=c.createElement('<iframe name="'+a+'" id="'+a+'" src="about:blank" style="height: 0px; width: 0px; display:none">'),c.body.appendChild(b)}catch(d){b=c.createElement("iframe"),b.setAttribute("name",a),b.setAttribute("id",a),b.setAttribute("src","about:blank"),b.setAttribute("style","height: 0px; width: 0px; display:none"),c.body.appendChild(b)}}else c.write("<iframe frameBorder='0' src='about:blank' id='"+
a+"' name='"+a+"' style='height:0px;width:0px;display:none'></iframe>")},ob=function(a){a=a.Y;if(F().top==a.source){var c;a:{a=a.data;var b="data";try{if(0==a.lastIndexOf(b,0)){var d=a.substring(b.length),e=new lb;0<d.length&&ea(e,fb(d));c=e;break a}}catch(f){}c=null}null!=c&&(mb=c)}},pb=function(){if(!Ca()){var a=F().frames;(a=a.length&&a.google_video_inner_static_iframe)||nb();K(F(),"message",ob);x("ima.video.client.getLastSnapshotFromTop",function(){return mb});F().top.postMessage&&F().top.postMessage("get",
"*")}};var O=function(){Ja.call(this);this.h=new J(this);this.oa=this;this.la=null};y(O,Ja);var qb=O;qb.prototype[I]=!0;O.prototype.addEventListener=function(a,c,b,d){K(this,a,c,b,d)};O.prototype.removeEventListener=function(a,c,b,d){Ya(this,a,c,b,d)};
O.prototype.dispatchEvent=function(a){var c,b=this.la;if(b){c=[];for(var d=1;b;b=b.la)c.push(b),++d}b=this.oa;d=a.type||a;if(r(a))a=new G(a,b);else if(a instanceof G)a.target=a.target||b;else{var e=a;a=new G(d,b);ea(a,e)}var e=!0,f;if(c)for(var g=c.length-1;!a.v&&0<=g;g--)f=a.currentTarget=c[g],e=P(f,d,!0,a)&&e;a.v||(f=a.currentTarget=b,e=P(f,d,!0,a)&&e,a.v||(e=P(f,d,!1,a)&&e));if(c)for(g=0;!a.v&&g<c.length;g++)f=a.currentTarget=c[g],e=P(f,d,!1,a)&&e;return b=e};
var P=function(a,c,b,d){c=a.h.b[String(c)];if(!c)return!0;c=c.concat();for(var e=!0,f=0;f<c.length;++f){var g=c[f];if(g&&!g.w&&g.F==b){var h=g.listener,m=g.H||g.src;g.D&&Oa(a.h,g);e=!1!==h.call(m,d)&&e}}return e&&0!=d.ma};O.prototype.aa=function(a,c,b,d){return this.h.aa(String(a),c,b,d)};var Q=function(a,c,b){this.ya=b;this.sa=a;this.Ga=c;this.L=0;this.I=null};Q.prototype.get=function(){var a;0<this.L?(this.L--,a=this.I,this.I=a.next,a.next=null):a=this.sa();return a};Q.prototype.put=function(a){this.Ga(a);this.L<this.ya&&(this.L++,a.next=this.I,this.I=a)};var rb=function(a){return a};var sb=function(a){l.setTimeout(function(){throw a;},0)},tb,ub=function(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!A("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
a=u(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!A("Trident")&&!A("MSIE")){var c=new a,b={},d=b;c.port1.onmessage=function(){if(n(b.next)){b=b.next;var a=b.da;b.da=null;a()}};return function(a){d.next={da:a};d=d.next;c.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}},vb=rb;Fa(function(a){vb=a});var wb=function(){this.V=this.B=null},yb=new Q(function(){return new xb},function(a){a.reset()},100);wb.prototype.add=function(a,c){var b=yb.get();b.set(a,c);this.V?this.V.next=b:this.B=b;this.V=b};wb.prototype.remove=function(){var a=null;this.B&&(a=this.B,this.B=this.B.next,this.B||(this.V=null),a.next=null);return a};var xb=function(){this.next=this.scope=this.Z=null};xb.prototype.set=function(a,c){this.Z=a;this.scope=c;this.next=null};
xb.prototype.reset=function(){this.next=this.scope=this.Z=null};var Cb=function(a,c){R||zb();Ab||(R(),Ab=!0);Bb.add(a,c)},R,zb=function(){if(l.Promise&&l.Promise.resolve){var a=l.Promise.resolve(void 0);R=function(){a.then(Db)}}else R=function(){var a,b,d=Db,e=d;a&&(e=u(d,a));e=vb(e);!t(l.setImmediate)||!b&&l.Window&&l.Window.prototype&&!A("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(tb||(tb=ub()),tb(e)):l.setImmediate(e)}},Ab=!1,Bb=new wb,Db=function(){for(var a=null;a=Bb.remove();){try{a.Z.call(a.scope)}catch(c){sb(c)}yb.put(a)}Ab=!1};var Eb=function(){this.next=this.context=this.ka=this.ja=this.ra=null;this.pa=!1};Eb.prototype.reset=function(){this.context=this.ka=this.ja=this.ra=null;this.pa=!1};
var Gb=new Q(function(){return new Eb},function(a){a.reset()},100),Hb=function(a,c,b){var d=Gb.get();d.ja=a;d.ka=c;d.context=b;return d},Jb=function(a,c){a.qa||2!=a.P&&3!=a.P||Ib(a);var b=a,d=c;b.ca?b.ca.next=d:b.qa=d;b.ca=d},Mb=function(a,c,b){if(0==a.P){a==b&&(c=3,b=new TypeError("Promise cannot resolve to itself"));a.P=1;var d;a:{var e=b,f=a.Qa,g=a.Ra,h=a,m;if(e)try{m=!!e.$goog_Thenable}catch(w){m=!1}else m=!1;if(m)e.then(f,g,h),d=!0;else{m=typeof e;if(m="object"==m&&null!=e||"function"==m)try{var p=
e.then;if(t(p)){Kb(e,p,f,g,h);d=!0;break a}}catch(w){g.call(h,w);d=!0;break a}d=!1}}d||(a.Pa=b,a.P=c,a.Oa=null,Ib(a),3!=c||Lb(a,b))}},Kb=function(a,c,b,d,e){var f=!1,g=function(a){f||(f=!0,b.call(e,a))},h=function(a){f||(f=!0,d.call(e,a))};try{c.call(a,g,h)}catch(m){h(m)}},Ib=function(a){a.ta||(a.ta=!0,Cb(a.La,a))},Lb=function(a,c){a.xa=!0;Cb(function(){a.xa&&Nb.call(null,c)})},Nb=sb;var S=function(a,c){O.call(this);this.J=a||1;this.S=c||l;this.W=u(this.Ia,this);this.ba=v()};y(S,O);S.prototype.enabled=!1;S.prototype.l=null;S.prototype.Ia=function(){if(this.enabled){var a=v()-this.ba;0<a&&a<.8*this.J?this.l=this.S.setTimeout(this.W,this.J-a):(this.l&&(this.S.clearTimeout(this.l),this.l=null),this.dispatchEvent("tick"),this.enabled&&(this.l=this.S.setTimeout(this.W,this.J),this.ba=v()))}};
S.prototype.start=function(){this.enabled=!0;this.l||(this.l=this.S.setTimeout(this.W,this.J),this.ba=v())};var Pb=function(a,c,b){this.g=b;this.K=null;this.G=0;this.za=500;this.R=null;Ob(this,a,c);b=document.documentElement;var d;try{if(Ca()){var e;c=[];var f=F(b.ownerDocument);for(b=f;b!=f.top;b=b.parent)if(b.frameElement)c.push(b.frameElement);else break;d=(e=c)&&0!=e.length?"1":"0"}else d="2"}catch(h){d="2"}try{if("1"==d){for(var g=a.parent;g!=a.top;g=g.parent)Ob(this,g,g.document);Ob(this,a.top,a.top.document)}}catch(h){}},Ob=function(a,c,b){K(b,"mousedown",u(a.Ba,a));K(c,"scroll",u(a.Ea,a));K(b,"touchstart",
u(a.Fa,a));K(b,"mousemove",u(a.Da,a))};k=Pb.prototype;k.Fa=function(){this.g&&this.g("t")};k.Ba=function(){this.g&&this.g("c")};k.Ea=function(){this.g&&this.g("s")};
k.Da=function(a){a=new ma(a.clientX,a.clientY);if(this.K){var c,b=this.K;c=b.x-a.x;b=b.y-a.y;c=Math.sqrt(c*c+b*b);this.G+=Math.round(c)}this.K=a;this.R&&l.clearTimeout(this.R);a=this.Ca;c=this.za;if(t(a))this&&(a=u(a,this));else if(a&&"function"==typeof a.handleEvent)a=u(a.handleEvent,a);else throw Error("Invalid listener argument");this.R=a=2147483647<Number(c)?-1:l.setTimeout(a,c||0)};k.Ca=function(){this.g&&this.g("m",this.G);this.K=this.R=null;this.G=0};var Qb=0,Rb=-1,Sb=function(a,c){var b;b="number"==typeof c?c:1;var d=null!==fa&&a in fa,e="m"==a,f=e&&100<=b;(b=d&&(f||!e)&&0<b)&&(Rb=M())},Tb=function(){Qb=M();new Pb(F(),document,Sb)},Ub=function(a,c){a&&(M=a);c&&(db=c)};var T=function(a,c){this.A=Qb;this.j=a;this.i=Math.max(Rb,c,a)};k=T.prototype;k.ha=function(){return this.A};k.ga=function(){return this.j};k.$=function(){return this.i};k.ua=function(a,c,b){a&&(this.A=Math.min(this.A,a));this.j=Math.max(this.j,c);this.i=Math.max(this.i,b)};k.C=function(){var a=[];null!=this.A&&a.push("tt"+(M()-this.A));null!=this.j&&a.push("pd"+(M()-this.j));null!=this.i&&-1<this.i?a.push("la"+1E3*(M()-this.i)):a.push("la-1");return a.join("_")};k.ia=function(){return M()-this.A};
k.wa=function(){return null!=this.j?M()-this.j:this.ia()};k.va=function(){return{}};T.prototype.getTagLoadTimestamp=T.prototype.ha;T.prototype.getPlaylistTimestamp=T.prototype.ga;T.prototype.getLastActivityTimestamp=T.prototype.$;T.prototype.extendWithDataFromTopIframe=T.prototype.ua;T.prototype.serialize=T.prototype.C;T.prototype.getTimeSinceTagLoadSeconds=T.prototype.ia;T.prototype.getPlaylistTimeDiff=T.prototype.wa;T.prototype.getBuckets=T.prototype.va;var Vb=A("Safari")&&!((A("Chrome")||A("CriOS"))&&!A("Edge")||A("Coast")||A("Opera")||A("Edge")||A("Silk")||A("Android"))&&!(A("iPhone")&&!A("iPod")&&!A("iPad")||A("iPad")||A("iPod"));var U=null,V=null,Wb=null,Xb=C||D&&!Vb||na,Yb=Xb||"function"==typeof l.btoa,Zb=Xb||!Vb&&!B&&"function"==typeof l.atob,ac=function(a,c){$b();for(var b=c?Wb:U,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,h=g?a[e+1]:0,m=e+2<a.length,p=m?a[e+2]:0,w=f>>2,f=(f&3)<<4|h>>4,h=(h&15)<<2|p>>6,p=p&63;m||(p=64,g||(h=64));d.push(b[w],b[f],b[h],b[p])}return d.join("")},cc=function(a){var c=!0;function b(a){d+=String.fromCharCode(a)}if(Zb&&!c)return l.atob(a);var d="";bc(a,b);return d},bc=function(a,c){function b(b){for(;d<
a.length;){var c=a.charAt(d++),e=V[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}$b();for(var d=0;;){var e=b(-1),f=b(0),g=b(64),h=b(64);if(64===h&&-1===e)break;e=e<<2|f>>4;c(e);64!=g&&(f=f<<4&240|g>>2,c(f),64!=h&&(g=g<<6&192|h,c(g)))}},$b=function(){if(!U){U={};V={};Wb={};for(var a=0;65>a;a++)U[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),V[U[a]]=a,Wb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),
62<=a&&(V["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var dc=function(){this.f=-1};var W=function(){this.f=-1;this.f=64;this.a=[];this.X=[];this.na=[];this.M=[];this.M[0]=128;for(var a=1;a<this.f;++a)this.M[a]=0;this.T=this.o=0;this.reset()};y(W,dc);W.prototype.reset=function(){this.a[0]=1732584193;this.a[1]=4023233417;this.a[2]=2562383102;this.a[3]=271733878;this.a[4]=3285377520;this.T=this.o=0};
var ec=function(a,c,b){b||(b=0);var d=a.na;if(r(c))for(var e=0;16>e;e++)d[e]=c.charCodeAt(b)<<24|c.charCodeAt(b+1)<<16|c.charCodeAt(b+2)<<8|c.charCodeAt(b+3),b+=4;else for(e=0;16>e;e++)d[e]=c[b]<<24|c[b+1]<<16|c[b+2]<<8|c[b+3],b+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}c=a.a[0];b=a.a[1];for(var g=a.a[2],h=a.a[3],m=a.a[4],p,e=0;80>e;e++)40>e?20>e?(f=h^b&(g^h),p=1518500249):(f=b^g^h,p=1859775393):60>e?(f=b&g|h&(b|g),p=2400959708):(f=b^g^h,p=3395469782),
f=(c<<5|c>>>27)+f+m+p+d[e]&4294967295,m=h,h=g,g=(b<<30|b>>>2)&4294967295,b=c,c=f;a.a[0]=a.a[0]+c&4294967295;a.a[1]=a.a[1]+b&4294967295;a.a[2]=a.a[2]+g&4294967295;a.a[3]=a.a[3]+h&4294967295;a.a[4]=a.a[4]+m&4294967295};
W.prototype.update=function(a,c){if(null!=a){n(c)||(c=a.length);for(var b=c-this.f,d=0,e=this.X,f=this.o;d<c;){if(0==f)for(;d<=b;)ec(this,a,d),d+=this.f;if(r(a))for(;d<c;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.f){ec(this,e);f=0;break}}else for(;d<c;)if(e[f]=a[d],++f,++d,f==this.f){ec(this,e);f=0;break}}this.o=f;this.T+=c}};
W.prototype.digest=function(){var a=[],c=8*this.T;56>this.o?this.update(this.M,56-this.o):this.update(this.M,this.f-(this.o-56));for(var b=this.f-1;56<=b;b--)this.X[b]=c&255,c/=256;ec(this,this.X);for(b=c=0;5>b;b++)for(var d=24;0<=d;d-=8)a[c]=this.a[b]>>d&255,++c;return a};var X=function(a){this.fa=a||{cookie:""}},fc=/\s*;\s*/;X.prototype.isEnabled=function(){return navigator.cookieEnabled};X.prototype.set=function(a,c,b,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(c))throw Error('Invalid cookie value "'+c+'"');n(b)||(b=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";0>b?b="":(b=0==b?new Date(1970,1,1):new Date(v()+1E3*b),b=";expires="+b.toUTCString());this.fa.cookie=a+"="+c+e+d+b+f};
X.prototype.get=function(a,c){for(var b=a+"=",d=(this.fa.cookie||"").split(fc),e=0,f;f=d[e];e++){if(0==f.lastIndexOf(b,0))return f.substr(b.length);if(f==a)return""}return c};X.prototype.remove=function(a,c,b){var d=n(this.get(a));this.set(a,"",0,c,b);return d};var Y=new X("undefined"==typeof document?null:document);Y.Ja=3950;var gc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;var Z=null,hc=null,ic=function(a,c,b,d,e){this.u=c;this.tsl=a;this.nv=b;this.upt=d;this.lt=e},jc=function(a){a=a.split("#")[0];var c=new W;c.update(a);a=c.digest();return ac(a).slice(0,4)},lc=function(){var a=kc(),c;var b=kc();b&&b.tsl?(c=db().unloadEventStart,M(),b=b.tsl,c=c&&b>=c?!0:8>=hc-b):c=!1;a:{b=jc(document.URL);if(Z)for(var d=0;d<Z.length;d++)if(Z[d].u==b){b=!0;break a}b=!1}d=kc();d=!!d&&0<d.nv;(c=c&&!b&&!d)&&a&&a.upt?a=a.upt:(a=Qb,c=db().domLoading,a=null!=c?c:null!=a?a:M());return a},mc=
function(){var a=null;if(Y.isEnabled()&&n(Y.get("GED_PLAYLIST_ACTIVITY"))){var c=Y.get("GED_PLAYLIST_ACTIVITY");if(c)try{c=cc(c),a=fb(c)}catch(b){}}return a},kc=function(){if(Z)for(var a=jc(document.referrer),c=0;c<Z.length;c++)if(Z[c].u==a)return Z[c];return null},nc=function(){if(Y.isEnabled()){var a=lc(),c=new T(a,-1),b;b=c;b=5>M()-b.i;var c=c.$(),d=M(),e=jc(document.URL),a=new ic(d,e,b?1:0,a,c);b=mc();c=[];if(b){c=b.length;if(0<c){d=Array(c);for(e=0;e<c;e++)d[e]=b[e];b=d}else b=[];c=document.URL;
c=jc(c);d=M();for(e=0;e<b.length;e++)if(b[e].u==c||600<=d-b[e].tsl)b.splice(e,1),e--;c=b}a&&c.unshift(a);var c=c.slice(0,3),f,a=f=(new gb(f)).C(c);f=!0;if(Yb&&!f)f=l.btoa(a);else{b=[];for(d=c=0;d<a.length;d++){for(e=a.charCodeAt(d);255<e;)b[c++]=e&255,e>>=8;b[c++]=e}a=b;f=ac(a,f)}a=document.URL;b=1;a=a.match(gc)[b]||null;a="http"==a;Y.set("GED_PLAYLIST_ACTIVITY",f,-1,"/",null,!a)}};var oc=function(){function a(){try{nc()}catch(a){}}if(!(window.ima&&window.ima.video&&window.ima.video.client&&window.ima.video.client.tagged)){Tb();Xa(F(),"unload",a);try{hc||(hc=M(),Z=mc())}catch(b){}x("ima.video.client.getEData",function(){var a=lc(),c;a:{if(Z)for(c=0;c<Z.length;c++){var e;e=Z[c];if(e=null!==e&&"lt"in e){c=Z[c].lt;break a}}c=-1}return new T(a,c)});var c=new S(1E3);c.start();K(c,"tick",function(){try{nc()}catch(a){}});x("ima.video.client.setupEDHooks",Tb);x("ima.video.client.resetEDForTesting",
Ub);x("ima.video.client.tagged",!0)}};x("ima.video.client.jsTag",!0);pb();oc();})()
