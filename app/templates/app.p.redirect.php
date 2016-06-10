<?php
/*

# AndroidのWebViewでJSでlocation書き換えれない問題

*/

// 以下phpでリダイレクトするパターン - 空のページが残ってしまう
if ( $page['ua_app'] == 'Android' ) :
  header("Location: {$page['post']['readmore']['url']}");
endif;
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css">
  <style>
    body {
      padding:20px;
    }
  </style>
  <script type="text/javascript">
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-74679267-1', 'auto');
    ga('require', 'linkid');
    ga('require', 'displayfeatures');
    ga('set', 'dimension1', navigator.userAgent);
    ga('send', 'event', 'ua', 'view', navigator.userAgent );

    // provider
    ga('send', 'event', 'provider', 'view', '<?php echo $page['post']['user']['name']; ?>' );

    // category
<?php
    if ( $page['post']['categories'] && is_array($page['post']['categories']) ) :
      foreach ( $page['post']['categories'] as $key => $value ) :
?>

    ga('send', 'event', 'category', 'view', '<?php echo $value['label']; ?>' );

<?php
      endforeach;
    endif;
?>

    // external_link
    ga('send', 'event', 'external_link', 'view', '<?php echo $page['post']['readmore']['url']; ?>' );

    // pageview
    ga('send',
      'pageview', {
      'page': '<?php echo $page['post']['url']; ?>',
      'hitCallback': function() {
        <?php if ( $page['ua_app'] == 'Android' ) : ?>
        location.replace('<?php echo $page['post']['readmore']['url']; ?>');
        <?php else : ?>
        location.replace('<?php echo $page['post']['readmore']['url']; ?>');
        location.href = '<?php echo $page['post']['readmore']['url']; ?>';
        <?php endif; ?>
      }
    });

  </script>

</head>
<body>
<?php if ( $page['ua_app'] == 'Android' ) : ?>

<p>
  この記事の詳細は下記提供元ウェブサイトにてご覧いただけます
</p>

<a href="<?php echo $page['post']['readmore']['url']; ?>" style="word-break:break-all;"><?php echo $page['post']['readmore']['url']; ?></a>

<?php endif; ?>
</body>
</html>

<?php exit; ?>