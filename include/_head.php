<?php if($III!=0&&$q->get_file()!==2){ ?>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php } ?>
<?php if($q->get_file()!=2){ ?>
<tr>
<th colspan="2" class="inputHeader" scope="row"><?=mod_HTML($d_name)?></th>
</tr>
<?php $HEADERFLAG=1; ?>
<?php } ?>