<?php

header("Content-Type:text/html; charset=UTF-8");

function getLatLng($ad){

	$u=sprintf("http://maps.google.com/maps/api/geocode/json?address=%s&sensor=false&region=JP&language=ja",urlencode(trim($ad)));
	$fp=fopen($u,"r");
	
	$i=0;
	$flg=0;
	
	while($f=fgets($fp,1024)){
		//echo $f;
		$f=trim($f);	
		if(preg_match("/formatted_address/",$f)){
			$R=$f;
			$k[$i][0]=str_replace(array('"formatted_address" : "日本','"',' ',','),"",ereg_replace("〒[0-9]{3}-[0-9]{4} ","",$f));
		}
		if(ereg("location",$f))$flg=1;
		if($flg==1&&ereg("lat",$f))$k[$i][1]=str_replace(array('"lat" : ',","),"",$f);
		if($flg==1&&ereg("lng",$f)){
			$k[$i][2]=str_replace('"lng" : ',"",$f);
			$flg=0;
			if(preg_match('/日本/',$R)){
				$yy[]=sprintf("<li>%s<span class=\"gmlat\">%s</span><span class=\"gmlng\">%s</span></li>",$k[$i][0],$k[$i][2],$k[$i][1]);
			}
			$R="";
			$i++;
		}
	}
	return $yy;
}

echo @implode("",getLatLng($_POST["address"]));

//echo @implode("",getLatLng("東京"));

?>