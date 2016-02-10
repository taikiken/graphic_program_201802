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
  <li>
    <a href="/category/baseball/">記事一覧 - 野球</a>
    <ul>
      <li>
        <a href="/category/baseball/ranking/">記事一覧 - 野球/ランキング</a>
      </li>
      <li>
        <a href="/category/baseball/video/">記事一覧 - 野球/動画</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="/category/mlb/">記事一覧 - MLB</a>
  </li>
  <li>
    <a href="/category/soccer/">記事一覧 - サッカー</a>
  </li>
  <li>
    <a href="/category/worldsoccer/">記事一覧 - 海外サッカー</a>
  </li>
  <li>
    <a href="/category/golf/">記事一覧 - ゴルフ</a>
  </li>
  <li>
    <a href="/category/sumo/">記事一覧 - 相撲</a>
  </li>
  <li>
    <a href="/category/battle/">記事一覧 - 格闘技</a>
  </li>
  <li>
    <a href="/category/athletics/">記事一覧 - 陸上</a>
  </li>
  <li>
    <a href="/category/swimming/">記事一覧 - 水泳</a>
  </li>
  <li>
    <a href="/category/judo/">記事一覧 - 柔道</a>
  </li>
  <li>
    <a href="/category/tennis/">記事一覧 - テニス</a>
  </li>
  <li>
    <a href="/category/volleyball/">記事一覧 - バレーボール</a>
  </li>
  <li>
    <a href="/category/rugby/">記事一覧 - ラグビー</a>
  </li>
  <li>
    <a href="/category/figureskate/">記事一覧 - フィギュア</a>
  </li>
  <li>
    <a href="/category/basketball/">記事一覧 - バスケットボール</a>
  </li>
  <li>
    <a href="/category/extremesports/">記事一覧 - エクストリームスポーツ</a>
  </li>
  <li>
    <a href="/category/motorsports/">記事一覧 - モータースポーツ</a>
  </li>
  <li>
    <a href="/category/business/">記事一覧 - ビジネス</a>
  </li>
  <li>
    <a href="/category/etc/">記事一覧 - その他競技</a>
  </li>
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