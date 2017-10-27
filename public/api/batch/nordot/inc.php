<?php

$area=array("北海道","東北","関東","北陸・甲信越","東海","関西","中国","四国","九州・沖縄");

$dir="nordot";
$url="https://this.kiji.is/-/feed/posts/rss?source_id=";
if(!$bucket){
	$bucket=sprintf("%s/api/ver1/static/%s",$SERVERPATH,$dir);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket2=sprintf("s3://private-cms.sportsbull.jp/static/%s",$dir);
}

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264590665548414985
https://this.kiji.is/-/feed/posts/rss?source_id=264590406780076039
https://this.kiji.is/-/feed/posts/rss?source_id=265733930566303751
https://this.kiji.is/-/feed/posts/rss?source_id=265734344125171191
https://this.kiji.is/-/feed/posts/rss?source_id=267120765466509315
https://this.kiji.is/-/feed/posts/rss?source_id=286022669303481441
https://this.kiji.is/-/feed/posts/rss?source_id=286022806381741153
https://this.kiji.is/-/feed/posts/rss?source_id=286022885712135265
https://this.kiji.is/-/feed/posts/rss?source_id=286023111286031457";

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264590909493379081
https://this.kiji.is/-/feed/posts/rss?source_id=264590798897954825
https://this.kiji.is/-/feed/posts/rss?source_id=265735739548616189
https://this.kiji.is/-/feed/posts/rss?source_id=265736511090869757
https://this.kiji.is/-/feed/posts/rss?source_id=265736680507621385
https://this.kiji.is/-/feed/posts/rss?source_id=286023760275539041
https://this.kiji.is/-/feed/posts/rss?source_id=286023867322582113
https://this.kiji.is/-/feed/posts/rss?source_id=286023940114138209
https://this.kiji.is/-/feed/posts/rss?source_id=286024004744184929";

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264592086758342657
https://this.kiji.is/-/feed/posts/rss?source_id=264591966256709641
https://this.kiji.is/-/feed/posts/rss?source_id=265738197742272519
https://this.kiji.is/-/feed/posts/rss?source_id=265738490421084166
https://this.kiji.is/-/feed/posts/rss?source_id=265738806772073977
https://this.kiji.is/-/feed/posts/rss?source_id=286024211184239713
https://this.kiji.is/-/feed/posts/rss?source_id=286036824115414113
https://this.kiji.is/-/feed/posts/rss?source_id=286036887382377569
https://this.kiji.is/-/feed/posts/rss?source_id=286036951386195041";

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264592342393733123
https://this.kiji.is/-/feed/posts/rss?source_id=264592201804644361
https://this.kiji.is/-/feed/posts/rss?source_id=265740118838935561
https://this.kiji.is/-/feed/posts/rss?source_id=267111635081789442
https://this.kiji.is/-/feed/posts/rss?source_id=267111855105476093
https://this.kiji.is/-/feed/posts/rss?source_id=286037035591107681
https://this.kiji.is/-/feed/posts/rss?source_id=286037098207839329
https://this.kiji.is/-/feed/posts/rss?source_id=286037194312008801
https://this.kiji.is/-/feed/posts/rss?source_id=286037294874788961";

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264593507474112517
https://this.kiji.is/-/feed/posts/rss?source_id=264593392814407685
https://this.kiji.is/-/feed/posts/rss?source_id=267112302407239165
https://this.kiji.is/-/feed/posts/rss?source_id=267112446021518842
https://this.kiji.is/-/feed/posts/rss?source_id=267112640438222849
https://this.kiji.is/-/feed/posts/rss?source_id=286037403930788961
https://this.kiji.is/-/feed/posts/rss?source_id=286037463838164065
https://this.kiji.is/-/feed/posts/rss?source_id=286037536516949089
https://this.kiji.is/-/feed/posts/rss?source_id=286038087606830177";

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264593744808689665
https://this.kiji.is/-/feed/posts/rss?source_id=264593631864455169
https://this.kiji.is/-/feed/posts/rss?source_id=267113134910490105
https://this.kiji.is/-/feed/posts/rss?source_id=267113294661682679
https://this.kiji.is/-/feed/posts/rss?source_id=267113415841285626
https://this.kiji.is/-/feed/posts/rss?source_id=286038406143132769
https://this.kiji.is/-/feed/posts/rss?source_id=286038551123477601
https://this.kiji.is/-/feed/posts/rss?source_id=286038648947311713
https://this.kiji.is/-/feed/posts/rss?source_id=286038903826941025";

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264593906326667266
https://this.kiji.is/-/feed/posts/rss?source_id=264593829000970241
https://this.kiji.is/-/feed/posts/rss?source_id=267114778360725511
https://this.kiji.is/-/feed/posts/rss?source_id=267114905506891257
https://this.kiji.is/-/feed/posts/rss?source_id=267115034695254020
https://this.kiji.is/-/feed/posts/rss?source_id=286039077328438369
https://this.kiji.is/-/feed/posts/rss?source_id=286039245801063521
https://this.kiji.is/-/feed/posts/rss?source_id=286039351208248417
https://this.kiji.is/-/feed/posts/rss?source_id=286039436973442145";

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264594094978433031
https://this.kiji.is/-/feed/posts/rss?source_id=264593990162432002
https://this.kiji.is/-/feed/posts/rss?source_id=267116145230005753
https://this.kiji.is/-/feed/posts/rss?source_id=267116259583526393
https://this.kiji.is/-/feed/posts/rss?source_id=267116364816319989
https://this.kiji.is/-/feed/posts/rss?source_id=286039613771695201
https://this.kiji.is/-/feed/posts/rss?source_id=286039715211002977
https://this.kiji.is/-/feed/posts/rss?source_id=286039918139819105
https://this.kiji.is/-/feed/posts/rss?source_id=286039987534595169";

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=267118626873902588
https://this.kiji.is/-/feed/posts/rss?source_id=267117732245880836
https://this.kiji.is/-/feed/posts/rss?source_id=267117874869339642
https://this.kiji.is/-/feed/posts/rss?source_id=267118011091977722
https://this.kiji.is/-/feed/posts/rss?source_id=267118156846777847
https://this.kiji.is/-/feed/posts/rss?source_id=286040124717745249
https://this.kiji.is/-/feed/posts/rss?source_id=286040189792388193
https://this.kiji.is/-/feed/posts/rss?source_id=286040255454184545
https://this.kiji.is/-/feed/posts/rss?source_id=286040332474205281";

