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

    $o = new dbutl($TABLE);

    // u_categoriesが混ざっちゃうからカラム指定する
    // ファイルアップロードされてないとないと配列キーimgつくられない
    if (empty($sv['img'])) $sv[$sn[] = 'img'] = 'NULL';
    if (empty($sv['sp_img'])) $sv[$sn[] = 'sp_img'] = 'NULL';
    if (empty($sv['ios_img'])) $sv[$sn[] = 'ios_img'] = 'NULL';
    if (empty($sv['android_img'])) $sv[$sn[] = 'android_img'] = 'NULL';

    $sql = <<<SQL
INSERT INTO notices(
        type,
        text,
        img,
        link,
        sp_img,
        sp_link,
        ios_img,
        ios_link,
        android_img,
        android_link,
        created_at,
        updated_at,
        is_hide_detail
        ) 
VALUES(
        {$sv['type']},
        {$sv['text']},
        {$sv['img']},
        {$sv['link']},
        {$sv['sp_img']},
        {$sv['sp_link']},
        {$sv['ios_img']},
        {$sv['ios_link']},
        {$sv['android_img']},
        {$sv['android_link']},
        NOW(),
        NOW(),
        {$sv['is_hide_detail']},
        )
RETURNING id;
SQL;

    $o->query($sql);
    file_put_contents('/tmp/sql', $sql);
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

    // ファイルアップロードされてないとないと配列キーimgつくられない
    if (empty($sv['img'])) $sv[$sn[] = 'img'] = 'NULL';
    if (empty($sv['sp_img'])) $sv[$sn[] = 'sp_img'] = 'NULL';
    if (empty($sv['ios_img'])) $sv[$sn[] = 'ios_img'] = 'NULL';
    if (empty($sv['android_img'])) $sv[$sn[] = 'android_img'] = 'NULL';

		$sql = <<<SQL
UPDATE notices 
set 
        type = {$sv['type']},
        text = {$sv['text']},
        img = {$sv['img']},
        link = {$sv['link']},
        sp_img = {$sv['sp_img']},
        sp_link = {$sv['sp_link']},
        ios_img = {$sv['ios_img']},
        ios_link = {$sv['ios_link']},
        android_img = {$sv['android_img']},
        android_link = {$sv['android_link']},
        updated_at = NOW(),
        is_hide_detail = {$sv['is_hide_detail']}
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
  $FIELD="notices.*";
  // $WHERE はinclude/lib.php に書いてる
}
