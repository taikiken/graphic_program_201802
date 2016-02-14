<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <title><?php echo ( isset($page['title']) ) ? $page['title'].' | 運動通信' : '運動通信'; ?></title>
  <meta name="description" content="説明文">
  <meta name="keywords" content="キーワード, キーワード, キーワード">

  <meta property="og:title" content="<?php echo ( isset($page['title']) ) ? $page['title'].' | 運動通信' : '運動通信'; ?>">
  <meta property="og:type" content="<?php echo ( isset($page['og_type']) ) ? $page['og_type'] : 'article'; ?>">
  <meta property="og:image" content="http://undotsushin.com/img/common/sns.png">
  <meta property="og:url" content="http://undotsushin.com/">
  <meta property="og:description" content="説明文">

  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="stylesheet" href="/assets/css/ui.css">
  <script src="/assets/js/libs/jquery2/jquery.min.js"></script>
  <script src="/assets/js/libs/vendor.min.js"></script>
  <script src="/assets/js/libs/vendor.react.js"></script>
</head>
<body>

<div class="whole">

  <header class="head-sec">
      <div class="head-sec-inner">
        <h1><a href="/">運動通信 CRAZY FOR SPORTS</a></h1>

        <aside class="f-right clearfix">
          <div class="head-search">
            <form action="">
              <input id="head-search" nama="head-search" type="text" placeholder="記事を探す">
              <input type="submit" value="">
            </form>
          </div><!-- /.head-search -->

          <div class="user">
            <a class="btn-signup" href="hoge">無料登録 / ログイン</a>
          </div><!-- /.user -->

          <div class="user">
            <div class="notice">
              <a class="notice-opener" href="#">
                <i class="notice-icon"></i>
                <span class="notice-num">88</span>
              </a>

              <nav class="notice-menu" style="display: block;">
                <div class="dropMenu">
                  <div class="info">
                    <h2 class="info-heading">お知らせ</h2>
                    <div class="info-btn-readAll"><a href="hoge">すべて既読にする</a></div>
                    <ul class="info-list">
                      <li class="info-item">
                        <a class="info-link read" href="hoge1">
                          <figure class="info-user-thumb"><img src="/assets/images/common/thumb-user-info.png" alt=""></figure>
                          <p class="info-content">〇〇さんがあなたの「アロンソ、今季の「痛み」で闘志に再び火」へのコメントに<strong>Good</strong>しました。</p>
                          <p class="info-date">29分前</p>
                        </a>
                      </li>
                      <li class="info-item">
                        <a class="info-link unread" href="hoge">
                          <figure class="info-user-thumb"><img src="/assets/images/common/thumb-user-info.png" alt=""></figure>
                          <p class="info-content">〇〇さんがあなたの「アロンソ、今季の「痛み」で闘志に再び火」へのコメントに<strong>Bad</strong>しました。</p>
                          <p class="info-date">29分前</p>
                        </a>
                      </li>
                      <li class="info-item">
                        <a class="info-link read" href="hoge">
                          <figure class="info-user-thumb"><img src="/assets/images/common/thumb-user-info.png" alt=""></figure>
                          <p class="info-content">〇〇さんがあなたの「長文が入って3行になった場合長文が入って3行になった場合長文が入って3行になった場合長文が入って3行になった場合長文が入って3行になった場合長文が入って3行になった場合」へのコメントに<strong>コメント</strong>しました。</p>
                          <p class="info-date">29分前</p>
                        </a>
                      </li>
                      <li class="info-item">
                        <a class="info-link read" href="hoge">
                          <figure class="info-user-thumb"><img src="/assets/images/common/thumb-user-info.png" alt=""></figure>
                          <p class="info-content">〇〇さんがあなたの「長文が入って2行になった場合長文が入って2行になった場合長文が入って2行になった場合」へのコメントに<strong>Good</strong>しました。</p>
                          <p class="info-date">29分前</p>
                        </a>
                      </li>
                      <li class="btn-viewmore"><a class="btn-viewmore-link" href="hoge"><span>すべて見る</span></a></li>
                    </ul>
                  </div><!-- /.info -->
                </div>
              </nav><!-- /.notice-menu -->
            </div><!-- /.notice -->

            <div class="preference">
              <a class="preference-opener" href="#">
                <span class="preference-avatar"><img src="assets/images/dummy/avatar-40x40.jpg" alt=""></span>
              </a>

              <nav class="preference-menu" style="display: block;">
                <ul class="dropMenu">
                  <li class="dropMenu-item"><a class="dropMenu-link" href="hoge">ブックマーク<br>アクティビティ</a></li>
                  <li class="dropMenu-item"><a class="dropMenu-link" href="hoge">設定</a></li>
                  <li class="dropMenu-item"><a class="dropMenu-link" href="hoge">ログアウト</a></li>
                </ul>
              </nav><!-- /.preference-menu -->
            </div><!-- /.preference -->
          </div><!-- /.user -->

        </aside>
      </div><!-- /.head-sec-inner -->
    </header><!-- /.head-sec -->

  <nav class="gnav-sec headline">
    <div class="row row1">
      <ul>
        <li class="gnav1 gnav-headline"><a href="hoge">一面</a></li>
        <li class="gnav2 gnav-crazy"><a href="hoge"><img src="/assets/images/common/gnav-crazy.png" alt="CRAZY"></a></li>
        <li class="gnav3 gnav-all"><a href="hoge">すべて</a></li>
        <li class="gnav4 gnav-baseball"><a href="hoge">野球</a></li>
        <li class="gnav5 gnav-mlb"><a href="hoge">MLB</a></li>
        <li class="gnav6 gnav-soccer"><a href="hoge">サッカー</a></li>
        <li class="gnav7 gnav-w_soccer"><a href="hoge">海外サッカー</a></li>
        <li class="gnav8 gnav-golf"><a href="hoge">ゴルフ</a></li>
        <li class="gnav9 gnav-sumo"><a href="hoge">相撲</a></li>
        <li class="gnav10 gnav-combative"><a href="hoge">格闘技</a></li>
        <li class="gnav11 gnav-athletic"><a href="hoge">陸上</a></li>
        <li class="gnav12 gnav-swimming"><a href="hoge">水泳</a></li>
        <li class="gnav13 gnav-judo"><a href="hoge">柔道</a></li>
        <li class="gnav14 gnav-tennis"><a href="hoge">テニス</a></li>
      </ul>
    </div>

    <div class="row row2">
      <ul>
        <li class="gnav15 gnav-volleyball"><a href="hoge">バレーボール</a></li>
        <li class="gnav16 gnav-rugby"><a href="hoge">ラグビー</a></li>
        <li class="gnav17 gnav-figure"><a href="hoge">フィギュア</a></li>
        <li class="gnav18 gnav-basketbal"><a href="hoge">バスケットボール</a></li>
        <li class="gnav19 gnav-xsports"><a href="hoge">エクストリーム・スポーツ</a></li>
        <li class="gnav20 gnav-motor"><a href="hoge">モータースポーツ</a></li>
        <li class="gnav21 gnav-business"><a href="hoge">ビジネス</a></li>
        <li class="gnav22 gnav-other"><a href="hoge">その他競技</a></li>
      </ul>
    </div>
  </nav><!-- /.gnav-sec -->
