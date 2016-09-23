<?php

class ViewModel {

  protected $default = array(

    // site
    // ==============================
    'site_name'          => '運動通信 / CRAZY FOR SPORTS',
    'site_url'           => '', // サイトURL - サーバから取得
    'file_get_url'       => '', // file_get_content の URL. LOCAL以外は site_url と同値になる

    'site_categories'    => '', // ナビ用サイトカテゴリー DBから取得

    // page
    'title'              => '運動通信 / CRAZY FOR SPORTS',
    'keywords'           => 'スポーツ,メディア,運動,運動通信,クレイジー,アスリート,ニュース,動画,sports,media,untsu,運通,crazy',

    // og
    'app_id'             => '842032129256034',
    'og_type'            => 'article',
    'og_title'           => '',
    'og_description'     => '話題のスポーツコンテンツが満載！ 国内外のスポーツに特化したニュースや動画をお届けします。スマホから、タブレットから、PCから、いつでもどこでも好きなときにお楽しみください。',
    'og_image'           => 'assets/images/common/og_image.png',

    // meta
    'og_url'             => '', // シェアやコメント詳細用の正規化されたURL
    'canonical'          => '',
    'syn_extension'      => '', // syn_extension対象記事かどうか
    'syn_thumbnail'      => '', // syn_extension用サムネール

    // theme
    'theme' => array(
      'base'             => 'normal',
      'background_color' => '',
      'images'           => array(
        'pc' => '',
        'sp' => '',
      ),
    ),

    // ad
    'ad' => array(
      'sp' => '35244',
      'pc' => array(
        'sidebar_top'         => 'pc_sidebar_top',
        'sidebar_bottom'      => 'pc_sidebar_bottom',
        'single_top'          => 'pc_single_top',
        'single_bottom_left'  => '35119',
        'single_bottom_right' => '35120',
      ),
    ),

    // post
    'category'           => array(),
    'post'               => array(),

    // layout
    'type'               => '',
    'template'           => '',
    'template_classname' => '',
    'slug'               => '',

    // env
    'ua'                 => '', // UA判定
    'ua_app'             => '', // アプリ判定
    'ua_is_bot'          => '', // bot判定
    'hostname'           => '', // debug用 - 利用なし
    'apiRoot'            => '', // APIの接続先振り分け用 - _footer.phpにて利用

    // user
    'is_logged_in'       => false, // ユーザーログイン判定

    // slim param
    'request'            => '',
    'response'           => '',
    'args'               => '',

    // version - #789 静的ファイルのバージョン
    'version'            => ''

  );

  var $db;

  function __construct($db) {

    // DB
    $this->db = $db;


    // site
    $this->default['site_url']        = $this->get_site_url();

    if ( UT_ENV === 'LOCAL') :
      # 2016-04-27
      # dev2 -> dev へ変更
      $this->default['file_get_url'] = 'http://dev.undotsushin.com';
      $this->default['apiRoot']      = 'http://dev.undotsushin.com';

    else :

      # LOCAL以外は自サーバから file_get_content する
      $this->default['file_get_url'] = $this->default['site_url'];

    endif;

    // og / meta
    $this->default['og_url']   = $this->default['site_url'];
    $this->default['og_image'] = $this->default['site_url'].$this->default['og_image'];


    // env
    $this->default['hostname']        = $_SERVER['SERVER_NAME'];

    $this->ua = new UserAgent();
    $this->default['ua']              = $this->ua->set();
    $this->default['ua_app']          = $this->ua->get_ua_app();
    $this->default['ua_is_bot']       = $this->ua->is_bot();


    // user
    $this->default['is_logged_in']    = $this->get_is_logged_in();


    // サイト内のグロナビ用カテゴリーを取得
    $this->default['site_categories'] = $this->get_site_categories();


    // version
    $this->default['version']         = $this->get_version();


  }


  /**
  * version - 静的ファイルキャッシュ対策用 gitのhashから生成した.versionファイルを読み込む
  * @return include public/assets/.version
  */
  private function get_version() {

    // public/index.php からのバージョンファイルのパスを指定
    $path = './assets/.version';

    if ( file_exists($path) ) :
      return trim(file_get_contents($path, false));
    else :
      return time();
    endif;

  }


  /**
  * property - getter/setter
  * @param  string  $name $defaultのkey
  * @param  string  $value overwrite $name
  * @return
  */
  public function property($key, $value = null) {
    if (func_num_args() > 1) {
      return $this->default[$key] = $value;
    } else {
      return isset($this->default[$key]) ? $this->default[$key] : null;
    }
  }



  /**
  * site - サイトURLを取得する
  *
  * @return string  http|https://[host]:[port]
  */
  public function get_site_url() {

    // PRODUCTIONで `$_SERVER["HTTPS"]` が取得できてないようなので強制的にhttps
    if ( !empty($_SERVER["HTTPS"]) || UT_ENV == 'PRODUCTION' ) :
      $protocol = "https://";
    else :
      $protocol = "http://";
    endif;

    $host = $_SERVER['HTTP_HOST'];
    return $protocol.$host.'/';
  }



