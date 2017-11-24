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

<div style="margin-bottom: 12px;">
  <table style="width:100%;">
    <tr>
      <td style="vertical-align: top; width:50%;">
        <table class="listTable">
          <tr class="bottomborder">
            <th class="t_display">ユーザー名</td>
            <th class="t_display">メールアドレス</td>
            <th class="t_display">ステータス</td>
          </tr>
          <tbody class="list-container">
          </tbody>
          <tfoot>
            <tr>
              <td class="pagenation" colspan="3">
              </td>
            </tr>
          </tfoot>
        </table>
      </td>
      <td style="vertical-align: top;">
        <table class="listTable">
          <tr>
            <th></th>
            <th class="t_display">通常</th>
            <th class="t_display">Wow</th>
          </tr>
          <tr>
            <th class="t_display">メール</th>
            <th class="t_display even">0</th>
            <th class="t_display even">0</th>
          </tr>
          <tr>
            <th class="t_display">Twitter</th>
            <th class="t_display even">0</th>
            <th class="t_display even">0</th>
          </tr>
          <tr>
            <th class="t_display">Facebook</th>
            <th class="t_display even">0</th>
            <th class="t_display even">0</th>
          </tr>
        </table>

        <!-- <?php $start_year = 2014?>

        <div style="margin: 20px 0 10px 0; text-align: right;">
          <select name="target_year" id="target_year">
            <?php for($year=$start_year; $year <= $start_year+5; $year++):?>
            <option value="<?php echo $year;?>"><?php echo $year;?></option>
            <?php endfor;?>
          </select>年
          <select name="target_month" id="target_month">
          <?php for($month=1; $month <= 12; $month++):?>
          <option value="<?php echo $month?>"><?php echo $month?></option>
          <?php endfor;?>
          </select>月
          <select name="target_date" id="target_date">
            <?php for($date=1; $date <= 31; $date++):?>
            <option value="<?php echo $date?>"><?php echo $date?></option>
            <?php endfor;?>
          </select>日
        </div> -->

        <!-- <table class="listTable">
          <tr>
            <th></th>
            <th class="t_display">通常</th>
            <th class="t_display">Wow</th>
          </tr>
          <tr>
            <th class="t_display">メール</th>
            <th class="t_display even">0</th>
            <th class="t_display even">0</th>
          </tr>
          <tr>
            <th class="t_display">Twitter</th>
            <th class="t_display even">0</th>
            <th class="t_display even">0</th>
          </tr>
          <tr>
            <th class="t_display">Facebook</th>
            <th class="t_display even">0</th>
            <th class="t_display even">0</th>
          </tr>
        </table> -->
      </td>
    </tr>
  </table>
</div>

<div class="optionselbg"></div>

<style>
.even {
  border-top: 1px dotted rgb(204, 204, 204);
  background-color: #FFF !important;
}
.odd {
  border-top: 1px dotted rgb(204, 204, 204); background-color: rgb(249, 249, 249);
}
td.pagenation {
  text-align: center;
}
.pagenation span.page{
  display: inline-block;
  border: 1px solid #6699ff;
  padding: 4px 7px;
  margin: 3px;
  -webkit-transition: all 0.1s ease;
  -moz-transition: all 0.1s ease;
  -o-transition: all 0.1s ease;
  transition: all  0.1s ease;
  cursor: pointer;
}
.pagenation span.page.current{
  margin: 3px;
  display: inline-block;
  border: 1px solid #666;
  padding: 4px 7px;
}
.pagenation span.page:hover {
  background: #6699ff;
  border: 1px solid #3333ff;
  color: #efefef;
}
.pagenation span.page.current:hover {
  background: #fff;
  border: 1px solid #666;
  color: #333;
  cursor: default;
}
</style>

<script type="text/javascript">
var fieldname="<?=$TITLEFIELDNAME?>";
var where="<?=$WHERE?>";

const LIMIT = 20;
const MAX_DISP_PAGE = 5;
var currentPage = 1;
var offset = 0;

