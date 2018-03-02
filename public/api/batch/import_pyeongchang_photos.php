<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$today = strtotime(date('Y-m-d'));
$yesterday = strtotime(date('Y-m-d',strtotime("-1 day")));
$dates = [
  'today'     => $today,
  'yesterday' => $yesterday
];
$titles = [];
$list = [];
$save_files =[];
$item_id = '';
$article_id = '';
$modify = '';
$mes = '';
$id_pattern = '/<NewsItemId>(.*)<\/NewsItemId>/';
$modify_pattern = '/<InModifyInfo>(.*)<\/InModifyInfo>/';

$count=0;

// 接続テスト　廃止
//$base_url = "http://limret:limret0@tmdatag.kyodonews.jp/06KK579001/GZ_TX4_UTF8/";
// 1/31まで
//$base_url = "http://sportsbull01:sportsbull01@tmdatag.kyodonews.jp/06KK583001/GZ_TX4_UTF8/";
// 2/1から　本番アカウント
$base_url = "http://sportsbull02:sportsbull02@tmdatag.kyodonews.jp/06KK583002/GZ_TX4_UTF8/";

foreach($dates as $key => $date) {

  $url = $base_url."recvfile1";
  $result = file_get_contents($url);
  $result = preg_split('/[\s]/', $result);

  $pickup_img_name = '/^PK' . date('Ymd', $date) . '[0-9]*/';
  $pattern = '/^PK' . date('Ymd', $date) . '[0-9]*_TF_JPG_00_UTF8.xml/';
  $img1 = '';

  // 新規・差し替え・削除のリスト作成
  foreach($result as $file_info) {
    $file = explode(',', $file_info);
    preg_match($pickup_img_name, $file[1], $file_name);

    if(preg_match($pattern, $file[1])===0){
      continue;
    }

    $content = file_get_contents($base_url.date('Ymd',$date).'/'.$file[1]);
    preg_match($id_pattern, $content, $item_id);
    preg_match($modify_pattern, $content, $modify);

    $item_id = substr($item_id[1],0,21);
    $modify = $modify[1];

    if($modify == "新規" || $modify == "差し替え電文"){
      $list[$item_id] = $file_name[0] . '_BI_JPG_00.jpg';
    } else if($modify == "訂正") {
      $list[$item_id] = null;
    }
  }

  // 記事作成と画像保存処理
  foreach ($result as $file_info) {
    $file = explode(',', $file_info);

    if (preg_match($pattern, $file[1])) {
      preg_match($pickup_img_name, $file[1], $file_name);

      if(empty($article_id)) {

        $title = "平昌五輪" . date("Y/m/d", $date);
        $cnt = 1;
        $o = new db;
        $o->connect();
        $format = <<<EOD
SELECT
  id,
  title
FROM
  repo_n
WHERE
  title = '%s';
EOD;
        $sql = sprintf($format, $title);
        $o->query($sql);

        $f = $o->fetch_array();
        $title_checker = $f['title'];

        if (!empty($title_checker)) {
          $article_id = $f['id'];
        } else {
          $Y = date('Y', $date);
          $m = date('m', $date);
          $d = date('d', $date);
          $H = date('H', $date);
          $i = date('i', $date);
          $s = date('s', $date);
          $time = date('Y-m-d H:i:s', $date);
          $format = <<<EOD
INSERT INTO repo_n(
  cid,title,m1,m2,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,flag,m_time,u_time,a_time,imgflag,bodyflag,d1,d2,t10)
VALUES
  (1,'%s',165,159,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s',1,'%s','%s','%s',168,169,4,10,'平昌五輪2018フォトギャラリー')
  RETURNING id;
EOD;

          $sql = sprintf($format, $title, $Y, $m, $d, $H, $i, $s, $Y, $m, $d, $H, $i, $s, $time, $time, $time);
          $o->query($sql);

          $f = $o->fetch_array();
          $article_id = $f['id'];

          $body = "平昌五輪 " . date("Y/m/d", $date) . " のフォトギャラリー";

          $format = "INSERT INTO repo_body(pid,body) VALUES(%s,'%s')";
          $sql = sprintf($format, $article_id, $body);
          $o->query($sql);
        }

        $format = "DELETE FROM photo WHERE nid=%s";
        $sql = sprintf($format, $article_id);
        $o->query($sql);
      }
    } else {
      continue;
    }

    $filename = $file_name[0] . '_BI_JPG_00.jpg';

    // 上で作ったリストの中に同一のファイル名がない場合は、画像登録処理をスキップする。
    $skip_flag = true;
    foreach($list as $key => $val){
      if($val === $filename){
        $skip_flag = false;
        $save_files[] = $filename;
        break;
      }
    }
    if($skip_flag){continue;}

    $img_url = $base_url."photo/" . $filename;

    if(empty($img1)){
      $img1 = outimg($img_url,1,false);
      $format =<<<EOD
UPDATE
  repo_n
SET
  img1 = '%s'
WHERE
  id = '%s';
EOD;
      $sql = sprintf($format, $img1, $article_id);
      $o->query($sql);
    }

    $original_image = imagecreatefromjpeg($img_url);
    $ext = 'jpg';
    define('MAX_WIDTH', 640);
    define('MAX_HEIGHT', 480);

    $maps = [
      'main' => [
        'width' => 642,
        'height' => 1000
      ],
      'thumb' => [
        'width' => 159,
        'height' => 159
      ],
      'sp_main' => [
        'width' => 704,
        'height' => 1000
      ],
      'sp_thumb' => [
        'width' => 204,
        'height' => 204
      ],
    ];

    list($width, $height, $type, $attr) = getimagesize($img_url);

    foreach($maps as $key => $map)
    {
      $w = $map['width'];
      $h = $map['height'];

// 両方オーバーしていた場合
      if($h < $height && $w < $width)
      {
        if ($w < $h)
        {
          $newwidth = $w;
          $newheight = $height * ($w / $width);
        }
        elseif($h < $w)
        {
          $newwidth = $width * ($h / $height);
          $newheight = $h;
        }
        else
        {
          if($width < $height)
          {
            $newwidth = $width * ($h / $height);
            $newheight = $h;
          }
          elseif($height < $width)
          {
            $newwidth = $w;
            $newheight = $height * ($w / $width);
          }
        }
      }
      elseif($height < $h && $width < $w)
      {
        // 両方オーバーしていない場合
        $newwidth = $width;
        $newheight = $height;
      }
      elseif($h < $height && $width <= $w)
      {
        // 縦がオーバー、横は新しい横より短い場合
        // 縦がオーバー、横は同じ長さの場合
        $newwidth = $width * ($h / $height);
        $newheight = $h;
      }
      elseif($height <= $h && $w < $width)
      {
        // 縦が新しい縦より短く、横はオーバーしている場合
        // 縦は同じ長さ、横はオーバーしている場合
        $newwidth = $w;
        $newheight = $height * ($w / $width);
      }
      elseif($height == $h && $width < $w)
      {
        // 横が新しい横より短く、縦は同じ長さの場合
        $newwidth = $width * ($h / $height);
        $newheight = $h;
      }
      elseif($height < $h && $width == $w)
      {
        // 縦が新しい縦より短く、横は同じ長さの場合
        $newwidth = $w;
        $newheight = $height * ($w / $width);
      }
      else
      {
        // 縦も横も、新しい長さと同じ長さの場合
        // または、縦と横が同じ長さで、かつ最大サイズを超えない場合
        $newwidth = $width;
        $newheight = $height;
      }
      $canvas = imagecreatetruecolor($newwidth, $newheight);
      imagecopyresampled($canvas, $original_image, 0,0,0,0, $newwidth, $newheight, $width, $height);
      $filename = uniqid() . '.' . $ext;
      $image_dir = sprintf("%s/photo/%s/", $SERVERPATH, $key);

      if(!file_exists($image_dir))
      {
        if(!mkdir($image_dir,0777, true))
        {
          $mes = 'ディレクトリの作成に失敗しました';
        }
      }
      $resize_path = $image_dir . $filename;
      if(!imagejpeg($canvas, $resize_path))
      {
        $mes = '画像の書き込みに失敗しました';
      }
      imagedestroy($canvas);

      $s3 = new S3Module;
      $result = $s3->upload($resize_path, sprintf("photo/%s/%s", $key, $filename));
      $images[] = $filename;
      unlink($resize_path);
    }
    imagedestroy($original_image);
    list($main, $thumb, $sp_main, $sp_thumb) = $images;
    unset($images);
    $sql = <<<EOD
INSERT INTO photo
(
    nid,
    title,
    img1,
    img2,
    img3,
    img4,
    flag,
    n
)
VALUES
(
    {$article_id},
    '{$title}',
    '{$main}',
    '{$thumb}',
    '{$sp_main}',
    '{$sp_thumb}',
    1,
    {$cnt}
);
EOD;

  $o->query($sql);
  $cnt++;
  }
  if(empty($save_files)){
    $format = "DELETE FROM repo_n WHERE id=%s";
    $sql = sprintf($format, $article_id);
    $o->query($sql);
    $format = "DELETE FROM repo_body WHERE pid=%s";
    $sql = sprintf($format, $article_id);
    $o->query($sql);
  }
  unset($list);
  unset($article_id);
}

if($mes){
  echo "result : Error (".$mes.")";
}else {
  echo date("Y/m/d",$today)." と ".date("Y/m/d",$yesterday)." のフォト記事を登録しました";
}