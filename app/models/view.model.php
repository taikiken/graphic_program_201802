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
    'og_url'       => '', // シェアやコメント詳細用の正規化されたURL

    // post
    'post'               => '', //記事詳細の場合は記事データが入る

    // layout
    'type'               => '',
    'template'           => '',
    'template_classname' => '',
    'slug'               => '',

    // env
    'ua'                 => '', // UA判定
    'is_app'             => '', // アプリ判定
    'hostname'           => '', // debug用 - 利用なし
    'apiRoot'            => '', // APIの接続先振り分け用 - _footer.phpにて利用

    // slim param
    'request'            => '',
    'response'           => '',
    'args'               => '',

  );


  function __construct() {

    $this->default['site_url']        = $this->get_site_url();

    if ( UT_ENV === 'LOCAL') :

      # LOCAL(vagrant)ではリモートサーバーにAPI/file_get_contentアクセスする
      $this->default['file_get_url'] = 'http://dev2.undotsushin.com';
      $this->default['apiRoot']      = 'http://dev2.undotsushin.com';

    else :

      # LOCAL以外は自サーバから file_get_content する
      $this->default['file_get_url'] = $this->default['site_url'];

    endif;

    # サイト内のグロナビ用カテゴリーを取得
    $this->default['site_categories'] = $this->get_site_categories();


    // meta
    $this->default['og_url']   = $this->default['site_url'];
    $this->default['og_image'] = $this->default['site_url'].$this->default['og_image'];



    # その他アクセス後から不変な値を設定
    $this->default['hostname']        = $_SERVER['SERVER_NAME'];
    $this->default['ua']              = $this->get_ua();
    $this->default['is_app']          = $this->get_is_app();

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
    $port = ( $_SERVER['SERVER_PORT'] == 80 ) ? '' : ':'.$_SERVER['SERVER_PORT'];

    return $protocol.$host.$port.'/';
  }



  /**
  * category  - サイト内カテゴリーを取得する
  *
  * @return array  カテゴリー一覧の配列
  */
  public function get_site_categories() {

    // TODO - これDBからひっぱる必要あり〼 ref. #117
    // カテゴリーを取得する
    // ひとまず file_get_contentsで取得しておきます
    $categories = file_get_contents($this->default['file_get_url'].'/api/v1/category');

    if ( $categories ) :

      $categories = json_decode($categories, true);

      foreach( $categories['response']['categories'] as $key => $value ) :

        # 冒頭に「すべて」を追加
        if ( $key == 0 ) :
          $categoriesArray['all'] = array(
            'label' => 'すべて',
            'slug'  => 'all',
            'url'   => $this->default['site_url'].'category/all',
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
      return $this->default['site_categories'][$slug];
    endif;

  }



  /**
  * post - 詳細ページで記事IDから記事情報を取得する
  *
  * @param  string  $id 記事ID
  * @return array   記事データ
  */
  public function get_post($id) {

    // TODO - ひとまずfile_get_contentsで取得
    $post = file_get_contents($this->default['file_get_url'].'/api/v1/articles/'.$id);

    if ( $post ) :
      $post = json_decode($post, true);

      if ( $post['status']['code'] !== 200 ) :
        return false;
      endif;

      if ( $post['response']['categories'] ) :
        // 記事のプライマリーカテゴリーをdefaultに設定しておく
        $category_primary = $post['response']['categories'][0];
        if ( isset($category_primary['slug']) ) :
          $this->default['category'] = $this->get_category_by_slug($category_primary['slug']);
        endif;
      endif;

      return $post['response'];

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

    // TODO - ひとまずfile_get_contentsで取得
    $post = file_get_contents($this->default['file_get_url'].'/api/v1/comments/article/'.$id.'/'.$commentId);

    if ( $post ) :
      $post = json_decode($post, true);

      if ( $post['status']['code'] !== 200 ) :
        return false;
      endif;

      return $post['response'];

    endif;

  }



  /**
  * env - UA判定 - mobile or desktop
  *
  * @return string  mobile | desktop
  */
  public function get_ua() {

    $ua = new UserAgent();

    return $ua->set();

  }



  /**
  * env - アプリWebView判定 - ios | android
  *
  * @return string  ios | android
  */
  public function get_is_app() {

    $ua = new UserAgent();

    return $ua->is_app();

  }


  /**
  * $default を上書きしてmodelを返す
  *
  * @param  array  $options
  * @return array  $.extend( $default, $options)
  */
  public function set() {

    $options  = func_get_args();
    $extended = $this->default;

    if(is_array($options) && count($options)) {
      foreach($options as $array) {
        if(is_array($array)) {
          $extended = array_merge($extended, $array);
        }
      }
    }

    return $extended;

  }

}

?>