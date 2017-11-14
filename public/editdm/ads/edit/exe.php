<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || isset($_POST['ads']) === "false") {
    header("Location: ../edit");
    exit;
}
include $INCLUDEPATH . "local.php";

$ads_text = $_POST['ads'];
$file_name = $_SERVER['DOCUMENT_ROOT'] . '/ads.txt';

$file_put_message = "登録しました。";
if (file_put_contents($file_name, $ads_text) === false) {
    $file_put_message = "登録に失敗しました。";
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
<meta name="robots" content="noindex,nofollow" >
<meta name="robots" content="noarchive" >
<link rel="stylesheet" href="/shared/cms/css/base.css" >
    <?php if ($BILLINGUAL == 0) { ?>
        <link rel="stylesheet" href="/shared/cms/css/j.css" >
    <?php } ?>
    <script src="/shared/js/jquery-1.11.0.min.js" type="text/javascript"></script>
    <script src="/shared/js/jquery.cookie.js" type="text/javascript"></script>
    <script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
    <script src="/shared/cms/js/base.js"></script>
    <?php if ($q->get_file() == 0 || $q->get_file() == 1) { ?>
        <script src="/shared/cms/js/<?= $CMSJS ?>.php" type="text/javascript"></script>
        <script src="/shared/cms/js/<?= $CMSJS ?>.js" type="text/javascript"></script>
    <?php } ?>
    <title><?php printf("%s WEB サイト管理画面",$SITE); ?></title>
</head>
<body>
    <style>
        .message-area{
            margin: 0 250px;
        }
        .message-area > div{
            margin-top: 200px;
        }
        
        .message{
            font-size: 180%;
            color: #636363;
        }
        .text-link{
            font-size: 180%;
        }
        .text-right{
            text-align: right; 
        }
    </style>
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
        <div id="pageDescription" class="clearfix">
            <p>下のメニューから管理する項目を選択してください。</p>
        </div>
        <div class="message-area">
            <div class="message"><?php echo $file_put_message; ?></div>
            <div class="text-right">
                <a class="text-link" href="/editdm/ads/edit">入力画面に戻る</a>
            </div>
        </div>
    </div>
</body>
</html>
