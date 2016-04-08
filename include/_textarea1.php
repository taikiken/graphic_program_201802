<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields">
<?php if(!$_BILL){ ?>
<?php if($_OPTION==82&&$TAGON==1){ ?>
<div class="TagsOn"><label for="<?=$f_name?>tag"><input type="checkbox" class="box" name="p_<?=$f_name?>tag" id="<?=$f_name?>tag" value="2"<?php if($p[$f_name."tag"]==2)echo " checked=\"checked\""; ?> onclick="i(this.checked,'html<?=$f_name?>tag')" />HTMLタグを有効にする</label></div>
<?php } ?>
<textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>"><?=mod_HTML($p[$f_name])?></textarea>
<?php if($_OPTION==82&&$TAGON==1){ ?>
<div id="html<?=$f_name?>tag"<?php if($p[$f_name."tag"]==2)echo "style=\"display:block;\""; ?>>
<ul><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatURL(document.f.p_<?=$f_name?>,'p_<?=$f_name?>','<?=$f_name?>')"><img src="/shared/cms/img/html_url.gif" width="31" height="17" alt="アンカータグで囲む" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" /></a></li><!--
--></ul>
</div>
<div id="URL<?=$f_name?>tag"><span class="URLTITLE">URLを入力してください</span><input name="urlarea<?=$f_name?>" type="text" style="width:350px;" /><a href="#<?=$f_name?>tag" onclick="return urlExchange('p_<?=$f_name?>','urlarea<?=$f_name?>','<?=$f_name?>')"><img src="/shared/cms/img/html_exec.gif" /></a></div>
<?php } ?>
<?php }else{ ?>

<?php if($_OPTION==82&&$TAGON==1){ ?>
<div class="TagsOn"><label for="<?=$f_name?>tag"><input type="checkbox" class="box" name="p_<?=$f_name?>tag" id="<?=$f_name?>tag" value="2"<?php if($p[$f_name."tag"]==2)echo " checked=\"checked\""; ?> onclick="i(this.checked,'html<?=$f_name?>tag',1)" />HTMLタグを有効にする</label></div>
<div class="japTitle b_label"><img src="/shared/cms/img/jp.png" width="16" height="11" /><span>日本語</span></div>
<textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>"><?=mod_HTML($p[$f_name])?></textarea>
<div id="html<?=$f_name?>tag"<?php if($p[$f_name."tag"]==2)echo "style=\"display:block;\""; ?>>
<ul><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" /></a></li><!--
--></ul>
</div>
<div class="engTitle b_label"><img src="/shared/cms/img/us.png" width="16" height="11" /><span>英語</span></div>
<textarea name="p_<?=$f_name?>_e" rows="<?=$SIZE?>"><?=mod_HTML($p[$f_name."_e"])?></textarea>
<div id="html<?=$f_name?>tag_e"<?php if($p[$f_name."tag"]==2)echo "style=\"display:block;\""; ?>>
<ul><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" /></a></li><!--
--></ul>
</div>
<?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" />日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" />英語</th>
</tr>
<tr>
<td class="japanese"><textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>" class="bltext"><?=mod_HTML($p[$f_name])?></textarea></td>
<td class="english"><textarea name="p_<?=$f_name?>_e" rows="<?=$SIZE?>" class="bltext"><?=mod_HTML($p[$f_name."_e"])?></textarea></td>
</tr>
</table>
<?php } ?>
<?php } ?>
		</td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
