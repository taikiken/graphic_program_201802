<?php

$dir_new  = 0;
$dir_edit = 1;

$file_index = 0;
$file_conf  = 1;
$file_exe   = 2;

$file_num = $q->get_file();
$dir_num = $q->get_dir();

$style='style="width: 490px; line-height: 20px; height: 20px;"';

$form_key = str_replace('[]', '', $f_name);
$p_form_key = 'p_'.$form_key;
?>

<?php if($file_num === $file_index) : ?>
    <tr class="<?=$f_name?> bottomborder">
        <td class="inputTitle"><?=$d_name?></td>
        <td class="inputFields">
            <?php if(empty($p[$form_key])) : ?>
                <div class="clearfix  fl langs">
                    <input type="text" <?=$style?> name="p_<?=$f_name?>" value="" class="in q0">
                </div>
            <?php else : ?>

                <?php foreach(explode(',',$p[$form_key]) as $value) : ?>
                    <div class="clearfix  fl langs">
                        <input type="text" <?=$style?> name="p_<?=$f_name?>" value="<?=$value?>" class="in q0">
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
            </div>
        </td>
    </tr>
<?php elseif($file_num === $file_conf) : ?>
<tr class="<?=$f_name?>  bottomborder">
    <td class="confTitle"><?=$d_name?></td>
    <td class="confFields">
        <?php if(empty($sv[$p_form_key])) : ?>
            指定なし
        <?php else : ?>
            <?php foreach($sv[$p_form_key] as $value) : ?>
                <?=$value?><br>
            <?php endforeach; ?>
        <?php endif; ?>
    </td>
</tr>
<?php elseif($file_num === $file_exe) : ?>
    
<?php endif; ?>