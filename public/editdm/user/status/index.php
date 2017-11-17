<?php
include $INCLUDEPATH."local.php";
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
<?php if($q->get_dir()!==3){ ?>
<link rel="stylesheet" href="/shared/cms/css/input.css" >
<?php } ?>
<?php if($BILLINGUAL==0){ ?>
<link rel="stylesheet" href="/shared/cms/css/j.css" >
<?php } ?>
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
<li class="def2">会員ステータス</li>
</ul>
</div><!-- End topicPath -->

<?php
$sql =<<<SQL
SELECT
  m.id AS id,
  m.t1,
  m.title,
  ms.kind,
  ms.created_at
FROM
  u_member m
  INNER JOIN u_member_signup ms ON(id = userid)
SQL;
$o->query($sql);
$res = $o->fetch_object();
?>

<div>
  <table style="width:100%;">
    <tr>
      <td style="width:50%;">
        <table class="listTable">
          <tr class="bottomborder">
            <th class="t_display">ユーザー名</td>
            <th class="t_display">メールアドレス</td>
            <th class="t_display">ステータス</td>
          </tr>
          <?php $i=0; while ($row = $o->fetch_object()): $i++;?>

          <?php
            if($i%2 == 0):
              $style = 'style="border-top: 1px dotted rgb(204, 204, 204); background-color: rgb(249, 249, 249);"';
            else:
              $style = 'style="border-top: 1px dotted rgb(204, 204, 204); background-color: #FFF"';
            endif;
          ?>

          <tr class="bottomborder">
            <th class="t_display" <?php echo $style?>><?php echo $row->title?></td>
            <th class="t_display" <?php echo $style?>><?php echo $row->t1?></td>
            <th class="t_display" <?php echo $style?>>
              <?php if($row->kind == 1):?> メール
              <?php elseif($row->kind == 2):?> Twitter
              <?php elseif($row->kind == 3):?> Facebook
              <?php elseif($row->kind == 11):?> Wow：メール
              <?php elseif($row->kind == 12):?> Wow：Twitter
              <?php elseif($row->kind == 13):?> Wow：Facebook
              <?php endif;?>
            </td>
          </tr>
          <?php endwhile;?>
        </table>
      </td>
      <td>
        <!-- <div style="margin-left:10px;">
          <p>aaaa</p>
        </div>
        <div style="margin-left:10px;">
          <p>aaaa</p>
        </div> -->
      </td>
    </tr>
  </table>
</div>

<div class="optionselbg"></div>
<script type="text/javascript">
var fieldname="<?=$TITLEFIELDNAME?>";
var where="<?=$WHERE?>";
</script>

</body>
</html>
