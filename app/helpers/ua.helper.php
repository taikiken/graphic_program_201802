<?php

# ref. https://w3g.jp/blog/php_ua_sniffing2015
class UserAgent{


  protected $ua;
  protected $device;


  function __construct() {

    $this->ua = mb_strtolower($_SERVER['HTTP_USER_AGENT']);
    $this->device = $this->set();

  }

  public function set(){

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
      $this->device = 'others';
    }


    if ( $this->device !== 'mobile' ) :
      $this->device = 'desktop';
    endif;

    return $this->device;

  }



  // アプリからのアクセスかどうかチェックする
  // iOS : undotsushin-ios
  // Android : undotsushin-android
  public function get_ua_app() {

    if ( $this->device == 'mobile' ) :

      if ( strpos($this->ua,'undotsushin-ios') !== false ) :
        return 'iOS';

      elseif ( strpos($this->ua,'undotsushin-android') !== false ) :
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