  /**
  * category  - サイト内カテゴリーを取得する
  *
  * @return array  カテゴリー一覧の配列
  */
  public function get_site_categories() {


    if ( UT_ENV == 'LOCAL' ) :

      $categories = file_get_contents($this->default['file_get_url'].'/api/v1/category');

      if ( $categories ) :
        $categories = json_decode($categories, true)['response']['categories'];
      else :
        return false;
      endif;

    else :

      if ( $this->default['ua'] == 'desktop' ) :
        $categories = $this->db->get_site_categories(false);
      else :
        $categories = $this->db->get_site_categories(true);
      endif;

    endif;

    if ( is_array($categories) ) :
      foreach( $categories as $key => $value ) :

        # 冒頭に「すべて」を追加
        if ( $key == 0 ) :
          $categoriesArray['all'] = array(
            'label'     => 'すべて',
            'slug'      => 'all',
            'url'       => $this->default['site_url'].'category/all',
            'title_img' => '',
          );
        endif;

        $categoriesArray[$value['slug']] = $value;

      endforeach;

      return $categoriesArray;

    endif;

  }


  /**
  * category - category_slugからカテゴリー情報を取得する
  *
  * @param  string  $slug カテゴリースラッグ
  * @return array   該当カテゴリー情報
  */
  public function get_category_by_slug($slug) {

    if ( $this->default['site_categories'][$slug] ) :


      if ( UT_ENV == 'LOCAL' ) :

        $category = $this->default['site_categories'][$slug];
        $response = file_get_contents($this->default['file_get_url'].'/api/v1/category/'.$slug);

        if ( $response ) :
          $category = json_decode($response, true)['response'];
        else :
          return false;
        endif;

      else :

        $category = $this->db->get_category_by_slug($slug);

      endif;

      // すべての場合はlabel/titleが空なのですべてをセット
      if ( !$category['label'] ) :
        $category['label'] = 'すべて';
        $category['title'] = 'すべて';
      endif;

      return $category;

    endif;

  }



  /**
  * post - 詳細ページで記事IDから記事情報を取得する
  *
  * @param  string  $id 記事ID
  * @return array   記事データ
  */
  public function get_post($id) {


    if ( UT_ENV == 'LOCAL' ) :

      $response = file_get_contents($this->default['file_get_url'].'/api/v1/articles/'.$id);

      if ( $response ) :
        $post = json_decode($response, true)['response'];
      else :
        return false;
      endif;

    else :

      $post = $this->db->get_post($id);

    endif;

    if ( $post ) :

      return $post;

    endif;

  }



  /**
  * comment - 詳細ページで記事ID x コメントIDから特定のコメントを取得する
  *
  * @param  string  $id 記事ID
  * @param  string  $commentId コメントID
  * @return array   コメントデータ
  */
  public function get_comment( $id, $commentId ) {

    if ( UT_ENV == 'LOCAL' ) :

      $response = file_get_contents($this->default['file_get_url'].'/api/v1/comments/article/'.$id.'/'.$commentId);

      if ( $response ) :
        $post = json_decode($response, true)['response'];
      else :
        return false;
      endif;

    else :

      $post['comments'] = $this->db->get_comment( $id, $commentId );

    endif;

    return $post;

  }



  /**
  * private - get_is_logged_in - tokenをもとにユーザー存在チェックも行った上でログイン判定
  *
  * @return bool true : ログイン済み | false : 非ログイン
  */
  private function get_is_logged_in() {

    if ( UT_ENV == 'LOCAL' ) :

      $token = $this->db->get_token();

      $option = array(
        'http'=>array(
          'method'=>"GET",
          'header'=>"Authorization: OAuth realm=undotsushin.com, oautn_token={$token}"
        )
      );

      $response = file_get_contents($this->default['apiRoot']."/api/v1/users/self", false, stream_context_create($option));

      if ( $response ) :

        $response = json_decode($response, true);

        if ( $response['status']['code'] == 200 ) :
          return true;
        endif;

      endif;

    else :

      $response = $this->db->get_is_logged_in();

      if ( $response ) :
        return true;
      else :
        $this->delete_cookie();
        return false;
      endif;

    endif;

  }


  /**
  * public - user - ログイン判定 - ログインしてないならログインページにリダイレクトする
  * 用途 : マイページへの非ログインアクセスのリダイレクト
  * @return
  */
  public function check_logged_in() {

    if ( !$this->default['is_logged_in'] ) :
      header('Location: /login/');
      exit;
    endif;

  }



  /**
  * public - tokenを保持してるcookieを消しちゃう
  * 用途 : ログアウト処理
  *
  */
  public function delete_cookie() {

    setcookie('auth_token', '', time() - 3600, '/');

  }


  /**
  * $default を上書きしてmodelを返す
  *
  * @param  array  $options
  * @return array  = $.extend($default, $options)
  */
  public function set($options = null) {

    if ( $options ) :
      $this->default = $this->array_extend( $this->default, $options );
    endif;

    return $this->default;

  }


  /**
  * 配列のdeep extendを行う
  *
  */
  private function array_extend(&$result) {

    if (!is_array($result)) {
      $result = array();
    }

    $args = func_get_args();

    for ($i = 1; $i < count($args); $i++) {

      if (!is_array($args[$i])) continue;

      foreach ($args[$i] as $k => $v) {
        if (!isset($result[$k])) {
          $result[$k] = $v;
        } else {
          if (is_array($result[$k]) && is_array($v)) {
            $this->array_extend($result[$k], $v);
          } else {
            $result[$k] = $v;
          }
        }
      }
    }

    return $result;

  }

}

?>