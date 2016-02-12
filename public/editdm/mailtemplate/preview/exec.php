<?php



include $INCLUDEPATH."local.php";
include $INCLUDEPATH."formtemplate.php";
$form=new form($_GET["fid"],0);
$form->formExec();

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><?=$form->info["subject"]?>｜<?=$SITE?></title>
<link rel="stylesheet" type="text/css" href="/shared/form/css/base.css" media="screen,print" >
</head>

<body>
<?php $form->makeExec(); ?>
</body>
</html>
