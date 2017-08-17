<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$nid = $_GET['nid'];

$sqlstr2 = <<<END_SQL
SELECT
    *
FROM
    photo
WHERE
    nid = {$nid}
ORDER BY
    n DESC
LIMIT 5
END_SQL;

$o->query($sqlstr2);

$list = [
    'url' => $domain . '/a/' . $nid . '/',
    'data' => []
];
while($line = $o->fetch_array()):
    $img = [];
    $img['main'] = sprintf('%s/photo/main/%s', $ImgPath, $line["img1"]);
    $img['thumb'] = sprintf('%s/photo/thumb/%s', $ImgPath, $line["img2"]);
    $img['sp_main'] = sprintf('%s/photo/sp_main/%s', $ImgPath, $line["img3"]);
    $img['sp_thumb'] = sprintf('%s/photo/sp_thumb/%s', $ImgPath, $line["img4"]);
    $list['data'][] = $img;
endwhile;
echo json_encode($list);
?>
