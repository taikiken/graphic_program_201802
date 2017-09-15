<?php

include "local.php";

// フル尺動画は更新戦はスケジュール発表と同時に全試合分生成される
// 試合開始後すぐにLIVE動画として用意されるので試合終了時にリンクが有効になるように処理をする
// URLが変更になることは無いか要確認

$season="2017秋季";
$file="http://amefootlive.jp/kcafl";

$data=get_contents($file);
preg_match_all('#<h3 class="title"><a href="([^"]+)" title="(【'.$season.'第[0-9]+節】[^"]+)">#',$data,$match);
for($i=0;$i<count($match[1]);$i++){
	echo sprintf("%s\t%s\n",$match[1][$i],$match[2][$i]);
}

?>