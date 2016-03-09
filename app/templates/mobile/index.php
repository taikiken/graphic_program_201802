<?php
// ------------------------------------------------
// ホーム / 一面
// ------------------------------------------------
?>
<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">
      <div id="headline-container"></div><!-- /headline -->

      <div class="board-large">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">
      <div class="sponsor-link"><a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-sponsor_1.jpg" alt=""></a></div>

      <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 データ先読みで、電車でもサクサク記事が読める！"></a></div>

      <div id="widget-ranking-container"></div><!--/ranking-->

      <div id="widget-recommend-container"></div><!--/videos-->

      <div class="sponsor-link nadir"><a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-sponsor_2.jpg" alt=""></a></div>
    </section><!-- /.side-sec -->
  </div>
</div><!-- /.body-sec -->

<?php
/*
<h1>
  <?php echo $page['title']; ?>
</h1>


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
  foreach( $page['site_categories'] as $key => $value ) :
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

*/?>

<?php //var_dump($page); ?>
