<?php
/**
 * Created by PhpStorm.
 * User: misawa
 * Date: 2017/07/19
 * Time: 20:56
 */
include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

if(!isset($_POST['data']))
{
    $mes = 'data not found';
    json_response(400, $mes);
    return;
}

$sql = [];
foreach($_POST['data'] as $data)
{
    $caption = $data['caption'];
    $id = $data['id'];
    $sql[] = <<<END_DOC
UPDATE photo SET
  title = '{$caption}'
WHERE
  id = {$id}
;
END_DOC;
}

try
{
    $o->query(implode("\n",$sql));
}
catch(Exception $e)
{
    json_response(400, $e->getMessage());
    return;
}
//パーツを転送
$nid = $_POST['nid'];

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
$file = json_encode($list);
$save_path = sprintf("%s/photo/%s", $SERVERPATH, $_POST['nid'] . '.json');
file_put_contents($save_path, $file);

$s3 = new S3Module;
$s3->upload($save_path, sprintf("json/%s", $_POST['nid'] . '.json'));
unlink($save_path);
json_response(200, $_POST['data']);

function json_response($code, $message)
{
    $status = $code == 200 ? 'ok': 'ng';
    $ret = [
        'status' => $status,
        'code' => $code,
        'message' => $message
    ];
    http_response_code($code);
    echo json_encode($ret);
}

