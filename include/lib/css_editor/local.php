<?php for($i=0;$i<count($STYLESHEET);$i++){ ?>
<?php if($i==$c){ ?>
<li class="da"><a><?=$STYLESHEET[$i]?></a></li>
<?php }else{ ?>
<li class="ds"><a href=".?c=<?=$i?>"><?=$STYLESHEET[$i]?></a></li>
<?php } ?>
<?php } ?>