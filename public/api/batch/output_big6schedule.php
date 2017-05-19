<?php

include "local.php";

/*

連盟のサーバからjsonファイルを取得して、ブル用にハイライト動画を紐づけて出力する
中止になった試合や引き分けになった試合のIDは再利用されることなく新規に採番されるため、スポラボ様が試合のIDを確認する用のCSVファイルを出力する

*/

//連盟のJSON
$jsonfile="http://big6.gr.jp/game_file/2017s_schedule.json";
//BULLのCSV
$csvfile="../ver1/static/big6tv2017s_schedule.csv";
//BULLのJSON
$localjsonfile="../ver1/static/big6tv2017s_schedule.json";
//BULLのハイライト動画ファイル一覧
$moviefile="http://cms.sportsbull.jp/api/batch/output_big6tvmovie.php";

$d=get_contents($jsonfile);
$d=mb_convert_encoding($d,"UTF-8","SJIS");
$d=json_decode($d,true);

if(!$d)exit;

$csvdata=array();
$csvdata[]=array(
	"週",
	"日付",
	"曜日",
	"開始時間",
	"試合ID",
	"回戦",
	"先攻チーム名",
	"先攻チーム名イニシャル",
	"先攻チームスコア",
	"後攻チーム名",
	"後攻チーム名イニシャル",
	"後攻チームスコア",
	"ステータス"
);
$csvdata[0]=sprintf('"%s"',implode('","',$csvdata[0]));

$game=$d["response"]["gameinfo"];
for($i=0;$i<count($game);$i++){
	for($j=0;$j<count($game[$i]["gamedate"]);$j++){
		for($k=0;$k<count($game[$i]["gamedate"][$j]["game"]);$k++){
			$tmpdata=array(
				$game[$i]["week"],
				$game[$i]["gamedate"][$j]["date"],
				$game[$i]["gamedate"][$j]["weekday"],
				$k==0?$game[$i]["gamedate"][$j]["starttime"]:"-",
				$game[$i]["gamedate"][$j]["game"][$k]["gameid"],
				$game[$i]["gamedate"][$j]["game"][$k]["round"],
				$game[$i]["gamedate"][$j]["game"][$k]["team"][0]["name"],
				$game[$i]["gamedate"][$j]["game"][$k]["team"][0]["nameI"],
				$game[$i]["gamedate"][$j]["game"][$k]["team"][0]["score"],
				$game[$i]["gamedate"][$j]["game"][$k]["team"][1]["name"],
				$game[$i]["gamedate"][$j]["game"][$k]["team"][1]["nameI"],
				$game[$i]["gamedate"][$j]["game"][$k]["team"][1]["score"],
				$game[$i]["gamedate"][$j]["game"][$k]["status"]
			);
			$rawdata[$game[$i]["week"]][$game[$i]["gamedate"][$j]["date"]][]=$tmpdata;
			$csvdata[]=sprintf('"%s"',implode('","',$tmpdata));
		}
	}
}
$csvdata=implode("\r\n",$csvdata);
$csvdata=mb_convert_encoding($csvdata,"SJIS","UTF-8");
//CSV出力
file_put_contents($csvfile,$csvdata);

//ハイライト動画一覧出力
$movielist=get_contents($moviefile);
$movielist=json_decode($movielist,true);
$movie=$movielist["response"]["movie"];

$y=array();
$i=0;
foreach($rawdata as $k=>$v){
	
	$y[$i]["week"]=$k;
	$j=0;
	
	foreach($v as $kk=>$vv){
		$sttime=strtotime($kk);
		$weekday=get_weekday(date("w",$sttime));		
		$y[$i]["gamedate"][$j]["date"]=$kk;
		$y[$i]["gamedate"][$j]["weekday"]=$weekday;
		$y[$i]["gamedate"][$j]["date_display"]=sprintf("%s (%s)",date("n/j",$sttime),$weekday);
		$y[$i]["gamedate"][$j]["starttime"]=$vv[0][3];
		for($ii=0;$ii<count($vv);$ii++){
			$y[$i]["gamedate"][$j]["game"][$ii]["gameid"]=$vv[$ii][4];
			$y[$i]["gamedate"][$j]["game"][$ii]["round"]=$vv[$ii][5];
			if(!preg_match("/dev/",$servername)){
				$y[$i]["gamedate"][$j]["game"][$ii]["status"]=$vv[$ii][12];
			}else{
				if($vv[$ii][4]==="3")$y[$i]["gamedate"][$j]["game"][$ii]["status"]="中止";
				elseif($vv[$ii][4]==="5")$y[$i]["gamedate"][$j]["game"][$ii]["status"]="ノーゲーム";
				else $y[$i]["gamedate"][$j]["game"][$ii]["status"]=$vv[$ii][12];
			}
			$y[$i]["gamedate"][$j]["game"][$ii]["highlightmovie"]=isset($movie[$vv[$ii][4]])?sprintf("https://sportsbull.jp/p/%s/",$movie[$vv[$ii][4]]):"";
			$y[$i]["gamedate"][$j]["game"][$ii]["team"][0]["name"]=$vv[$ii][6];
			$y[$i]["gamedate"][$j]["game"][$ii]["team"][0]["nameI"]=$vv[$ii][7];
			$y[$i]["gamedate"][$j]["game"][$ii]["team"][0]["score"]=$vv[$ii][8];
			$y[$i]["gamedate"][$j]["game"][$ii]["team"][1]["name"]=$vv[$ii][9];
			$y[$i]["gamedate"][$j]["game"][$ii]["team"][1]["nameI"]=$vv[$ii][10];
			$y[$i]["gamedate"][$j]["game"][$ii]["team"][1]["score"]=$vv[$ii][11];
		}
		$j++;
	}
	$i++;
}

$result["response"]["lastupdate"]=date('Y-m-d H:i:s');
$result["response"]["gameinfo"]=$y;

$result=json_encode($result,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
file_put_contents($localjsonfile,$result);

?>