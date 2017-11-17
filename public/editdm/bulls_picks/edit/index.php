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
          $( "#datepicker" ).datepicker({
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
          <table border="0" cellspacing="0" cellpadding="0" summary="<?=$THIS?><?=($q->get_dir()===3)?"一覧":sprintf("%s項目",$q->exe_fl())?>" class="listTable">
            <tbody>
            <!-- フォーム -->

            <tr class="date">
              <td class="inputTitle">日付</td>
              <td class="inputFields">
                <div class="clearfix  fl langs">
                  <input type="text" id="datepicker" style="width:210px;" name="p_date"
                         value="<?php echo $date; ?>" class="in q0" readonly="readonly"></div>
              </td>
            </tr>
            <?php
            for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
              $view_id_count = $articles_itr + 1;
              echo <<<EOT
<tr>
  <th colspan="2" class="inputHeader" scope="row">記事{$view_id_count}
    <a href="javascript:void(0)" onclick="moveUp({$articles_itr})">
      <img src="/shared/cms/img/cmd_up.gif" width="13" height="13" alt="一つ上へ入れ替える" >
    </a>
    <a href="javascript:void(0)" onclick="moveDown({$articles_itr})">
      <img src="/shared/cms/img/cmd_down.gif" width="13" height="13" alt="一つ下へ入れ替える" >
    </a>
  </th>
</tr>
EOT;

              echo <<<EOT
<tr class="id{$articles_itr}">
  <td class="inputTitle">記事ID</td>
  <td class="inputFields">
    <div class="clearfix  fl langs">
    <input type="text" style="width:210px;" name="p_id{$articles_itr}" value="{$ids[$articles_itr]}" class="in q0" ></div>
  </td>
</tr>
EOT;

              for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
                $view_comment_count = $comment_itr + 1;
                echo <<<EOT
<tr class="comment{$articles_itr}{$comment_itr}">
  <td class="inputTitle">コメント{$view_comment_count}</td>
  <td class="inputFields">
    <div class="clearfix  fl langs"><input type="text" style="width:420px;" name="p_comment{$articles_itr}{$comment_itr}" value="{$comments[$articles_itr][$comment_itr]}" class="in q0"></div>
  </td>
</tr>
EOT;
                
              }
            }
            ?>
            <!-- End フォーム -->
            </tbody>
          </table>
        </div>
        <div class="col-sm-6">
          <div class="card bg-light mb-3">
            <div class="card-header">プレビュー</div>
            <div class="card-body">
              <pre class="card-text"><code id="preview-xml" class="language-html" data-lang="html"></code></pre>
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
    var get_tmp_api = "<?=$GET_TMP_PICKS_API?>";
    var post_api = "<?=$POST_TMP_PICKS_API?>";
    getXml(get_tmp_api); // 初回

    $('.in').change(function () {
        postXml(post_api, get_tmp_api);
    });

    function getXml(url) {
        $('#preview-xml').empty(); // 初期化

        $.ajax({
            url: url,
            type: 'GET',
            dateType: 'xml',
            timeout: 10000,
            success: function (data) {
//                var s = new XMLSerializer();
//                var xml = s.serializeToString(data);
//                $('#preview-xml').text(xml);
                $('#preview-xml').text(data);

            },
            error: function () {
                var sorry = '読み込めませんでした...';
                $('#preview-xml').text(sorry);
            }
        });
    }

    function postXml(post_api, get_tmp_api) {
        var data = $('form').serializeArray();

        $.ajax({
            url: post_api,
            type: 'POST',
            cache: false,
            data: data,
        }).done(function(){
            getXml(get_tmp_api); // post後の内容をgetしたい

        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log('failed');
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }


    function moveUp(article_id) {
        if (article_id > 0) {
            var serialize = $('form').serializeArray();
            var form_values = {};
            for (i in serialize) {
                var key = serialize[i]["name"];
                var value = serialize[i]["value"];
                form_values[key] = value;
            }

            var prev_article_id = article_id - 1;
            // 移動元から移動先へ
            document.getElementsByName('p_id' + prev_article_id)[0].value = form_values['p_id' + article_id];
            for (comment_itr = 0; comment_itr < 3; comment_itr++) {
                document.getElementsByName('p_comment' + prev_article_id + comment_itr)[0].value = form_values['p_comment' + article_id + comment_itr];
            }
            // 移動先の内容を移動元へ
            document.getElementsByName('p_id' + article_id)[0].value = form_values['p_id' + prev_article_id];
            for (comment_itr = 0; comment_itr < 3; comment_itr++) {
                document.getElementsByName('p_comment' + article_id + comment_itr)[0].value = form_values['p_comment' + prev_article_id + comment_itr];
            }

            postXml(post_api, get_tmp_api); // プレビューに反映
        }
    }


    function moveDown(article_id) {
        if (article_id < 4) {
            var serialize = $('form').serializeArray();
            var form_values = {};
            for (i in serialize) {
                var key = serialize[i]["name"];
                var value = serialize[i]["value"];
                form_values[key] = value;
            }

            var next_article_id = article_id + 1;
            // 移動元から移動先へ
            document.getElementsByName('p_id' + next_article_id)[0].value = form_values['p_id' + article_id];
            for (comment_itr = 0; comment_itr < 3; comment_itr++) {
                document.getElementsByName('p_comment' + next_article_id + comment_itr)[0].value = form_values['p_comment' + article_id + comment_itr];
            }
            // 移動先の内容を移動元へ
            document.getElementsByName('p_id' + article_id)[0].value = form_values['p_id' + next_article_id];
            for (comment_itr = 0; comment_itr < 3; comment_itr++) {
                document.getElementsByName('p_comment' + article_id + comment_itr)[0].value = form_values['p_comment' + next_article_id + comment_itr];
            }

            postXml(post_api, get_tmp_api); // プレビューに反映
        }
    }


</script>
</body>
</html>
