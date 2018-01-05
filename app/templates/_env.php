<?php
/*

# 環境判定用JSオブジェクト
- 用途 : DFPのターゲティング ( ページの広告に配信用の識別情報を与える )
ref. https://github.com/undotsushin/undotsushin/pull/2987

*/
$SPBL_ENV = array(
  # 環境
  # production | staging | development
  'env'      => '',

  # プラットフォーム(クライアント)
  # web_desktop | web_mobile | app_ios | app_android
  'platform' => '',

  # ページタイプ
  # index | category | p など
  'page'     => '',

  # 記事のプライマリーカテゴリのスラッグ ex. crazy
  'category' => '',

  # 記事ID *記事詳細のみ
  'p'        => '',

  # 記事提供元 *記事詳細のみ
  'provider' => '',
);

# env
# 環境
# ------------------------------
if ( UT_ENV ) :
  switch (UT_ENV) :
    case 'PRODUCTION':
      $SPBL_ENV['env'] = 'production';
      break;

    case 'STAGING':
      $SPBL_ENV['env'] = 'staging';
      break;

    default:
      $SPBL_ENV['env'] = 'development';
      break;
  endswitch;
endif;

# platform
# アプリ判定はjsで
# ------------------------------
if ( $page['ua'] === 'desktop') :
  $SPBL_ENV['platform'] = 'web_desktop';
else :
  $SPBL_ENV['platform'] = 'web_mobile';
endif;

# page - ページタイプ
# - index    : 一面
# - category : 一覧
# - p        : 記事詳細
# - stats    : スタッツ
# ------------------------------
if ( isset($page['template']) ) :
  $SPBL_ENV['page'] = $page['template'];
endif;

# category - 記事プライマリカテゴリー
# ------------------------------
if ( isset($page['category']) ) :
  $SPBL_ENV['category'] = $page['category']['slug'];
endif;

# p - 記事ID *記事詳細のみ
# ------------------------------
if ( isset($page['post']['id']) ) :
  $SPBL_ENV['p'] = $page['post']['id'];
endif;

# provider - 記事提供元 *記事詳細のみ
# ------------------------------
if ( isset($page['post']['user']) ) :
  $SPBL_ENV['provider'] = addslashes($page['post']['user']['name']);
endif;


?>
<script>
var SPBL_ENV = {
  'env'      : '<?php echo $SPBL_ENV['env']; ?>',
  'platform' : '<?php echo $SPBL_ENV['platform']; ?>',
  'page'     : '<?php echo $SPBL_ENV['page']; ?>',
  'category' : '<?php echo $SPBL_ENV['category']; ?>',
  'p'        : '<?php echo $SPBL_ENV['p']; ?>',
  'provider' : '<?php echo $SPBL_ENV['provider']; ?>'
};
</script>
<?php
/*
※ SPBL_ENV.platform のアプリ判定は、/assets/google/dfp.js で行います
*/
?>