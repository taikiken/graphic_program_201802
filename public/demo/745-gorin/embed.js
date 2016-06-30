/*/////////////////////////////////////////////////////////////////////////
gorin.jp エンベッドプレイヤーJS
/////////////////////////////////////////////////////////////////////////*/

var _gorinjp_embed_css='common.css';
var _gorinjp_embed_jquery='//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
var _gorinjp_threshold_width=800; //横幅の閾値

(function(){
  //CSS読み込み
  var _style = document.createElement("link");
  _style.setAttribute("rel", "stylesheet");
  _style.setAttribute("href", _gorinjp_embed_css);
  document.getElementsByTagName("head")[0].appendChild(_style);
  //loading DIV
  var _container_=document.getElementById("_gorinjp_embedContainer");
  var _loading = document.createElement("div");
  _loading.setAttribute("class", "loading");
  _container_.appendChild(_loading);
  if( _container_.offsetWidth<_gorinjp_threshold_width ){
    _container_.classList.add('_sp')
  }

  //jQuery読み込まれていなかったら読み込む
  if(typeof jQuery == 'undefined'){
    var _script = document.createElement("script");
    _script.setAttribute("src", _gorinjp_embed_jquery);
    document.getElementsByTagName("head")[0].appendChild(_script);
  }

  //jQuery読み込まれてから処理
  var _timerId = setInterval(function() {
    if(typeof jQuery == 'undefined'){return}
    else{
      clearTimeout(_timerId);
      jQuery.noConflict();
      jQuery(function($){
        var _container=$('#_gorinjp_embedContainer');
        _container.fadeOut(150,function(){
          //embed src
          var html='<header><div class="_gorinjp_inner"><h1>gorin.jp</h1></div></header><!--番組--><section id="_gorinjp_program"><h2>OA情報</h2><div class="_gorinjp_inner"><div class="_gorinjp_now"><h3 class="_gorinjp_arr">放送中</h3><p><span class="_gorinjp_tv">TBS系列</span> 午後7:00〜柔道女子48kg級　ああああああああああああああああああああああああああ</p></div><div class="_gorinjp_next"><h3 class="_gorinjp_arr">次の番組</h3><p><span class="_gorinjp_tv">日本テレビ系列</span> 午後9:00〜柔道女子48kg級　ああああああああああああああああああああああああああ</p></div></div></section><!--動画--><section id="_gorinjp_video"><h2>gorin video</h2><div class="_gorinjp_inner"><!--player--><div class="_gorinjp_player"><object><div class="_gorinjp_playerIn"><div style="display: block; position: relative;max-width:100%;"><div style="padding-top: 56.25%;"><video id="BCP" data-playlist-id="4907786589001" data-account="4774017240001" data-player="HyrfyibX" data-embed="default" class="video-js" controls style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;"></video><script src="//players.brightcove.net/4774017240001/HyrfyibX_default/index.min.js"></script></div></div></div><ol class="vjs-playlist"></ol></object><p></p></div></div></section><!--menu--><nav id="_gorinjp_menu"><div class="_gorinjp_inner"><h2 class="_gorinjp_arr">menu</h2><!--大会日程--><div class="_gorinjp_selectbox"><select name="date"><option value="">大会日程を選ぶ</option><option value="value">8月5日</option><option value="value">8月6日</option><option value="value">8月7日</option><option value="value">8月8日</option></select></div><!--注目選手（男子）--><div class="_gorinjp_selectbox"><select name="date"><option value="">注目選手（男子）</option><option value="value">選手名選手名</option><option value="value">選手名選手名</option><option value="value">選手名選手名</option><option value="value">選手名選手名</option></select></div><!--注目選手（女子）--><div class="_gorinjp_selectbox"><select name="date"><option value="">注目選手（女子）</option><option value="value">選手名選手名</option><option value="value">選手名選手名</option><option value="value">選手名選手名</option><option value="value">選手名選手名</option></select></div><!--注目競技--><div class="_gorinjp_selectbox"><select name="date"><option value="">注目競技</option><option value="value">競技名競技名</option><option value="value">競技名競技名</option><option value="value">競技名競技名</option><option value="value">競技名競技名</option></select></div></div></nav><footer><div class="_gorinjp_inner"><a href="URL">ハイライト動画はこちら！gorin.jpで配信中</a></div></footer>';
          _container.append(html);
          //演出
          _container.find('.loading').remove();
          $(this).fadeIn();

          var _timerId2 = setInterval(function() {
            if(typeof videojs == 'undefined'){return}
            else{
              clearTimeout(_timerId2);
              //jQuery.cookie読み込まれていなかったら読み込む
              if(typeof $.cookie == 'undefined'){
                var __script = document.createElement("script");
                __script.setAttribute("src", '//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js');
                document.getElementsByTagName("head")[0].appendChild(__script);
              }
              var _timerId3 = setInterval(function() {
                if(typeof $.cookie == 'undefined'){return}
                else{
                  clearTimeout(_timerId3);
                  videojs('BCP').ready(function(){
                    var myPlayer = this;
                    //VRプラグイン初期化
                    myPlayer.on("loadedmetadata", function() {
                      //var videoDTO = myPlayer.mediainfo; // 動画メタデータの取得
                      var options = {"vr_tagid2": _vr_tagid2 };
                      if(_vr_opt6!=undefined){
                        var options = {"vr_opt6": _vr_opt6 };
                      }
                      myPlayer.bcTracker(options);
                    });
                    myPlayer.on('loadstart',function(){
                      $('._gorinjp_player>p').html(myPlayer.mediainfo.name).animate({'opacity':1});
                      $('#_gorinjp_video ._gorinjp_playerIn').animate({'opacity':1});
                      //音量・ミュート反映
                      if($.cookie('bcvolume')!='undefined'){myPlayer.volume($.cookie('bcvolume'))}
                      if($.cookie('bcmute')=='true'){myPlayer.muted(true)}
                    })
                    //音量・ミュート保存
                    myPlayer.on('volumechange', function( evt ){
                      $.cookie('bcvolume', myPlayer.volume(), {expires:1, path:'/'});
                      $.cookie('bcmute', myPlayer.muted(), {expires:1, path:'/'});
                    })
                  });
                }
              },200);
            }
          },200);
        });

        //機種判別
        var ua={};ua.name=window.navigator.userAgent.toLowerCase(),ua.isIE=ua.name.indexOf("msie")>=0||ua.name.indexOf("trident")>=0,ua.isiPhone=ua.name.indexOf("iphone")>=0,ua.isiPod=ua.name.indexOf("ipod")>=0,ua.isiPad=ua.name.indexOf("ipad")>=0,ua.isiOS=ua.isiPhone||ua.isiPod||ua.isiPad,ua.isAndroid=ua.name.indexOf("android")>=0,ua.isTablet=ua.isiPad||ua.isAndroid&&ua.name.indexOf("mobile")<0,ua.isIE&&(ua.verArray=/(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name),ua.verArray&&(ua.ver=parseInt(ua.verArray[2],10))),ua.isiOS&&(ua.verArray=/(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name),ua.verArray&&(ua.ver=parseInt(ua.verArray[2],10))),ua.isAndroid&&(ua.verArray=/(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name),ua.verArray&&(ua.ver=parseInt(ua.verArray[2],10)));
        if (/android/.test(ua.name) && /linux; u;/.test(ua.name)) { ua.isAndroidBrowser = true }

        //リサイズで実行
        $(window).resize(function(){
          _setLayout();
        });
        //横幅が閾値以下だったらbody classに_sp
        function _setLayout(){
          if(_container.width()<_gorinjp_threshold_width){_container.addClass('_sp')}
          else{_container.removeClass('_sp')}
        }

        //VR用変数
        var _vr_tagid2;
        if(ua.isiOS){_vr_tagid2='2002'}
        else if(ua.isAndroid){_vr_tagid2='2003'}
        else{_vr_tagid2='0001'}
        var _vr_opt6;
        if($('#_gorinjp_embedContainer').size()){
          _vr_opt6=$('#_gorinjp_embedContainer').attr('class');
        }
        console.log('_vr_tagid2',_vr_tagid2)
        console.log('_vr_opt6',_vr_opt6)
      });
    }
  },1200);
})();
