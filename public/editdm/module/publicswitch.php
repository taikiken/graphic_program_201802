<?php
include $INCLUDEPATH."local.php";
$o=new db;
$o->connect();

$is_error = false;
if(isset($_POST['flag']) === false || isset($_POST['table']) === false){
    $is_error = true;
}
$allowTables = [
    'bottom_tab_categories',
    'bottom_tab_livescores',
];
if(!in_array($_POST['table'], $allowTables)){
    //許可していないテーブル名がPOSTされた
    $is_error = true;
}

if($is_error){
    //エラー時
    echo 0;
    exit;
}

//更新処理
if ($_POST['flag'] == 0){
    $is_public = "false";
}else{
    $is_public = "true";
}
$update = "update {$_POST['table']} set is_public = {$is_public} where id = {$_POST['id']}";
$o->query($update);
echo 1;
?>