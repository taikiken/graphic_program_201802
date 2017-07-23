<?php

header("X-XSS-Protection:0;");

$CURRENTDIRECTORY = $q->pdir;
include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/dx.php";
$FLAG=1;
$TABLE=$CURRENTDIRECTORY;
include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/controller.php";
include $INCLUDEPATH."lib.php";

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
<meta name="robots" content="noindex,nofollow" >
<meta name="robots" content="noarchive" >
<meta http-equiv="Pragma" content="no-cache" >
<meta http-equiv="Cache-Control" content="no-cache" >
<meta http-equiv="Content-Style-Type" content="text/css" >
<meta http-equiv="Content-Script-Type" content="text/javascript" >
<link rel="stylesheet" href="/shared/cms/css/base.css" >
<link rel="stylesheet" href="/shared/cms/css/input.css" >
<link rel="stylesheet" href="/shared/cms/css/j.css" >
<script src="/shared/cms/js/jquery-1.11.0.min.js"></script>
<script src="/shared/cms/js/jquery.cookie.js" type="text/javascript"></script>
<script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
<script src="/shared/cms/js/swfobject.js" type="text/javascript"></script>
<script src="/shared/cms/js/base.js"></script>
<script src="/shared/cms/ckeditor/ckeditor.js" type="text/javascript"></script>
<?php if($q->get_file()==0||$q->get_file()==1){ ?>
<script src="//maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
<script src="/shared/cms/js/<?=$CMSJS?>.php" type="text/javascript"></script>
<script src="/shared/cms/js/<?=$CMSJS?>.js" type="text/javascript"></script>
<?php } ?>
<script type="text/javascript">
var dir=<?=$q->get_dir()?>;
var fil=<?=$q->get_file()?>;
var cid=<?=$_GET["cid"]?$_GET["cid"]:0?>;
var rid=<?=$_GET["rid"]?$_GET["rid"]:0?>;
var cd="<?=$TABLE?>";
var ct="<?=date("Y/m/d H:i:s")?>";
</script>
<?php if($q->get_dir()==2){ ?>
<style type="text/css" media="all">
#loadingDiv{
	display:none;
}
#pageDescription,.listTable{
	display:none;
}
.chbtn{
	display:none;
}
</style>
<?php } ?>
<?php if($q->get_file()==1){ ?>
<style type="text/css" media="all">
#loadingDiv{
	display:block;
}
#pageDescription,.listTable{
	display:none;
}
.chbtn{
	display:none;
}
</style>
<?php } ?>
<link rel="stylesheet" href="/shared/cms/css/lightbox.css" type="text/css" media="screen" >
<title><?php printf("%s-%s｜%s｜%sWEB サイト管理画面",$THIS,$q->exe_fl(),$PARENT,$SITE); ?></title>
</head>
<body>
<div id="wrapper">
<div class="clearfix headermenu">
<?php include "langswitch.php" ?>
<ul class="utilityMenu clearfix">
<li><a href="<?=$ADPATH?>logout/">ログアウト</a></li>
<li><a href="<?=$ADPATH?>log/">操作履歴</a></li>
</ul>
</div>
<div id="headerArea">
<div id="expBox" class="br">

<div id="titleBox">

<h1 class="clearfix">
<ul class="pnkz clearfix">
<?php include "glmenu.php" ?>
</ul>
</h1>
</div><!-- End titleBox -->
</div><!-- End expBox -->
</div><!-- End headerArea -->
<div id="topicPath">
<ul>
<?=implode("",$l)?>
<li class="def2"><?=$THIS?>：<?=$q->chk_pos()?></li>
</ul>
</div><!-- End topicPath -->
<?php if($q->get_dir()==3){ ?>
<div id="helpExp">
<p><img src="/shared/cms/img/cmd_up.gif" alt="一つ上へ" width="13" height="13" >は並び順を一つ上に、<img src="/shared/cms/img/cmd_down.gif" alt="一つ下へ" width="13" height="13" >は一つ下に入れ替えます。</p>
</div><!-- End helpExp -->
    <div id="image_upload_section">
        <div id="drop" style="width:1094px; height:150px; padding:10px; border:3px solid" ondragover="onDragOver(event)" ondrop="onDrop(event)" ondragleave="dragLeave(event)">
            ファイルをドラッグアンドドロップしてください。複数ファイル同時も対応しています。
        </div>
    </div>
<?php }elseif($q->get_dir()==1){ ?>
<div id="loadingDiv"><p class="swtxt">画像をリサイズしています.....</p></div>
<?php } ?>

