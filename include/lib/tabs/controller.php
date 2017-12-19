<?php

$TABLE = "tabs";
$WHERE = "";

if($q->get_dir()===0){
    if($q->get_file()===0){

        include $INCLUDEPATH."formback.php";
    }elseif($q->get_file()===1){

        data_conf();
    }elseif($q->get_file()===2){

        include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

        data_sql();

        $sql = "select count(*) from ".$TABLE.";";
        $o->query($sql);
        $p=$o->fetch_array();

        //Rowが無い
        if($p["count"]==0){
            $sv[$sn[]="n"]=1;

        //一覧の最初に追加
        } elseif ($_POST["POSITION"]!=1) {
            $sql="update ".$TABLE." set n=(n+1)";
            $o->query($sql);
            $sv[$sn[]="n"]=1;

        } else {
            $sv[$sn[]="n"]=sprintf("(select max(n)+1 as n from %s)",$TABLE);
        }

        $sv[$sn[]="flag"]=1;
        $sv[$sn[]="create_at"]="now()";
        $sv[$sn[]="update_at"]="now()";

        $o=new dbutl($TABLE,$sn,$sv);
        $e=$o->insert();
    }
}elseif($q->get_dir()===1){
    if($q->get_file()===0){

        $sql=sprintf("select * from tabs %s where id=%s",$TABLE,$g->f("id"));
        $o->query($sql);
        $p=$o->fetch_array();

        include $INCLUDEPATH."formback.php";
    }elseif($q->get_file()===1){

        data_conf();
    }elseif($q->get_file()===2){

        include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

        data_sql();

        $sv[$sn[]="update_at"]="now()";

        $o=new dbutl($TABLE,$sn,$sv);
        $e=$o->update($g->f("id"));
    }
}elseif($q->get_dir()===2){
    if($q->get_file()===0){
        $sql=sprintf("select * from tabs %s where id=%s",$TABLE,$g->f("id"));
        $o->query($sql);
        $p=$o->fetch_array();

        include $INCLUDEPATH."formback.php";

    }elseif($q->get_file()===1){

        data_conf();
    }elseif($q->get_file()===2){

        include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

        $sql=sprintf("select n from %s where id=%s",$TABLE,$g->f("id"));
        $o->query($sql);
        $n=$o->fetch_array();

        $sql=sprintf("update %s set n=n-1 where n>=%s",$TABLE,$n["n"]);
        $o->query($sql);

        $o=new dbutl($TABLE);
        $e=$o->remove($g->f("id"));
    }
}elseif($q->get_dir()===3){
    $FIELD="*";

    $sql="select * from %s where ".$TABLE;
    $o->query($sql);
    $p=$o->fetch_array();
}

$EDITDELETEINITIAL="";
?>
