<?php


include $INCLUDEPATH."local.php";
//include $INCLUDEPATH."_layout_template.php";

header("X-XSS-Protection:0;");

$CURRENTDIRECTORY=$q->pdir;
include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/dx.php";
if($q->get_dir()==3){
  $FLAG=1;
  $TABLE=$CURRENTDIRECTORY;
  include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/controller.php";
  include $INCLUDEPATH."lib.php";
}else{
  include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/controller.php";
}

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
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="/shared/cms/css/base.css" >
  <link rel="stylesheet" href="/shared/cms/css/input.css" >
  <link rel="stylesheet" href="/shared/cms/css/j.css" >
  <script src="/shared/cms/js/jquery-1.11.0.min.js"></script>
  <script src="/shared/cms/js/jquery.cookie.js" type="text/javascript"></script>
  <script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
  <script src="/shared/cms/js/swfobject.js" type="text/javascript"></script>
  <script src="/shared/cms/js/base.js"></script>
  <script src="/shared/cms/ckeditor/ckeditor.js" type="text/javascript"></script>
  <script src="//maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
  <script src="/shared/cms/js/ut.php" type="text/javascript"></script>
  <script src="/shared/cms/js/ut.js" type="text/javascript"></script>
  <script type="text/javascript">
      var dir=<?=$q->get_dir()?>;
      var fil=<?=$q->get_file()?>;
      var cid=<?=$_GET["cid"]?$_GET["cid"]:0?>;
      var rid=<?=$_GET["rid"]?$_GET["rid"]:0?>;
      var cd="<?=$TABLE?>";
      var ct="<?=date("Y/m/d H:i:s")?>";
  </script>
  <link rel="stylesheet" href="/shared/cms/css/lightbox.css" type="text/css" media="screen" >
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script>
    <?php
    $array_month_day = explode('/', $date);
    ?>
    $( function() {
        $( "#toj-datepicker" ).datepicker({
            setDate : "<?php echo $date ?>/<?php echo date('Y')?>",
            dateFormat : "mm/dd",
        });
    } );
  </script>

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
  <form name="f" enctype="multipart/form-data" action='' method="post">
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

    <div id="mainArea">
      <div id="pageDescription" class="clearfix">
        <?php include $INCLUDEPATH."__layout_description.php"; ?>
      </div><!-- End pageDescription -->
      <div class="row">
        <div class="col-sm-12">
          <a href="/editdm/tour_of_japan/edit/"> > スポーツブル 編集</a>
          <p>アーカイブ検索: <input type="text" id="toj-datepicker" readonly></p><br/>

          <div class="card bg-light mb-6">
            <div class="card-header" id="toj-card-header">反映中のスポーツブル live.json</div>
            <div class="card-body">
              <pre class="card-text"><code id="toj-json" class="language-html" data-lang="html"></code></pre>
            </div>
          </div>
          <input type="button" class="btn btn-secondary btn-block" value="スポーツブル 本番反映" onclick="archive2prd();"/>
        </div>
      </div>

      <div class="debug"><?php include $INCLUDEPATH."__debugcode.php"; ?></div>
      <div id="pageCommand">
        <?php include $INCLUDEPATH."__layout_footer.php"; ?>
      </div>
    </div>
    <?php include $INCLUDEPATH."js.php"; ?>
  </form>
</div>
<div class="optionselbg"></div>

<script type="text/javascript">
    var get_api = "<?=$GET_TOJ_API?>";
    // 初回
    getJson(get_api);

    // アーカイブ検索
    $('#toj-datepicker').change(function () {
        var archive_api = get_api + '/' + document.getElementById('toj-datepicker').value;
        getJson(archive_api);
        var title = document.getElementById('toj-datepicker').value;
        $('#toj-card-header').text(title + 'のスポーツブル アーカイブ');

    });

    function jsonPreview(data, au_flag) {
          $('#toj-json').text(data);
    }
    function getJson(url, au_flag=false) {
        jsonPreview('読み込み中です...', au_flag);

        $.ajax({
            url: url,
            type: 'GET',
            dateType: 'json',
            timeout: 10000,
            success: function (data) {
                jsonPreview(data, au_flag)
            },
            error: function () {
                // リロード
                if (au_flag) {
                    getJson(url, au_flag);
                } else {
                    getJson(url);
                }
            }
        });
    }

    // 本番反映
    function archive2prd(au_flag = false) {

        var date = document.getElementById('toj-datepicker').value;
        var api = "<?= $ARCHIVE_TOJ_TO_PRODUCTION_API ?>"

        api = api + '/' + date;
        console.log(api);

        $.ajax({
            url: api,
            type: 'GET',
            dateType: 'json',
            timeout: 10000,
            success: function (data) {
                if (data.existArchivedJson == false) {
                    alert('アーカイブファイルが存在しません。');
                } else {
                    alert('本番反映しました。');
                }
            },
            error: function () {
                alert('反映に失敗しました。');
            }
        });
    }

</script>
</body>
</html>
