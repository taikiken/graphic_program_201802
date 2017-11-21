<?php

$TITLEFIELDNAME="name";
if($CURRENTDIRECTORY=="repo_n"){
	switch ($_GET["cid"]) {
		case 94:
			// 選手
			$TITLEFIELDNAME = "name";
			break;
		default:
			$TITLEFIELDNAME = multiLangTitle("title");
			break;
	}
  if ($_GET['rid'] == 95 && $q->get_dir() == 1) { // 注目の選手 編集画面のみ
    $TITLEFIELDNAME = "d2";
    $sql = sprintf("select name from tbl_player where id=%s", $p[$TITLEFIELDNAME]);
    $o->query($sql);
    $fetch_tbl_player = $o->fetch_array();
    $p[$TITLEFIELDNAME] = $p[$TITLEFIELDNAME] . ': ' . $fetch_tbl_player['name'];
  }
}elseif($CURRENTDIRECTORY=="mail"){
	$TITLEFIELDNAME="subject";
}elseif($CURRENTDIRECTORY=="mailtemplate"){
	$TITLEFIELDNAME="subject";
}elseif($CURRENTDIRECTORY=="mail_"){
	$TITLEFIELDNAME="f".$TITLEFIELDNAME;
}elseif($CURRENTDIRECTORY=="mail_template"){
	$TITLEFIELDNAME="f".$TITLEFIELDNAME;
}elseif($CURRENTDIRECTORY=="repo_edit"){
	$TITLEFIELDNAME="d_".$TITLEFIELDNAME;
}elseif($CURRENTDIRECTORY=="authentic"){
	$TITLEFIELDNAME="usr";
}elseif($CURRENTDIRECTORY=="repo_e"){
	$TITLEFIELDNAME="types";
}elseif($CURRENTDIRECTORY=="confs"){
	$TITLEFIELDNAME="SITE";
}elseif($CURRENTDIRECTORY=="company_news"){
	$TITLEFIELDNAME="title";
}

