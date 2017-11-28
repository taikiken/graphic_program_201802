<?php

	$TABLE="notices";
	$NUMBERINGOFF=1;

if($q->get_dir()===0){ // 新規
	if($q->get_file()===0){

	}elseif($q->get_file()===1){
		data_conf();

	}elseif($q->get_file()===2){
		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();

    $sv[$sn[] = "created_at"] = "now()";
    $o = new dbutl($TABLE, $sn, $sv);

    // u_categoriesが混ざっちゃうからカラム指定する
    $sql = <<<SQL
INSERT INTO notices(
        type,
        text,
        img,
        link,
        created_at
        ) 
VALUES(
        {$sv['type']},
        {$sv['text']},
        {$sv['img']},
        {$sv['link']},
        NOW()
        )
RETURNING id;
SQL;

    $o->query($sql);
    $f = $o->fetch_array();
    $notice_id = $f['id'];

    // 選択されたカテゴリたち
    $p_u_categories = empty($_POST['p_u_categories']) ? '0' : $_POST['p_u_categories'];
    $categoryid_list = explode(',', $p_u_categories);

    foreach ($categoryid_list as $category_id) {
      $s[] = sprintf("INSERT INTO categories_notices(category_id,notice_id,created_at) VALUES(%s,%s,NOW());", $category_id, $notice_id);
    }
    $s = implode("\n", $s);
    $e = $o->query($s);
  }
}elseif($q->get_dir()===1){ // 編集
	if($q->get_file()===0){

		$sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("id"));
		$o->query($sql);
		$p=$o->fetch_array();
		include $INCLUDEPATH."formback.php";

	}elseif($q->get_file()===1){
		data_conf();

	}elseif($q->get_file()===2){
		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();

		$notice_id = $g->f("id");
    $sv[$sn[]="id"]=$notice_id;
		$o=new dbutl($TABLE,$sn,$sv);

		$sql = <<<SQL
UPDATE notices 
set 
        type = {$sv['type']},
        text = {$sv['text']},
        img = {$sv['img']},
        link = {$sv['link']}
where id = {$notice_id}
SQL;
		$e=$o->query($sql);

    // 中間テーブル削除
    $sql = sprintf("DELETE FROM categories_notices WHERE notice_id=%s;", $notice_id);
    $o->query($sql);
    // 選択されたカテゴリたち
    $p_u_categories = empty($_POST['p_u_categories']) ? '0' : $_POST['p_u_categories'];
    $categoryid_list = explode(',', $p_u_categories);

    foreach ($categoryid_list as $category_id) {
      $s[] = sprintf("INSERT INTO categories_notices(category_id,notice_id,created_at) VALUES(%s,%s,NOW());", $category_id, $notice_id);
    }
    $s = implode("\n", $s);
    $e = $o->query($s);
	}
}elseif($q->get_dir()===2){ // 削除
	if($q->get_file()===0){

		$sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("id"));
		$o->query($sql);
    $p=$o->fetch_array();

	}elseif($q->get_file()===1){
		data_conf();

	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
    $notice_id = $g->f("id");

    $o=new dbutl($TABLE);
		$e=$o->remove($notice_id);
		// 中間テーブル削除
    $sql = sprintf("DELETE FROM categories_notices WHERE notice_id=%s;", $notice_id);
    $o->query($sql);

	}
}elseif($q->get_dir()===3){ // 一覧画面
  $FIELD="*";
}
