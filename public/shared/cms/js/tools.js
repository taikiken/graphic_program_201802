//KeyNavi Tools(processed on 2004/05/05)
KL_TOOLS_VERSION="1.0";kta="";ktb=document;ktc="onmousedown";ktd="nan";kte="onload";ktf="width";ktg="height";kth="left";kti="top";ktj="right";ktk="bottom";ktl="name";ktn=kl_isarray;ktu=kl_isdef;ktv=kl_splice;ktz=kl_slice;kt1=kl_isint;kt2=kl_isstr;ktaa=kl_delhandler;ktba=kl_addhandler;ktda=kl_getelem;ktja=kl_mousex;ktka=kl_mousey;ktla=kl_style;ktqa=kl_abs;ktxa=kl_contains;kt1a=kl_isfunc;kt7a=kl_clearhandler;ktgb=kl_undef;kthb=kl_copy;kt3b=kl_closed;kt4b=kl_tostr;ktac=kl_tagname;ktfc=kl_toint;ktqc=kl_scrollwidth;ktrc=kl_windowwidth;ktsc=kl_scrollheight;kttc=kl_windowheight;ktuc=kl_slx;ktvc=kl_sly;ktzc=kl_tofloat;kt0c=kl_isnum;kt3c=kl_visible2;kthd=kl_cget;ktid=kl_index;ktjd=kl_cset;ktxd=kl_msg;kt2d=kl_sec_handler;KL_TIMERS=new Array();function ktm(){var args=arguments;var v=ktn(args[0])?args[0]:kto(ktp,args);ktq(v);return ktr(v);}function ktr(v){kts(v);v.kl_stat="timer";v.kl_msecpre=v.kl_msec;if(v.kl_onstart)ktt(v,v.kl_onstart);v.kl_id=(v.kl_ust?setTimeout(v.kl_es,v.kl_scale*v.kl_msec):setInterval(v.kl_es,v.kl_scale*v.kl_msec));return v;}function ktq(v){v.kl_cnt=0;v.kl_msecpre=0;v.kl_msecsum=0;return v;}function kts(v){if(v.kl_stat=="stop"||v.kl_stat=="step"||!ktu(v.kl_id))
return false;v.kl_stat="stop";if(v.kl_ust)clearTimeout(v.kl_id);else clearInterval(v.kl_id);if(v.kl_onstop)ktt(v,v.kl_onstop);return true;}function ktp(){var v=new Array("new");ktv(v,1,1,arguments);return kto(ktw,v);}function ktx(v,z){v.kl_scale=z;if(v.kl_stat=="timer"&&!v.kl_ust){clearInterval(v.kl_id);v.kl_id=setInterval(v.kl_es,v.kl_scale*v.kl_msec);}}function kty(v){kts(v);v.kl_stat="step";return eval(v.kl_es);}function ktw(){var v=ktz(arguments,0,arguments.length);if(!ktn(v[2]))ktv(v,2,2,new Array(new Array()));return kto(kt0,v);}function kt0(v,func,args,msec,reps,use_settimeout,pass_cnt,pass_obj){if(!ktn(v))v=new Array();v[0]="kl_timer_obj";if(!kt1(v.kl_n)){var n=KL_TIMERS.length;KL_TIMERS[n]=v;v.kl_n=n;}if(kt2(func))func=new Function(func);if(!ktn(args))args=new Array();if(!kt1(reps))reps=-1;v["kl_func"]=func;v["kl_args"]=args;v["kl_msec"]=msec;v["kl_scale"]=1;v["kl_reps"]=reps;v["kl_ust"]=use_settimeout;v["kl_cnt"]=0;v["kl_msecpre"]=0;v["kl_msecsum"]=0;v["kl_stat"]="stop";var s=kta;var a=kta;if(pass_cnt)a+=",v['kl_cnt']";if(pass_obj)a+=",v";for(var i=0;i<args.length;i++)a+=",args["+i+"]";if(a.length)a=a.substring(1,a.length);s=''+'var args=v["kl_args"];var quit=(v["kl_stat"]=="stop");'+'if(v["kl_reps"]>=0&&v["kl_cnt"]>=v["kl_reps"])quit=1;'+'if(!quit){'+'  if(v["kl_stat"]!="step")v["kl_msecsum"]+=v["kl_msecpre"];'+'  if(v["kl_func"]('+a+')==false)quit=1;'+'}'+'v["kl_cnt"]+=1;'+'if(v["kl_reps"]>=0&&v["kl_cnt"]>=v["kl_reps"])quit=1;'+'if(v["kl_stat"]=="timer"){'+'  if(quit)kts(v);'+'  else if(v["kl_ust"]){'+'    clearTimeout(v["kl_id"]);'+'    v["kl_id"]=setTimeout(v["kl_es"],v["kl_scale"]*v["kl_msec"]);'+'    v["kl_msecpre"]=v["kl_msec"];'+'}'+'}'+'return quit?false:true;';v["kl_func0"]=new Function("v",s);v["kl_es"]="KL_TIMERS["+v.kl_n+"].kl_func0(KL_TIMERS["+v.kl_n+"])";return v;}function kt3(v){return(v.kl_stat=="timer");}KL_TMOBJS=new Array();function kt4(func,args){var v=new Array();v.func=func;v.args=args;var s=kta;for(var i=0;i<args.length;i++)s+=",this.args["+i+"]";if(s.length)s=s.substring(1,s.length);s="this.func("+s+")";v.main=new Function(s);var n=KL_TMOBJS.length;KL_TMOBJS[n]=v;return "KL_TMOBJS["+n+"].main()";}function kt5(name){if(!kt2(name))return name;if(ktb.images[name])return ktb.images[name];if(KL_NS4)return kt6(name,ktb);return 0;}function kt6(name,doc){if(!doc.layers)return 0;if(doc.images)if(doc.images[name])return doc.images[name];for(var i=0;i<doc.layers.length;i++){if(doc.layers[i].document){var t=kt6(name,doc.layers[i].document);if(t)return t;}}return 0;}function kt7(objs,etype,func,args){return kt8(objs,etype,func,args,0);}function kt9(objs,etype,func,args){return kt8(objs,etype,func,args,1);}function kt8(objs,etype,func,args,isdel){if(!objs)return;for(var i=0;i<objs.length;i++){if(isdel)ktaa(objs[i],etype,func,args);else      ktba(objs[i],etype,func,args);}}KL_DLAYS=0;function ktca(id){var e=ktda(id);if(!e)return 0;ktba(e,ktc,ktea);if(KL_NS4&&e.document)kt7(e.document.images,ktc,ktea,new Array(e));if(!ktn(KL_DLAYS)){ktba(ktb,"onmousemove",ktfa);ktba(ktb,"onmouseup",ktga);KL_DLAYS=new Array();}return 1;}function ktha(id){var e=ktda(id);if(!e)return 0;if(KL_NS4&&e.document)kt9(e.document.images,ktc,ktea,new Array(e));return ktaa(e,ktc,ktea);}function ktea(ev,e){if(!e)e=this;ktia(ev,e);if(ktn(e.kl_dlays)){for(var i=0;i<e.kl_dlays.length;i++)
ktia(ev,ktda(e.kl_dlays[i]));}return true;}function ktia(ev,e){for(var i=0;i<KL_DLAYS.length;i++)if(KL_DLAYS[0]==e)return 0;var x0=ktja(ev);var y0=ktka(ev);var rel=(ktla(e,"position")=="relative");var xs=(rel?ktma(e,0):ktna(e));var ys=(rel?ktoa(e,0):ktpa(e));KL_DLAYS[KL_DLAYS.length]=new Array(e,0,x0,y0,xs-x0,ys-y0);return 1;}function ktfa(ev){var x=ktja(ev);var y=ktka(ev);for(var i=0;i<KL_DLAYS.length;i++){var v=KL_DLAYS[i];if(!v[1])if(ktqa(v[2]-x)<5&&ktqa(v[3]-y)<5)continue;v[1]="moving";ktra(v[0],v[4]+x,v[5]+y);}return(KL_DLAYS.length?false:true);}function ktga(){KL_DLAYS=new Array();return true;}KL_RLAYS=new Array();function ktsa(id){var e=ktda(id);if(!e)return 0;for(var i=0;i<KL_RLAYS.length;i++)if(KL_RLAYS[i]==e)return 1;KL_RLAYS[KL_RLAYS.length]=e;ktba(e,ktc,ktta);if(KL_NS4&&e.document)kt7(e.document.images,ktc,ktta,new Array(e));return 1;}function ktua(id){var e=ktda(id);if(!e)return 0;for(var i=0;i<KL_RLAYS.length;i++)if(KL_RLAYS[i]==e)KL_RLAYS[i]=0;if(KL_NS4&&e.document)kt9(e.document.images,ktc,ktta,new Array(e));return ktaa(e,ktc,ktta);}function ktva(ve,vz,e){if(!e)return;ve[ve.length]=e;vz[vz.length]=ktwa(e,0);if(!e.kl_rlays)return;for(var i=0;i<e.kl_rlays.length;i++){var ee=ktda(e.kl_rlays[i]);if(!ee)continue;ve[ve.length]=ee;vz[vz.length]=ktwa(ee,0);}}function ktta(ev,e){if(!e)e=this;var min=ktd;var ve=new Array();var vz=new Array();ktva(ve,vz,e);for(var i=0;i<ve.length;i++){if(!kt1(min))min=vz[i];else if(min>vz[i])min=vz[i];}if(!kt1(min))return true;var max=ktd;var we=new Array();var wz=new Array();for(var i=0;i<KL_RLAYS.length;i++){ktva(we,wz,ktda(KL_RLAYS[i]));}for(var i=0;i<we.length;i++){if(ktxa(ve,we[i]))continue;if(!kt1(max))max=wz[i];else if(max<wz[i])max=wz[i];}if(!kt1(max))return true;if(max<min)return true;for(var i=0;i<ve.length;i++)ktya(ve[i],vz[i]+max-min+1);return true;}function ktza(v1,v2){if(ktu(v1))return v1;return v2;}function kt0a(v,key,isfunc,defval){if(!kt1a(isfunc))isfunc=ktu;for(var i=0;i<v.length;i+=2){if(v[i]==key)if(isfunc(v[i+1]))return v[i+1];}return defval;}function kt2a(v,key,val){for(var i=0;i<v.length;i+=2)if(v[i]==key){v[i+1]=val;return;}var n=v.length;v[n]=key;v[n+1]=val;}function kt3a(v1,v2){for(var i=0;i<v2.length;i+=2)kt2a(v1,v2[i],v2[i+1]);}function kt4a(v0,key0,v,key,isfunc,defval){return kt5a(v0,key0,v,key,isfunc,defval,1);}function kt5a(v0,key0,v,key,isfunc,defval,safe){if(safe)if(ktu(kt0a(v0,key0)))return;var t;if(isfunc=="skip"){t=defval;}else if(ktn(v)){t=kt0a(v,key,isfunc,defval);}else{var f=(kt1a(isfunc)?isfunc:ktu);t=(f(key)?key:defval);}if(ktu(t))kt2a(v0,key0,t);}function kt6a(e,func,args,msec){if(!func)return;if(kt2(func))func=new Function("etype",func);if(!ktn(args))args=new Array();if(!kt1(msec))msec=-1;kt7a(e,kte);kt7a(e,"onerror");ktba(e,kte,kt8a,new Array(e,func,"load",args));ktba(e,"onerror",kt8a,new Array(e,func,"error",args));e.kl_done=0;if(msec<0)return;e.kl_timer=ktm(kt8a,new Array(0,e,func,"timeout",args),msec,1);}function kt8a(evt,e,func,etype,args){kt9a(e,func,etype,args);}function ktab(url,func,args,msec){var e=new Image();return ktbb(e,url,func,args,msec);}function ktbb(e,url,func,args,msec){if(func)kt6a(e,func,args,msec);e.src=url;return e;}kt8d=0;function ktcb(url,func,args,msec,ns4){if(ns4&&KL_NS4){var s="<script language='javascript' src='"+url+"'></script>";if(!kt8d){kt8d=ktdb(new Array("html",s));}else{kteb(kt8d,s,"ns4");}return kt8d;}if(KL_IE5||KL_NS6||KL_OP7){var e=ktb.createElement("script");if(func)kt6a(e,func,args,msec);e.setAttribute("src",url);ktb.body.appendChild(e);return e;}return 0;}function ktfb(html,fgcolor,bgcolor,opacity,opts){if(ktgb(opts))opts=new Array();var t,fg,bg;fg=new Array();t=kt0a(opts,"fg");if(ktn(t))kthb(t,fg);bg=new Array();t=kt0a(opts,"bg");if(ktn(t))kthb(t,bg);var v=new Array(fg,"html",0,html,kt2,"&nbsp;",bg,"html",0,0,"skip","&nbsp;",fg,"url",opts,"url",kt2,self["undefined"],fg,"fgcolor",0,fgcolor,kt2,"black",bg,"bgcolor",0,bgcolor,kt2,"orange",bg,"opacity",0,opacity,kt1,70,bg,"bgimage",opts,"bgimage",kt2,self["undefined"],bg,"border",opts,"border",kt2,"outset 1px",bg,"filter",opts,"bgfilter",kt2,self["undefined"],fg,"filter",opts,"fgfilter",kt2,self["undefined"],fg,"visibility",opts,"visibility",kt2,"hidden",bg,"visibility",opts,"visibility",kt2,"hidden");for(var i=0;i<v.length;i+=6)
kt4a(v[i],v[i+1],v[i+2],v[i+3],v[i+4],v[i+5]);var pos=kt0a(opts,"pos",kt2,"center_center");var pad=kt0a(opts,"padding",0,20);if(kt1(pad))pad=new Array(pad,pad,pad,pad);if(ktn(pad)){if(pad.length==1)pad=new Array(pad[0],pad[0],pad[0],pad[0]);if(pad.length==2)pad=new Array(pad[0],pad[1],pad[0],pad[1]);}var z=kt0a(opts,"zindex",kt1,100);var w=kt0a(opts,ktf,kt1,ktd);var h=kt0a(opts,ktg,kt1,ktd);if(kt1(w)){kt4a(fg,ktf,0,0,"skip",w-pad[1]-pad[3]);}if(kt1(h)){kt4a(fg,ktg,0,0,"skip",h-pad[0]-pad[2]);}kt4a(fg,"pos",0,0,"skip",pos);kt4a(bg,"pos",0,0,"skip",pos);kt4a(fg,"zindex",0,0,"skip",z+1);kt4a(bg,"zindex",0,0,"skip",z);var o1="-moz-box-sizing";var o2="box-sizing";if(KL_NS6){kt4a(fg,o1,opts,o1,kt2,"border-box");kt4a(bg,o1,opts,o1,kt2,"border-box");}kt4a(fg,o2,opts,o2,kt2,"border-box");kt4a(bg,o2,opts,o2,kt2,"border-box");kt4a(fg,"drag",opts,"drag");kt4a(bg,"drag",opts,"drag");kt4a(fg,"raise",opts,"raise");kt4a(bg,"raise",opts,"raise");var e=new Array("kl_tlayer_obj");e.fg=ktdb(fg);ktib(e.fg,pos,0,0,0,pad);kt4a(bg,ktf,0,0,"skip",ktjb(e.fg)+pad[1]+pad[3]);kt4a(bg,ktg,0,0,"skip",ktkb(e.fg)+pad[0]+pad[2]);e.bg=ktdb(bg);e.fgopts=fg;e.bgopts=bg;e.pad=pad;if(KL_IE4&&!KL_IE5)
ktm(ktlb,new Array(e),100,1);e.fg.kl_dlays=new Array(e.bg.id);e.bg.kl_dlays=new Array(e.fg.id);e.fg.kl_rlays=new Array(e.bg.id);e.bg.kl_rlays=new Array(e.fg.id);return e;}function ktlb(e){ktmb(e);var f=ktib(e.fg,kt0a(e.fgopts,"pos"),0,0,0,e.pad);var g=ktib(e.bg,kt0a(e.bgopts,"pos"));return(f&&g);}function ktmb(e){return ktnb(e.bg,ktjb(e.fg)+e.pad[1]+e.pad[3],ktkb(e.fg)+e.pad[0]+e.pad[2]);}function ktob(e){var f=ktpb(e.fg);var g=ktpb(e.bg);return(f&&g);}function ktqb(e){var f=ktrb(e.fg);var g=ktrb(e.bg);return(f&&g);}function ktsb(e,x,y){return kttb(e,"left:"+x+"_top:"+y+"_absolute");}function ktub(e,dx,dy){var f=ktvb(e.fg,dx,dy);var g=ktvb(e.bg,dx,dy);return(f&&g);}function kttb(e,pos,check){var f=ktib(e.fg,pos,check,0,0,e.pad);var g=ktib(e.bg,pos,check);return(f||g);}function ktwb(e,s,ns4,col){return kteb(e.fg,s,ns4,col);}function ktxb(e){return(ktyb(e.fg)&&ktyb(e.bg));}function ktzb(url,name){if(!name)name=kta;if(KL_IE4&&!KL_IE4M)return window.open(url,name,"fullscreen=yes");var opt='top=0,left=0,screenX=0,screenY=0';var sw=kt0b("avail");var sh=kt1b("avail");if(sw>0&&sh>0){opt+=',outerWidth='+sw;opt+=',outerHeight='+sh;}var win=window.open(url,name,opt);if(sw>0&&sh>0){win.resizeTo(sw,sh);}if(win.moveTo)win.moveTo(0,0);if(KL_OP6)alert("Press F11 for fullscreen.");return win;}function kt2b(url,w,h,wname){if(!wname)wname=kta;var win=0;if(window.opener)
if(!kt3b(window.opener)){win=window.opener;if(win.focus)win.focus();win.location=url;return win;}var opt="menubar=yes,toolbar=yes,location=yes,directories=no,status=yes,scrollbars=yes,resizable=yes";if(w)opt+=",width="+kt4b(w);if(h)opt+=",height="+kt4b(h);win=window.open(url,wname,opt);if(win.focus)win.focus();return win;}function kt0b(avail){if(!self["screen"])return 0;if(avail&&screen.availWidth)return screen.availWidth;return screen.width?screen.width:0;}function kt1b(avail){if(!self["screen"])return 0;if(avail&&screen.availHeight)return screen.availHeight;return screen.height?screen.height:0;}function kt5b(id,s,col){var e=ktda(id);if(!e)return 0;e.document.open();if(col)e.document.fgColor=col;e.document.write(s);e.document.close();return 1;}function kt6b(id,s,mode,ns4,col,ie4m_tail,ie4m_td){var e=ktda(id);if(!e)return 0;if(KL_NS4)return(ns4?kt5b(e,s,col):0);if(col&&e.style)e.style.color=col;s=kt7b(e,s,mode,ie4m_tail);if(mode=="always"||e.innerHTML!=s){if(KL_IE4M&&ie4m_td){e.innerHTML=kta;var ee=ktb.createElement("span");ee.innerHTML=s;e.appendChild(ee);}else{e.innerHTML=s;}}return 1;}function kt7b(e,s,mode,tail){s=(mode=="append"?e.innerHTML+s:(mode=="prepend"?s+e.innerHTML:s));if(KL_IE4M&&tail)if(kt8b(s,">"))return s+"\n";return s;}function kt9b(id,s,mode,ns4,col){if(KL_OP6&&!KL_OP7)return 0;var e=ktda(id);if(!e)return 0;var tn=ktac(e);if(tn=="table"&&e.id){var ee=ktda("kl_content_"+e.id);if(ee)e=ee;}return kt6b(e,s,mode,ns4,col,"tail",tn=="td");}function ktbc(e,name,defval){var pos=(name=="x"?"offsetLeft":"offsetTop");if(!kt1(e[pos]))return defval;var t=0;while(1){if(e[pos])t+=e[pos];if(!e.offsetParent)break;e=e.offsetParent;}return t;}function ktna(id,defval){var e=ktda(id);if(!KL_NS4)return ktbc(e,"x",defval);if(kt1(e.pageX))return e.pageX;return defval;}function ktpa(id,defval){var e=ktda(id);if(!KL_NS4)return ktbc(e,"y",defval);if(kt1(e.pageY))return e.pageY;return defval;}function ktjb(id,defval){var e=ktda(id);if(!KL_NS4)return kt1(e.offsetWidth)?e.offsetWidth:defval;return ktcc(e,defval);}function ktkb(id,defval){var e=ktda(id);if(!KL_NS4)return kt1(e.offsetHeight)?e.offsetHeight:defval;return ktdc(e,defval);}kt9d=new Array();kt9d["x"]=new Array("int",kth,"pixelLeft",kth);kt9d["y"]=new Array("int",kti,"pixelTop",kti);kt9d["z"]=new Array("int","zIndex","zIndex","zIndex");kt9d["w"]=new Array("int",ktf,"pixelWidth",ktf);kt9d["h"]=new Array("int",ktg,"pixelHeight",ktg);kt9d["v"]=new Array("str","visibility","visibility","visibility");kt9d["fc"]=new Array("str","fgColor","color","color");kt9d["bc"]=new Array("str","bgColor","backgroundColor","backgroundColor");kt9d["bi"]=new Array("str","background","backgroundImage","backgroundImage");function ktec(id,name,defval){var e=ktda(id);if(!e)return defval;var attrs=kt9d[name];var t;if(KL_NS4){if(name=="w"||name=="h"){if(e.clip)t=e.clip[attrs[1]];else return defval;}else if(name=="bi"){if(e.background)t=e.background.src;else return defval}else{t=e[attrs[1]];}if(name=="bc"&&kt1(t))
t="#"+kt4b(t/(16*16*16*16),16,2)+kt4b((t%(16*16*16*16))/(16*16),16,2)+kt4b(t%(16*16),16,2);}else{t=ktla(e,attrs[(KL_IE4&&!KL_IE5)?2:3]);}if(attrs[0]=="int"){t=ktfc(t);return(kt1(t)?t:defval);}if(attrs[0]=="str"){return(kt2(t)?t:defval);}return t;}function ktgc(id,name,val){var e=ktda(id);if(!e)return 0;var attrs=kt9d[name];var t;if(KL_NS4){if(name=="w"||name=="h"){if(e.clip)e.clip[attrs[1]]=val;else return 0;}else if(name=="fc"){if(e.document)e.document.fgColor=val;else return 0;}else if(name=="bi"){if(e.background)e.background.src=val;else return 0;}else e[attrs[1]]=val;return 1;}if(!e.style)return 0;if(KL_IE4&&!KL_IE5){e.style[attrs[2]]=val;return 1;}if(KL_OP6&&!KL_OP7){e.style[attrs[3]]=val;return 1;}if(attrs[0]=="int")val=val+kta;if(name=="x"||name=="y"||name=="w"||name=="h")val+="px";e.style[attrs[3]]=val;return 1;}function ktma(id,defval){return ktec(id,"x",defval);}function ktoa(id,defval){return ktec(id,"y",defval);}function ktcc(id,defval){return ktec(id,"w",defval);}function ktdc(id,defval){return ktec(id,"h",defval);}function ktwa(id,defval){return ktec(id,"z",defval);}function kthc(id,defval){return ktec(id,"v",defval);}function ktic(id,defval){return ktec(id,"fc",defval);}function ktjc(id,defval){return ktec(id,"bc",defval);}function ktkc(id,defval){return ktec(id,"bi",defval);}function ktya(id,val){return ktgc(id,"z",val);}function ktpb(id){return ktgc(id,"v","visible");}function ktrb(id){return ktgc(id,"v","hidden");}function ktlc(id,color,ns4string){if(KL_NS4&&kt2(ns4string))
return kteb(id,ns4string,1,color);return ktgc(id,"fc",color);}function ktmc(id,color,color2){if(!color2)color2="white";if(color=="transparent"){if(KL_NS4)color=null;if(KL_OP6&&!KL_OP7)color=color2;}return ktgc(id,"bc",color);}function ktnc(id,src,src2){if(!src2)src2="/just_for_opera6_bgimg_bug.gif";if(!src.length){if(KL_OP6&&!KL_OP7)src='url('+src2+')';if(KL_NS4)src=null;}else{if(!KL_NS4)src='url('+src+')';}return ktgc(id,"bi",src);}function ktra(id,x,y){var e=ktda(id);if(!e)return 0;if(KL_NS4){e.moveTo(x,y);return 1;}ktgc(e,"x",x);ktgc(e,"y",y);return 1;}function ktvb(id,dx,dy){var e=ktda(id);if(!e)return 0;if(KL_NS4){e.moveBy(dx,dy);return 1;}ktra(e,ktma(e,0)+dx,ktoa(e,0)+dy);return 1;}function ktnb(id,w,h){var e=ktda(id);if(!e)return 0;if(KL_NS4){e.resizeTo(w,h);return 1;}ktgc(e,"w",w);ktgc(e,"h",h);return 1;}function ktoc(id,dw,dh){var e=ktda(id);if(!e)return 0;if(KL_NS4){e.resizeBy(dw,dh);return 1;}ktnb(e,ktcc(e,0)+dw,ktdc(e,0)+dh);return 1;}function ktib(id,pos,check,dx,dy,pad){if(pos=="center")
return ktpc(id,pos,pos,0,0,0,pad,check);if(!dx)dx=0;if(!dy)dy=0;var posx,posy;var is_abs=0;var v,t;v=pos.split("_");t=v[0].split(":");posx=t[0];if(t.length>=2)dx+=parseInt(t[1])
t=v[1].split(":");posy=t[0];if(t.length>=2)dy+=parseInt(t[1])
if(v.length>=3)if(v[2]=="absolute")is_abs=1;return ktpc(id,posx,posy,is_abs,dx,dy,pad,check);}function ktpc(id,posx,posy,is_abs,dx,dy,pad,check,skip){var e=ktda(id);if(!e)return 0;if(KL_IE4&&!KL_IE5&&!skip)
setTimeout(kt4(ktpc,new Array(id,posx,posy,is_abs,dx,dy,pad,check,1)),100);var x=0;var y=0;var w=ktjb(id);var h=ktkb(id);var w0=(is_abs?ktqc():ktrc());var h0=(is_abs?ktsc():kttc());if(!ktn(pad))pad=new Array(0,0,0,0);if(posx==kth)x=(is_abs?0:ktuc())+dx+pad[3];if(posx=="center")x=(is_abs?0:ktuc())+(w0>w?(w0-w)/2:0)+dx+(pad[3]-pad[1])/2;if(posx==ktj)x=(is_abs?0:ktuc())+(w0-w)-dx-pad[1];if(posy==kti)y=(is_abs?0:ktvc())+dy+pad[0];if(posy=="center")y=(is_abs?0:ktvc())+(h0>h?(h0-h)/2:0)+dy+(pad[0]-pad[2])/2;if(posy==ktk)y=(is_abs?0:ktvc())+(h0-h)-dy-pad[2];if(check){if(ktqa(x-ktna(id,-1))<=1&&ktqa(y-ktpa(id,-1))<=1)return 0;}return ktra(id,x,y);}function ktwc(id,check){return ktpc(id,"center","center",0,0,0,0,check);}function ktxc(id,t,r,b,l){var e=ktda(id);if(!e)return 0;if(KL_NS4){if(!e.clip)return 0;e.clip.top=t;e.clip.right=r;e.clip.bottom=b;e.clip.left=l;return 1;}e.style.clip='rect('+t+'px '+r+'px '+b+'px '+l+'px)';return 1;}function ktyc(id){var e=ktda(id);if(!e)return 0;var o=100;if(KL_IE4W){if(e.filters)
if(e.filters.alpha)
if(ktu(e.filters.alpha.opacity)){var t=ktzc(e.filters.alpha.opacity);if(kt0c(t))o=t;}}if(KL_NS6){if(e.style)
if(ktu(e.style.MozOpacity)){var t=ktzc(e.style.MozOpacity);if(kt0c(t))o=t*100;}}return(o<0?0:(o>100?100:o));}function kt1c(id,val){var e=ktda(id);if(!e)return 0;if(!kt2c())return 0;if(KL_IE4W){if(!e.filters.alpha)e.style.filter="alpha(opacity="+val+")"+(kt2(e.style.filter)?" "+e.style.filter:kta);else e.filters.alpha.opacity=val;return 1;}if(KL_NS6){var t=val/100.0;if(t>0.999)t=0.999;e.style.MozOpacity=t;return 1;}return 0;}function kt2c(){if(KL_IE4W)return 1;if(KL_NS6S)return 0;if(KL_NS6L)return(KL_MZV>=1.0&&screen.colorDepth>=16);return KL_NS6;}function ktyb(id){var e=ktda(id);if(!e)return 0;if(!KL_NS4)return kt3c(e);var t=kthc(e);return(t!="hidden"&&t!="hide");}function kteb(id,s,ns4,col){return kt9b(id,s,0,ns4,col);}ktae=new Array();function kt4c(id,url,ns4){var e=ktda(id);if(!e)return 0;if(KL_NS4){if(ns4){e.load(url,e.clip.width?e.clip.width:200);return 1;}return 0;}if(e.setAttribute){e.setAttribute("src",url);return 1;}if(!ktae[e.id])return 0;self.frames[ktae[e.id]].location=url;return 1;}function ktdb(arg){var e=0;var id=kt0a(arg,"id",kt2,kt5c());var url=kt0a(arg,"url",kt2,0);var html=kt0a(arg,"html",kt2,0);var par=kt0a(arg,"parent",kt2,0);if(KL_NS4)
e=kt6c(arg,id,url,html,par);else if(KL_IE55||KL_NS6||(!url&&(KL_IE5||KL_OP7)))
e=kt7c(arg,id,url,html,par);else if(ktb.all)
e=kt8c(arg,id,url,html,par);if(!e)return 0;if(ktgb(kt0a(arg,"x"))&&ktgb(kt0a(arg,"y")))
ktib(e,kt0a(arg,"pos",0,"center"));if(kt0a(arg,"drag"))ktca(e);if(kt0a(arg,"raise"))ktsa(e);return e;}ktbe=0;function kt5c(){var cnt=ktbe;ktbe+=1;return "_js_layer_"+cnt;}function kt9c(e,arg){if(!e.style)return;var t;t=kt0a(arg,"x");if(kt1(t))ktgc(e,"x",t);t=kt0a(arg,"y");if(kt1(t))ktgc(e,"y",t);t=kt0a(arg,"zindex");if(kt1(t))ktgc(e,"z",t);t=kt0a(arg,ktf);if(kt1(t))ktgc(e,"w",t);t=kt0a(arg,ktg);if(kt1(t))ktgc(e,"h",t);t=kt0a(arg,"fgcolor");if(kt2(t))ktlc(e,t);t=kt0a(arg,"bgcolor");if(kt2(t))ktmc(e,t,kt0a(arg,"bgcolor2"));t=kt0a(arg,"bgimage");if(kt2(t))ktnc(e,t);var v0=new Array("id","pos","drag","raise","x","y",ktf,ktg,"zindex","fgcolor","bgcolor","bgimage","bgcolor2","iframe","url","html","parent");var v=arg;var o=kt0a(v,"opacity",kt1,100);for(var i=0;i<v.length;i+=2){if(ktxa(v0,v[i]))continue;if(v[i]=="filter"&&!KL_IE4W)continue;e.style[ktad(v[i])]=v[i+1];}if(o<100)kt1c(e,o);}function ktbd(e,arg,ie4){var o=kta;var id=(kt2(e)?e:e.id);var v=kt0a(arg,"iframe",ktn,new Array());var opts=new Array("frameborder","0","scrolling","no","marginwidth","0","marginheight","0",ktl,"_win");for(var i=0;i<opts.length;i+=2){var idx=-1;for(var j=0;j<v.length;j+=2){if(v[j].toLowerCase()==opts[i]){idx=j;break;}}if(idx==-1){idx=v.length;v[idx]=opts[i];v[idx+1]=(opts[i]==ktl?id:kta)+opts[i+1];}if(opts[i].toLowerCase()==ktl){ktae[id]=v[idx+1];}}for(var i=0;i<v.length;i+=2){if(ie4)o+=" "+v[i]+"='"+v[i+1]+"'";else    e.setAttribute(v[i],v[i+1]);}return o;}function ktad(n){var v=n.split("-");if(v.length<=1)return n;var t=v[0];for(var i=1;i<v.length;i++){if(!v[i].length)continue;t+=v[i].charAt(0).toUpperCase()+v[i].substring(1,v[i].length);}return t;}function kt7c(arg,id,url,html,par){var e0=(par?par:ktb.body);var e=ktb.createElement(url?"iframe":"div");if(KL_OP6&&!KL_OP7)return 0;e.setAttribute("id",id);e.style.position="absolute";e.style.visibility="hidden";e.style.left="0px";e.style.top="0px";if(url)ktbd(e,arg);e0.appendChild(e);kt9c(e,arg);if(url){e.setAttribute("src",url);}else{e.innerHTML=kt7b(e,html,"none","tail");}if(KL_IE4M){var ee=ktb.createElement("div");ee.style.position="absolute";ee.style.visibility="hidden";ee.style.left="0px";ee.style.top="0px";if(0)ktm(new Function("ee","document.body.appendChild(ee)"),new Array(ee),20,1);else ktb.body.appendChild(ee);ee.innerHTML="&nbsp;";}return e;}function kt8c(arg,id,url,html,par){var o="style='position:absolute;visibility:hidden;"+(KL_IE4M?" left:0px;top:0px;":kta)+"'";var s;if(url){o+=ktbd(id,arg,"ie4");s="<iframe id='"+id+"' "+o+" src='"+url+"'></iframe>";}else{o+="border='0' cellpadding='0' cellspacing='0'";s="<table id='"+id+"' "+o+"><tr><td valign='top' id='kl_content_"+id+"'>"+html+"</td></tr></table>";}var e0=(par?par:ktb.body);if(e0.insertAdjacentHTML){e0.insertAdjacentHTML("BeforeEnd",s);var e=ktb.all(id);kt9c(e,arg);return e;}return 0;}function kt6c(arg,id,url,html,par){var w=kt0a(arg,ktf,kt1);var h=kt0a(arg,ktg,kt1);var wt=(kt1(w)?w:200);if(!par)par=self;var e=(par?new Layer(wt,par):new Layer(wt));var t;t=kt0a(arg,"x");if(kt1(t))e.left=t;t=kt0a(arg,"y");if(kt1(t))e.top=t;t=kt0a(arg,"zindex");if(kt1(t))e.zIndex=t;t=kt0a(arg,"bgcolor");if(kt2(t))e.bgColor=t;t=kt0a(arg,"bgimage");if(kt2(t))e.background.src=t;t=kt0a(arg,"visibility",kt2,"hidden");e.visibility=t;if(kt1(w))e.clip.width=w;if(kt1(h))e.clip.height=h;if(url)e.load(url,w);else{e.document.open();t=kt0a(arg,"fgcolor");if(kt2(t))e.document.fgColor=t;e.document.write(html);e.document.close();}if(kt1(w)&&e.clip.width!=w)e.clip.width=w;if(kt1(h)&&e.clip.height!=h)e.clip.height=h;return e;}KL_PREF_CNAME="kl_pref";KL_PREF_CPATH="/";KL_PREF_CEXP=1;function ktcd(s){var v=new Array();if(!kt2(s))return v;var u=s.split("%%%%");for(var i=0;i<u.length;i++){var t=u[i].split("%%");if(t.length==2)v[v.length]=t;}return v;}function ktdd(v){var s=kta;var w=new Array();for(var i=0;i<v.length;i++)w[i]=v[i].join("%%");return w.join("%%%%");}function kted(name,val){return ktfd(name,val+kta);}function ktgd(name){return ktfd(name,kta,"del");}function ktfd(name,val,isdel){var v=ktcd(kthd("PREF"));var n=ktid(v,name,-1,0);if(isdel){if(n<0)return 1;v[n]=new Array("del");}else{v[n<0?v.length:n]=new Array(name,val);}return ktjd("PREF",ktdd(v));}function ktkd(name,defval){var v=ktcd(kthd("PREF"));var n=ktid(v,name,-1,0);if(n>=0)return v[n][1];return ktu(defval)?defval:-1;}function ktld(){var t=ktfc(ktkd("kl_ck",-1),-1);t=(t+1)%1000;return kted("kl_ck",t+kta);}function ktmd(name,val){return ktnd(name,val);}function ktnd(name,val){if(ktzc(ktkd(name,-1),-1)>=val)return 0;var r=ktb.referrer;var h=location.href;if(ktu(navigator.cookieEnabled)&&!(navigator.cookieEnabled)){if(h.indexOf("#")>0)return 0;if(r&&h&&ktod(r)==ktod(h))return 0;return ktpd(h);}if(r&&h)return(ktod(r)!=ktod(h));return(h.indexOf("#")<0||ktpd(h));}function ktqd(name,val,safe){if(safe)if(ktzc(ktkd(name,-1),-1)>=val)return 1;return kted(name,val);}function ktod(u){var n=u.lastIndexOf("/");return(n>=0?u.substring(0,n):u);}function ktpd(u){var t=new Array("/","/index.htm","/");u=u.split("?")[0];u=u.split("#")[0];for(var i=0;i<t.length;i++)
if(u.lastIndexOf(t[i])==u.length-t[i].length)return 1;return 0;}ktce=new Array();function kto(){return ktrd(0,arguments);}function kt9a(){var v=new Array();for(var i=1;i<arguments.length;i++)v[i-1]=arguments[i];return ktrd(arguments[0],v);}function ktt(e,func){if(kt2(func))func=new Array(new Function(func),new Array());else if(!ktn(func))func=new Array(func,new Array());return kt9a(e,func[0],func[1]);}function ktrd(e,v){var n=v.length-2;var a=v[v.length-1];if(!ktu(ktce[n]))ktce[n]=new Array();if(!ktu(ktce[n][a.length]))ktsd(v);return(ktce[n][a.length])(e,v);}function ktsd(v){var a=v[v.length-1];var sn=kta;for(var i=1;i<=v.length-2;i++)sn+="v["+i+"],";var sa=kta;for(var i=0;i<=a.length-1;i++)sa+="v[v.length-1]["+i+"],";var ss=sn+sa;if(ss.length)ss=ss.substring(0,ss.length-1);var sf="if(e){var n=kttd(e,'kl_apply_tmp');e[n]=v[0];"+"var t=e[n]("+ss+");e[n]=0;return t;}"+"var f=v[0];return f("+ss+");";ktce[v.length-2][a.length]=new Function("e","v",sf);}function kttd(e,prefix){for(var i=0;i<100000;i++)if(!e[prefix+i])return prefix+i;return prefix+0;}function ktud(s){if(KL_IE5||KL_NS6||KL_OP6)s="try{"+s+"}catch(ktvd){ktvd}";return eval(s);}KL_FRAMES=0;KL_MSG_FOCUS_EN="Focus Changed to ";function ktwd(){var frms=KL_FRAMES;if(!frms)frms=parent.frames;if(!frms)return;var len=frms.length;var fwin=0;for(var i=0;i<len;i++)
if(frms[i]==self){fwin=frms[(i+1)%len];break;}if(fwin&&fwin.focus){kl_status(ktxd("FOCUS")+fwin.name);fwin.focus();}}function ktyd(max,prefix){if(!kt2(prefix))prefix="kl_";KL_SEC_NAMES=new Array();for(var i=0;i<max;i++)KL_SEC_NAMES[i]=prefix+kt4b(i);}function ktzd(t){var secn;var name;if(kt2(t)){secn=kt0d(t);name=t;}else{secn=t;name=kt1d(t);}if(KL_OP6)ktde=name;else ktde=0;kt2d(secn,name);}function kt3d(){if(!KL_ACTIVE)return true;if(KL_IE5&&!KL_IE4M&&!KL_SEC_BASIC)kt4d(kt5d(),0);return true;}function kt6d(){s=kta;if(navigator.browserLanguage)s=navigator.browserLanguage;else if(navigator.language)s=navigator.language;return s.substring(0,2);}function kt7d(u){var t=u.split("://");if(t.length<=1)return 0;t=t[1].split("/");return t[0];}kl_timer_start=ktm;kl_apply=kto;kl_timer_new=ktp;kl_timer_rewind=ktq;kl_timer_restart=ktr;kl_timer_stop=kts;kl_apply2v=ktt;kl_timer_set=ktw;kl_timer_setscale=ktx;kl_timer_step=kty;kl_timer_set_raw=kt0;kl_timer_moving=kt3;kl_tmfunc=kt4;kl_getimg=kt5;kl_drag_set=ktca;kl_layer_x=ktma;kl_elem_x=ktna;kl_layer_y=ktoa;kl_elem_y=ktpa;kl_layer_moveto=ktra;kl_raise_set=ktsa;kl_layer_setzindex=ktya;kl_alt=ktza;kl_vget=kt0a;kl_vset=kt2a;kl_vadd=kt3a;kl_vset2s=kt4a;kl_vset2=kt5a;kl_apply2=kt9a;kl_load_image=ktab;kl_load_image2=ktbb;kl_load_script=ktcb;kl_layer_new=ktdb;kl_layer_write=kteb;kl_tlayer_new=ktfb;kl_layer_setpos=ktib;kl_elem_width=ktjb;kl_elem_height=ktkb;kl_tlayer_update=ktlb;kl_tlayer_update_size=ktmb;kl_layer_resizeto=ktnb;kl_tlayer_show=ktob;kl_layer_show=ktpb;kl_tlayer_hide=ktqb;kl_layer_hide=ktrb;kl_tlayer_moveto=ktsb;kl_tlayer_setpos=kttb;kl_tlayer_moveby=ktub;kl_layer_moveby=ktvb;kl_tlayer_write=ktwb;kl_tlayer_visible=ktxb;kl_layer_visible=ktyb;kl_fullscreen=ktzb;kl_screenwidth=kt0b;kl_screenheight=kt1b;kl_open=kt2b;kl_replace=kt9b;kl_elem_xy=ktbc;kl_layer_width=ktcc;kl_layer_height=ktdc;kl_layer_visibility=kthc;kl_layer_fgcolor=ktic;kl_layer_bgcolor=ktjc;kl_layer_bgimage=ktkc;kl_layer_setfgcolor=ktlc;kl_layer_setbgcolor=ktmc;kl_layer_setbgimage=ktnc;kl_layer_resizeby=ktoc;kl_layer_setpos_raw=ktpc;kl_layer_centralize=ktwc;kl_layer_setclip=ktxc;kl_layer_opacity=ktyc;kl_layer_setopacity=kt1c;kl_layer_setopacity_ok=kt2c;kl_layer_load=kt4c;kl_pref_set=kted;kl_pref_del=ktgd;kl_pref_get=ktkd;kl_pref_avail=ktld;kl_pref_qn=ktmd;kl_pagedir=ktod;kl_isdir=ktpd;kl_pref_sn=ktqd;kl_apply_raw=ktrd;kl_eval=ktud;kl_changefocus=ktwd;kl_sec_names_set_old=ktyd;kl_gt=ktzd;kl_onscroll=kt3d;kl_lang=kt6d;kl_hostname=kt7d;