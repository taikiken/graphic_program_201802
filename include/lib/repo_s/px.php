<?php

if ($g->f("rid") == 95) {
  $TITLE = "公開";
  $FIELD = "flag";
  $ARRAY = array("公開", "非公開");

  ?>
  <?php if($q->get_file()!==2){ ?>
    <tr>
      <th colspan="2" class="inputHeader" scope="row">ステータス設定</th>
    </tr>
  <?php } ?>
  <?php if($q->get_file()==0){ ?>
    <tr>
      <td class="inputTitle"><?=$TITLE?>ステータス</td>
      <td class="inputFields">
        <table border="0" cellpadding="0" cellspacing="5">
          <tr>
            <td>
              <?php for($I=0;$I<count($ARRAY);$I++){ ?>
                <input type="radio" class="box" name="p_<?=$FIELD?>" value="<?=$I+1?>" id="<?=$FIELD?><?=$I?>"<?php if(($I+1)==$p[$FIELD])echo " checked"; ?> /><label for="<?=$FIELD?><?=$I?>"><?=$ARRAY[$I]?></label>
              <?php } ?>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  <?php }elseif($q->get_file()==1){ ?>
    <tr>
      <td class="confTitle"><?=$TITLE?></td>
      <td class="confFields"><?=$ARRAY[($_POST["p_".$FIELD]-1)]?></td>
    </tr>
    <?php
  }
  ?><?php
} else {
  include $INCLUDEPATH . "_pageaddition.php";
}
?>