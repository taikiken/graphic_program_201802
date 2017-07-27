var BCP = (function() {
/*! URI.js v1.18.10 http://medialize.github.io/URI.js/ */
/* build contains: URI.js */
/*
 URI.js - Mutating URLs

 Version: 1.18.10

 Author: Rodney Rehm
 Web: http://medialize.github.io/URI.js/

 Licensed under
   MIT License http://www.opensource.org/licenses/mit-license

*/
(function(l,w){"object"===typeof module&&module.exports?module.exports=w(require("./punycode"),require("./IPv6"),require("./SecondLevelDomains")):"function"===typeof define&&define.amd?define(["./punycode","./IPv6","./SecondLevelDomains"],w):l.URI=w(l.punycode,l.IPv6,l.SecondLevelDomains,l)})(this,function(l,w,u,h){function d(a,b){var c=1<=arguments.length,g=2<=arguments.length;if(!(this instanceof d))return c?g?new d(a,b):new d(a):new d;if(void 0===a){if(c)throw new TypeError("undefined is not a valid argument for URI");
a="undefined"!==typeof location?location.href+"":""}if(null===a&&c)throw new TypeError("null is not a valid argument for URI");this.href(a);return void 0!==b?this.absoluteTo(b):this}function r(a){return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")}function v(a){return void 0===a?"Undefined":String(Object.prototype.toString.call(a)).slice(8,-1)}function k(a){return"Array"===v(a)}function D(a,b){var c={},d;if("RegExp"===v(b))c=null;else if(k(b)){var e=0;for(d=b.length;e<d;e++)c[b[e]]=!0}else c[b]=
!0;e=0;for(d=a.length;e<d;e++)if(c&&void 0!==c[a[e]]||!c&&b.test(a[e]))a.splice(e,1),d--,e--;return a}function z(a,b){var c;if(k(b)){var d=0;for(c=b.length;d<c;d++)if(!z(a,b[d]))return!1;return!0}var e=v(b);d=0;for(c=a.length;d<c;d++)if("RegExp"===e){if("string"===typeof a[d]&&a[d].match(b))return!0}else if(a[d]===b)return!0;return!1}function E(a,b){if(!k(a)||!k(b)||a.length!==b.length)return!1;a.sort();b.sort();for(var c=0,d=a.length;c<d;c++)if(a[c]!==b[c])return!1;return!0}function A(a){return a.replace(/^\/+|\/+$/g,
"")}function G(a){return escape(a)}function B(a){return encodeURIComponent(a).replace(/[!'()*]/g,G).replace(/\*/g,"%2A")}function x(a){return function(b,c){if(void 0===b)return this._parts[a]||"";this._parts[a]=b||null;this.build(!c);return this}}function F(a,b){return function(c,d){if(void 0===c)return this._parts[a]||"";null!==c&&(c+="",c.charAt(0)===b&&(c=c.substring(1)));this._parts[a]=c;this.build(!d);return this}}var H=h&&h.URI;d.version="1.18.10";var f=d.prototype,n=Object.prototype.hasOwnProperty;
d._parts=function(){return{protocol:null,username:null,password:null,hostname:null,urn:null,port:null,path:null,query:null,fragment:null,duplicateQueryParameters:d.duplicateQueryParameters,escapeQuerySpace:d.escapeQuerySpace}};d.duplicateQueryParameters=!1;d.escapeQuerySpace=!0;d.protocol_expression=/^[a-z][a-z0-9.+-]*$/i;d.idn_expression=/[^a-z0-9\.-]/i;d.punycode_expression=/(xn--)/i;d.ip4_expression=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;d.ip6_expression=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
d.find_uri_expression=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;d.findUri={start:/\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,end:/[\s\r\n]|$/,trim:/[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/,parens:/(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g};d.defaultPorts={http:"80",https:"443",ftp:"21",
gopher:"70",ws:"80",wss:"443"};d.invalid_hostname_characters=/[^a-zA-Z0-9\.-]/;d.domAttributes={a:"href",blockquote:"cite",link:"href",base:"href",script:"src",form:"action",img:"src",area:"href",iframe:"src",embed:"src",source:"src",track:"src",input:"src",audio:"src",video:"src"};d.getDomAttribute=function(a){if(a&&a.nodeName){var b=a.nodeName.toLowerCase();if("input"!==b||"image"===a.type)return d.domAttributes[b]}};d.encode=B;d.decode=decodeURIComponent;d.iso8859=function(){d.encode=escape;d.decode=
unescape};d.unicode=function(){d.encode=B;d.decode=decodeURIComponent};d.characters={pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/ig,map:{"%24":"$","%26":"&","%2B":"+","%2C":",","%3B":";","%3D":"=","%3A":":","%40":"@"}},decode:{expression:/[\/\?#]/g,map:{"/":"%2F","?":"%3F","#":"%23"}}},reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,map:{"%3A":":","%2F":"/","%3F":"?","%23":"#","%5B":"[","%5D":"]","%40":"@","%21":"!","%24":"$","%26":"&","%27":"'",
"%28":"(","%29":")","%2A":"*","%2B":"+","%2C":",","%3B":";","%3D":"="}}},urnpath:{encode:{expression:/%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,map:{"%21":"!","%24":"$","%27":"'","%28":"(","%29":")","%2A":"*","%2B":"+","%2C":",","%3B":";","%3D":"=","%40":"@"}},decode:{expression:/[\/\?#:]/g,map:{"/":"%2F","?":"%3F","#":"%23",":":"%3A"}}}};d.encodeQuery=function(a,b){var c=d.encode(a+"");void 0===b&&(b=d.escapeQuerySpace);return b?c.replace(/%20/g,"+"):c};d.decodeQuery=function(a,b){a+="";void 0===b&&
(b=d.escapeQuerySpace);try{return d.decode(b?a.replace(/\+/g,"%20"):a)}catch(c){return a}};var t={encode:"encode",decode:"decode"},y,C=function(a,b){return function(c){try{return d[b](c+"").replace(d.characters[a][b].expression,function(c){return d.characters[a][b].map[c]})}catch(g){return c}}};for(y in t)d[y+"PathSegment"]=C("pathname",t[y]),d[y+"UrnPathSegment"]=C("urnpath",t[y]);t=function(a,b,c){return function(g){var e=c?function(a){return d[b](d[c](a))}:d[b];g=(g+"").split(a);for(var f=0,m=
g.length;f<m;f++)g[f]=e(g[f]);return g.join(a)}};d.decodePath=t("/","decodePathSegment");d.decodeUrnPath=t(":","decodeUrnPathSegment");d.recodePath=t("/","encodePathSegment","decode");d.recodeUrnPath=t(":","encodeUrnPathSegment","decode");d.encodeReserved=C("reserved","encode");d.parse=function(a,b){b||(b={});var c=a.indexOf("#");-1<c&&(b.fragment=a.substring(c+1)||null,a=a.substring(0,c));c=a.indexOf("?");-1<c&&(b.query=a.substring(c+1)||null,a=a.substring(0,c));"//"===a.substring(0,2)?(b.protocol=
null,a=a.substring(2),a=d.parseAuthority(a,b)):(c=a.indexOf(":"),-1<c&&(b.protocol=a.substring(0,c)||null,b.protocol&&!b.protocol.match(d.protocol_expression)?b.protocol=void 0:"//"===a.substring(c+1,c+3)?(a=a.substring(c+3),a=d.parseAuthority(a,b)):(a=a.substring(c+1),b.urn=!0)));b.path=a;return b};d.parseHost=function(a,b){a=a.replace(/\\/g,"/");var c=a.indexOf("/");-1===c&&(c=a.length);if("["===a.charAt(0)){var d=a.indexOf("]");b.hostname=a.substring(1,d)||null;b.port=a.substring(d+2,c)||null;
"/"===b.port&&(b.port=null)}else{var e=a.indexOf(":");d=a.indexOf("/");e=a.indexOf(":",e+1);-1!==e&&(-1===d||e<d)?(b.hostname=a.substring(0,c)||null,b.port=null):(d=a.substring(0,c).split(":"),b.hostname=d[0]||null,b.port=d[1]||null)}b.hostname&&"/"!==a.substring(c).charAt(0)&&(c++,a="/"+a);return a.substring(c)||"/"};d.parseAuthority=function(a,b){a=d.parseUserinfo(a,b);return d.parseHost(a,b)};d.parseUserinfo=function(a,b){var c=a.indexOf("/"),g=a.lastIndexOf("@",-1<c?c:a.length-1);-1<g&&(-1===
c||g<c)?(c=a.substring(0,g).split(":"),b.username=c[0]?d.decode(c[0]):null,c.shift(),b.password=c[0]?d.decode(c.join(":")):null,a=a.substring(g+1)):(b.username=null,b.password=null);return a};d.parseQuery=function(a,b){if(!a)return{};a=a.replace(/&+/g,"&").replace(/^\?*&*|&+$/g,"");if(!a)return{};for(var c={},g=a.split("&"),e=g.length,f,m,k=0;k<e;k++)if(f=g[k].split("="),m=d.decodeQuery(f.shift(),b),f=f.length?d.decodeQuery(f.join("="),b):null,n.call(c,m)){if("string"===typeof c[m]||null===c[m])c[m]=
[c[m]];c[m].push(f)}else c[m]=f;return c};d.build=function(a){var b="";a.protocol&&(b+=a.protocol+":");a.urn||!b&&!a.hostname||(b+="//");b+=d.buildAuthority(a)||"";"string"===typeof a.path&&("/"!==a.path.charAt(0)&&"string"===typeof a.hostname&&(b+="/"),b+=a.path);"string"===typeof a.query&&a.query&&(b+="?"+a.query);"string"===typeof a.fragment&&a.fragment&&(b+="#"+a.fragment);return b};d.buildHost=function(a){var b="";if(a.hostname)b=d.ip6_expression.test(a.hostname)?b+("["+a.hostname+"]"):b+a.hostname;
else return"";a.port&&(b+=":"+a.port);return b};d.buildAuthority=function(a){return d.buildUserinfo(a)+d.buildHost(a)};d.buildUserinfo=function(a){var b="";a.username&&(b+=d.encode(a.username));a.password&&(b+=":"+d.encode(a.password));b&&(b+="@");return b};d.buildQuery=function(a,b,c){var g="",e,f;for(e in a)if(n.call(a,e)&&e)if(k(a[e])){var m={};var h=0;for(f=a[e].length;h<f;h++)void 0!==a[e][h]&&void 0===m[a[e][h]+""]&&(g+="&"+d.buildQueryParameter(e,a[e][h],c),!0!==b&&(m[a[e][h]+""]=!0))}else void 0!==
a[e]&&(g+="&"+d.buildQueryParameter(e,a[e],c));return g.substring(1)};d.buildQueryParameter=function(a,b,c){return d.encodeQuery(a,c)+(null!==b?"="+d.encodeQuery(b,c):"")};d.addQuery=function(a,b,c){if("object"===typeof b)for(var g in b)n.call(b,g)&&d.addQuery(a,g,b[g]);else if("string"===typeof b)void 0===a[b]?a[b]=c:("string"===typeof a[b]&&(a[b]=[a[b]]),k(c)||(c=[c]),a[b]=(a[b]||[]).concat(c));else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");};d.removeQuery=
function(a,b,c){var g;if(k(b))for(c=0,g=b.length;c<g;c++)a[b[c]]=void 0;else if("RegExp"===v(b))for(g in a)b.test(g)&&(a[g]=void 0);else if("object"===typeof b)for(g in b)n.call(b,g)&&d.removeQuery(a,g,b[g]);else if("string"===typeof b)void 0!==c?"RegExp"===v(c)?!k(a[b])&&c.test(a[b])?a[b]=void 0:a[b]=D(a[b],c):a[b]!==String(c)||k(c)&&1!==c.length?k(a[b])&&(a[b]=D(a[b],c)):a[b]=void 0:a[b]=void 0;else throw new TypeError("URI.removeQuery() accepts an object, string, RegExp as the first parameter");
};d.hasQuery=function(a,b,c,g){switch(v(b)){case "String":break;case "RegExp":for(var e in a)if(n.call(a,e)&&b.test(e)&&(void 0===c||d.hasQuery(a,e,c)))return!0;return!1;case "Object":for(var f in b)if(n.call(b,f)&&!d.hasQuery(a,f,b[f]))return!1;return!0;default:throw new TypeError("URI.hasQuery() accepts a string, regular expression or object as the name parameter");}switch(v(c)){case "Undefined":return b in a;case "Boolean":return a=!(k(a[b])?!a[b].length:!a[b]),c===a;case "Function":return!!c(a[b],
b,a);case "Array":return k(a[b])?(g?z:E)(a[b],c):!1;case "RegExp":return k(a[b])?g?z(a[b],c):!1:!(!a[b]||!a[b].match(c));case "Number":c=String(c);case "String":return k(a[b])?g?z(a[b],c):!1:a[b]===c;default:throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");}};d.joinPaths=function(){for(var a=[],b=[],c=0,g=0;g<arguments.length;g++){var e=new d(arguments[g]);a.push(e);for(var e=e.segment(),f=0;f<e.length;f++)"string"===typeof e[f]&&
b.push(e[f]),e[f]&&c++}if(!b.length||!c)return new d("");b=(new d("")).segment(b);""!==a[0].path()&&"/"!==a[0].path().slice(0,1)||b.path("/"+b.path());return b.normalize()};d.commonPath=function(a,b){var c=Math.min(a.length,b.length),d;for(d=0;d<c;d++)if(a.charAt(d)!==b.charAt(d)){d--;break}if(1>d)return a.charAt(0)===b.charAt(0)&&"/"===a.charAt(0)?"/":"";if("/"!==a.charAt(d)||"/"!==b.charAt(d))d=a.substring(0,d).lastIndexOf("/");return a.substring(0,d+1)};d.withinString=function(a,b,c){c||(c={});
var g=c.start||d.findUri.start,e=c.end||d.findUri.end,f=c.trim||d.findUri.trim,m=c.parens||d.findUri.parens,k=/[a-z0-9-]=["']?$/i;for(g.lastIndex=0;;){var h=g.exec(a);if(!h)break;var l=h.index;if(c.ignoreHtml){var p=a.slice(Math.max(l-3,0),l);if(p&&k.test(p))continue}for(var q=l+a.slice(l).search(e),p=a.slice(l,q),q=-1;;){var n=m.exec(p);if(!n)break;q=Math.max(q,n.index+n[0].length)}p=-1<q?p.slice(0,q)+p.slice(q).replace(f,""):p.replace(f,"");p.length<=h[0].length||c.ignore&&c.ignore.test(p)||(q=
l+p.length,h=b(p,l,q,a),void 0===h?g.lastIndex=q:(h=String(h),a=a.slice(0,l)+h+a.slice(q),g.lastIndex=l+h.length))}g.lastIndex=0;return a};d.ensureValidHostname=function(a){if(a.match(d.invalid_hostname_characters)){if(!l)throw new TypeError('Hostname "'+a+'" contains characters other than [A-Z0-9.-] and Punycode.js is not available');if(l.toASCII(a).match(d.invalid_hostname_characters))throw new TypeError('Hostname "'+a+'" contains characters other than [A-Z0-9.-]');}};d.noConflict=function(a){if(a)return a=
{URI:this.noConflict()},h.URITemplate&&"function"===typeof h.URITemplate.noConflict&&(a.URITemplate=h.URITemplate.noConflict()),h.IPv6&&"function"===typeof h.IPv6.noConflict&&(a.IPv6=h.IPv6.noConflict()),h.SecondLevelDomains&&"function"===typeof h.SecondLevelDomains.noConflict&&(a.SecondLevelDomains=h.SecondLevelDomains.noConflict()),a;h.URI===this&&(h.URI=H);return this};f.build=function(a){if(!0===a)this._deferred_build=!0;else if(void 0===a||this._deferred_build)this._string=d.build(this._parts),
this._deferred_build=!1;return this};f.clone=function(){return new d(this)};f.valueOf=f.toString=function(){return this.build(!1)._string};f.protocol=x("protocol");f.username=x("username");f.password=x("password");f.hostname=x("hostname");f.port=x("port");f.query=F("query","?");f.fragment=F("fragment","#");f.search=function(a,b){var c=this.query(a,b);return"string"===typeof c&&c.length?"?"+c:c};f.hash=function(a,b){var c=this.fragment(a,b);return"string"===typeof c&&c.length?"#"+c:c};f.pathname=function(a,
b){if(void 0===a||!0===a){var c=this._parts.path||(this._parts.hostname?"/":"");return a?(this._parts.urn?d.decodeUrnPath:d.decodePath)(c):c}this._parts.path=this._parts.urn?a?d.recodeUrnPath(a):"":a?d.recodePath(a):"/";this.build(!b);return this};f.path=f.pathname;f.href=function(a,b){var c;if(void 0===a)return this.toString();this._string="";this._parts=d._parts();var g=a instanceof d,e="object"===typeof a&&(a.hostname||a.path||a.pathname);a.nodeName&&(e=d.getDomAttribute(a),a=a[e]||"",e=!1);!g&&
e&&void 0!==a.pathname&&(a=a.toString());if("string"===typeof a||a instanceof String)this._parts=d.parse(String(a),this._parts);else if(g||e)for(c in g=g?a._parts:a,g)n.call(this._parts,c)&&(this._parts[c]=g[c]);else throw new TypeError("invalid input");this.build(!b);return this};f.is=function(a){var b=!1,c=!1,g=!1,e=!1,f=!1,h=!1,k=!1,l=!this._parts.urn;this._parts.hostname&&(l=!1,c=d.ip4_expression.test(this._parts.hostname),g=d.ip6_expression.test(this._parts.hostname),b=c||g,f=(e=!b)&&u&&u.has(this._parts.hostname),
h=e&&d.idn_expression.test(this._parts.hostname),k=e&&d.punycode_expression.test(this._parts.hostname));switch(a.toLowerCase()){case "relative":return l;case "absolute":return!l;case "domain":case "name":return e;case "sld":return f;case "ip":return b;case "ip4":case "ipv4":case "inet4":return c;case "ip6":case "ipv6":case "inet6":return g;case "idn":return h;case "url":return!this._parts.urn;case "urn":return!!this._parts.urn;case "punycode":return k}return null};var I=f.protocol,J=f.port,K=f.hostname;
f.protocol=function(a,b){if(void 0!==a&&a&&(a=a.replace(/:(\/\/)?$/,""),!a.match(d.protocol_expression)))throw new TypeError('Protocol "'+a+"\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]");return I.call(this,a,b)};f.scheme=f.protocol;f.port=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a&&(0===a&&(a=null),a&&(a+="",":"===a.charAt(0)&&(a=a.substring(1)),a.match(/[^0-9]/))))throw new TypeError('Port "'+a+'" contains characters other than [0-9]');
return J.call(this,a,b)};f.hostname=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a){var c={};if("/"!==d.parseHost(a,c))throw new TypeError('Hostname "'+a+'" contains characters other than [A-Z0-9.-]');a=c.hostname}return K.call(this,a,b)};f.origin=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){var c=this.protocol();return this.authority()?(c?c+"://":"")+this.authority():""}c=d(a);this.protocol(c.protocol()).authority(c.authority()).build(!b);return this};
f.host=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a)return this._parts.hostname?d.buildHost(this._parts):"";if("/"!==d.parseHost(a,this._parts))throw new TypeError('Hostname "'+a+'" contains characters other than [A-Z0-9.-]');this.build(!b);return this};f.authority=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a)return this._parts.hostname?d.buildAuthority(this._parts):"";if("/"!==d.parseAuthority(a,this._parts))throw new TypeError('Hostname "'+
a+'" contains characters other than [A-Z0-9.-]');this.build(!b);return this};f.userinfo=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){var c=d.buildUserinfo(this._parts);return c?c.substring(0,c.length-1):c}"@"!==a[a.length-1]&&(a+="@");d.parseUserinfo(a,this._parts);this.build(!b);return this};f.resource=function(a,b){if(void 0===a)return this.path()+this.search()+this.hash();var c=d.parse(a);this._parts.path=c.path;this._parts.query=c.query;this._parts.fragment=c.fragment;
this.build(!b);return this};f.subdomain=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.length-this.domain().length-1;return this._parts.hostname.substring(0,c)||""}c=this._parts.hostname.length-this.domain().length;c=this._parts.hostname.substring(0,c);c=new RegExp("^"+r(c));a&&"."!==a.charAt(a.length-1)&&(a+=".");a&&d.ensureValidHostname(a);this._parts.hostname=this._parts.hostname.replace(c,a);
this.build(!b);return this};f.domain=function(a,b){if(this._parts.urn)return void 0===a?"":this;"boolean"===typeof a&&(b=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.match(/\./g);if(c&&2>c.length)return this._parts.hostname;c=this._parts.hostname.length-this.tld(b).length-1;c=this._parts.hostname.lastIndexOf(".",c-1)+1;return this._parts.hostname.substring(c)||""}if(!a)throw new TypeError("cannot set domain empty");d.ensureValidHostname(a);
!this._parts.hostname||this.is("IP")?this._parts.hostname=a:(c=new RegExp(r(this.domain())+"$"),this._parts.hostname=this._parts.hostname.replace(c,a));this.build(!b);return this};f.tld=function(a,b){if(this._parts.urn)return void 0===a?"":this;"boolean"===typeof a&&(b=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.lastIndexOf("."),c=this._parts.hostname.substring(c+1);return!0!==b&&u&&u.list[c.toLowerCase()]?u.get(this._parts.hostname)||c:c}if(a)if(a.match(/[^a-zA-Z0-9-]/))if(u&&
u.is(a))c=new RegExp(r(this.tld())+"$"),this._parts.hostname=this._parts.hostname.replace(c,a);else throw new TypeError('TLD "'+a+'" contains characters other than [A-Z0-9]');else{if(!this._parts.hostname||this.is("IP"))throw new ReferenceError("cannot set TLD on non-domain host");c=new RegExp(r(this.tld())+"$");this._parts.hostname=this._parts.hostname.replace(c,a)}else throw new TypeError("cannot set TLD empty");this.build(!b);return this};f.directory=function(a,b){if(this._parts.urn)return void 0===
a?"":this;if(void 0===a||!0===a){if(!this._parts.path&&!this._parts.hostname)return"";if("/"===this._parts.path)return"/";var c=this._parts.path.length-this.filename().length-1,c=this._parts.path.substring(0,c)||(this._parts.hostname?"/":"");return a?d.decodePath(c):c}c=this._parts.path.length-this.filename().length;c=this._parts.path.substring(0,c);c=new RegExp("^"+r(c));this.is("relative")||(a||(a="/"),"/"!==a.charAt(0)&&(a="/"+a));a&&"/"!==a.charAt(a.length-1)&&(a+="/");a=d.recodePath(a);this._parts.path=
this._parts.path.replace(c,a);this.build(!b);return this};f.filename=function(a,b){if(this._parts.urn)return void 0===a?"":this;if("string"!==typeof a){if(!this._parts.path||"/"===this._parts.path)return"";var c=this._parts.path.lastIndexOf("/"),c=this._parts.path.substring(c+1);return a?d.decodePathSegment(c):c}c=!1;"/"===a.charAt(0)&&(a=a.substring(1));a.match(/\.?\//)&&(c=!0);var g=new RegExp(r(this.filename())+"$");a=d.recodePath(a);this._parts.path=this._parts.path.replace(g,a);c?this.normalizePath(b):
this.build(!b);return this};f.suffix=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";var c=this.filename(),g=c.lastIndexOf(".");if(-1===g)return"";c=c.substring(g+1);c=/^[a-z0-9%]+$/i.test(c)?c:"";return a?d.decodePathSegment(c):c}"."===a.charAt(0)&&(a=a.substring(1));if(c=this.suffix())g=a?new RegExp(r(c)+"$"):new RegExp(r("."+c)+"$");else{if(!a)return this;this._parts.path+="."+d.recodePath(a)}g&&(a=d.recodePath(a),
this._parts.path=this._parts.path.replace(g,a));this.build(!b);return this};f.segment=function(a,b,c){var d=this._parts.urn?":":"/",e=this.path(),f="/"===e.substring(0,1),e=e.split(d);void 0!==a&&"number"!==typeof a&&(c=b,b=a,a=void 0);if(void 0!==a&&"number"!==typeof a)throw Error('Bad segment "'+a+'", must be 0-based integer');f&&e.shift();0>a&&(a=Math.max(e.length+a,0));if(void 0===b)return void 0===a?e:e[a];if(null===a||void 0===e[a])if(k(b)){e=[];a=0;for(var h=b.length;a<h;a++)if(b[a].length||
e.length&&e[e.length-1].length)e.length&&!e[e.length-1].length&&e.pop(),e.push(A(b[a]))}else{if(b||"string"===typeof b)b=A(b),""===e[e.length-1]?e[e.length-1]=b:e.push(b)}else b?e[a]=A(b):e.splice(a,1);f&&e.unshift("");return this.path(e.join(d),c)};f.segmentCoded=function(a,b,c){var g;"number"!==typeof a&&(c=b,b=a,a=void 0);if(void 0===b){a=this.segment(a,b,c);if(k(a)){var e=0;for(g=a.length;e<g;e++)a[e]=d.decode(a[e])}else a=void 0!==a?d.decode(a):void 0;return a}if(k(b))for(e=0,g=b.length;e<g;e++)b[e]=
d.encode(b[e]);else b="string"===typeof b||b instanceof String?d.encode(b):b;return this.segment(a,b,c)};var L=f.query;f.query=function(a,b){if(!0===a)return d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);if("function"===typeof a){var c=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace),g=a.call(this,c);this._parts.query=d.buildQuery(g||c,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);this.build(!b);return this}return void 0!==a&&"string"!==typeof a?(this._parts.query=
d.buildQuery(a,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace),this.build(!b),this):L.call(this,a,b)};f.setQuery=function(a,b,c){var g=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);if("string"===typeof a||a instanceof String)g[a]=void 0!==b?b:null;else if("object"===typeof a)for(var e in a)n.call(a,e)&&(g[e]=a[e]);else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");this._parts.query=d.buildQuery(g,this._parts.duplicateQueryParameters,
this._parts.escapeQuerySpace);"string"!==typeof a&&(c=b);this.build(!c);return this};f.addQuery=function(a,b,c){var g=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);d.addQuery(g,a,void 0===b?null:b);this._parts.query=d.buildQuery(g,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);"string"!==typeof a&&(c=b);this.build(!c);return this};f.removeQuery=function(a,b,c){var g=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);d.removeQuery(g,a,b);this._parts.query=
d.buildQuery(g,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);"string"!==typeof a&&(c=b);this.build(!c);return this};f.hasQuery=function(a,b,c){var g=d.parseQuery(this._parts.query,this._parts.escapeQuerySpace);return d.hasQuery(g,a,b,c)};f.setSearch=f.setQuery;f.addSearch=f.addQuery;f.removeSearch=f.removeQuery;f.hasSearch=f.hasQuery;f.normalize=function(){return this._parts.urn?this.normalizeProtocol(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build():this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()};
f.normalizeProtocol=function(a){"string"===typeof this._parts.protocol&&(this._parts.protocol=this._parts.protocol.toLowerCase(),this.build(!a));return this};f.normalizeHostname=function(a){this._parts.hostname&&(this.is("IDN")&&l?this._parts.hostname=l.toASCII(this._parts.hostname):this.is("IPv6")&&w&&(this._parts.hostname=w.best(this._parts.hostname)),this._parts.hostname=this._parts.hostname.toLowerCase(),this.build(!a));return this};f.normalizePort=function(a){"string"===typeof this._parts.protocol&&
this._parts.port===d.defaultPorts[this._parts.protocol]&&(this._parts.port=null,this.build(!a));return this};f.normalizePath=function(a){var b=this._parts.path;if(!b)return this;if(this._parts.urn)return this._parts.path=d.recodeUrnPath(this._parts.path),this.build(!a),this;if("/"===this._parts.path)return this;var b=d.recodePath(b),c="";if("/"!==b.charAt(0)){var g=!0;b="/"+b}if("/.."===b.slice(-3)||"/."===b.slice(-2))b+="/";b=b.replace(/(\/(\.\/)+)|(\/\.$)/g,"/").replace(/\/{2,}/g,"/");g&&(c=b.substring(1).match(/^(\.\.\/)+/)||
"")&&(c=c[0]);for(;;){var e=b.search(/\/\.\.(\/|$)/);if(-1===e)break;else if(0===e){b=b.substring(3);continue}var f=b.substring(0,e).lastIndexOf("/");-1===f&&(f=e);b=b.substring(0,f)+b.substring(e+3)}g&&this.is("relative")&&(b=c+b.substring(1));this._parts.path=b;this.build(!a);return this};f.normalizePathname=f.normalizePath;f.normalizeQuery=function(a){"string"===typeof this._parts.query&&(this._parts.query.length?this.query(d.parseQuery(this._parts.query,this._parts.escapeQuerySpace)):this._parts.query=
null,this.build(!a));return this};f.normalizeFragment=function(a){this._parts.fragment||(this._parts.fragment=null,this.build(!a));return this};f.normalizeSearch=f.normalizeQuery;f.normalizeHash=f.normalizeFragment;f.iso8859=function(){var a=d.encode,b=d.decode;d.encode=escape;d.decode=decodeURIComponent;try{this.normalize()}finally{d.encode=a,d.decode=b}return this};f.unicode=function(){var a=d.encode,b=d.decode;d.encode=B;d.decode=unescape;try{this.normalize()}finally{d.encode=a,d.decode=b}return this};
f.readable=function(){var a=this.clone();a.username("").password("").normalize();var b="";a._parts.protocol&&(b+=a._parts.protocol+"://");a._parts.hostname&&(a.is("punycode")&&l?(b+=l.toUnicode(a._parts.hostname),a._parts.port&&(b+=":"+a._parts.port)):b+=a.host());a._parts.hostname&&a._parts.path&&"/"!==a._parts.path.charAt(0)&&(b+="/");b+=a.path(!0);if(a._parts.query){for(var c="",g=0,e=a._parts.query.split("&"),f=e.length;g<f;g++){var h=(e[g]||"").split("="),c=c+("&"+d.decodeQuery(h[0],this._parts.escapeQuerySpace).replace(/&/g,
"%26"));void 0!==h[1]&&(c+="="+d.decodeQuery(h[1],this._parts.escapeQuerySpace).replace(/&/g,"%26"))}b+="?"+c.substring(1)}return b+=d.decodeQuery(a.hash(),!0)};f.absoluteTo=function(a){var b=this.clone(),c=["protocol","username","password","hostname","port"],g,e;if(this._parts.urn)throw Error("URNs do not have any generally defined hierarchical components");a instanceof d||(a=new d(a));if(b._parts.protocol)return b;b._parts.protocol=a._parts.protocol;if(this._parts.hostname)return b;for(g=0;e=c[g];g++)b._parts[e]=
a._parts[e];b._parts.path?(".."===b._parts.path.substring(-2)&&(b._parts.path+="/"),"/"!==b.path().charAt(0)&&(c=(c=a.directory())?c:0===a.path().indexOf("/")?"/":"",b._parts.path=(c?c+"/":"")+b._parts.path,b.normalizePath())):(b._parts.path=a._parts.path,b._parts.query||(b._parts.query=a._parts.query));b.build();return b};f.relativeTo=function(a){var b=this.clone().normalize();if(b._parts.urn)throw Error("URNs do not have any generally defined hierarchical components");a=(new d(a)).normalize();var c=
b._parts;var g=a._parts;var e=b.path();a=a.path();if("/"!==e.charAt(0))throw Error("URI is already relative");if("/"!==a.charAt(0))throw Error("Cannot calculate a URI relative to another relative URI");c.protocol===g.protocol&&(c.protocol=null);if(c.username===g.username&&c.password===g.password&&null===c.protocol&&null===c.username&&null===c.password&&c.hostname===g.hostname&&c.port===g.port)c.hostname=null,c.port=null;else return b.build();if(e===a)return c.path="",b.build();e=d.commonPath(e,a);
if(!e)return b.build();g=g.path.substring(e.length).replace(/[^\/]*$/,"").replace(/.*?\//g,"../");c.path=g+c.path.substring(e.length)||"./";return b.build()};f.equals=function(a){var b=this.clone(),c=new d(a);a={};var g;b.normalize();c.normalize();if(b.toString()===c.toString())return!0;var e=b.query();var f=c.query();b.query("");c.query("");if(b.toString()!==c.toString()||e.length!==f.length)return!1;b=d.parseQuery(e,this._parts.escapeQuerySpace);f=d.parseQuery(f,this._parts.escapeQuerySpace);for(g in b)if(n.call(b,
g)){if(!k(b[g])){if(b[g]!==f[g])return!1}else if(!E(b[g],f[g]))return!1;a[g]=!0}for(g in f)if(n.call(f,g)&&!a[g])return!1;return!0};f.duplicateQueryParameters=function(a){this._parts.duplicateQueryParameters=!!a;return this};f.escapeQuerySpace=function(a){this._parts.escapeQuerySpace=!!a;return this};return d});


  var _player;

  /* --------------------------------------------------
    Config
  -------------------------------------------------- */
  var _bcConfig = {
    jsBaseURL: '//players.brightcove.net/',
    playbackApiBaseURL: 'https://edge.api.brightcove.com/playback/v1/accounts/',
    getPlaylistLimitSize: 100,
    accountId: '5289441680001',
    policyKey: 'BCpkADawqM2t1x6444jcjVA_l_3dbRc3dlovdhKX9pmHaBrHJrDJcDCcmQNGxlpqx9U_2lfKvngjJJ9Yt8PNw6zeYwjT3t6kUzHFqo6Lip2zFXdDyAfL19bYPvqkg4y-z2jiput8gKwET_bZ'
  };

  // 公開時設定
  var _bcPlayerConfig = {
    id: 'bcPlayer',
    playerId: 'rklFbYBVHb',
    embed: 'default',
    applicationId: '',
    class: 'video-js',
    playsinline: true,
    controls: true,
    autoPlay: true,
    autoNext: true
  }

  var _bcPlayerState = {
    firstPlay: true,
    muted: false
  }

  // Primetimeあり
  var _vastUrlConfig = {
    baseUrl: 'https://ad.auditude.com/adserver/vast3?',
    queries: {
      pc: {
        sportsbull: 'u=d39b0dbdbe70265ab7912a48d706bfbd&z=268135&tl=c:l,d:120,l:1,p:p&l={YYYYMMDDHHMMSS}'
      },
      sp: {
        sportsbull: 'u=d39b0dbdbe70265ab7912a48d706bfbd&z=268133&tl=c:l,d:120,l:1,p:p&l={YYYYMMDDHHMMSS}'
      }
    }
  }

  var _isSpTab = false;

  var _adConfig = {
    frequency: 3
  }
  var _bcPlayerPlayCount = 0;

  var _cuePointList;

  document.write('<style type="text/css">.vjs-captions-button {display: none;}</style>');

  /* --------------------------------------------------
    Public Functions
  -------------------------------------------------- */
  function init() {
    if ($('[data-auto-play]').length > 0 && $('[data-auto-play]').attr('data-auto-play') === 'false') {
      _bcPlayerConfig.autoPlay = false;
    }
    if (_getDeviceType() !== 'pc') {
      _isSpTab = true;
      _bcPlayerConfig.autoPlay = false;
    }
    if ($('[data-auto-next]').length > 0 && $('[data-auto-next]').attr('data-auto-next') === 'false') {
      _bcPlayerConfig.autoNext = false;
    }


    var $target;
    if ($('[data-playlist-id]').length > 0) {
      _bcPlayerConfig.playlistId = $('[data-playlist-id]').attr('data-playlist-id');
      $target = $('[data-playlist-id]');
    } else {
      var uri = new URI();
      var query = uri.search(true);
      if ('vid' in query && query.vid) _bcPlayerConfig.videoId = query.vid;
      else _bcPlayerConfig.videoId = $('[data-video-id]').attr('data-video-id');
      $target = $('[data-video-id]');
    }

    var bcVideoTag = _createBcVideoTag();
    $target.html(bcVideoTag);

    var bcJsUrl = _createBcPlayerJsUrl();
    $.getScript(bcJsUrl, _setVideoJsEvents);
  }

  /* --------------------------------------------------
    Internal Functions
  -------------------------------------------------- */
  function _createBcPlayerJsUrl() {
    var url = ''
    url += _bcConfig.jsBaseURL;
    url += _bcConfig.accountId + '/';
    url += _bcPlayerConfig.playerId + '_' + _bcPlayerConfig.embed + '/';
    url += 'index.min.js';
    return url;
  }

  function _createBcVideoTag() {
    var tag = ''
    tag += '<div style="position: relative;">';
    tag += '<div style="padding-top: 56.25%;">';
    tag += '<video ';
    tag += 'id="' + _bcPlayerConfig.id + '" ';
    tag += 'data-account="' + _bcConfig.accountId + '" ';
    tag += 'data-player="' + _bcPlayerConfig.playerId + '" ';
    tag += 'data-embed="' + _bcPlayerConfig.embed + '" ';
    tag += 'data-application-id="' + _bcPlayerConfig.applicationId + '" ';
    tag += 'class="' + _bcPlayerConfig.class + '" ';
    tag += 'style="width:100%;height:100%;position:absolute;top:0;bottom:0;right:0;left:0;" ';
    if (_bcPlayerConfig.playsinline) {
      tag += 'playsinline ';
    }
    if (_bcPlayerConfig.autoPlay) {
      tag += 'autoplay ';
    }
    if (_bcPlayerConfig.controls) {
      tag += 'controls ';
    }
    tag += '>';
    tag += '</video>';
    tag += '</div>';
    tag += '</div>';
    return tag;
  }

  function _setVideoJsEvents() {
    videojs(_bcPlayerConfig.id).ready(function() {
      _player = this;

      // 広告
      _setCompanionAds();

      // プレイリスト
      if ('playlistId' in _bcPlayerConfig) _setPlaylistData();
      else _setVideoData(_bcPlayerConfig.videoId);

      // 初回再生記録
      _player.one('firstplay', function() {
        _bcPlayerState.firstPlay = false;
      });
    });
  }

  function _setPlaylistData() {
    var offset = 0;
    var limit = _bcConfig.getPlaylistLimitSize;
    _getPlaylistData(_bcPlayerConfig.playlistId, offset, limit).done(function(mediaData) {
      $.each(mediaData.videos, function(i, val) {
        mediaData.videos[i].duration = mediaData.videos[i].duration / 1000;
      });

      _getVideoData(mediaData.videos[0].id).done(function(video) {
        _setAdRequest(_bcPlayerConfig.autoPlay);

        _player.catalog.load(video);

        _setOnCuePoint(video);

        _writePlaylist(mediaData.videos);
      })
    });
  }

  function _getPlaylistData(playlistId, offset, limit) {
    var dfd = $.Deferred();

    var requestUrl = '';
    requestUrl += _bcConfig.playbackApiBaseURL + _bcConfig.accountId + '/playlists/' + playlistId;
    requestUrl += '?offset=' + offset;
    requestUrl += '&limit=' + limit;

    var ajaxParams = {
      type: 'GET',
      url: requestUrl,
      dataType: 'json',
      timeout: 60000,
      cache: false,
      headers: {
        'Accept': 'application/json;pk=' + _bcConfig.policyKey
      }
    };

    $.ajax(ajaxParams).done(function(mediaData) {
      dfd.resolve(mediaData);
    }).fail(function(xhr, status, error) {
      console.error('ajax failed');
      console.dir(xhr);

      dfd.reject(xhr);
    });

    return dfd.promise();
  }

  function _writePlaylist(videos) {
    var $playlistArea = $('[data-playlist-area]');
    $playlistArea.addClass('notAvailable');

    var listHtml = '';
    $.each(videos, function(index, video) {
      var thumbUrl = video.thumbnail;
      thumbUrl = thumbUrl.replace(/^(http|https):/, '');

      listHtml += '<div class="item">';
      listHtml += '<a href="javascript:void(0);" data-playlist-index="' + index + '" data-video-id="' + video.id + '">';
      listHtml += '<div class="imgBlock">';
      listHtml += '<img class="thumb" src="' + thumbUrl + '">';
      listHtml += '</div>';
      listHtml += '<div class="textBlock">';
      listHtml += '<span class="title">' + video.name + '</span>';
      listHtml += '</div>';
      listHtml += '</a>';
      listHtml += '</div>';
    });

    $playlistArea.html(listHtml);

    // クリックイベント
    $playlistArea.find('a').on('click', function() {
      if ($playlistArea.hasClass('notAvailable') === false && $(this).parent().hasClass('current') === false) {

        var videoId = $(this).attr('data-video-id');
        _player.catalog.getVideo(videoId, function(error, videoData) {
          _setAdRequest(!_isSpTab || !_bcPlayerState.firstPlay);

          _player.catalog.load(videoData);

          _setOnCuePoint(videoData);

          if (_isSpTab === true && _bcPlayerState.firstPlay === true) {
            _player.one('loadedmetadata', function() {
              if (_player.ads.state != 'ad-playback') {
                $playlistArea.removeClass('notAvailable');
              }
            });
          } else {
            _player.play();
          }
        });
      }
    });

    // プレイリスト制御
    if (_bcPlayerConfig.autoPlay === false) {
      _player.one('loadedmetadata', function() {
        if (_player.ads.state != 'ad-playback') {
          $playlistArea.removeClass('notAvailable');
        }
      });
    }
    _player.on('ads-request', function() {
      $playlistArea.addClass('notAvailable');
    });
    _player.on(['ads-ad-ended', 'adserror', 'adscanceled'], function(event) {
      $playlistArea.removeClass('notAvailable');
    });

    // カレント表示
    _player.on('loadstart', function() {
      var currentVideoId = _player.mediainfo.id;
      $playlistArea.find('.item').removeClass('current');
      $playlistArea.find('a[data-video-id="' + currentVideoId + '"]').parent().addClass('current');
    });

    // 次の動画
    if (_bcPlayerConfig.autoNext === true) {
      _player.on('ended', function() {
        var currentVideoId = _player.mediainfo.id;
        var currentIndex = parseInt($playlistArea.find('a[data-video-id="' + currentVideoId + '"]').attr('data-playlist-index'));

        if ($playlistArea.find('a[data-playlist-index="' + (currentIndex + 1) + '"]').length > 0) {
          $playlistArea.find('a[data-playlist-index="' + (currentIndex + 1) + '"]').click();
        } else {
          $playlistArea.find('a[data-playlist-index="0"]').click();
        }
      });
    }
  }

  function _setCompanionAds() {
    if (!_player.ima3) {
      return false
    };

    // VAST XML URLを設定
    _setVastUrl();

    // バナー設定
    if ($('[data-companion-ad-img-width][data-companion-ad-img-height]').length > 0) {
      _player.on('ads-load', function() {
        var adsMangager = _player.ima3.adsManager;
        adsMangager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);

        function onAdEvent(adEvent) {
          switch (adEvent.type) {
            case google.ima.AdEvent.Type.STARTED:
              var ad = adEvent.getAd();
              var selectionCriteria = new google.ima.CompanionAdSelectionSettings();
              selectionCriteria.resourceType = google.ima.CompanionAdSelectionSettings.ResourceType.STATIC;
              selectionCriteria.creativeType = google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE;
              selectionCriteria.sizeCriteria = google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_EXACT_MATCH;

              $('[data-companion-ad-img-width][data-companion-ad-img-height]').each(function() {
                var width = $(this).attr('data-companion-ad-img-width');
                var height = $(this).attr('data-companion-ad-img-height');

                var companionAds = ad.getCompanionAds(width, height, selectionCriteria);
                if (companionAds.length > 0) {
                  var companionAd = companionAds[0];

                  $(this).html(companionAd.getContent());
                } else {
                  $(this).html('');
                }
              });
          }
        }
      });
    }
  }

  function _setVastUrl() {
    var url = '';

    var deviceType = _getDeviceType() === 'sp' ? 'sp' : 'pc';
    var vastType = $('[data-vast-type]').attr('data-vast-type');

    if (_vastUrlConfig.queries[deviceType] && _vastUrlConfig.queries[deviceType][vastType]) {
      url = _vastUrlConfig.baseUrl + _vastUrlConfig.queries[deviceType][vastType];
    }

    _player.ima3.settings.serverUrl = url;

    _player.ima3.adMacroReplacement = function(url) {
      var _url = url;
      if (_url) {
        var parameters = {
          '{YYYYMMDDHHMMSS}': _getNowDateTimeString()
        };
        for (var i in parameters) {
          _url = _url.split(i).join(parameters[i]);
        }
      }
      return _url;
    }
  }

  function _getDeviceType() {
    var deviceType = 'pc';
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf('android') !== -1 && ua.indexOf('mobile') === -1) || ua.indexOf('ipad') !== -1) {
      deviceType = 'tab';
    } else if ((ua.indexOf('android') !== -1 && ua.indexOf('mobile') !== -1) || ua.indexOf('iphone') !== -1) {
      deviceType = 'sp';
    }
    return deviceType;
  }

  function _getNowDateTimeString() {
    var now = new Date();
    var year = now.getFullYear();
    var month = ('00' + (now.getMonth() + 1)).slice(-2);
    var day = ('00' + now.getDate()).slice(-2);
    var hour = ('00' + now.getHours()).slice(-2);
    var minute = ('00' + now.getMinutes()).slice(-2);
    var second = ('00' + now.getSeconds()).slice(-2);

    return year + month + day + hour + minute + second;
  }

  function _hideVideoContent() {
    $(".vjs-tech").hide();
    $(".vjs-poster").hide();
    $(".vjs-dock-text").hide();
  }
  function _showVideoContent() {
    $(".vjs-tech").show();
    $(".vjs-dock-text").show();
  }

  function _setAdRequest(isHide) {
    if (isHide) {
      _hideVideoContent();
    }

    _bcPlayerState.muted = _player.muted();
    _player.muted(true);

    _player.off('play', _hideVideoContent);
    _player.one('play', _hideVideoContent);

    if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
      _player.off('ads-ad-started', _onAdStart_requestAd);
      _player.one('ads-ad-started', _onAdStart_requestAd);
      _player.off('play', _requestAd);
      _player.one('play', _requestAd);
    } else {
      _player.off('playing', _requestAd);
      _player.one('playing', _requestAd);
    }
  }
  function _onAdStart_requestAd() {
    $(".vjs-tech").show();
  }
  function _requestAd() {
    if (_bcPlayerPlayCount == 0) {
      _player.pause();
      _player.muted(_bcPlayerState.muted);
      _player.ima3.adrequest();

      _player.one(["adend", "adserror"], function (event) {
        _showVideoContent();
        _player.play();
      });
    } else {
      _player.muted(_bcPlayerState.muted);
      _showVideoContent();
    }

    _bcPlayerPlayCount = (_bcPlayerPlayCount + 1) % _adConfig.frequency;
  }

  function _setVideoData(videoId) {
    _getVideoData(videoId).done(function(video) {
      _setAdRequest(_bcPlayerConfig.autoPlay);

      _player.catalog.load(video);

      _setOnCuePoint(video);
    });
  }

  function _getVideoData(videoId) {
    var dfd = $.Deferred();

    _player.catalog.getVideo(videoId, function(error, video) {
      if (error === null) dfd.resolve(video);
      else dfd.reject(error);
    });

    return dfd.promise();
  }

  function _setOnCuePoint(video) {
    $('[data-cuepoint]').html('');

    if (video.cue_points) _cuePointList = video.cue_points;
    else _cuePointList = null;

    _player.off('timeupdate', _onCuePoint);
    _player.one('firstplay', function() {
      _player.on('timeupdate', _onCuePoint);
    });
  }

  function _onCuePoint() {
    var activeCues = _getActiveCues();

    if (activeCues.length > 0 && activeCues[0] && activeCues[0].type == 'CODE') {
      $('[data-cuepoint]').html(activeCues[0].metadata);
    } else {
      $('[data-cuepoint]').html('');
    }
  }

  function _getActiveCues() {
    var ct = _player.currentTime();
    var active = [];
    var cue;
    for (var i = 0, l = _cuePointList.length; i < l; i++) {
      cue = _cuePointList[i];

      if (cue.startTime <= ct && cue.endTime >= ct) {
        active.push(cue);
      } else if (cue.startTime === cue.endTime &&
        cue.startTime <= ct &&
        cue.startTime + 0.5 >= ct) {
        active.push(cue);
      }
    }

    return active;
  }

  return {
    init: init
  };
}());

/* --------------------------------------------------
  Document Ready
-------------------------------------------------- */
$(function() {
  BCP.init();
});