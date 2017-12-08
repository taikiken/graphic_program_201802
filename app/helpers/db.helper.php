<?php
/*


テンプレートとDBを接続するクラス
ref. #326

/include/postgre.php を extends して定義する


*/

include_once "local.php";

class dbForTemplate extends db {

  var $uid;
  var $token = '';

  function __construct() {

    parent::__construct();

    $this->token = $this->get_token();
    $this->uid   = $this->get_user_id();

  }


  // ログイン判定 & ソート済みカテゴリー一覧取得用にcookieからtokenを取得しておく
  public function get_token() {

    if ( isset($_COOKIE["auth_token"]) ){
      return $_COOKIE["auth_token"];
    }

  }


  /**
  * tokenからユーザーIDを取得する = /include/public/ut.php - auth() のローカルスコープ版
  * API経由でのアクセスではないので cookie のtokenの値をチェックする
  * @return string $id
  */
  public function get_user_id() {

    if( strlen( $this->token ) > 0 ) :

      $sql = sprintf("select id from u_member where flag=1 and a15='%s'",trim($this->token) );

      //$this->connect();
      $this->query($sql);
      $f   = $this->fetch_array();
      //$this->disconnect();

    endif;

    debug($this->token,$f["id"]);

    return isset($f["id"])?$f["id"]:"";

  }


  /**
  * ログイン判定
  *
  * @return bool   true : ログイン済み / false : 非ログイン
  */
  public function get_is_logged_in() {

    if ( $this->get_user_id() ) :
      return true;
    else :
      return false;
    endif;

  }

  public function get_photo($id)
  {
    global $ImgPath;
      $list = [];
      $sqlstr = <<<END_DOC
SELECT
    *
FROM
    photo
WHERE
    nid = {$id}
  AND flag = 1
ORDER BY n
END_DOC;
      $this->query($sqlstr);

      $cnt = 1;
      while ($o = $this->fetch_array())
      {
        $o['main'] = sprintf('%s/photo/main/%s', $ImgPath, $o["img1"]);
        $o['thumb'] = sprintf('%s/photo/thumb/%s', $ImgPath, $o["img2"]);
        $o['sp_main'] = sprintf('%s/photo/sp_main/%s', $ImgPath, $o["img3"]);
        $o['sp_thumb'] = sprintf('%s/photo/sp_thumb/%s', $ImgPath, $o["img4"]);
        $list[$cnt] = $o;
        $cnt++;
      }
      return $list;
  }

  /**
  * カテゴリー一覧を取得する = /api/v1/category
  *
  * @param  bool $is_sort 好きな競技でフィルタした結果を返すならtrue * PC版はソートしない
  * @return array
  */
  public function get_site_categories( $is_sort = false ) {

    $s = array();

    // ユーザーIDを取得
    //$uid = $this->get_user_id();

    // 並び替えする
    if( !preg_match("/^[0-9]+$/",$this->uid) || $is_sort == false ) :
      $sql="select id,name,name_e,img from u_categories where flag=1 order by n";

    else :
      //$sql=sprintf("select t1.*,(case when t2.c=1 then 1 else 0 end) as interest from (select id,name,name_e,img,n from u_categories) as t1 left join (select 1 as c,categoryid from u_category where userid=%s and flag=1) as t2 on t1.id=t2.categoryid order by c,n",$this->uid);
	  // WBC、六大学を一面の右に固定
		$sql=sprintf("select id,name,name_e,img,n,2 as interest from u_categories where flag=1 and id in(151) union all (select t1.*,(case when t2.c=1 then 1 else 0 end) as interest from (select id,name,name_e,img,n from u_categories where flag=1 and id not in(150,151)) as t1 left join (select 1 as c,categoryid from u_category where userid=%s and flag=1) as t2 on t1.id=t2.categoryid) order by interest desc,n;",$uid);

    endif;

    //$this->connect();
    $this->query($sql);
    while( $f = $this->fetch_array() ){
      $s[] = set_categoryinfo($f);
    }
    //$this->disconnect();

    return $s;

  }


