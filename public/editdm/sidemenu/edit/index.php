<?php
include $INCLUDEPATH . "local.php";

if (isset($_POST['sidemenu']) === false) {

    //sidemenu.jsonの取得
    $jsonfile = $ImgPath."/json/sidemenu.json";
    $sidemenu_text = get_contents($jsonfile);

    if (empty($sidemenu_text)) {
        $sidemenu_text = "";
    }else{
        $duplication_category = '';
        $duplication_livescore = '';
        
        $d = $sidemenu_text;
        $d = json_decode($d,true);

        //下タブの子の表示名を取得
$sql = <<<SQL
SELECT children.name, children.type FROM (
    SELECT * FROM bottom_tab_nodes n1
    INNER JOIN bottom_tab_categories c ON n1.bottom_tab_id = c.id AND n1.type = 2
    UNION ALL
    SELECT * FROM bottom_tab_nodes n2
    INNER JOIN bottom_tab_livescores l ON n2.bottom_tab_id = l.id AND n2.type = 1
) children
WHERE children.parent_tab_id IS NOT null
SQL;
        $o->query($sql);

        //重複の確認
        while($f=$o->fetch_array()){
            foreach ($d as $v) {
                foreach ($v['items'] as $value) {
                    if($value['title'] == $f['name']){
                        if($f['type'] === '1'){
                            $duplication_livescore .= $f['name'].'  ';
                        }else{
                            $duplication_category .= $f['name'].'  ';
                        }
                    }
                }
            }
        }

    }
} else {
    $sidemenu_text = $_POST['sidemenu'];
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
        <form name="f" action="./conf.php" method="post">
            <div id="mainArea">
                <div id="pageDescription" class="clearfix">
                    <p>新しく登録する際は、改行して空き行にjson形式で新規登録内容を入力してください。<br>特定行の削除は該当行を削除してください。</p>
                    <?php if(!empty($duplication_livescore)){ ?>
                    <br>
                    <div style="color:red;">
                    <p>下タブの速報タブと以下の表示名が重複しています。</p>
                    <?=$duplication_livescore?>
                    </div>
                    <?php } ?>
                    
                    <?php if(!empty($duplication_category)){ ?>
                    <br>
                    <div style="color:red;">
                    <p>下タブの競技タブと以下の表示名が重複しています。</p>
                    <?=$duplication_category?>
                    </div>
                    <?php } ?>
                </div>
                <!-- End pageDescription -->
                <table border="0" cellspacing="0" cellpadding="0" summary="sidemenu.text設定項目" class="listTable">
                    <tbody>
                        <tr class="bottomborder">
                            <td class="inputFields">
                                <textarea rows="30" name="sidemenu"><?php echo htmlspecialchars($sidemenu_text); ?></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="debug">
                </div>
                <div id="pageCommand">
                    <table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td align="left">
                                    <img src="/shared/cms/img/spacer.gif" alt="#" height="1">
                                </td>
                                <td width="160">
                                    <img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1">
                                </td>
                                <td width="150" class="bg">
                                    <input name="imageField" type="image" src="/shared/cms/img/btn_edit.gif" alt="編集した内容を確認する" width="150" height="25" class="rollover2">
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
