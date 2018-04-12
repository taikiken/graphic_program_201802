<?php

$TABLE = "bottom_tab_categories";
$TABLE2 = "bottom_tab_nodes";
$nodes_column =['bottom_tab_id','parent_tab_id','type','created_at'];
$WHERE = " WHERE id IN (SELECT bottom_tab_id FROM bottom_tab_nodes WHERE parent_tab_id IS NULL )";

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
            $sv[$sn[]="sort_no"] = 1;

        } else {
            $sv[$sn[]="sort_no"]=sprintf("(select max(sort_no)+1 as n from %s)",$TABLE);
        }

        $sv[$sn[]="created_at"]="now()";
        $sv[$sn[]="updated_at"]="now()";
        foreach ($sv as $bottm_tab =>$value){
            if ($bottm_tab === "category_id"){
            }
            elseif ($bottm_tab === "n") {
            $bottm_tabs['sort_no'] = $value;
        }
            else{
                $bottm_tabs[$bottm_tab]= $value;
            }
        }
        foreach ($sn as $bottm_tab_category=>$value){
            if ($value <> "category_id"){
                $bottm_tab_categories[$bottm_tab_category] = $value;
            }
        }
        $o=new dbutl($TABLE,$bottm_tab_categories,$bottm_tabs);
        $e=$o->insert();
        $sql ="SELECT MAX(id) FROM bottom_tab_categories ";
        $o->query($sql);
        $p=$o->fetch_array();
        foreach ($nodes_column as $nodes_value => $value) {
            if ($value === 'bottom_tab_id') {
                $nodes_values[$value] = $p['max'];
            } elseif ($value === 'parent_tab_id') {
                if ($sv['category_id'] === null) {
                    $nodes_values[$value] = 'null';
                }
                else {
                    $nodes_values[$value] = $sv['category_id'];
                }
            } elseif ($value === 'type') {
                $nodes_values[$value] = 1;
            } else {
                $nodes_values[$value] = "now()";
            }
        }
        $o_new = new dbutl($TABLE2,$nodes_column,$nodes_values);
        $e2=$o_new->insert();
    }
}elseif($q->get_dir()===1){
    if($q->get_file()===0){

        $sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("id"));
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
