<?php
// ------------------------------------------------
// ホーム / 一面
// ------------------------------------------------
?>
<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="headline-outer">
        <div id="headline-container"></div><!-- /headline -->
        <div class="sponsor-link">
          <script src="http://i.socdm.com/sdk/js/adg-script-loader.js?id=35255&targetID=adg_35255&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
        </div>
      </div><!-- /.headline-outer -->

      <aside class="sns-pr">
        <div class="sns-pr-outer">
          <dl class="sns-pr-inner">
            <dt><span>運動通信をいいねして<br>最新ニュースをチェック！</span></dt>
            <dd>
              <div class="fb-like" data-href="https://facebook.com/undotsushin/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
            </dd>
          </dl><!-- /.sns-pr-inner -->
        </div><!-- /.sns-pr-outer -->
      </aside><!-- /.sns-pr -->

      <div class="board-large">
        <div id="board-container"></div><!--/archive-->
        <div id="board-container-more"></div><!--/archive-more-->
      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->
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
