<?php if($q->get_dir()!=3){ ?>
<script type="text/javascript">
<?php if($q->fl===0){ ?>
document.f.action="./conf.php?<?=$g->g_url("search")?>";
<?php }elseif($q->get_file()===1){ ?>
document.f.action="./exe.php?<?=$g->g_url()?>";
<?php } ?>
</script>
<?php } ?>