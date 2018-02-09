<?php

include 'local.php';
include 'public/check.php';

$o=new db;
$o->connect();

$response = [];

$type = array('home','livescore','sports');

$liv_base_chi = array('プロ野球','MLB','東京六大学野球','東都大学野球','関西六大学野球','関西大学野球');
$liv_socc_chi = array('Jリーグ','サッカー日本代表','海外サッカー','大学サッカー','高校サッカー');
$liv_bask_chi = array('Bリーグ','大学バスケ','高校バスケ');
$liv_moto_chi = array('F1','SGT','WEC','WRC');
$liv_othe_chi = array('その他1','その他2','その他3','その他4');
$livescore = array(
    '野球' => $liv_base_chi,
    'サッカー' => $liv_socc_chi,
    'バスケットボール' => $liv_bask_chi,
    'モータースポーツ' => $liv_moto_chi,
    'その他' => $liv_othe_chi
);

$cat_pick_chi = array('CRAZY ATHLETES','BULL\'STATION',' BULL\' PICS','バーチャル高校野球','インターハイ','六大学野球');
$cat_comp_chi = array(
    '野球全て','プロ野球','MLB','高校野球',
    'サッカー全て','サッカー日本代表','Jサッカー','海外サッカー',
    'バレーボール','バスケットボール','NBA','Bリーグ',
    'テニス','ゴルフ','モータースポーツ','相撲',
    '格闘技','クライミング','その他1','その他2'
    );
$category = array(
    'ピックアップ' => $cat_pick_chi,
    '競技・種目' => $cat_comp_chi
);


if(true){

    foreach ($type as $value) {

        $tmp_response = [];
        $tmp_child = [];

        switch ($value){
            case 'home':
                $tmp_response = [
                    'unread' => false
                ];
                break;

            case 'livescore':
                $tmp_response = [
                    'unread' => false
                ];

                foreach ($livescore as $parent => $children) {
                    foreach ($children as $child) {
                        $tmp_child[] = [
                            'dispName'  => $child,
                            'unread'    => false,
                            'icon'      => $ImgPath.'/xxxxxx/xxxxx/livescore/icon.png',
                            'url'       => '/stats/xxxxxx'
                        ];
                    }
                    $tmp_response['parent'][] = [
                            'dispName'  => $parent,
                            'img'       => $ImgPath.'xxxxxx/xxxxx/xxxx/bar.png',
                            'child'     => $tmp_child
                        ];
                }
                break;
                
            case 'sports':

                $tmp_response = [
                    'unread' => false
                ];

                foreach ($category as $parent => $children) {
                    foreach ($children as $child) {
                        $tmp_child[] = [
                            'dispName'  => $child,
                            'unread'    => false,
                            'icon'      => $ImgPath.'/xxxxxx/xxxxx/sports/icon.png',
                            'url'       => '/category/slug'
                        ];
                    }
                    $tmp_response['parent'][] = [
                            'dispName'  => $parent,
                            'img'       => $ImgPath.'xxxxxx/xxxxx/xxxx/bar.png',
                            'child'     => $tmp_child
                        ];
                }
                break;
        }

        $response[$value] = $tmp_response;
    }





    $y['status']['code'] = 200;
    $y['status']['user_message'] = '';
    $y['status']['developer_message'] = '';
    $y['response'] = $response;

} else {
    $y['status']['code'] = 404;
    $y['status']['user_message'] = '取得に失敗しました。';
    $y['status']['developer_message'] = '取得に失敗しました。';
}

print_json($y,$_SERVER['HTTP_REFERER']);

?>