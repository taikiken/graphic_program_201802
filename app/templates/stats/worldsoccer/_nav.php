<?php

function is_active_nav($uri) {
	$uri = trim( $uri, "/" );
	$request_uri = $_SERVER['REQUEST_URI'];

	if(strpos($request_uri,$uri) !== false){
  		echo "active";
	}

	// if( $uri && strpos($request_uri."/", "/".$uri."/", 0) !== FALSE ) {
	// 	return true;
	// }
	// $request_uri = trim(str_replace( "/index.php", "", $request_uri ), '/');
	// if( !$uri && !$request_uri ) {
	// 	return true;
	// }
	return false;
}

?>

<div class="stats__nav stats__nav--worldsoccer">
	<ul class="stats__nav__list">
    	<li class="stats__nav__item_1 <?php is_active_nav('premier-league');?>"><a href="../premier-league">プレミアリーグ</a></li>
    	<li class="stats__nav__item_2 <?php is_active_nav('bundesliga');?>"><a href="../bundesliga">ブンデス・リーガ</a></li>
    	<li class="stats__nav__item_3 <?php is_active_nav('champions-league');?>"><a href="../champions-league">チャンピオンリーグ</a></li>
    	<li class="stats__nav__item_4 <?php is_active_nav('la-liga');?>"><a href="../la-liga">リーガ・エスパニョーラ</a></li>
    	<li class="stats__nav__item_5 <?php is_active_nav('serie-a');?>"><a href="../serie-a">セリアA</a></li>
    </ul>
</div>

<div class="stats__local__nav stats__local__nav--worldsoccer">
	<ul class="stats__local__nav__list">
		<li class="stats__local__nav__item_1 <?php is_active_nav('schedule');?>"><a href="/stats/worldsoccer/schedule">試合日程</a></li>
    	<li class="stats__local__nav__item_2 <?php is_active_nav('standing');?>"><a href="/stats/worldsoccer/">順位表</a></li>
    	<li class="stats__local__nav__item_3 <?php is_active_nav('playlist');?>"><a href="/stats/worldsoccer/playlist">選手情報</a></li>
    	<li class="stats__local__nav__item_4 <?php is_active_nav('team');?>"><a href="/stats/worldsoccer/team">チーム情報</a></li>
    </ul>
</div>