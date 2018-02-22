<?php

$TABLE="u_headline";


if($q->get_dir()===0){ // 新規
	if($q->get_file()===0){

	  // 選手カテゴリの初期値
    // カテゴリidをd1にしないといけない
    $sql="select category as d1 from repo where id=".$g->f("cid");
    $o->query($sql);
    $p=$o->fetch_array();
    $o->query($sql);
    $p=$o->fetch_array();

    $o->query($sql);
    $p=$o->fetch_array();


		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2) {
    include $INCLUDEPATH . "lib/" . $CURRENTDIRECTORY . "/ex.php";
    data_sql();

    $o = new dbutl($TABLE);
    $u_headline_id = get_u_headline_id($g->f("cid"), $g->f("rid"));

    $sort_no = (int)str_replace("'", "", $sv['sort_no']) + 1;
    $sql = <<<SQL
INSERT INTO pickup_athletes_big4(
u_headline_id, 
player_id, 
sort_no, 
created_at
)
VALUES(
{$u_headline_id},
{$sv['d2']}::INTEGER ,
{$sort_no},
NOW()
)
SQL;

    $e = $o->query($sql);

  }


}elseif($q->get_dir()===1){  // 編集
	if($q->get_file()===0){

	  // カテゴリidをd1にしないといけない
      $sql= <<<SQL
SELECT u_headline_id, d1, sort_no
FROM pickup_athletes_big4
INNER JOIN u_headline uh ON u_headline_id = uh.id
WHERE player_id = {$g->f("id")}::INTEGER
SQL;

		$o->query($sql);
		$p=$o->fetch_array();
    $p['sort_no'] = $p['sort_no'] - 1;
    $p['d2'] = $g->f("id"); // 選手IDをd2にしないといけない

		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){
		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();

    $o = new dbutl($TABLE);
    $u_headline_id = get_u_headline_id($g->f("cid"), $g->f("rid"));

    $sort_no = (int)str_replace("'", "", $sv['sort_no']) + 1;
    $sql = <<<SQL
UPDATE pickup_athletes_big4
SET 
u_headline_id = {$u_headline_id}, 
player_id = {$sv['d2']}::INTEGER, 
sort_no = {$sort_no}, 
updated_at = NOW()
WHERE player_id = {$g->f("id")}::INTEGER
SQL;
    $e=$o->query($sql);

	}
}elseif($q->get_dir()===2){ // 削除
	if($q->get_file()===0){

    $o = new dbutl($TABLE);

    // カテゴリidをd1にしないといけない
    $sql = <<<SQL
SELECT ply.name, d1, sort_no
FROM pickup_athletes_big4 big4 INNER JOIN u_headline uh ON big4.u_headline_id = uh.id
  INNER JOIN tbl_player ply ON big4.player_id = ply.id
WHERE uh.cid = {$g->f("cid")} AND uh.qid = {$g->f("rid")}
AND big4.player_id = {$g->f("id")}
SQL;

    $o->query($sql);
    $p=$o->fetch_array();
    $p['d2'] = $g->f("id"); // 選手IDをd2にしないといけない
    include $INCLUDEPATH."formback.php";

	}elseif($q->get_file()===1){
		data_conf();

	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
    $o=new dbutl($TABLE);
    $u_headline_id = get_u_headline_id($g->f("cid"), $g->f("rid"));

		$sql = <<<SQL
DELETE FROM pickup_athletes_big4
WHERE u_headline_id = {$u_headline_id}
AND player_id = {$g->f("id")}::INTEGER
SQL;

    $e=$o->query($sql);

	}
}elseif($q->get_dir()===3){ // 一覧画面
  $o = new dbutl($TABLE);

  $sql = <<<SQL
SELECT ply.*, sort_no
FROM pickup_athletes_big4 big4 INNER JOIN u_headline uh ON big4.u_headline_id = uh.id
  INNER JOIN tbl_player ply ON big4.player_id = ply.id
WHERE uh.cid = {$g->f("cid")} AND uh.qid = {$g->f("rid")}
GROUP BY ply.id, ply.name, ply.name_kana, ply.competition, ply.description, ply.n, ply.flag, ply.img1, ply.link_word,
  ply.category, ply.og_img, ply.seo_description, ply.seo_keyword, ply.m_time, ply.u_time, big4.sort_no
ORDER BY sort_no
SQL;

  $o->query($sql);

  $III=0;
  while($f=$o->fetch_array($III)){
    $p[]=$f;
    $III++;
  }
}

