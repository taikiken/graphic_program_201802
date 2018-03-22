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

		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2) {
    include $INCLUDEPATH . "lib/" . $CURRENTDIRECTORY . "/ex.php";
    data_sql();

    $o = new dbutl($TABLE);

    $u_headline_id = get_u_headline_id($g->f("cid"), $g->f("rid"), $sv['d2']);
    $sort_no = (int)str_replace("'", "", $sv['sort_no']) + 1;
    $sql = <<<SQL
INSERT INTO pickup_athletes_big4(
u_headline_id, 
sort_no, 
created_at
)
VALUES(
{$u_headline_id},
{$sort_no},
NOW()
)
SQL;

    $e = $o->query($sql);

  }


}elseif($q->get_dir()===1){  // 編集
	if($q->get_file()===0){

      $sql= <<<SQL
SELECT uh.*, sort_no
FROM pickup_athletes_big4 big4 INNER JOIN u_headline uh ON big4.u_headline_id = uh.id
  INNER JOIN tbl_player ply ON uh.d2 = ply.id
WHERE uh.id = {$g->f("id")}
SQL;

		$o->query($sql);
		$p=$o->fetch_array();
    $p['sort_no'] = $p['sort_no'] - 1;

		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){
		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();

    $o = new dbutl($TABLE);

    $sort_no = (int)str_replace("'", "", $sv['sort_no']) + 1;
    $sql = <<<SQL
UPDATE pickup_athletes_big4
SET 
sort_no = {$sort_no}, 
updated_at = NOW()
WHERE u_headline_id = {$g->f("id")}::INTEGER
SQL;

    $e=$o->query($sql);

    $title = mod_HTML($p[$i]["player_id"] . "：" . $p[$i]["name"]);
    $title .= sprintf(" （表示順 %s ", $p[$i]["sort_no"] . "）");

    echo $title;

	}
}elseif($q->get_dir()===2){ // 削除
	if($q->get_file()===0){

    $o = new dbutl($TABLE);

    $sql= <<<SQL
SELECT uh.*, sort_no
FROM pickup_athletes_big4 big4 INNER JOIN u_headline uh ON big4.u_headline_id = uh.id
  INNER JOIN tbl_player ply ON uh.d2 = ply.id
WHERE uh.id = {$g->f("id")}
SQL;

    $o->query($sql);
    $p=$o->fetch_array();

    include $INCLUDEPATH."formback.php";

	}elseif($q->get_file()===1){
		data_conf();

	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
    $o=new dbutl($TABLE);

		$sql = <<<SQL
DELETE FROM pickup_athletes_big4
WHERE u_headline_id = {$g->f("id")}
SQL;

    $e=$o->query($sql);

	}
}elseif($q->get_dir()===3){ // 一覧画面
  $o = new dbutl($TABLE);

  $sql = <<<SQL
SELECT ply.id AS player_id, ply.name, sort_no, uh.id
FROM pickup_athletes_big4 big4 INNER JOIN u_headline uh ON big4.u_headline_id = uh.id
  INNER JOIN tbl_player ply ON uh.d2 = ply.id
WHERE uh.cid = {$g->f("cid")} AND uh.qid = {$g->f("rid")}
GROUP BY player_id, ply.name, sort_no, uh.id
ORDER BY sort_no
SQL;

  $o->query($sql);

  $III=0;
  while($f=$o->fetch_array($III)){
    $p[]=$f;
    $III++;
  }
}

