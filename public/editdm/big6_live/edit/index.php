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
          <table border="0" cellspacing="0" cellpadding="0" summary="<?=$THIS?><?=($q->get_dir()===3)?"一覧":sprintf("%s項目",$q->exe_fl())?>" class="listTable">
            <tbody>
            <!-- フォーム -->
            <?php
            echo <<<EOT
<th colspan="2" class="inputHeader" scope="row">live設定</th>
EOT;

            echo <<<EOT
<tr class="alt-large">
  <td class="inputTitle">デスクトップ画像のURL</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_alt-large" value="{$val["alt-large"]}" class="in q0" ></div>
  </td>
</tr>
EOT;

            echo <<<EOT
<tr class="alt-medium">
  <td class="inputTitle">モバイル画像のURL</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_alt-medium" value="{$val["alt-medium"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            echo <<<EOT
<tr class="error-large">
  <td class="inputTitle">デスクトップエラー時の画像のURL</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_error-large" value="{$val["error-large"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            echo <<<EOT
<tr class="error-medium">
  <td class="inputTitle">モバイルエラー時の画像のURL</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_error-medium" value="{$val["error-medium"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            echo <<<EOT
<tr class="interval">
  <td class="inputTitle">ポーリング</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_interval" value="{$val["interval"]}" class="in q0" ></div>
  </td>
</tr>
EOT;

            if($val["isPlaying"]){
              $isPlaying = "checked=\"checked\"";
              $isNotPlaying = null;
            } else {
              $isPlaying = null;
              $isNotPlaying = "checked=\"checked\"";
            }

            echo <<<EOT
<tr class="isPlaying">
  <td class="inputTitle">ライブステータス</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="radio" style="line-height: 20px; height: 20px;" name="p_isPlaying" value="中継中" class="in q0" {$isPlaying}>中継中
    <input type="radio" style="line-height: 20px; height: 20px;" name="p_isPlaying" value="中継中でない" class="in q0" {$isNotPlaying}>中継中でない
  </td>
</tr>
EOT;
            echo <<<EOT
<th colspan="2" class="inputHeader" scope="row">ブライトコープ設定</th>
EOT;

            echo <<<EOT
<tr class="video_id">
  <td class="inputTitle">ブライトコープvideoID</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_video_id" value="{$val["video_id"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            echo <<<EOT
<tr class="android">
  <td class="inputTitle">広告動画URL (android)</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_android" value="{$val["android"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            echo <<<EOT
<tr class="ios">
  <td class="inputTitle">広告動画URL (ios)</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_ios" value="{$val["ios"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            echo <<<EOT
<tr class="pc">
  <td class="inputTitle">広告動画URL (pc)</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_pc" value="{$val["pc"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            echo <<<EOT
<tr class="sp">
  <td class="inputTitle">広告動画URL (sp)</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_sp" value="{$val["sp"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            echo <<<EOT
<tr class="source">
  <td class="inputTitle">ソース</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_source" value="{$val["source"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
            for ($articles_itr = 0; $articles_itr < 4; $articles_itr++) {
              $view_id_count = $articles_itr + 1;
              echo <<<EOT
<th colspan="2" class="inputHeader" scope="row">PC ソース設定　$view_id_count</th>
EOT;
              echo <<<EOT
<tr class="label$articles_itr">
  <td class="inputTitle">ラベル</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_label$articles_itr" value="{$val["sources"][$articles_itr]["label"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
              if($val["sources"][$articles_itr]["default"]){
                $isDefault = "checked=\"checked\"";
                $isNotDefault = null;
              } else {
                $isDefault = null;
                $isNotDefault = "checked=\"checked\"";
              }

              echo <<<EOT
<tr class="default$articles_itr">
  <td class="inputTitle">デフォルトフラグ</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="radio" style="line-height: 20px; height: 20px;" name="p_default$articles_itr" value=true class="in q0" {$isDefault}>true
    <input type="radio" style="line-height: 20px; height: 20px;" name="p_default$articles_itr" value=false class="in q0" {$isNotDefault}>false
    </div>
  </td>
</tr>
EOT;
              $isSelected =[];
              for($res=0;$res<4;$res++){
                $isSelected[$res] = null;
                if($res == $val["sources"][$articles_itr]["res"]){
                  $isSelected[$res] = "selected=\"selected\"";
                }
              }

              echo <<<EOT
<tr class="res$articles_itr">
  <td class="inputTitle">優先順位</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <select name="p_res$articles_itr" class="in q0">
    <option value="0" {$isSelected[0]}>0</option>
    <option value="1" {$isSelected[1]}>1</option>
    <option value="2" {$isSelected[2]}>2</option>
    <option value="3" {$isSelected[3]}>3</option>
  </td>
</tr>
EOT;
              echo <<<EOT
<tr class="url$articles_itr">
  <td class="inputTitle">HLS動画URL</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_url$articles_itr" value="{$val["sources"][$articles_itr]["url"]}" class="in q0" ></div>
  </td>
</tr>
EOT;

            }
            for ($articles_itr_sp = 0; $articles_itr_sp < 3; $articles_itr_sp++) {
              $view_id_count_sp = $articles_itr_sp + 1;
              echo <<<EOT
<th colspan="2" class="inputHeader" scope="row">SP ソース設定　$view_id_count_sp</th>
EOT;
              echo <<<EOT
<tr class="sp_label$articles_itr_sp">
  <td class="inputTitle">ラベル</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_sp_label$articles_itr_sp" value="{$val["sources_sp"][$articles_itr_sp]["label"]}" class="in q0" ></div>
  </td>
</tr>
EOT;
              if($val["sources_sp"][$articles_itr_sp]["default"]){
                $isDefault = "checked=\"checked\"";
                $isNotDefault = null;
              } else {
                $isDefault = null;
                $isNotDefault = "checked=\"checked\"";
              }

              echo <<<EOT
<tr class="sp_default$articles_itr_sp">
  <td class="inputTitle">デフォルトフラグ</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
      <input type="radio" style="line-height: 20px; height: 20px;" name="p_sp_default$articles_itr_sp" value=true class="in q0" {$isDefault}>true
      <input type="radio" style="line-height: 20px; height: 20px;" name="p_sp_default$articles_itr_sp" value=false class="in q0" {$isNotDefault}>false
    </div>
  </td>
</tr>
EOT;

              $isSelectedSp =[];
              for($res=0;$res<4;$res++){
                $isSelectedSp[$res] = null;
                if($res == $val["sources_sp"][$articles_itr_sp]["res"]){
                  $isSelectedSp[$res] = "selected=\"selected\"";
                }
              }


              echo <<<EOT
<tr class="sp_res$articles_itr_sp">
  <td class="inputTitle">優先順位</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
        <select name="p_sp_res$articles_itr_sp" class="in q0">
    <option value="0" {$isSelectedSp[0]}>0</option>
    <option value="1" {$isSelectedSp[1]}>1</option>
    <option value="2" {$isSelectedSp[2]}>2</option>
  </td>
</tr>
EOT;
              echo <<<EOT
<tr class="sp_url$articles_itr_sp">
  <td class="inputTitle">HLS動画URL</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width: 500px; line-height: 20px; height: 20px;" name="p_sp_url$articles_itr_sp" value="{$val["sources_sp"][$articles_itr_sp]["url"]}" class="in q0" ></div>
  </td>
</tr>
EOT;

            }



            ?>
            <!-- End フォーム -->
            </tbody>
          </table>
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

</body>
</html>
