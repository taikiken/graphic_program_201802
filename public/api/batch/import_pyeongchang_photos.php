<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";


$today = strtotime(date('Y-m-d'));
$yesterday = strtotime(date('Y-m-d',strtotime("-1 day")));

$title = "平昌五輪".date("Y/m/d",$today);

$o=new db;
$o->connect();
$format = "SELECT id,title FROM repo_n WHERE title = '%s'";
$sql = sprintf($format,$title);
$o->query($sql);

$f = $o->fetch_array();
$title_checker = $f['title'];

if(!empty($title_checker)) {
    $article_id = $f['id'];
} else {
  $Y=date('Y',$today);
  $m=date('m',$today);
  $d=date('d',$today);
  $H=date('H',$today);
  $i=date('i',$today);
  $s=date('s',$today);
  $time = date('Y-m-d H:i:s',$today);
  $format = "INSERT INTO repo_n(cid,title,m1,m2,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,flag,m_time,u_time,a_time,bodyflag,d1,d2)VALUES(1,'%s',164,159,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s',1,'%s','%s','%s',169,4,10)  RETURNING id";
  $sql = sprintf($format,$title,$Y,$m,$d,$H,$i,$s,$Y,$m,$d,$H,$i,$s,$time,$time,$time);

  $o->query($sql);

  $f = $o->fetch_array();
  $article_id = $f['id'];

  $body = "平昌五輪 ".date("Y/m/d",$today)." のフォトギャラリー";

  $format = "INSERT INTO repo_body(pid,body) VALUES(%s,'%s')";
  $sql = sprintf($format,$article_id,$body);

  $o->query($sql);
}

$url = "http://limret:limret0@tmdatag.kyodonews.jp/06KK579001/GZ_TX4_UTF8/recvfile1";
$result = file_get_contents($url);
//$result = explode(' ',$result);
$result = preg_split('/[\s]/', $result);

$file_names=[];
$pick_up_today_name = '/^PK'.date('Ymd',$today).'[0-9]*/';
$pick_up_yesterday_name = '/^PK'.date('Ymd',$yesterday).'[0-9]*/';
$today_pattern     = '/^PK'.date('Ymd',$today).'[0-9]*_TF_JPG_00_UTF8.xml/';
$yesterday_pattern = '/^PK'.date('Ymd',$yesterday).'[0-9]*_TF_JPG_00_UTF8.xml/';

foreach($result as $file_info){
  $file = explode(',',$file_info);

  if(preg_match($today_pattern,$file[1])){
    preg_match($pick_up_today_name,$file[1],$file_name);
  } else if(preg_match($yesterday_pattern,$file[1])){
    preg_match($pick_up_yesterday_name,$file[1],$file_name);
  } else {
    continue;
  }
  $file_names[] =
    [
      'image' => $file_name[0].'_BI_JPG_00.jpg',
      'thumb' => $file_name[0].'_TH_JPG_00.jpg'
    ];
}

$format = "DELETE FROM photo WHERE nid=%s";
$sql = sprintf($format,$article_id);
$o->query($sql);

$images = [];
$count= 0;
foreach($file_names as $file_name){

  $images[$count] = !empty($file_name['image']) ? $file_name['image'] : '';
  var_dump($images[$count]);
  if($count==3 || $file_name === end($file_names)) {
    $format = "INSERT INTO photo(nid,title,img1,img2,img3,img4,flag) VALUES(%s,'','%s','%s','%s','%s',1)";
    $sql = sprintf($format, $article_id, $images[0], $images[1], $images[2], $images[3]);
    $o->query($sql);
    $images = [];
    $count=0;
  } else {
    $count++;
  }
}
