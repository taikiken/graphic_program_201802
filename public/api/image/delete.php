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

if(!isset($_POST['id']))
{
    $mes = 'id not found';
    json_response(400, $_POST);
}
if(!isset($_POST['nid']))
{
    $mes = 'nid not found';
    json_response(400, $_POST);
}
$id = $_POST['id'];
$sqlstr = <<<END_DOC
DELETE FROM photo WHERE id = {$id};
END_DOC;

$o->query($sqlstr);

$nid = $_POST['nid'];
$sqlstr = <<<END_DOC
SELECT
    id,
    n
FROM
    photo
WHERE
    nid = {$nid}
ORDER BY n
END_DOC;

$sqlstr2 = [];

$o->query($sqlstr);

$cnt = 1;
while($row = $o->fetch_array())
{
    $id = $row['id'];
    $sqlstr2[] = <<<END_DOC2
UPDATE photo SET
    n = {$cnt}
WHERE
    id = {$id}
;
END_DOC2;

    $cnt++;
}

$o->query(implode("\n",$sqlstr2));

json_response(200, $mes);

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