<div id="mainArea">
<div id="pageDescription" class="clearfix">
<?php include $INCLUDEPATH."__layout_description.php"; ?>
</div><!-- End pageDescription -->
<?php if($q->get_dir()===3){ ?>
<div id="pageController">
<?php if($CURRENTDIRECTORY!="log"){ ?>
<?php if($CURRENTDIRECTORY=="mail"){ ?>
<?php }elseif($CURRENTDIRECTORY=="trackback"){ ?>
<?php }else{ ?>
<?php } ?>
<?php } ?>
<?php include $INCLUDEPATH."__layout_localmenu.php"; ?>
</div><!-- End pageController -->
<?php } ?>
<?php if($CURRENTDIRECTORY=="css_editor"&&$q->get_file()==0){ ?>
<div id="pageController">
<ul class="controllMenu">
<?php include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/local.php"; ?>
</ul>
</div><!-- End pageController -->
<?php }elseif($CURRENTDIRECTORY=="confs"&&$q->get_file()==0){ ?>
<div id="pageController">
<ul class="controllMenu">
<?php include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/local.php"; ?>
</ul>
</div><!-- End pageController -->
<?php } ?>
<table border="0" cellspacing="0" cellpadding="0" summary="<?=$THIS?><?=($q->get_dir()===3)?"一覧":sprintf("%s項目",$q->exe_fl())?>" class="listTable">
<tbody>
<?php
if($q->get_file()!=2)
{
    include $INCLUDEPATH."__layout_datatable_photo.php";
}
?>
<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td width="150" class="bg"><input id="caption_fix" name="imageField" type="image" src="/shared/cms/img/btn_input2.gif" alt="入力した内容を保存する" width="150" height="25" class="rollover2"></td>
</tr>
</tbody>
</table>
<div class="debug"><?php include $INCLUDEPATH."__debugcode.php"; ?></div>
<div id="pageCommand">
<?php include $INCLUDEPATH."__layout_footer.php"; ?>
</div>
</div>
<?php include $INCLUDEPATH."js.php"; ?>
<?php if($_POST["search"]==1){ ?>
<form name="ff">
<?php @echo_hidden($SEARCH); ?>
<input type="hidden" name="XXX" value="0" >
</form>
<?php } ?>
</div>
<?php if($q->get_dir()==0||$q->get_dir()==1||$q->get_dir()==3){ ?>
<div id="container" onclick="wrapperback()"></div>
<div id="flash"></div>
<div class="optionsel"><ul></ul></div>
<div id="flashimg"></div><div id="overwrap"></div><div class="lbbg"></div>
<div class="lenz"><img src="/shared/cms/img/large.png" alt="大きいサイズの画像を編集" title="大きいサイズの画像を編集" width="50" height="50" ></div>
<?php } ?>
<div class="optionselbg"></div>
<script type="text/javascript">
var fieldname="<?=$TITLEFIELDNAME?>";
var where="<?=$WHERE?>";
</script>
<script type="text/javascript">
    // File APIに対応していない場合はエリアを隠す
    if (!window.File) {
        document.getElementById('image_upload_section').style.display = "none";
    }

    // ブラウザ上でファイルを展開する挙動を抑止
    function onDragOver(event) {
        var css = {
            'border-color': '#ff0000',
            'background-color': '#f5f5dc'
        };
        $('#drop').css(css);
        event.preventDefault();
    }

    function dragLeave(event) {
        var css = {
            'border-color': '#000000',
            'background-color': '#ffffff'
        };
        $('#drop').css(css);
        event.preventDefault();
    }

    // Drop領域にドロップした際のファイルのプロパティ情報読み取り処理
    function onDrop(event) {
        // ブラウザ上でファイルを展開する挙動を抑止
        event.preventDefault();

        // ドロップされたファイルのfilesプロパティを参照
        var files = event.dataTransfer.files;
        var formData = new FormData();
        var vars = getUrlVars();
        var nid = vars.nid;
        formData.append('nid', nid);
        for (var i=0; i<files.length; i++) {
            // 一件ずつアップロード
            formData.append(i, files[i]);
        }
        var cnt = i;
        if(confirm(cnt + '件の画像をアップロードします')) {
            imageFileUpload(formData);
        }
    }

    // ファイルアップロード
    function imageFileUpload(formData) {

        $.ajax({
            type: 'POST',
            contentType: false,
            processData: false,
            url: '/api/uploader/image.php',
            data: formData,
            dataType: 'json',
            success: function(data) {
                alert('アップロード完了しました');
                location.reload();
            },
            error:function(err){
                console.log(err);
            }
        });
    }

    function getUrlVars(){
        var vars = {};
        var param = location.search.substring(1).split('&');
        for(var i = 0; i < param.length; i++) {
            var keySearch = param[i].search(/=/);
            var key = '';
            if(keySearch != -1) key = param[i].slice(0, keySearch);
            var val = param[i].slice(param[i].indexOf('=', 0) + 1);
            if(key != '') vars[key] = decodeURI(val);
        }
        return vars;
    }

    function deleteConfirm(id) {
        if(confirm('削除します。よろしいですか？')) {
            var vars = getUrlVars();
            var nid = vars.nid;
            var data = {
                id: id,
                nid:nid
            };
            $.ajax({
                type: 'POST',
                url: '/api/image/delete.php',
                data: data,
                dataType: 'json',
                success: function(data) {
                    $('#tr_' + id + '').remove();
                    alert('削除完了しました');
                    location.reload();
                },
                error:function(err){
                    console.log(err);
                }
            });
        }
    }

    $('#caption_fix').on('click', function(){
        var arr = [];
        $('.blockds').each(function(){
            var id = $(this).attr('id').split('_')[1];
            var caption = $(this).find('.caption').val();
            var row = {
                id:id,
                caption:caption
            };
            arr.push(row);
        });
        data = {
            data: arr
        };

        if(confirm('キャプションを登録します。よろしいですか？')) {
            $.ajax({
                type: 'POST',
                url: '/api/image/update.php',
                data: data,
                dataType: 'json',
                success: function(d) {
                    alert('登録しました');
                },
                error:function(err){
                    console.log(err);
                }
            });
        }
    });
</script>
</body>
</html>
