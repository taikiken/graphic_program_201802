<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
  <style>
    body {
      padding:30px;
    }

    hr {
      margin:2em 0;
    }

    p {
      margin:1.5em 0;
      line-height:1.8;
    }

  </style>
</head>

<body>

  <h1><?php echo $page['title']; ?></h1>

  <hr />

  <?php print_r($page['post']['body']); ?>

</body>
</html>