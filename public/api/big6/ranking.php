<?php
/*

# big6tv - 順位表


*/

setlocale(LC_ALL, 'ja_JP.UTF-8');

include "local.php";

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

$response = getCsvConvertArray('ranking.csv');

$ranking = array();
foreach( $response as $key => $value ) :
  if ( $key > 0 ) :

    // IDきめる
    $nameI = '';
    switch( $value[2] ) :
      case '明大' :
        $nameI = 'M';
        $slug  = 'meiji';
        break;
      case '慶大' :
        $nameI = 'K';
        $slug  = 'keio';
        break;
      case '早大' :
        $nameI = 'W';
        $slug  = 'waseda';
        break;
      case '立大' :
        $nameI = 'R';
        $slug  = 'rikkio';
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
    'lastupdate' => date('Y-m-d H:i:s'),
    'ranking' => $ranking,
  )
);


// print
// ------------------------------
print_json($result,$_SERVER['HTTP_REFERER']);


?>