?>
<?php if($q->get_dir()==3){ ?>
<p><?=$PARENT?>に<?=$N?>件の<?=$THIS?>が登録されております。</p>
<?php if(strlen($COMMANDLISTEXP)>0){ ?><?=mod_HTML($COMMANDLISTEXP,2);?><?php } ?>
<?php }else{ ?>
<?php //include "../lib/description.php"; ?>

	<?php if($CURRENTDIRECTORY!="repo_e"){ ?>
		<?php if($q->get_dir()===0){ ?>

		<?php if($q->get_file()===0){ ?>

		<p><?=$PARENT?>に新規に<?=$THIS?>を<?=$q->exe_fl()?>します。
		<?php if(strlen($CONTENTSEXP)>0){ ?><p><?=mod_HTML($CONTENTSEXP,$CONTENTSEXPTAG);?></p><?php } ?>
		各項目を入力して「入力内容を確認する」ボタンを押してください。</p>

	<?php }elseif($q->get_file()===1){ ?>
		<p><?=$PARENT?>に<?=$THIS?> [ <?=$sv["p_".$TITLEFIELDNAME]?> ] を下記の内容で<?=$q->exe_fl()?>します。</p>
		<p>内容に問題が無ければ「このエントリを確定する」ボタンを押してください。</p>
		<p>修正する場合は「エントリの内容を修正する」ボタンから<?=$q->exe_fl()?>画面に戻って内容を修正してください。</p>

		<?php }elseif($q->get_file()===2){ ?>

		<?php if($e){ ?><p>エントリの<?=$q->exe_fl()?>が完了しました。</p><?php }else{ ?><p>システムエラーが発生したため<?=$q->exe_fl()?>を完了できませんでした。操作履歴のエラーログに詳細が記録されておりますので、そちらをご覧になりもう一度時間をおいてお試しください。</p><?php } ?>

		<?php } ?>

		<?php }elseif($q->get_dir()===1){ ?>
		<?php if($q->get_file()===0){ ?>

			<?php if ($_GET["cid"] == 94) { ?>
				<?php // 選手の広告設定の場合 ?>
				<p>「<?= $THIS ?>」の<?= $PARENT ?> を<?=$q->exe_fl() ?>します。</p>
			<?php } else { ?>
				<p><?= $PARENT ?>の<?= $THIS ?> [ <?= mod_HTML($p[$TITLEFIELDNAME]) ?> ] を<?= $q->exe_fl() ?>します。</p>
			<?php } ?>
			<p>編集する項目を入力して「編集した内容を確認する」ボタンを押してください。</p>

		<?php }elseif($q->get_file()===1){ ?>

			<?php if ($_GET["cid"] == 94) { ?>
				<?php // 選手の広告設定の場合 ?>
				<p>「<?= $THIS ?>」の<?= $PARENT ?> を下記の内容で<?= $q->exe_fl() ?>します。</p>
			<?php } else { ?>
				<p><?= $PARENT ?>の<?= $THIS ?> [ <?= $sv["p_".$TITLEFIELDNAME] ?> ] を下記の内容で<?= $q->exe_fl() ?>します。</p>
			<?php } ?>
			<p>内容に問題が無ければ「エントリの編集を確定する」ボタンを押してください。</p>
			<p>修正する場合は「エントリの内容を修正する」ボタンから<?=$q->exe_fl()?>画面に戻って内容を修正してください。</p>

		<?php }elseif($q->get_file()===2){ ?>

		<?php if($e){ ?><p>エントリの<?=$q->exe_fl()?>が完了しました。</p><?php }else{ ?><p>システムエラーが発生したため<?=$q->exe_fl()?>を完了できませんでした。操作履歴のエラーログに詳細が記録されておりますので、そちらをご覧になりもう一度時間をおいてお試しください。</p><?php } ?>

		<?php } ?>

		<?php }elseif($q->get_dir()===2){ ?>
		<?php if($q->get_file()===0){ ?>

		<p><?=$PARENT?>の<?=$THIS?> [ <?=mod_HTML($p[$TITLEFIELDNAME])?> ] を<?=$q->exe_fl()?>します。</p>
		<p>削除したエントリは復旧できません。エントリの内容に問題がある場合は「エントリの内容を修正する」ボタンを押して編集画面からエントリの編集をしてください。</p>

		<?php }elseif($q->get_file()===1){ ?>

		<p><?=$PARENT?>の<?=$THIS?> [ <?=$_POST[$TITLEFIELDNAME]?> ] を<?=$q->exe_fl()?>します。</p>
		<p>一度削除したエントリは復旧することができません。</p>
		<p>エントリ一覧から表示非表示の設定ができます。非表示に設定すると公開ページから一時的に消すことができます。</p>
		<p>本当に削除してもよいですか？</p>

		<?php }elseif($q->get_file()===2){ ?>

		<?php if($e){ ?><p>エントリの<?=$q->exe_fl()?>が完了しました。</p><?php }else{ ?><p>システムエラーが発生したため<?=$q->exe_fl()?>を完了できませんでした。操作履歴のエラーログに詳細が記録されておりますので、そちらをご覧になりもう一度時間をおいてお試しください。</p><?php } ?>

		<?php } ?>

		<?php }elseif($q->get_dir()===4){ ?>
		<?php if($q->get_file()===0){ ?>

		<p><?=$PARENT?>から<?=$THIS?>を<?=$q->exe_fl()?>します。</p>
		<p>検索したいキーワードをそれぞれのフィールドに入力してください。入力された項目のみの＆検索になります。</p>

		<?php }elseif($q->get_file()===1){ ?>

		<p><?=$PARENT?>から条件にあった<?=$THIS?>が<?=$SEARCHRESULTCOUNT?>件ヒットしました。</p>
		<p>タイトルをクリックするとそのエントリの編集画面に遷移します。</p>

		<?php } ?>

		<?php }elseif($q->get_dir()===5){ ?>
		<?php if($q->get_file()===0){ ?>

		<p><?=$PARENT?>から<?=$THIS?>を<?=$q->exe_fl()?>します。</p>
		<p>検索したいキーワードをそれぞれのフィールドに入力してください。入力された項目のみの＆検索になります。</p>

		<?php } ?>

		<?php } ?>

	<?php }else{ ?>

		<?php if($q->get_dir()===0){ ?>

		<?php if($q->get_file()===0){ ?>

		<p><?=$PARENT?>に新規<?=$THIS?> [ <?=$contentsEditorTypes[$g->f("types")]?> ] を<?=$q->exe_fl()?>いたします。</p>
		<p>ページブロック情報設定の「ブロックタイプ」のプルダウンメニューから追加するブロックのタイプを選択し、各項目を入力して「入力内容を確認する」ボタンを押してください。</p>

		<?php }elseif($q->get_file()===1){ ?>
		<p><?=$PARENT?>に新規<?=$THIS?> [ <?=$contentsEditorTypes[$sv["p_types"]]?> ] を下記の内容で<?=$q->exe_fl()?>いたします。</p>
		<p>内容に問題が無ければ「このエントリを確定する」ボタンを押してください。</p>
		<p>修正する場合は「エントリの内容を修正する」ボタンから<?=$q->exe_fl()?>画面に戻って内容を修正してください。</p>

		<?php }elseif($q->get_file()===2){ ?>

		<?php if($e){ ?><p>エントリの<?=$q->exe_fl()?>が完了しました。</p><?php }else{ ?><p>システムエラーが発生したため<?=$q->exe_fl()?>を完了できませんでした。操作履歴のエラーログに詳細が記録されておりますので、そちらをご覧になりもう一度時間をおいてお試しください。</p><?php } ?>

		<?php } ?>

		<?php }elseif($q->get_dir()===1){ ?>
		<?php if($q->get_file()===0){ ?>

		<p><?=$PARENT?>の<?=$THIS?> [ <?=$contentsEditorTypes[$p["types"]]?> ] を<?php if($p["types"]==$g->f("types")){ ?><?=$q->exe_fl()?>します。<?php }else{ ?>[ <?=$contentsEditorTypes[$g->f("types")]?> ]に変更いたします。<?php } ?></p>
		<p>ブロックタイプを変更すると入力されたエントリが消えてしまうことがあります。公開されているエントリを編集する場合は注意してください。もしエントリが消えてしまったら確認ボタンを押下する前にブロックタイプを [ <?=$contentsEditorTypes[$p["types"]]?> ] に戻してください。</p>
		<p>編集する項目を入力して「編集した内容を確認する」ボタンを押してください。</p>

		<?php }elseif($q->get_file()===1){ ?>

		<p><?=$PARENT?>の<?=$THIS?> [ <?=$contentsEditorTypes[$sv["p_types"]]?> ] を下記の内容で<?=$q->exe_fl()?>いたします。</p>
		<p>内容に問題が無ければ「エントリの編集を確定する」ボタンを押してください。</p>
		<p>修正する場合は「エントリの内容を修正する」ボタンから<?=$q->exe_fl()?>画面に戻って内容を修正してください。</p>

		<?php }elseif($q->get_file()===2){ ?>

		<?php if($e){ ?><p>エントリの<?=$q->exe_fl()?>が完了しました。</p><?php }else{ ?><p>システムエラーが発生したため<?=$q->exe_fl()?>を完了できませんでした。操作履歴のエラーログに詳細が記録されておりますので、そちらをご覧になりもう一度時間をおいてお試しください。</p><?php } ?>

		<?php } ?>

		<?php }elseif($q->get_dir()===2){ ?>
		<?php if($q->get_file()===0){ ?>

		<p><?=$PARENT?>の<?=$THIS?> [ <?=$mnue[$p["types"]]?> ] を<?=$q->exe_fl()?>いたします。</p>
		<p>削除したエントリは復旧できません。エントリの内容に問題がある場合は「エントリの内容を修正する」ボタンを押して編集画面からエントリの編集をしてください。</p>

		<?php }elseif($q->get_file()===1){ ?>

		<p><?=$PARENT?>の<?=$THIS?> [ <?=$mnue[$_POST["types"]]?> ] を<?=$q->exe_fl()?>いたします。</p>
		<p>一度削除したエントリは復旧することができません。</p>
		<p>エントリ一覧から表示非表示の設定ができます。非表示に設定すると公開ページから一時的に消すことができます。</p>
		<p>本当に削除してもよいですか？</p>

		<?php }elseif($q->get_file()===2){ ?>

		<?php if($e){ ?><p>エントリの<?=$q->exe_fl()?>が完了しました。</p><?php }else{ ?><p>システムエラーが発生したため<?=$q->exe_fl()?>を完了できませんでした。操作履歴のエラーログに詳細が記録されておりますので、そちらをご覧になりもう一度時間をおいてお試しください。</p><?php } ?>

		<?php } ?>
		<?php } ?>

	<?php } ?>

<?php } ?>
