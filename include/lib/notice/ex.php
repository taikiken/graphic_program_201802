<?php

if($q->get_dir()!=2){

  $a = array("タイプ", "type", array("notice", "warning", "img"), "");

  $TITLE = $a[0];
  $FIELD = $a[1];
  $ARRAY = $a[2];
  $COMMNET=$a[3];

  ?>

  <?php if($q->get_file()==0){ ?>
    <tr>
      <td class="inputTitle"><?=$TITLE?></td>
      <td class="inputFields">
        <table border="0" cellpadding="0" cellspacing="5">
          <tr>
            <td>
              <?php for($I=0;$I<count($ARRAY);$I++){ ?>
                <input type="radio" class="box" name="p_<?=$FIELD?>" value="<?=$I?>" id="<?=$FIELD?><?=$I?>"<?php if(($I)==$p[$FIELD])echo " checked"; ?> /><label for="<?=$FIELD?><?=$I?>"><?=$ARRAY[$I]?></label>
              <?php } ?>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  <?php }elseif($q->get_file()==1){ ?>
    <tr>
      <td class="confTitle"><?=$TITLE?></td>
      <td class="confFields"><?=$ARRAY[($_POST["p_".$FIELD])]?></td>
    </tr>
    <?php
  }

  $a = array("記事詳細に表示する", "is_hide_detail", array("記事詳細に表示する", "記事詳細に表示しない"), "");

  $TITLE = $a[0];
  $FIELD = $a[1];
  $ARRAY = $a[2];
  $COMMNET=$a[3];

  ?>

  <?php if($q->get_file()==0){ ?>
    <tr>
      <td class="inputTitle"><?=$TITLE?></td>
      <td class="inputFields">
        <table border="0" cellpadding="0" cellspacing="5">
          <tr>
            <td>
              <?php for($I=0;$I<count($ARRAY);$I++){ ?>
                <input type="radio" class="box" name="p_<?=$FIELD?>" value="<?=$I?>" id="<?=$FIELD?><?=$I?>"<?php if(($I)==$p[$FIELD])echo " checked"; ?> /><label for="<?=$FIELD?><?=$I?>"><?=$ARRAY[$I]?></label>
              <?php } ?>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  <?php }elseif($q->get_file()==1){ ?>
    <tr>
      <td class="confTitle"><?=$TITLE?></td>
      <td class="confFields"><?=$ARRAY[($_POST["p_".$FIELD])]?></td>
    </tr>
    <?php
  }

  unset($a);

}

$a[] = array("textfield", "お知らせ内容", "text", "120");

$a[] = array("textfield", "PC Link", "link", "120");
$a[] = array("img", "PC画像", "img", "780-780-0-0-0-0", "", "", "");

$a[] = array("textfield", "SP Link", "sp_link", "120");
$a[] = array("img", "SP画像", "sp_img", "780-780-0-0-0-0", "", "", "");

$a[] = array("textfield", "iOS Link", "ios_link", "120");
$a[] = array("img", "iOS画像", "ios_img", "780-780-0-0-0-0", "", "", "");

$a[] = array("textfield", "android Link", "android_link", "120");
$a[] = array("img", "android画像", "android_img", "780-780-0-0-0-0", "", "", "");

include $INCLUDEPATH . "print_write.php";
include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/categories.php";

?>