<?php

# ref. https://w3g.jp/blog/php_ua_sniffing2015
class UserAgent{


  protected $ua;
  protected $device;


  function __construct() {

    $this->ua = mb_strtolower($_SERVER['HTTP_USER_AGENT']);

    # Amazon CloudFront経由の場合は HTTP_CLOUDFRONT_ で判定
    # ここでのtrue / falseはstring型です
    if ( strpos($this->ua,'amazon cloudfront') !== false ) {

      if ( $_SERVER['HTTP_CLOUDFRONT_IS_DESKTOP_VIEWER'] === 'true' ) :
        return $this->device = 'desktop';
      elseif ( $_SERVER['HTTP_CLOUDFRONT_IS_TABLET_VIEWER'] === 'true' ) :
        return $this->device = 'tablet';
      elseif ( $_SERVER['HTTP_CLOUDFRONT_IS_SMARTTV_VIEWER'] === 'true' ) :
        return $this->device = 'desktop';
      elseif ( $_SERVER['HTTP_CLOUDFRONT_IS_MOBILE_VIEWER'] === 'true' ) :
        return $this->device = 'mobile';
      endif;

    }

    if(strpos($this->ua,'iphone') !== false){
      $this->device = 'mobile';
    }elseif(strpos($this->ua,'ipod') !== false){
      $this->device = 'mobile';
    }elseif((strpos($this->ua,'android') !== false) && (strpos($this->ua, 'mobile') !== false)){
      $this->device = 'mobile';
    }elseif((strpos($this->ua,'windows') !== false) && (strpos($this->ua, 'phone') !== false)){
      $this->device = 'mobile';
    }elseif((strpos($this->ua,'firefox') !== false) && (strpos($this->ua, 'mobile') !== false)){
      $this->device = 'mobile';
    }elseif(strpos($this->ua,'blackberry') !== false){
      $this->device = 'mobile';
    }elseif(strpos($this->ua,'ipad') !== false){
      $this->device = 'tablet';
    }elseif((strpos($this->ua,'windows') !== false) && (strpos($this->ua, 'touch') !== false && (strpos($this->ua, 'tablet pc') == false))){
      $this->device = 'tablet';
    }elseif((strpos($this->ua,'android') !== false) && (strpos($this->ua, 'mobile') === false)){
      $this->device = 'tablet';
    }elseif((strpos($this->ua,'firefox') !== false) && (strpos($this->ua, 'tablet') !== false)){
      $this->device = 'tablet';
    }elseif((strpos($this->ua,'kindle') !== false) || (strpos($this->ua, 'silk') !== false)){
      $this->device = 'tablet';
    }elseif((strpos($this->ua,'playbook') !== false)){
      $this->device = 'tablet';
    }else{
      $this->device = 'desktop';
    }

  }



  public function set(){

    // web用に tablet等はdesktopまるめておく
    if ( $this->device !== 'mobile' ) :
      return 'desktop';
    else :
      return 'mobile';
    endif;

  }


  public function get_device(){

    return $this->device;

  }


  // アプリからのアクセスかどうかチェックする
  // モバイルかつUserAgent or ?ua= の値で判断
  // iOS : undotsushin-ios
  // Android : undotsushin-android
  public function get_ua_app() {

    $query_ua = ( isset($_GET['ua']) ) ? $_GET['ua'] : '';

    if ( $this->device !== 'desktop' ) :

      if ( strpos($this->ua,'undotsushin-ios') !== false || $query_ua == 'undotsushin-ios' ) :
        return 'iOS';

      elseif ( strpos($this->ua,'undotsushin-android') !== false || $query_ua == 'undotsushin-android' ) :
        return 'Android';

      // #540 - iOSアプリ版で `undotsushin-ios` ない場合
      // iPhoneあるがSafariない
      // elseif ( strpos($this->ua,'iphone') !== false && strpos($this->ua,'safari') === false ) :
      //   return 'iOS';

      endif;

    endif;

  }


  // botからのアクセスかどうかチェックする
  public function is_bot() {

    if (
      strpos($this->ua,'bot') !== false ||
      strpos($this->ua,'google') !== false ||
      strpos($this->ua,'yahoo') !== false ||
      strpos($this->ua,'spider') !== false ||
      strpos($this->ua,'crawler') !== false ||
      strpos($this->ua,'hatena') !== false
    ) :
      return true;
    else :
      return false;
    endif;
  }

}


?>