  /**
  * カテゴリー情報を取得する = /api/v1/category/{$slug}
  *
  * @param  string $slug カテゴリースラッグ
  * @return array
  */
  public function get_category_by_slug( $slug, $playerid=null ) {

//    if (isset($playerid))
//    {
      $sql=<<<SQL_EOL
SELECT 
u_categories.id,u_categories.name,u_categories.title,u_categories.url,u_categories.img,u_categories.url1,u_categories.img1,u_categories.alt,u_categories.description,name_e,u_categories.no_image,u_categories.og_image,seo_desc,u_categories.seo_key,
repo.img1 AS pc_header, repo.img2 AS sp_header
FROM u_categories
LEFT JOIN repo ON u_categories.id = repo.category
WHERE name_e= '{$slug}'
SQL_EOL;


//    else
//    {
//      $sql=sprintf("select id,name,title,url,img,url1,img1,alt,description,name_e,no_image,og_image,seo_desc,seo_key from u_categories where name_e='%s'",$slug);
//
//    }
    $this->query($sql);
    $f=$this->fetch_array();
    $s=set_categoriesinfo($f);

    return $s;

  }


  /**
  * 投稿データを取得する = /api/v1/articles/{$id}
  *
  * @param  integer $id
  * @return array
  */
  public function get_post( $id ) {

    /*

    //canonical
    (boolean) canonical["is_canonical"];
    (string)  canonical["url"];

    //続きを読む
    (boolean) readmore["is_readmore"];
    (string)  readmore["url"];

    で出力しています。

    */

    //$this->connect();
    global $articletable,$SERVERPATH,$RELATEDLINK_ALLOWED;

    $sql=sprintf("select * from %s",sprintf($articletable,set_isbookmark($this->uid),sprintf(" and id=%s",$id)));
    $this->query($sql);
    $f=$this->fetch_array();


    if ( !$f ) :
      return false;
    endif;


    $file=sprintf("%s/api/ver1/static/ad/2-%s.dat",$SERVERPATH,$f["userid"]);
    $v=unserialize(file_get_contents($file));

    $f["canonical"]=$v["canonical"];
    $f["readmore"]=$v["readmore"];

    $file=sprintf("%s/api/ver1/static/ad/1-%s.dat",$SERVERPATH,$id);
    if(file_exists($file)){
       $v=unserialize(file_get_contents($file));
       $f["readmore"]=$v["readmore"];
    }

    $l="";
    if(in_array($f["d2"],$RELATEDLINK_ALLOWED)){
      $sql=sprintf("select title,link from u_link where pid=%s order by n",$f["id"]);
      $this->query($sql);
      while($ee=$this->fetch_array())$p[]=$ee;
      if(count($p)>0){
        $l="<p>関連リンク<br>";
        for($i=0;$i<count($p);$i++){
          if(strlen($p[$i]["title"])>0)$l.=sprintf("<a href=\"%s\" target=\"_blank\">%s</a><br>",$p[$i]["title"],$p[$i]["link"]);
        }
        $l.="</p>";
      }
      $f["relatedpost"]=$l;
    }

    $ad=get_advertise($f["m1"],$f["userid"],$f["id"]);
    $s=set_articleinfo($f,1,1,1);
    $ad_put=set_advertise($ad,"detail");

    // media.video.ad_urlの設定
    if ( $ad_put['vast'] ) :
      $s['media']['video']['vast'] = $ad_put['vast'];
    endif;
    unset($ad_put['vast']);

    if ( $ad_put['ad_urlpc'] ) :
      $s['media']['video']['ad_url']['pc'] = $ad_put['ad_urlpc'];
    endif;
    unset($ad_put['ad_urlpc']);

    if ( $ad_put['ad_urlsp'] ) :
      $s['media']['video']['ad_url']['sp'] = $ad_put['ad_urlsp'];
    endif;
    unset($ad_put['ad_urlsp']);

    $s=$s+$ad_put;

    //$this->disconnect();

    return $s;

  }