<?php if(!$_BILL){ ?>
<?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?>
<?php if($sv["p_".$f_name."tag"]!=2&&$_OPTION==82){ ?><input type="hidden" name="p_<?=$f_name?>tag" value="1" /><?php } ?>
<?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" />日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" />英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?></td>
<td class="english"><?=(strlen($sv["p_".$f_name."_e"])>0)?mod_HTML($sv["p_".$f_name."_e"],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?></td>
</tr>
</table>
<?php if($sv["p_".$f_name."tag"]!=2&&$_OPTION==82){ ?><input type="hidden" name="p_<?=$f_name?>tag" value="1" /><?php } ?>
<?php } ?>
		</td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields">
<?php if(!$_BILL){ ?>
<?php if($_OPTION==82&&$TAGON==1){ ?>
<div class="TagsOn"><label for="<?=$f_name?>tag"><input type="checkbox" class="box" name="p_<?=$f_name?>tag" id="<?=$f_name?>tag" value="2"<?php if($p[$f_name."tag"]==2)echo " checked=\"checked\""; ?> onclick="i(this.checked,'html<?=$f_name?>tag')" />HTMLタグを有効にする</label></div>
<?php } ?>
<textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>"><?=mod_HTML($p[$f_name])?></textarea>
<?php if($_OPTION==82&&$TAGON==1){ ?>
<div id="html<?=$f_name?>tag"<?php if($p[$f_name."tag"]==2)echo "style=\"display:block;\""; ?>>
<ul><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatURL(document.f.p_<?=$f_name?>,'p_<?=$f_name?>','<?=$f_name?>')"><img src="/shared/cms/img/html_url.gif" width="31" height="17" alt="アンカータグで囲む" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" /></a></li><!--
--></ul>
</div>
<div id="URL<?=$f_name?>tag"><span class="URLTITLE">URLを入力してください</span><input name="urlarea<?=$f_name?>" type="text" style="width:350px;" /><a href="#<?=$f_name?>tag" onclick="return urlExchange('p_<?=$f_name?>','urlarea<?=$f_name?>','<?=$f_name?>')"><img src="/shared/cms/img/html_exec.gif" /></a></div>
<?php } ?>
<?php }else{ ?>

<?php if($_OPTION==82&&$TAGON==1){ ?>
<div class="TagsOn"><label for="<?=$f_name?>tag"><input type="checkbox" class="box" name="p_<?=$f_name?>tag" id="<?=$f_name?>tag" value="2"<?php if($p[$f_name."tag"]==2)echo " checked=\"checked\""; ?> onclick="i(this.checked,'html<?=$f_name?>tag',1)" />HTMLタグを有効にする</label></div>
<div class="japTitle b_label"><img src="/shared/cms/img/jp.png" width="16" height="11" /><span>日本語</span></div>
<textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>"><?=mod_HTML($p[$f_name])?></textarea>
<div id="html<?=$f_name?>tag"<?php if($p[$f_name."tag"]==2)echo "style=\"display:block;\""; ?>>
<ul><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" /></a></li><!--
--></ul>
</div>
<div class="engTitle b_label"><img src="/shared/cms/img/us.png" width="16" height="11" /><span>英語</span></div>
<textarea name="p_<?=$f_name?>_e" rows="<?=$SIZE?>"><?=mod_HTML($p[$f_name."_e"])?></textarea>
<div id="html<?=$f_name?>tag_e"<?php if($p[$f_name."tag"]==2)echo "style=\"display:block;\""; ?>>
<ul><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" /></a></li><!--
--><li><a href="#<?=$f_name?>tag" onclick="return formatStr(document.f.p_<?=$f_name?>_e,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" /></a></li><!--
--></ul>
</div>
<?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" />日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" />英語</th>
</tr>
<tr>
<td class="japanese"><textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>" class="bltext"><?=mod_HTML($p[$f_name])?></textarea></td>
<td class="english"><textarea name="p_<?=$f_name?>_e" rows="<?=$SIZE?>" class="bltext"><?=mod_HTML($p[$f_name."_e"])?></textarea></td>
</tr>
</table>
<?php } ?>

<?php } ?>
		</td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
<?php if(!$_BILL){ ?>
<?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?>
<?php if($sv["p_".$f_name."tag"]!=2&&$_OPTION==82){ ?><input type="hidden" name="p_<?=$f_name?>tag" value="1" /><?php } ?>
<?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" />日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" />英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?></td>
<td class="english"><?=(strlen($sv["p_".$f_name."_e"])>0)?mod_HTML($sv["p_".$f_name."_e"],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?></td>
</tr>
</table>
<?php if($sv["p_".$f_name."tag"]!=2&&$_OPTION==82){ ?><input type="hidden" name="p_<?=$f_name?>tag" value="1" /><?php } ?>
<?php } ?>
		</td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php if(!$_BILL){ ?>
		<?=(strlen($p[$f_name])>0)?mod_HTML($p[$f_name],($p[$f_name."tag"]==2)?2:1):"入力なし"?>
        <?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" />日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" />英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($p[$f_name])>0)?mod_HTML($p[$f_name],($p[$f_name."tag"]==2)?2:1):"入力なし"?></td>
<td class="english"><?=(strlen($p[$f_name."_e"])>0)?mod_HTML($p[$f_name."_e"],($p[$f_name."tag"]==2)?2:1):"入力なし"?></td>
</tr>
</table>
        <?php } ?>
        </td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		
		<?php if(!$_BILL){ ?>
		<?=(strlen($_POST[$f_name])>0)?mod_HTML($_POST[$f_name],($_POST[$f_name."tag"]==2)?2:1):"入力なし"?>
        <?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" />日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" />英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($_POST[$f_name])>0)?mod_HTML($_POST[$f_name],($_POST[$f_name."tag"]==2)?2:1):"入力なし"?></td>
<td class="english"><?=(strlen($_POST[$f_name."_e"])>0)?mod_HTML($_POST[$f_name."_e"],($_POST[$f_name."tag"]==2)?2:1):"入力なし"?></td>
</tr>
</table>
        <?php } ?>
        </td>
		</tr>	

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==4||$q->get_dir()==5){ ?>
		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><textarea name="p_<?=$f_name?>" cols="<?=(strpos($CURRENTPATH,"/mail/")>0)?"75":"60"?>" rows="<?=$SIZE?>"><?=mod_HTML($p[$f_name])?></textarea></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>
<?php } ?>