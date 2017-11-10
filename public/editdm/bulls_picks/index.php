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
        $( "#spb-datepicker" ).datepicker({
            setDate : "<?php echo $date ?>/<?php echo date('Y')?>",
            dateFormat : "mm/dd",
        });
        $( "#au-datepicker" ).datepicker({
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
        <div class="col-sm-6">
          <a href="/editdm/bulls_picks/edit/"> > スポーツブル 編集</a>
          <p>アーカイブ検索: <input type="text" id="spb-datepicker" readonly></p><br/>

          <div class="card bg-light mb-3">
            <div class="card-header">スポーツブル picks.xml</div>
            <div class="card-body">
              <pre class="card-text"><code id="spb-xml" class="language-html" data-lang="html"></code></pre>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <a href="/editdm/bulls_picks/au/edit/"> > au 編集</a>
          <p>アーカイブ検索: <input type="text" id="au-datepicker" readonly></p><br/>

          <div class="card bg-warning mb-3">
            <div class="card-header">au picks.xml</div>
            <div class="card-body">
              <pre class="card-text"><code id="au-xml" class="language-html" data-lang="html"></code></pre>
            </div>
          </div>
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

<?php
//$S3Module = new S3Module;
//$get_api = $S3Module->getUrl($PICKS_FILENAME);
?>
<script type="text/javascript">
    var get_api = "<?=$GET_PICKS_API?>";
    var get_au_api = "<?=$GET_AU_PICKS_API?>";
    // 初回
    getXml(get_api);
    getXml(get_au_api, true);

    // アーカイブ検索
    $('#spb-datepicker').change(function () {
        var archive_api = get_api + '?date=' + document.getElementById('spb-datepicker').value;
        getXml(archive_api);
    });
    $('#au-datepicker').change(function () {
        var archive_api = get_au_api + '?date=' + document.getElementById('au-datepicker').value;
        getXml(archive_api, true);
    });

    function getXml(url, au_flag=false) {
        $.ajax({
            url: url,
            type: 'GET',
            dateType: 'xml',
            timeout: 1000,
            success: function (data) {
                if (au_flag) {
                    $('#au-xml').text(data);
                } else {
                    $('#spb-xml').text(data);
                }
            },
            error: function () {
                // リロード
                if (au_flag) {
                    $('#au-xml').append(getXml(url, au_flag));
                } else {
                    $('#spb-xml').append(getXml(url));
                }
            }
        });
    }

</script>
</body>
</html>
