<?php

include "local.php";
include "public/check.php";

$ipaddress=$_SERVER['REMOTE_ADDR'];

if($ipaddress){
	$y["status"]=array(
		"code"=>200,
		"user_message"=>"",
		"developer_message"=>""
	);
}else{
	$y["status"]=array(
		"code"=>404,
		"user_message"=>"IPアドレスが取得できませんでした。",
		"developer_message"=>"IPアドレスが取得できませんでした。"
	);

}
$y["response"]["ip"]=$ipaddress;
$y["response"]["is_au"] = false;

$json = join('/', [$ImgPath, 'json', 'ip_list.json']);

$data = @file_get_contents($json);
if(false === empty($data))
{
    $data = json_decode($data);
    foreach($data->include as $cidr)
    {
        list($accept_ip, $mask) = explode('/', $cidr);
        $accept_long = ip2long($accept_ip) >> (32 - $mask);
        $remote_long = ip2long($ipaddress) >> (32 - $mask);
        if($accept_long == $remote_long)
        {
            $y["response"]["is_au"] = true;
        }
    }

    foreach($data->exclude as $cidr)
    {
        list($accept_ip, $mask) = explode('/', $cidr);
        $accept_long = ip2long($accept_ip) >> (32 - $mask);
        $remote_long = ip2long($ipaddress) >> (32 - $mask);
        if($accept_long == $remote_long)
        {
            $y["response"]["is_au"] = false;
        }
    }
}

print_json($y,$_SERVER['HTTP_REFERER']);

?>