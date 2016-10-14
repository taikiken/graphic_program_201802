<?php

$msg="";

if($_FILES){
	
	$name=$_FILES["f"]["name"];
	$error=$_FILES["f"]["error"];
	$type=$_FILES["f"]["type"];
	
	if($error==1){
		$msg="ファイルのアップロードに失敗いたしました。もう一度アップロードしてください。";
	}else{
		if($type=="text/xml"){
			if(move_uploaded_file($_FILES["f"]["tmp_name"],"file/asw76rgrr66d.xml")){
				$msg=sprintf("%sのアップロードに成功しました。",$name);
			}else{
				$msg="ファイルのアップロードに失敗いたしました。もう一度アップロードしてください。";
			}
		}else{
			$msg=sprintf("%sはRSSファイルではありません。",$name);
		}
	}
}

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="/shared/css/base4.css">
<title>バーチャル高校野球RSSアップローダー</title>
</head>
<body>
<form method="post" action="index.php" enctype="multipart/form-data">
<h1>バーチャル高校野球RSSアップローダー</h1>
<p class="pt20">参照ボタンからRSSファイルを選択しアップロードボタンを押してください。</p>
<?php if($msg!=""){ ?><p class="pt20 err"><?=$msg?></p><?php } ?>
<dl class="clearfix">
<dt><input type="file" name="f" class="file"></dt>
<dd><input type="submit" name="fbtn" class="btn" value="アップロード"></dd>
</dl>
</form>
</body>
</html>