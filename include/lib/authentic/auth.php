<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle">管理セクション</td>
		<td class="inputFields"><?php

$sql="select id,name from repo where rid=0 order by n";
$o->query($sql);
while($f=$o->fetch_array()){
	$REPOS[]=$f;
}

echo generalCheckbox($REPOS,4,"repo",@implode(",",$sv["p_repo"]));

?></td>
		</tr>
		<tr>
		<td class="inputCap">管理セクションを選択してください。総合管理者であってもコンテンツの管理セクションを外すことができます。</td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle">管理セクション</td>
		<td class="confFields"><?php

if(count($_POST["p_repo"])>0){

$sql=sprintf("select name from repo where id in (%s) order by n",implode(",",$_POST["p_repo"]));
$o->query($sql);

while($f=$o->fetch_array()){
	$REPOVALUE[]=mod_HTML($f["name"]);
}

unset($sv["p_repo"]);
$sv["p_repo"]=implode(",",$_POST["p_repo"]);

echo implode("<br >",$REPOVALUE);

}else{
	echo "管理セクション無し";
}

?></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle">管理セクション</td>
		<td class="inputFields"><?php

$sql="select id,name from repo where rid=0 order by n";
$o->query($sql);
while($f=$o->fetch_array()){
	$REPOS[]=$f;
}

echo generalCheckbox($REPOS,4,"repo",$p["repo"]);

?></td>
		</tr>
		<tr>
		<td class="inputCap">管理セクションを選択してください。総合管理者であってもコンテンツの管理セクションを外すことができます。</td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle">管理セクション</td>
		<td class="confFields"><?php

if(count($_POST["p_repo"])>0){

$sql=sprintf("select name from repo where id in (%s) order by n",implode(",",$_POST["p_repo"]));
$o->query($sql);

while($f=$o->fetch_array()){
	$REPOVALUE[]=mod_HTML($f["name"]);
}

unset($sv["p_repo"]);
$sv["p_repo"]=implode(",",$_POST["p_repo"]);

echo implode("<br >",$REPOVALUE);

}else{
	echo "管理セクション無し";
}

?></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle">管理セクション</td>
		<td class="confFields"><?php

if(strlen($p["repo"])>0){

$sql=sprintf("select name from repo where id in (%s) order by n",$p["repo"]);
$o->query($sql);

while($f=$o->fetch_array()){
	$REPOVALUE[]=mod_HTML($f["name"]);
}

echo implode("<br >",$REPOVALUE);

}else{
	echo "管理セクション無し";
}

?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle">管理セクション</td>
		<td class="confFields"><?php

if(strlen($_POST["repo"])>0){

$sql=sprintf("select name from repo where id in (%s) order by n",$_POST["repo"]);
$o->query($sql);

while($f=$o->fetch_array()){
	$REPOVALUE[]=mod_HTML($f["name"]);
}

echo implode("<br >",$REPOVALUE);

}else{
	echo "管理セクション無し";
}

?></td>
		</tr>	

	<?php } ?>
<?php } ?>