<?php

/*


ユーザー情報関連の処理まとめ


*/

class UserHelper {


  protected $default = array(

    'token'        => '',
    'is_logged_in' => false,

  );


  function __construct($model) {

    $this->default['token']        = $this->get_token();

    if ( $this->default['token'] ) :
      $this->default['is_logged_in'] = $this->get_is_logged_in($model->property('apiRoot'));
    endif;

  }

  /**
  * private - Cookieからトークンを取得する
  *
  * @return string
  */
  private function get_token() {

    if ( isset($_COOKIE["auth_token"]) ){
      return $_COOKIE["auth_token"];
    } else {
      return false;
    }

  }



  /**
  * private - get_is_logged_in - tokenをもとにユーザー存在チェックも行った上でログイン判定
  *
  * @return bool true : ログイン済み | false : 非ログイン
  */
  private function get_is_logged_in($apiRoot) {

    $option = array(
      'http'=>array(
        'method'=>"GET",
        'header'=>"Authorization: OAuth realm=undotsushin.com, oautn_token={$this->default['token']}"
      )
    );

    $response = file_get_contents($apiRoot."/api/v1/users/self", false, stream_context_create($option));

    if ( $response ) :

      $response = json_decode($response, true);

      if ( $response['status']['code'] == 200 ) :
        return true;

      # cookieもってるのにサーバーにそのユーザー存在しないならcookieけす
      else :
        setcookie('auth_token', '', time() - 3600, '/');

      endif;

    endif;

  }


  /**
  * public - check_logged_in - ログインしてなかったらログインページに転送
  */
  public function check_logged_in() {

    if ( !$this->default['is_logged_in'] ) :
      header('Location: /login/');
      exit;
    endif;

  }


}


?>