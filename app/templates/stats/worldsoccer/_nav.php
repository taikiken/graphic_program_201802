<?php
// ナビゲーション アクティブ
function is_active_nav($uri) {
	$uri = trim( $uri, "/" );
	$request_uri = $_SERVER['REQUEST_URI'];

	if(strpos($request_uri,$uri) !== false){
  		echo "active";
	}
	return false;
}

?>

<div class="stats__nav stats__nav--worldsoccer">
	<ul class="stats__nav__list">
    	<li class="stats__nav__item_1 <?php is_active_nav('premier-league');?>"><a href="/stats/worldsoccer/premier-league">プレミアリーグ</a></li>
    	<li class="stats__nav__item_2 <?php is_active_nav('bundesliga');?>"><a href="/stats/worldsoccer/bundesliga">ブンデス・リーガ</a></li>
    	<li class="stats__nav__item_3 <?php is_active_nav('champions-league');?>"><a href="/stats/worldsoccer/champions-league">チャンピオンズリーグ</a></li>
    	<li class="stats__nav__item_4 <?php is_active_nav('la-liga');?>"><a href="/stats/worldsoccer/la-liga">リーガ・エスパニョーラ</a></li>
    	<li class="stats__nav__item_5 <?php is_active_nav('serie-a');?>"><a href="/stats/worldsoccer/serie-a">セリエA</a></li>
    </ul>
</div>

<div class="stats__local__nav stats__local__nav--worldsoccer">
	<ul class="stats__local__nav__list">
		<li class="stats__local__nav__item_1 <?php is_active_nav('schedule');?>"><a href="/stats/worldsoccer/<?php echo $page['league']; ?>/schedule">試合日程</a></li>
    	<li class="stats__local__nav__item_2 <?php is_active_nav('standing');?>"><a href="/stats/worldsoccer/<?php echo $page['league']; ?>/standing">順位表</a></li>
    	<li class="stats__local__nav__item_3 <?php is_active_nav('playlist');?>"><a href="/stats/worldsoccer/<?php echo $page['league']; ?>/playlist">選手情報</a></li>
    	<li class="stats__local__nav__item_4 <?php is_active_nav('team');?>"><a href="/stats/worldsoccer/<?php echo $page['league']; ?>/team">チーム情報</a></li>
    </ul>
</div>