  /**
  * comment - 詳細ページで記事ID x コメントIDから特定のコメントを取得する
  * = /api/v1/comments/article/{$id}/{$commentId}
  *
  * @param  string  $id 記事ID
  * @param  string  $commentId コメントID
  * @return array   コメントデータ
  */
  public function get_comment( $id, $commentId ) {

    $sql=sprintf("select * from
      (select t2.*,t1.good,t1.bad,t1.rank from
        (select commentid,good,bad,reply,rank from u_ranking where flag=1 and userflag=1 and commentid=(select case when commentid=0 then id else commentid end from u_comment where id=%s)) as t1,
        (select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2
      where t1.commentid=t2.id) as st1,
      (select
        id as uid,
        cid as typeid,
        (select name from repo where id=cid) as type,
        title as name,
        t2 as profile,
        img1 as icon
      from u_member where flag=1) as st2
      where st1.userid=st2.uid",$commentId,set_isreaction($this->uid),$id);

    $nsql=sprintf("select count(*) as n from u_ranking where flag=1 and userflag=1 and commentid=(select case when commentid=0 then id else commentid end from u_comment where id=%s)",$commentId);

    $this->query($nsql);
    $f=$this->fetch_array();
    $count=$f["n"];

    if($count>0){

      $this->query($sql);
      while($f=$this->fetch_array())$p[]=$f;

      for($i=0;$i<count($p);$i++){

        $s[$i]=set_commentinfo($p[$i],2);

        $sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=%s and flag=1 and exists (select * from u_member where id=u_comment.userid and flag=1);",$id,$p[$i]["id"]);
        $this->query($sql);
        $f=$this->fetch_array();
        $s[$i]["reply"]["count"]=$f["n"];

        if($f["n"]>0){

          $sql=sprintf("select * from
            (select %sid,comment,pageid,userid,regitime,(select count(reaction) from u_reaction where commentid=u_comment.id and flag=1 and reaction=1) as good,(select count(reaction) from u_reaction where commentid=u_comment.id and flag=1 and reaction=2) as bad from u_comment where pageid=%s and commentid=%s and flag=1%s) as t1,
            (select id as uid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from u_member where flag=1) as t2
            where t1.userid=t2.uid order by regitime",
          set_isreaction($this->uid),$id,$p[$i]["id"],"");

          $this->query($sql);
          while($f=$this->fetch_array()){

            $s[$i]["reply"]["comments"][]=set_commentinfo($f,2,$p[$i]["id"]);
          }
        }else{
          $s[$i]["reply"]=array();
        }
      }
    }

    return $s;

  }

  /**
   * 与えられた条件で選手を取得する
   * @param int $category_id tbl_player.category
   * @param int $player_id   tbl_player.id
   */
  public function get_players($category_id = null, $player_id = null) {
    $sql = 'SELECT * FROM tbl_player WHERE flag = 1';
    if($player_id !== null){
      $sql .= " AND id = {$player_id}";
    }
    if($category_id !== null){
      $sql .= " AND category = {$category_id}";
    }
    $sql .= " ORDER BY n";

    $this->query($sql);
    return $this->fetch_all();
  }

  /**
   * 与えられた条件で注目の選手を取得する
   * @param int $category_id   tbl_player.category
   * @param int $player_id     tbl_player.id
   * @param boolean $is_unique 重複する選手を削除するかどうか（どのヘッドラインに属する選手が返るかは不明）
   * @param int $limit         取得する選手の件数上限
   * @return array
   */
  public function get_pickup_players($category_id = null, $player_id = null, $limit = null) {
    $sql = "SELECT p.*, MAX(h.n) AS max_h_n FROM repo r"
            . " LEFT JOIN u_headline h ON r.id = h.cid"
            . " LEFT JOIN tbl_player p ON h.d2 = p.id"
            . " WHERE r.rid = 95 AND r.flag = 1 AND h.flag = 1 AND p.flag = 1";
    if($player_id !== null){
      $sql .= " AND p.id = {$player_id}";
    }
    if($category_id !== null){
      $sql .= " AND r.category = '{$category_id}'";
    }
    $sql .= " GROUP BY p.id ORDER BY max_h_n";
    if($limit !== null) {
      $sql .= " LIMIT {$limit}";
    }

    $this->query($sql);
    return $this->fetch_all();
  }

  /**
   * プレスリリース一覧
   * @return array
   */
  public function get_company_news_items()
  {

    $sql = <<<EOF
SELECT
 title,
 url,
 published_at
 FROM company_news
 ORDER BY published_at DESC
EOF;

    $this->query($sql);
    while ($f = $this->fetch_array()) {
      $s[] = set_company_news_items($f);
    }
    return $s;
  }
}

?>
