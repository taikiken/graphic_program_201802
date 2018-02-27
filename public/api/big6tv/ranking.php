<?php
/*

# big6tv - 順位表


*/

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include "local.php";
include_once __DIR__."/../../../app/helpers/env.helper.php";


/**
* CSVファイルをphpの配列に
*
* @param  string   $file  CSVファイルのパス
* @return array           CSVをphpの配列にしたもの
*/
function getCsvConvertArray($file) {

  $data = @file_get_contents($file);
  if ( $data ) {
    $data = mb_convert_encoding($data, 'UTF-8', 'sjis-win');
    $temp = tmpfile();
    $meta = stream_get_meta_data($temp);

    fwrite($temp, $data);
    rewind($temp);

    $file = new SplFileObject($meta['uri']);
    $file->setFlags(SplFileObject::READ_CSV);

    $csv  = array();

    foreach($file as $line) {
        $csv[] = $line;
    }

    fclose($temp);
    $file = null;

    return $csv;
  }

}

/**
* CSVの更新日取得
*
* @param  string   $file  CSVファイルのパス
* @return string   更新日
*/
function getLastUpdate($file) {

  if ( file_exists($file) ) {
    return date ("Y-m-d H:i:s", filemtime($file) );
  }

}


function retrieve_remote_file_time($url){
  $ch = curl_init($url);

  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_HEADER, TRUE);
  curl_setopt($ch, CURLOPT_NOBODY, TRUE);
  curl_setopt($ch, CURLOPT_FILETIME, TRUE);

  $data = curl_exec($ch);
  $filetime = curl_getinfo($ch, CURLINFO_FILETIME);
  curl_close($ch);

  if ($filetime != -1) {
    return date("Y-m-d H:i:s", $filetime);
  } else {
    return date("Y-m-d H:i:s");
  }

}



// run
// ==============================
$season = $_GET["season"];
if (empty($season)) //legacy
{
    if ( UT_ENV !== 'PRODUCTION' ) :
      $file = 'https://dev-img.sportsbull.jp/static/big6/2017/autumn/ranking.csv';
    else:
      $file = 'https://img.sportsbull.jp/static/big6/2017/autumn/ranking.csv';
    endif;
}else{
    if ( UT_ENV !== 'PRODUCTION' ) :
      $json = 'https://dev-img.sportsbull.jp/static/big6/' . $season . '/ranking.csv';
    else:
      $json = 'https://img.sportsbull.jp/static/big6/' . $season . '/ranking.csv';
    endif;
}

$response      = getCsvConvertArray($file);
$lastUpdate    = retrieve_remote_file_time($file);
// $lastUpdate = getLastUpdate('ranking.csv');

$ranking = array();
foreach( $response as $key => $value ) :
  if ( $key > 0 ) :

    // IDきめる
    $nameI = '';
    switch( $value[2] ) :
      case '立大' :
        $nameI = 'R';
        $slug  = 'rikkio';
        break;
      case '早大' :
        $nameI = 'W';
        $slug  = 'waseda';
        break;
      case '慶大' :
        $nameI = 'K';
        $slug  = 'keio';
        break;
      case '明大' :
        $nameI = 'M';
        $slug  = 'meiji';
        break;
      case '法大' :
        $nameI = 'H';
        $slug  = 'hosei';
        break;
      case '東大' :
        $slug  = 'tokyo';
        $nameI = 'T';
        break;
    endswitch;

    $ranking[] = array(
      'rank'              => $value[0],
      'is_fixed'          => $value[1],
      'name'              => $value[2],
      'nameI'             => $nameI,
      'slug'              => $slug,
      'game'              => $value[3],
      'win'               => $value[4],
      'lose'              => $value[5],
      'draw'              => $value[6],
      'point'             => $value[7],
      'winningPercentage' => $value[8],
    );
  endif;
endforeach;

$result   = array(
  'response' => array(
    'timezone'   => date_default_timezone_get(),
    'lastupdate' => $lastUpdate,
    'ranking'    => $ranking,
  )
);


// print
// ------------------------------
print_json($result,$_SERVER['HTTP_REFERER']);


?>