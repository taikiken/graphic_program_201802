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

