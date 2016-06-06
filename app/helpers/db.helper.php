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
  * カテゴリー一覧を取得する = /api/v1/category
  *
  * @param  bool $is_sort 好きな競技でフィルタした結果を返すならtrue * PC版はソートしない
  * @return array
  */
  public function get_site_categories( $is_sort = false ) {

    // TODO : APIと同等の内容を返す

    // 並び替えする & tokenあり
    if ( $is_sort && $this->default['token'] ) :


    // 並び替えなし
    else :


    endif;

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

    $this->connect();

    $sql=sprintf("select id,title,(select body from repo_body where pid=repo_n.id) as body from repo_n where id=%s",$id);

    $this->query($sql);
    $f=$this->fetch_array();
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


  /**
  * ログイン判定
  *
  * @return bool   true : ログイン済み / false : 非ログイン
  */
  public function get_is_logged_in() {

    if ( $this->default['token'] ) :

      // TODO : このトークンをもつユーザーが存在するならtreを返す

    else :
      return false;

    endif;

  }



}


?>