function get_pref($media){
	$pref=array("北海道"=>"北海道","青森"=>"青森","岩手"=>"岩手","宮城"=>"宮城","秋田"=>"秋田","山形"=>"山形","福島"=>"福島","茨城"=>"茨城","栃木"=>"栃木","群馬"=>"群馬","埼玉"=>"埼玉","千葉"=>"千葉","東京"=>"東京","神奈川"=>"神奈川",
	"新潟"=>"新潟","富山"=>"富山","石川"=>"石川","福井"=>"福井","山梨"=>"山梨","長野"=>"長野","岐阜"=>"岐阜","静岡"=>"静岡","愛知"=>"愛知","三重"=>"三重","滋賀"=>"滋賀","京都"=>"京都","大阪"=>"大阪","兵庫"=>"兵庫","奈良"=>"奈良",
	"和歌山"=>"和歌山","鳥取"=>"鳥取","島根"=>"島根","岡山"=>"岡山","広島"=>"広島","山口"=>"山口","徳島"=>"徳島","香川"=>"香川","愛媛"=>"愛媛","高知"=>"高知","福岡"=>"福岡","佐賀"=>"佐賀","長崎"=>"長崎","熊本"=>"熊本","大分"=>"大分",
	"宮崎"=>"宮崎","鹿児島"=>"鹿児島","沖縄"=>"沖縄","とく島"=>"徳島","室蘭"=>"北海道","上毛"=>"群馬","琉球"=>"沖縄");
	foreach($pref as $k=>$v){
		if(preg_match("/".$k."/",$media)){
			return $v;
		}
	}
	return "";
}

?>