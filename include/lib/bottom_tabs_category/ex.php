<?php

if($q->get_dir()!=2){

  ?>

  <?php if($q->get_file()==0){ ?>
  <?php }elseif($q->get_file()==1){ ?>
    <?php
  }

  ?>

  <?php if($q->get_file()==0){ ?>

  <?php }elseif($q->get_file()==1){ ?>
    <?php
  }


}

$a[] = array("textfield", "名称", "name", "120");

$a[] = array("textfield", "リンク", "link", "120");

$a[] = array("textfield", "アイコン(PC)", "icon", "120");

$a[] = array("textfield", "アイコン(SP)", "icon_sp", "120");

$a[] = array("textfield", "アイコン(iOS)", "icon_ios", "120");

$a[] = array("textfield", "アイコン(Android)", "icon_android", "120");

include $INCLUDEPATH . "print_write.php";
include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/categories.php";
include $INCLUDEPATH."_pageaddition.php";

?>