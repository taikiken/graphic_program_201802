<?php
/**
 * Created by PhpStorm.
 * User: misawa
 * Date: 2017/07/19
 * Time: 10:24
 */

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

define('MAX_WIDTH', 640);
define('MAX_HEIGHT', 480);

$maps = [
    'main' => [
        'width' => 642,
        'height' => 1000
    ],
    'thumb' => [
        'width' => 159,
        'height' => 159
    ],
    'sp_main' => [
        'width' => 704,
        'height' => 1000
    ],
    'sp_thumb' => [
        'width' => 204,
        'height' => 204
    ],
];
$mes = '';
if(!isset($_POST['nid']))
{
    $mes = 'nid not found';
    json_response(400, $mes);
    return;
}
if(!isset($_FILES))
{
    $mes = 'image not found';
    json_response(400, $mes);
    return;
}
$nid = $_POST['nid'];
$sqlstr1 = <<<END_SQL
SELECT
    n
FROM
    photo
WHERE
    nid = {$nid}
ORDER BY
    n DESC
LIMIT 1
END_SQL;

$o->query($sqlstr1);
$line = $o->fetch_array();
$cnt = 1;
if(false === empty($line['n']))
{
    $cnt = $line['n'] + 1;
}

$files = [];
foreach($_FILES as $file)
{
    $file = $file['tmp_name'];
    list($width, $height, $type, $attr) = getimagesize($file);
    switch ($type) {
        case IMAGETYPE_JPEG:
            $original_image = imagecreatefromjpeg($file);
            $ext = 'jpg';
            break;
        case IMAGETYPE_PNG:
            $original_image = imagecreatefrompng($file);
            $ext = 'png';
            break;
        case IMAGETYPE_GIF:
            $original_image = imagecreatefromgif($file);
            $ext = 'gif';
            break;
        default:
            $mes = '許可されていないフォーマットです';
            json_response(400, $mes);
    }
    $images = [];
    foreach($maps as $key => $map)
    {
        $w = $map['width'];
        $h = $map['height'];


// 両方オーバーしていた場合
        if($h < $height && $w < $width)
        {
            if ($w < $h)
            {
                $newwidth = $w;
                $newheight = $height * ($w / $width);
            }
            elseif($h < $w)
            {
                $newwidth = $width * ($h / $height);
                $newheight = $h;
            }
            else
            {
                if($width < $height)
                {
                    $newwidth = $width * ($h / $height);
                    $newheight = $h;
                }
                elseif($height < $width)
                {
                    $newwidth = $w;
                    $newheight = $height * ($w / $width);
                }
            }
        }
        elseif($height < $h && $width < $w)
        {
            // 両方オーバーしていない場合
            $newwidth = $width;
            $newheight = $height;
        }
        elseif($h < $height && $width <= $w)
        {
            // 縦がオーバー、横は新しい横より短い場合
            // 縦がオーバー、横は同じ長さの場合
            $newwidth = $width * ($h / $height);
            $newheight = $h;
        }
        elseif($height <= $h && $w < $width)
        {
            // 縦が新しい縦より短く、横はオーバーしている場合
            // 縦は同じ長さ、横はオーバーしている場合
            $newwidth = $w;
            $newheight = $height * ($w / $width);
        }
        elseif($height == $h && $width < $w)
        {
            // 横が新しい横より短く、縦は同じ長さの場合
            $newwidth = $width * ($h / $height);
            $newheight = $h;
        }
        elseif($height < $h && $width == $w)
        {
            // 縦が新しい縦より短く、横は同じ長さの場合
            $newwidth = $w;
            $newheight = $height * ($w / $width);
        }
        else
        {
            // 縦も横も、新しい長さと同じ長さの場合
            // または、縦と横が同じ長さで、かつ最大サイズを超えない場合
            $newwidth = $width;
            $newheight = $height;
        }
        $canvas = imagecreatetruecolor($newwidth, $newheight);
        imagecopyresampled($canvas, $original_image, 0,0,0,0, $newwidth, $newheight, $width, $height);
        $filename = uniqid() . '.' . $ext;
        $image_dir = sprintf("%s/photo/%s/", $SERVERPATH, $key);

        if(!file_exists($image_dir))
        {
            if(!mkdir($image_dir,0777, true))
            {
                $mes = 'ディレクトリの作成に失敗しました';
                json_response(400, $mes);
                return;
            }
        }
        $resize_path = $image_dir . $filename;
        switch ($type) {
            case IMAGETYPE_JPEG:
                if(!imagejpeg($canvas, $resize_path))
                {
                    $mes = '画像の書き込みに失敗しました';
                    json_response(400, $mes);
                    return;
                }
                break;
            case IMAGETYPE_PNG:
                if(!imagepng($canvas, $resize_path, 9))
                {
                    $mes = '画像の書き込みに失敗しました';
                    json_response(400, $mes);
                    return;
                }
                break;
            case IMAGETYPE_GIF:
                if(!imagegif($canvas, $resize_path))
                {
                    $mes = '画像の書き込みに失敗しました';
                    json_response(400, $mes);
                    return;
                }
                break;
        }
        imagedestroy($canvas);

        $s3 = new S3Module;
        $s3->upload($resize_path, sprintf("photo/%s/%s", $key, $filename));
        $images[] = $filename;
        unlink($resize_path);
    }
    imagedestroy($original_image);

    list($main, $thumb, $sp_main, $sp_thumb) = $images;
    $sqlstr2[] = <<<END_DOC
INSERT INTO photo
(
    nid,
    title,
    img1,
    img2,
    img3,
    img4,
    flag,
    n
)
VALUES
(
    {$nid},
    '',
    '{$main}',
    '{$thumb}',
    '{$sp_main}',
    '{$sp_thumb}',
    0,
    {$cnt}
);
END_DOC;
    $return_arr = [
        'n' => $cnt,
        'filename' => $images,
        'img_path' => str_replace($SERVERPATH, $UserImgPath, $resize_path),
        'flag' => 0
    ];
    $files[] = $return_arr;
    $cnt++;

}

$o->query(implode("\n",$sqlstr2));
json_response(200, $files);
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