$(function(){

  // 左カラムのユーザー数
  getUserKind('ALL', offset).then(function(res) {
    showList(res);
  });

  // 右カラムのユーザー数
  getUserKindGroupData('', 0).then(function(res) {
    // showData(res);
  });

  function showList(data)
  {
    $('.list-container').empty();
    $('.pagenation').empty();
    $.each(data.list, function(key, row){
      var style = 'odd';
      if(key%2 == 0) {
        style = 'even';
      }
      var $tr = $('<tr class="bottomborder"></tr>');
      var userKind = '';
      switch(parseInt(row.kind))
      {
        case 1: userKind = 'メール'; break;
        case 2: userKind = 'Twitter'; break;
        case 3: userKind = 'Facebook'; break;
        case 11: userKind = 'wow:メール'; break;
        case 12: userKind = 'wow:Twitter'; break;
        case 13: userKind = 'wow:Facebook'; break;
      }
      $tr.append('<th class="t_display '+style+'">'+row.t1+'</th>').append('<th class="t_display '+style+'">'+row.title+'</th>').append('<th class="t_display '+style+'">'+ userKind +'</th>');
      $('.list-container').append($tr);
    })

    if(data.total_coount > LIMIT)
    {
      var prevBtn = $('<a href="javascript:void(0);" id="prev_page" page="'+ (parseInt(currentPage) - 1) +'"><span class="prevPage">&lt;前へ</span></a>');
      var nextBtn = $('<a href="javascript:void(0);" id="next_page" page="'+ (parseInt(currentPage) + 1) +'"><span class="nextPage">次へ&gt;</span></a>');

      $(prevBtn).off('click').on('click', function() {
        movePage($(this).attr('page'));
      });
      $(nextBtn).off('click').on('click', function() {
        movePage($(this).attr('page'));
      });

      if(currentPage == 1) {
        prevBtn = $('<span class="prevPage">&lt;前へ</span>');
      }
      if(currentPage == Math.ceil(data.total_coount / LIMIT)) {
        nextBtn = $('<span class="nextPage">次へ&gt;</span>');
      }

      var pagenation = getPagenation(currentPage, Math.ceil(data.total_coount / LIMIT), MAX_DISP_PAGE);

      var $tr = $('<div style="text-align:center;"><span class="prevPage"></span> '+ pagenation +' <span class="nextPage"></span></div>');
      $tr.find('.prevPage').append(prevBtn);

      $tr.find('.nextPage').append(nextBtn);
      $tr.find('.movePage').off('click').on('click', function() {
        movePage($(this).attr('page'));
      });
      $('.pagenation').append($tr);
    }
  }

  function movePage(page) {
    if(page <= 1) {
      offset = 0;
    } else {
      offset = (page - 1) * LIMIT;
    }
    getUserKind('ALL', offset).then(function(res) {
      currentPage = page;
      showList(res);
    });
  }

  function getPagenation(currentPage, totalPage, dispNum) {
    if(dispNum % 2 == 0) {
      dispNum = dispNum + 1;
    }
    var startPage = currentPage - Math.ceil(dispNum / 2);
    if(currentPage > Math.ceil(dispNum / 2))
    {
      startPage = currentPage - Math.ceil(dispNum / 2) + 1;
      if(startPage >= totalPage - Math.ceil(dispNum / 2)) {
        startPage = totalPage - (Math.ceil(dispNum / 2)+1);
      }
    }
    else
    {
      startPage = startPage <= 0 ? 1 : startPage;
    }
    // startPage = currentPage >= totalPage - Math.ceil(dispNum / 2) + 1 ? startPage - Math.ceil(dispNum / 2) : startPage;

    var pagenation = [];
    for(var i = startPage; i <= totalPage; i++)
    {
      if(pagenation.length < dispNum) {
        if(currentPage == i) { // リンクなし
          pagenation.push($('<span class="page current">'+ i +'</span>'))
        } else {
          var page = $('<a class="movePage" onclick="javascript:void(0);" page="'+i+'"><span class="page">'+ i +'<span></a>');
          pagenation.push(page)
        }
      }
    }
    var pagenationDiv = $('<div><div class="pagenation" style="display:inline-block;"></div></div>');
    for(var n = 0; n < pagenation.length; n++)
    {
      pagenationDiv.append(pagenation[n]);
    }
    return pagenationDiv.html();
  }


  function getUserKind(target, offset)
  {
    return $.ajax({
      type: "GET",
      url: "/api/editdm/user/get_kind.php",
      data: {
        limit: LIMIT,
        target: target,
        offset: offset
      },
      dataType: "json"
    });
  }
  function getUserKindGroupData(from, to)
  {
    return $.ajax({
      type: "GET",
      url: "/api/editdm/user/get_kind.php",
      data: {
        from: target,
        to: offset
      },
      dataType: "json"
    });
  }

})

</script>

</body>
</html>


