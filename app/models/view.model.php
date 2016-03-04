<?php

class ViewModel {

  protected $default = array(

    // site
    'site_name'          => '運動通信',
    'site_url'           => '',
    'site_categories'    => '',

    // page
    'title'              => '',
    'description'        => '',
    'keywords'           => '',

    // og
    'og_type'            => 'article',
    'og_description'     => '',
    'og_image'           => '',
    'app_id'             => '',

    // meta
    'canonical'          => '',

    // post
    'post'               => '',

    // layout
    'template'           => '',
    'template_classname' => '',
    'slug'               => '',

    // env
    'ua'                 => '',
    'hostname'           => 'www.undotsushin.com',
    'apiRoot'            => 'http://www.undotsushin.com',

    // slim param
    'request'            => '',
    'response'           => '',
    'args'               => '',

  );


  function __construct() {

    $this->default['site_url']        = $this->set_site_url();
    $this->default['site_categories'] = $this->set_site_categories();
    $this->default['ua']              = $this->set_ua();
    $this->default['hostname']        = $_SERVER['SERVER_NAME'];

    if ( UT_ENV === 'PRODUCTION' ) :
      $this->default['apiRoot'] = '';
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
  public function set_site_url() {

    $protocol = empty($_SERVER["HTTPS"]) ? "http://" : "https://";
    $host = $_SERVER['HTTP_HOST'];
    $port = ( $_SERVER['SERVER_PORT'] == 80 ) ? '' : ':'.$_SERVER['SERVER_PORT'];

    return $protocol.$host.$port.'/';
  }



  /**
  * category  - サイト内カテゴリーを取得する
  *
  * @return array  カテゴリー一覧の配列
  */
  public function set_site_categories() {

    // TODO - これDBからひっぱる必要あり〼 ref. #117
    // カテゴリーを取得する
    // ひとまず file_get_contentsで取得しておきます
    $categories = file_get_contents('http://www.undotsushin.com/api/v1/category');

    if ( $categories ) :
      $categories = json_decode($categories, true);
      foreach( $categories['response']['categories'] as $key => $value ) :
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
  * post - 記事IDから記事情報を取得する
  *
  * @param  string  $id 記事IDカテゴリースラッグ
  * @return array   記事データ
  */
  public function get_post($id) {

    // TODO - ひとまずfile_get_contentsで取得
    $post = file_get_contents('http://www.undotsushin.com/api/v1/articles/'.$id);

    if ( $post ) :
      $post = json_decode($post, true);
      return $post['response'];
    endif;

  }




  /**
  * env - UA判定 - mobile or desktop
  *
  * @return string  mobile | desktop
  */
  public function set_ua() {

    $ua = new UserAgent();

    if ( $ua->set() === 'mobile' ) :
      return 'mobile';

    // tablet or others = desktop
    else :
      return 'desktop';

    endif;
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