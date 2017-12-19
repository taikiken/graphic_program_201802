<?php
include $INCLUDEPATH."local.php";
date_default_timezone_set('Asia/Tokyo');
header("X-XSS-Protection:0;");
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
  <?php if($q->get_dir()!==3): ?>
  <link rel="stylesheet" href="/shared/cms/css/input.css" >
  <?php endif; ?>

  <?php if($BILLINGUAL==0): ?>
  <link rel="stylesheet" href="/shared/cms/css/j.css" >
  <?php endif; ?>
  <script src="/shared/cms/js/jquery-1.11.0.min.js"></script>
  <script src="/shared/cms/js/jquery.cookie.js" type="text/javascript"></script>
  <script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
  <script src="/shared/cms/js/swfobject.js" type="text/javascript"></script>
  <script src="/shared/cms/js/base.js"></script>
  <script src="/shared/cms/ckeditor/ckeditor.js" type="text/javascript"></script>

  <?php if($q->get_file()==0||$q->get_file()==1): ?>
  <script src="/shared/cms/js/<?=$CMSJS?>.php" type="text/javascript"></script>
  <script src="/shared/cms/js/<?=$CMSJS?>.js" type="text/javascript"></script>
  <?php endif; ?>
  <link rel="stylesheet" href="/shared/cms/css/lightbox.css" type="text/css" media="screen" >

  <title><?php printf("%s-%s｜%s｜%sWEB サイト管理画面",$THIS,$q->exe_fl(),$PARENT,$SITE); ?></title>
  <script type="text/javascript">
    var dir=<?=$q->get_dir()?>;
    var fil=<?=$q->get_file()?>;
    var cid=<?=$_GET["cid"]?$_GET["cid"]:0?>;
    var rid=<?=$_GET["rid"]?$_GET["rid"]:0?>;
    var cd="<?=$TABLE?>";
    var ct="<?=date("Y/m/d H:i:s")?>";
  </script>
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
      <li class="def2">平昌五輪メダル数管理</li>
      <table class="listTable">
        <tr>
          <th>更新日時</th>
          <td>
            <select name="target_year" id="target_year">
            <?php for($year=2018; $year <= 2018; $year++):?>
              <option value="<?php echo $year;?>" <?php if($year == date('Y')):?> selected="selected" <?php endif;?> ><?php echo $year;?></option>
            <?php endfor;?>
            </select>年
            <select name="target_month" id="target_month">
            <?php for($month=1; $month <= 12; $month++):?>
            <option value="<?php echo sprintf('%02d', $month)?>" <?php if($month == date('n')):?> selected="selected" <?php endif;?>><?php echo $month?></option>
            <?php endfor;?>
            </select>月
            <select name="target_date" id="target_date">
            <?php for($date=1; $date <= 31; $date++):?>
            <option value="<?php echo sprintf('%02d', $date)?>" <?php if($date == date('j')):?> selected="selected" <?php endif;?>><?php echo $date?></option>
            <?php endfor;?>
            </select>日
            <select name="target_hour" id="target_hour">
            <?php for($hour=1; $hour <= 24; $hour++):?>
            <option value="<?php echo sprintf('%02d', $hour)?>" <?php if($hour == date('G')):?> selected="selected" <?php endif;?>><?php echo $hour?></option>
            <?php endfor;?>
            </select>時
            <select name="target_minutes" id="target_minutes">
            <?php for($minutes=1; $minutes <= 59; $minutes++):?>
            <option value="<?php echo sprintf('%02d', $minutes)?>" <?php if($minutes == intval(date('i'))):?> selected="selected" <?php endif;?>><?php echo $minutes?></option>
            <?php endfor;?>
            </select>分

          </td>
        </tr>
        <tr>
          <th>金</th>
          <td><input type="text" name="gold" maxlength="2" width="50" style="text-align:right;width: 60px;" value="0"/>&nbsp;個</td>
        </tr>
        <tr>
          <th>銀</th>
          <td><input type="text" name="silver" maxlength="2" width="50" style="text-align:right;width: 60px;" value="0"/>&nbsp;個</td>
        </tr>
        <tr>
          <th>銅</th>
          <td><input type="text" name="bronze" maxlength="2" width="50" style="text-align:right;width: 60px;" value="0"/>&nbsp;個</td>
        </tr>
        <tr>
          <td colspan="2">
            <a id="save_json" href="javascript:void(0);">
            保存
            </a>
          </td>
        </tr>
      </table>
    </ul>
  </div><!-- End topicPath -->
</div>

<div class="optionselbg"></div>

<script type="text/javascript">
  $(function(){
    $("#save_json").click(function(){
      var data = {};
      $.each($('select'), function(){
        data[$(this).attr("name")] = $(this).val();
      });
      $.each($('input'), function(){
        data[$(this).attr("name")] = $(this).val();
      });
      data['type'] = 'regist';
      $.ajax({
        type: "GET",
        url: "/api/editdm/pyeongchang/medals.php",
        data: data,
        dataType: "json"
      });
    });
  });
</script>
</body>
</html>