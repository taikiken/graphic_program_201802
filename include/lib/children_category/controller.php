<?php
$parent_id = $_GET['parent_tab_id'];
$TABLE2 = "bottom_tab_nodes";
$nodes_column =['bottom_tab_id','parent_tab_id','type','created_at'];
$TABLE = "bottom_tab_categories";
$WHERE = " WHERE id IN (SELECT bottom_tab_id FROM bottom_tab_nodes WHERE parent_tab_id = $parent_id and type=1)";
$NUMBERINGOFF=1;

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
                $nodes_values[$value] =$_GET['parent_tab_id'];
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
        $sql = "select * from ".$TABLE2." where type = 1 AND bottom_tab_id=".$g->f("id").";";
        $o->query($sql);
        $p2=$o->fetch_array();

        include $INCLUDEPATH."formback.php";
    }elseif($q->get_file()===1){

        data_conf();
    }elseif($q->get_file()===2){

        include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

        data_sql();

        $sv[$sn[]="updated_at"]="now()";
        foreach ($sv as $bottm_tab => $value) {
            if ($bottm_tab === "category_id") {
            } else {
                $bottm_tabs[$bottm_tab] = $value;
            }
        }
        foreach ($sn as $bottm_tab_category => $value) {
            if($value == "updated_at") {
                $bottm_tab_categories[$bottm_tab_category-1] = $value;
            }
            elseif ($value <> "category_id") {
                if ($sv['category_id'] === "null"){
                    $bottm_tab_categories[$bottm_tab_category] = $value;
                }
                else{
                    $bottm_tab_categories[$bottm_tab_category-1] = $value;
                }
            }
        }

        $o = new dbutl($TABLE, $bottm_tab_categories, $bottm_tabs);
        $e=$o->update($g->f("id"));
        foreach ($nodes_column as $nodes_column_update =>$value){
            if ($value === "parent_tab_id"){
                $nodes_column_updates[$nodes_column_update-1] = $value;
            }
        }
        foreach ($sv as $nodes_value =>$value){
            if ($nodes_value == "category_id"){
                $nodes_values['parent_tab_id'] = $value;
            }
        }
        $sql = "select id from ".$TABLE2." where type = 1 AND bottom_tab_id=".$g->f("id").";";
        $o->query($sql);
        $p=$o->fetch_array();
        $o = new dbutl($TABLE2, $nodes_column_updates, $nodes_values);
        $e=$o->update($p['id']);
    }
}elseif($q->get_dir()===2){
    if($q->get_file()===0){
        $sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("id"));
        $o->query($sql);
        $p=$o->fetch_array();

        include $INCLUDEPATH."formback.php";

    }elseif($q->get_file()===1){

        data_conf();
    }elseif($q->get_file()===2){

        include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

        $sql=sprintf("select sort_no from %s where id=%s",$TABLE,$g->f("id"));
        $o->query($sql);
        $n=$o->fetch_array();

        $sql=sprintf("update %s set sort_no=sort_no-1 where sort_no>=%s",$TABLE,$n["sort_no"]);
        $o->query($sql);

        $o=new dbutl($TABLE);
        $e=$o->remove($g->f("id"));
        $o=new dbutl($TABLE2);
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
