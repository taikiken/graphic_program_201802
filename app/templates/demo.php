<html>
    <head>
        <meta charset="utf-8"/>
        <title>Slim 3</title>
        <link href='//fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>
        <style>
            body {
                margin: 50px 0 0 0;
                padding: 20px;
                width: 100%;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                color: #aaa;
                font-size: 18px;
            }

            h1 {
                color: #719e40;
                letter-spacing: -3px;
                font-family: 'Lato', sans-serif;
                font-size: 100px;
                font-weight: 200;
                margin-bottom: 0;
            }

            pre {
                display:block; width:93%; background:#eee; font-family:monospace; font-size:12px; padding:20px;"
                color:#000;
            }


            textarea {
              display:block; width:93%; height:600px; background:#eee; font-family:monospace; font-size:12px; padding:20px;
            }

        </style>
    </head>
    <body>
        <h1>Slim</h1>
        <div>a microframework for PHP</div>
        <p>Try <a href="/SlimFramework">/SlimFramework</a>

<hr />


<h2>ホーム</h2>

<ul>
  <li>
    <a href="/">ホーム</a>
  </li>
  <li>
    <a href="/">一面 ( ログイン後のホーム) - URLはホームと同じ</a>
  </li>
</ul>



<h2>記事</h2>


<ul>
<?php
$categories = file_get_contents('http://www.undotsushin.com/api/v1/category');
if ( $categories ) :
  $categories = json_decode($categories, true);
  foreach( $categories['response']['categories'] as $key => $value ) :
?>
  <li>
    <a href="/category/<?php echo $value['slug']; ?>/">記事一覧 - <?php echo $value['label']; ?></a>
    <ul>
      <li>
        <a href="/category/<?php echo $value['slug']; ?>/ranking/">記事一覧 - <?php echo $value['label']; ?>/ランキング</a>
      </li>
      <li>
        <a href="/category/<?php echo $value['slug']; ?>/video/">記事一覧 - <?php echo $value['label']; ?>/動画</a>
      </li>
    </ul>
  </li>
<?php
  endforeach;
endif;
?>

</ul>


<h2>記事詳細</h2>

<ul>
  <li>
    <a href="/p/<?php echo rand(); ?>/">記事詳細</a>
  </li>
  <li>
    <a href="/p/<?php echo rand(); ?>/comment/<?php echo rand(); ?>/">コメント詳細</a>
  </li>
  <li>
    <a href="/p/<?php echo rand(); ?>/comment/<?php echo rand(); ?>/<?php echo rand(); ?>/">返信コメント詳細</a>
  </li>
</ul>



<h2>新規登録・ログイン系</h2>

<ul>
  <li>
    <a href="/signup/">新規登録</a>
  </li>
  <li>
    <a href="/signup/account/">新規登録 - 基本情報入力</a>
  </li>
  <li>
    <a href="/signup/interest/">新規登録 - 興味のある競技を選択</a>
  </li>
  <li>
    <a href="/login/">ログイン</a>
  </li>
  <li>
    <a href="/logout/">ログアウト</a>
  </li>
  <li>
    <a href="/reset_password/">パスワードリセット</a>
  </li>
  <li>
    <a href="/reset_password/resetting/">パスワードリセット - 再設定</a>
  </li>
</ul>



<h2>マイページ系</h2>

<ul>
  <li>
    <a href="/mypage/">ユーザーマイページ (デフォルトでブックマーク一覧)</a>
  </li>
  <li>
    <a href="/mypage/activities/">アクティビティ</a>
  </li>
  <li>
    <a href="/notifications/">お知らせ</a>
  </li>
  <li>
    <a href="/settings/">プロフィール設定</a>
  </li>
  <li>
    <a href="/settings/interest/">好きな競技を設定</a>
  </li>
  <li>
    <a href="/settings/social/">ソーシャル設定</a>
  </li>
  <li>
    <a href="/settings/deactivate/">退会</a>
  </li>
</ul>

<hr />


        <h2>$request</h2>
<?php var_dump($request); ?>

        <h2>$response</h2>
<textarea>
<?php print_r($response); ?>
</textarea>

        <h2>$args</h2>
<textarea>
<?php print_r($args); ?>
</textarea>

    </body>
</html>
