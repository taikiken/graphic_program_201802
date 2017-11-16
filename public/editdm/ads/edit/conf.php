<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || isset($_POST['ads']) === "false") {
    header("Location: ../edit");
    exit;
}

include $INCLUDEPATH . "local.php";

$ads_text = $_POST['ads'];

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
        <form name="f" action="./exe.php" method="post">
            <div id="mainArea">
                <div id="pageDescription" class="clearfix">
                    <p>新規ads.txtを登録します。</p>
                </div>
                <!-- End pageDescription -->
                <table border="0" cellspacing="0" cellpadding="0" summary="ads.text設定項目" class="listTable">
                    <tbody>
                        <tr class="bottomborder">
                            <td class="inputFields"><?php echo nl2br(htmlspecialchars($ads_text)); ?></td>
                            <textarea class="hidetd" name="ads"><?php echo htmlspecialchars($ads_text); ?></textarea>
                        </tr>
                    </tbody>
                </table>
                <div class="debug">
                </div>
                <div id="pageCommand">
                    <table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td align="left" class="bg">
                                    <a href="javascript:go_back('.')"><img src="/shared/cms/img/btn_modify.gif" alt="エントリの内容を修正する" width="150" height="25" class="rollover2" style="opacity: 1;"></a>
                                    <td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_edit2.gif" alt="エントリの編集を確定する" width="150" height="25" class="rollover2" style="opacity: 1;"></td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </div>
</body>
</html>