<?php

/*


テンプレートとDBを接続するクラス
ref. #326

/include/postgre.php を extends して定義する


*/

class dbForTemplate extends db {


  protected $default = array(

    'token' => '',

  );


  function __construct() {

    parent::__construct();


    // ログイン判定 & ソート済みカテゴリー一覧取得用にcookieからtokenを取得しておく
    if ( isset($_COOKIE["auth_token"]) ){
      $this->default['token'] = $_COOKIE["auth_token"];
    }

  }



  /**
  * tokenからユーザーIDを取得する = /include/public/ut.php - auth() のローカルスコープ版
  * API経由でのアクセスではないので cookie のtokenの値をチェックする
  * @return string $id
  */
  public function get_user_id() {

    if( strlen( $this->default['token'] ) > 0 ) :

      $sql = sprintf("select id from u_member where flag=1 and a15='%s'",trim($this->default['token']) );

      //$this->connect();
      $this->query($sql);
      $f   = $this->fetch_array();
      //$this->disconnect();

    endif;

    debug($this->default['token'],$f["id"]);

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


  /**
  * カテゴリー一覧を取得する = /api/v1/category
  *
  * @param  bool $is_sort 好きな競技でフィルタした結果を返すならtrue * PC版はソートしない
  * @return array
  */
  public function get_site_categories( $is_sort = false ) {

    $s = array();

    // ユーザーIDを取得
    $uid = $this->get_user_id();

    // 並び替えする
    if( !preg_match("/^[0-9]+$/",$uid) || $is_sort == false ) :
      $sql="select id,name,name_e,img from pm_ where cid=20 and flag=1 order by n";

    else :
      $sql=sprintf("select t1.*,(case when t2.c=1 then 1 else 0 end) as interest from (select id,name,name_e,img,n from pm_ where cid=20) as t1 left join (select 1 as c,categoryid from u_category where userid=%s and flag=1) as t2 on t1.id=t2.categoryid order by c,n",$uid);

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
  public function get_category_by_slug( $slug ) {

    // TODO : APIと同等の内容を返す

  }


  /**
  * 投稿データを取得する = /api/v1/articles/{$id}
  *
  * @param  integer $id
  * @return array
  */
  public function get_post( $id ) {

    // TODO : APIと同等の内容 + カノニカル + 元記事URLを返す

    //$this->connect();

    $sql=sprintf("select id,title,(select body from repo_body where pid=repo_n.id) as body from repo_n where id=%s",$id);
    $this->query($sql);
    $f=$this->fetch_array();

    //$this->disconnect();

    return $f;

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

    // TODO : APIと同等の内容を返す

  }



}


?>
