<?php

if($q->get_dir()!=2){

  $title_list = [
    ['title' => 'アイコン(PC)	', 'field' => 'icon'],
    ['title' => 'アイコン(SP)	', 'field' => 'icon_sp'],
    ['title' => 'アイコン(iOS)	', 'field' => 'icon_ios'],
    ['title' => 'アイコン(Android)	', 'field' => 'icon_android'],
  ];
  $dir = __DIR__ . '/../../../public/assets/images/common/';
  foreach (glob($dir . '*.svg') as $row)
  {
    $arr = explode('/', $row);
    $icon_list[] = $arr[count($arr) - 1];
  }


  foreach ($title_list as $row)
  {
    $form = [$row['title'], $row['field'], $icon_list, ""];

    $TITLE = $form[0];
    $FIELD = $form[1];
    $ARRAY = $form[2];
    $COMMNET=$form[3];

    ?>

    <?php if($q->get_file()==0){ ?>
    <tr>
      <td class="inputTitle"><?=$TITLE?></td>
      <td class="inputFields">
        <table border="0" cellpadding="0" cellspacing="5">
          <tr>
            <td>
              <?php for($I=0;$I<count($ARRAY);$I++){ ?>
                <input type="radio" class="box" name="p_<?=$FIELD?>" value="<?=$ARRAY[$I]?>" id="<?=$FIELD?><?=$I?>"<?php if($ARRAY[$I]==$p[$FIELD])echo " checked"; ?> /><label for="<?=$FIELD?><?=$I?>"><img src="<?="https://dev.sportsbull.jp/assets/images/common/".$ARRAY[$I]?>"  width="19px" height="21px" /></label>
                  <?php if($I != 0 && ($I + 1)  % 8 == 0){echo"<br>";} ?>
              <?php } ?>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  <?php }elseif($q->get_file()==1){ ?>
    <tr>
      <td class="confTitle"><?=$TITLE?></td>
      <td class="confFields"><?=($_POST["p_".$FIELD])?></td>
    </tr>
    <?php
  }
  }

  unset($form);
  unset($TITLE);
  unset($FIELD);
  unset($ARRAY);
  unset($COMMNET);

}

$a[] = array("textfield", "名称", "name", "120");
$a[] = array("textfield", "リンク", "link", "120");

include $INCLUDEPATH . "print_write.php";
include $INCLUDEPATH."_newfield3.php";
include $INCLUDEPATH."_pageaddition.php";

?>