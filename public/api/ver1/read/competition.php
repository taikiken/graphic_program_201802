<?php

include "local.php";
include "public/check.php";

$id = bind($_REQUEST["id"]);

$file_bucket_path = '/static/board/result_pdf/';
$icon_bucket_path = '/static/sports/icon/';

$response = null;
$week_list = array('日', '月', '火', '水', '木', '金', '土');

$o = new db;
$o->connect();

//大会概要取得処理------------------------------
$sql = <<<SQL
SELECT 
    cmp.* ,
    sports.name as sport_name,
    sports.icon as sport_icon
FROM
    competitions cmp
LEFT JOIN
    sports ON cmp.sport_id = sports.id
WHERE
    cmp.id = {$id}
AND
    cmp.is_public IS TRUE
AND
    cmp.deleted_at IS NULL
ORDER BY
    start_date_time DESC;
SQL;

$o->query($sql);
$f = $o->fetch_array();

if($f){
    $f['sport_name'] = !empty($f['sport_name']) ? $f['sport_name'] : '';

    //開始日
    $DateTime = new DateTime($f['start_date_time']);
    $start_date = $DateTime->format('Y年m月d日');
    $day_of_week = $week_list[(int)$DateTime->format('w')];
    $start_date = $start_date . '（' . $day_of_week . '）';

    //終了日
    $DateTime = new DateTime($f['end_date_time']);
    $end_date = $DateTime->format('d日');
    $day_of_week = $week_list[(int)$DateTime->format('w')];
    $end_date = $end_date . '（' . $day_of_week . '）';

  // icon, pdfはバケットから
  if (!empty($f['file']))
  {
    $f['file'] = $ImgPath . $file_bucket_path. $f['file'];
  }
  if (!empty($f['sport_icon']))
  {
    $f['sport_icon'] = $ImgPath . $icon_bucket_path . $f['sport_icon'];
  }

    $response = [
        'competition_name'  => $f['name'],
        'sport_name'        => $f['sport_name'],
        'icon'              => $f['sport_icon'],
        'period'            => $start_date . ' 〜 ' . $end_date,
        'organizer'         => $f['organizer'],
        'collaborator'      => $f['collaborator'],
        'sponsor'           => $f['sponsor'],
        'cosponsor'         => $f['cosponsor'],
        'venue'             => $f['venue'],
        'qualification'     => $f['qualification'],
        'regulation'        => $f['regulation'],
        'file'              => $f['file'],
        'provider_name'     => $f['provider_name'],
        'provider_url'      => $f['provider_url'],
    ];


    //関連記事取得処理------------------------------
    $articles_list = [];
    $highlight_movie = [];
    $news = [];
    $photo_gallery = [];
    $max_count = 3;
    $max_count_sp = 2;
    $sql = <<<SQL
SELECT
    acmp.article_id,
    acmp.type
FROM
    competition_articles acmp
WHERE
    acmp.competition_id = {$id}
ORDER BY
    acmp.type ASC,
    acmp.created_at ASC;
SQL;
    $o->query($sql);

    //取得したidをtype毎に分類する
    while($f=$o->fetch_array()){
        switch($f['type']){
            case 1:
                if(count($highlight_movie) < $max_count){
                    $articles_list['highlight_movie'][] = $f['article_id'];
                }
                break;
            case 2:
                if(count($news) < $max_count){
                    $articles_list['news'][] = $f['article_id'];
                }
                break;
            case 3:
                if(count($photo_gallery) < $max_count){
                    $articles_list['photo_gallery'][] = $f['article_id'];
                }
                break;
        }
    }

    //初期値設定
    $response['pc']['highlight_movie'] = [];
    $response['sp']['highlight_movie'] = [];
    $response['pc']['news'] = [];
    $response['sp']['news'] = [];
    $response['pc']['photo_gallery'] = [];
    $response['sp']['photo_gallery'] = [];

    //取得したidから記事データ取得
    foreach ($articles_list as $key => $value) {
        $articles = [];
        $article_ids_sql = implode(' OR id = ', $value);
        $sql = sprintf("select * from %s", sprintf($articletable, set_isbookmark($uid), sprintf(" and (id = %s)", $article_ids_sql)));
        $o->query($sql);
        $p = [];
        while ($f = $o->fetch_array()){
            $p[] = $f;
        }
        $s = [];
        include "public/articlecomments.php";
        $articles = $s;
        
        if($key === 'highlight_movie'){
            for($i=0;$i<count($articles);$i++){ $articles[$i]['is_movie'] = true; }
            $response['pc']['highlight_movie']      = $articles;
            for($i=count($articles);$i>$max_count_sp;$i--){
                unset($articles[$i-1]);
            }
            $response['sp']['highlight_movie']      = $articles;

        }
        if($key === 'news'){
            for($i=0;$i<count($articles);$i++){ $articles[$i]['is_movie'] = false; }
            $response['pc']['news']      = $articles;
            $response['sp']['news']      = $articles;
            
        }
        if($key === 'photo_gallery'){
            for($i=0;$i<count($articles);$i++){ $articles[$i]['is_movie'] = false; }
            $response['pc']['photo_gallery']      = $articles;
            for($i=count($articles);$i>$max_count_sp;$i--){
                unset($articles[$i-1]);
            }
            $response['sp']['photo_gallery']      = $articles;

        }
    }
}

    $y["response"] = $response;

print_json($y, $_SERVER['HTTP_REFERER']);

?>
