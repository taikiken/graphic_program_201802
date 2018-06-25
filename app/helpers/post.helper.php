<?php
/*

記事データ用ヘルパー

*/
class PostHelper{

  function __construct($post) {
  }


  /**
  * スポンサードカテゴリーに属する記事かの判定
  * - 純広のみ / アドネットワーク広告NG
  * @param  $post  $object  投稿データ
  * @return bool
  */
  public function is_sponserd($post) {

    $sponserdCategoryArray = [
      'crazy',
      'big6tv',
      'inhightv',
    ];

    if ( isset($post['categories']) && is_array($post['categories'])) :
      foreach( $post['categories'] as $key => $value ) :
        if ( in_array($value['slug'], $sponserdCategoryArray) ) :
          return true;
        endif;
      endforeach;
    endif;

    return false;

  }


  /**
  * サブスポンサードカテゴリーに属する記事かの判定
  * - 指定枠は純広のみ (その他はアドネットワークOK)
  * @param  $post  $object  投稿データ
  * @return bool
  */
  public function is_subsponserd($post) {

    $sponserdCategoryArray = [
      'motorsports',
      'climbing',
    ];

    if ( isset($post['categories']) && is_array($post['categories'])) :
      foreach( $post['categories'] as $key => $value ) :
        if ( in_array($value['slug'], $sponserdCategoryArray) ) :
          return true;
        endif;
      endforeach;
    endif;

    return false;

  }


  /**
  * 続きを読む設定フラグの判定
  *
  * @param  $post  $object  投稿データ
  * @return bool
  */
  public function is_readmore($post) {

    if (
      isset($post['readmore']) &&
      $post['readmore']['is_readmore'] &&
      $post['readmore']['url']
    ) :
      return true;
    else :
      return false;
    endif;
  }


  /**
  *  #782 カノニカル判定
  *
  * @param  $post  $object  投稿データ
  * @return bool
  */
  public function get_canonical($post) {

    if (
      isset($post['canonical']) &&
      $post['canonical']['is_canonical'] &&
      $post['canonical']['url']
    ) :
      return $post['canonical']['url'];
    else :
      return '';
    endif;
  }


}


?>