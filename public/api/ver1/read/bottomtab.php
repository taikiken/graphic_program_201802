<?php

include 'local.php';
include 'public/check.php';

$o=new db;
$o->connect();

$response = [];

$type = array('home','livescore','category');
$icon_server_path = 'https://'.$servername.'/assets/images/common/';

foreach ($type as $value) {

    $tmp_relationList = [];
    $tmp_response = [];

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

$sql = <<<SQL
SELECT
    parent.id AS parent_id,
    parent.name AS parent_name,
    parent.sort_no AS parent_sort_no,
    parent.is_public AS parent_is_public,
    child.id,
    child.name,
    child.link,
    child.icon,
    child.icon_sp,
    child.icon_ios,
    child.icon_android,
    child.sort_no,
    child.is_public
FROM bottom_tab_nodes node
INNER JOIN bottom_tab_livescores child
    ON node.bottom_tab_id = child.id
INNER JOIN bottom_tab_livescores parent
    ON node.parent_tab_id = parent.id
WHERE type = 2
AND parent.is_public = true
AND child.is_public = true
ORDER BY parent.sort_no ASC, child.sort_no ASC
SQL;

            $o->query($sql);
            while($f=$o->fetch_array()){
                if(empty($tmp_relationList[$f['parent_id']])){
                    //親が未登録なら登録する
                    $tmp_relationList[$f['parent_id']] = [
                        'dispName'  => $f['parent_name']
                    ];
                }
                //子を登録する
                $tmp_relationList[$f['parent_id']]['child'][] =[
                        'dispName'  => $f['name'],
                        'unread'    => false,
                        'icon'      => !empty($f['icon']) ? $icon_server_path.$f['icon'] : '',
                        'icon_sp'      => !empty($f['icon_sp']) ? $icon_server_path.$f['icon_sp'] : '',
                        'icon_ios'      => !empty($f['icon_ios']) ? $icon_server_path.$f['icon_ios'] : '',
                        'icon_android'      => !empty($f['icon_android']) ? $icon_server_path.$f['icon_android'] : '',
                        'link'      => $f['link']
                    ];
            }
            //表示用に整形する
            foreach ($tmp_relationList as $parent) {
                $tmp_response['parent'][] = [
                        'dispName'  => $parent['dispName'],
                        'child'     => $parent['child']
                    ];
            }
            break;


        case 'category':

            $tmp_response = [
                'unread' => false
            ];

$sql = <<<SQL
SELECT
    parent.id AS parent_id,
    parent.name AS parent_name,
    parent.sort_no AS parent_sort_no,
    parent.is_public AS parent_is_public,
    child.id,
    child.name,
    child.link,
    child.icon,
    child.icon_sp,
    child.icon_ios,
    child.icon_android,
    child.sort_no,
    child.is_public
FROM bottom_tab_nodes node
INNER JOIN bottom_tab_categories child
    ON node.bottom_tab_id = child.id
INNER JOIN bottom_tab_categories parent
    ON node.parent_tab_id = parent.id
WHERE type = 1
AND parent.is_public = true
AND child.is_public = true
ORDER BY parent.sort_no ASC, child.sort_no ASC
SQL;

            $o->query($sql);
            while($f=$o->fetch_array()){
                if(empty($tmp_relationList[$f['parent_id']])){
                    //親が未登録なら登録する
                    $tmp_relationList[$f['parent_id']] = [
                        'dispName'  => $f['parent_name']
                    ];
                }
                //子を登録する
                $tmp_relationList[$f['parent_id']]['child'][] =[
                        'dispName'  => $f['name'],
                        'unread'    => false,
                        'icon'      => !empty($f['icon']) ? $icon_server_path.$f['icon'] : '',
                        'icon_sp'      => !empty($f['icon_sp']) ? $icon_server_path.$f['icon_sp'] : '',
                        'icon_ios'      => !empty($f['icon_ios']) ? $icon_server_path.$f['icon_ios'] : '',
                        'icon_android'      => !empty($f['icon_android']) ? $icon_server_path.$f['icon_android'] : '',
                        'link'      => $f['link']
                    ];
            }
            //表示用に整形する
            foreach ($tmp_relationList as $parent) {
                $tmp_response['parent'][] = [
                        'dispName'  => $parent['dispName'],
                        'child'     => $parent['child']
                    ];
            }
            break;
    }


    $response[$value] = $tmp_response;
}

    $y['response'] = $response;

print_json($y,$_SERVER['HTTP_REFERER']);

?>