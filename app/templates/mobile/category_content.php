<?php
// ------------------------------------------------
// SP カテゴリー
// ------------------------------------------------
?>
<div id="body-section" class="body-sec">
  <div class="body-sec-inner">
    <?php
    // ----------------------------------------------------
    // 記事一覧: sp theme.images
    if ( $page['theme']['images']['sp'] ) :
      ?>
      <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page['category']['theme']['background_color'] : ''; ?>">
        <h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['sp']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
      </div>
      <?php
    endif;
    // eof: 記事一覧: sp theme.images
    // ---------------------------------------------------- ?>
    <div id="pickup-container"></div><!-- /pickup -->

    <?php
    // SP版 Powerd by エリアの追加
    // https://github.com/undotsushin/undotsushin/issues/1211
    include_once __DIR__.'/_category-heading.php';
    ?>
    <?php
    // https://github.com/undotsushin/undotsushin/issues/1210
    // CMS から一面・すべてのバナーを設定できるようにする #1210
    // @since 2016-11-02
    if ($page['category']['slug'] == 'all') {
      include_once __DIR__ . '/_cms_banner.php';
    }
    ?>
    <section class="main-sec">
      <?php if(empty($page['list']) === false) : ?>
        <style type="text/css">
            .ttl-wrapper{background-color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;height:60px;color:#000;font-weight:700;border-top:4px solid #0e357f;padding:0 20px}.ttl-wrapper>*{font-weight:700;padding-top:3px}.ttl-wrapper .ttl{font-size:22px;font-size:"2.2rem"}.ttl-wrapper .ttl.pickup i{width:20px;height:20px;background:url(/assets/img/icon_pickup.png) 0 0/contain no-repeat}.ttl-wrapper .ttl i{margin-right:10px;position:relative;top:2px;display:inline-block}.ttl-wrapper .more{font-size:14px;font-size:"1.4rem"}.ttl-wrapper .more a:hover{color:#000}.ttl-wrapper .more a{display:block;padding-right:12px;position:relative}.main-sec a:hover{text-decoration:none}.ttl-wrapper .more a:hover:after{right:-3px}.ttl-wrapper .more a:after{display:inline-block;content:"";background:url(/assets/img/icon_arrow.png) 100% 0 no-repeat;width:7px;height:12px;position:absolute;top:4px;right:0;-webkit-transition:.3s ease;transition:.3s ease}.section_pickup_player{margin-top:30px}.section_pickup_player .ttl-wrapper{margin-bottom:30px}.pickup_player_list{margin-bottom:5px}.pickup_player_list .thumb_area{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;padding:0 14px;margin-left:-20px}.pickup_player_list .thumb_area li{width:160px;margin-left:20px}.pickup_player_list .thumb_area li a{display:block}.pickup_player_list .thumb_area li .img{position:relative;overflow:hidden;border-radius:50%;margin-bottom:10px;height:160px;width:160px;border:2px solid #0e357f;background-color:#fff}.pickup_player_list .thumb_area li .img img{-webkit-transition:.4s ease;transition:.4s ease;position:relative;border-radius:50%;width:100%}.pickup_player_list .thumb_area li .txt_area{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;text-align:center;font-weight:700}.pickup_player_list .thumb_area li .txt_area .name{font-size:18px;font-size:"1.8rem";font-weight:700;color:#000}.pickup_player_list .thumb_area li a:hover .txt_area .name{color:#0e357f}.pickup_player_list .thumb_area li .txt_area p{font-size:14px;font-size:"1.4rem";-webkit-transition:.4s ease;transition:.4s ease;color:#666}.section_pickup_player .more_btn{margin:20px 10px 15px}.section_pickup_player .more_btn a{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background-color:#cc141d;height:44px;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-weight:700;font-size:14px;font-size:"1.4rem";border-radius:4px;color:#fff}.section_pickup_player .more_btn i{margin-right:5px;position:relative;top:0;display:inline-block;width:12px;height:12px;background:url(/assets/img/icon_list.png) 0 0/contain no-repeat}@media screen and (max-width:768px){.section_pickup_player{margin-top:0}.section_pickup_player .ttl-wrapper{margin-bottom:20px}.ttl-wrapper{background-color:#0e357f;border-top:none;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:30px;color:#fff}.ttl-wrapper .ttl{font-size:12px;font-size:"1.2rem"}.ttl-wrapper .ttl.pickup i{background:url(/assets/img/sp_icon_pickup.png) 0 0/contain no-repeat}.ttl-wrapper .ttl.pickup i,.ttl-wrapper .ttl.recommend i{width:15px;height:15px}.pickup_player_list .thumb_area{margin-left:-.3%}.pickup_player_list .thumb_area li{width:23.5%;margin-left:1.5%}.pickup_player_list .thumb_area li .img{width:auto;height:auto}.section_pickup_player .more_btn{display:block}}@media screen and (max-width:414px){.pickup_player_list .thumb_area{margin-left:-2.6%}.pickup_player_list .thumb_area li{width:30%;margin-left:3.1%}.pickup_player_list .thumb_area li .img{width:auto;height:auto;margin-bottom:8px}.pickup_player_list .thumb_area li .txt_area .name{font-size:12px;font-size:"1.2rem"}.pickup_player_list .thumb_area li .txt_area p{font-size:10px;font-size:"1rem"}}
        </style>

        <section class="section_pickup_player">
            <div class="ttl-wrapper">
                <h2 class="ttl pickup"><i></i>注目のアスリート</h2>
            </div>

            <div class="pickup_player_list">
                <ul class="thumb_area">
                    <?php foreach ($page['list'] as $player): ?>
                      <li><a href="/athlete/<?php echo $player->body->no ?>/">
                              <div class="img"><img src="/prg_img/img/<?php echo $player->body->img ?>" alt=""></div>
                              <div class="txt_area">
                                  <h3 class="name"><?php echo $player->body->name ?></h3>
                                  <p class="genre"><?php echo $player->body->competition ?></p>
                              </div>
                          </a></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="more_btn"><a href="/category/<?php echo $page['category']['slug'] ?>/athletes/"><i></i>すべての選手を見る</a></div>
        </section>
      <?php endif; ?>
      <?php
      // ----------------------------------------------------
      // 記事一覧: sp banner
      if ( !empty($page['category']['banner']['sp']['image']) && !empty($page['category']['banner']['sp']['link']) ) :
        ?>
        <div class="sponsor-link">
          <a href="<?php echo $page['category']['banner']['sp']['link']; ?>" target="_blank" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '<?php echo $page['category']['banner']['sp']['link']; ?>', true);"><img src="<?php echo $page['category']['banner']['sp']['image']; ?>" alt="<?php echo $page['category']['banner']['sp']['text'] ? $page['category']['banner']['sp']['text'] : '' ?>"></a>
        </div>
        <?php
      endif;
      // eof: 記事一覧: sp banner
      // ---------------------------------------------------- ?>


      <?php if ( $page['category']['slug'] === 'big6tv' ) : ?>
        <?php include_once __DIR__.'/../../../public/big6tv/category/index.html'; ?>
      <?php endif; ?>


      <?php
      # ref. #2227
      if ( $page['category']['slug'] ==='seriku' ) :
        include_once __DIR__.'/../seriku/mobile/index.php';
      endif;
      ?>

      <?php
      # ref. #2185
      if ( $page['category']['slug'] ==='inhigh' ) :
        include_once __DIR__.'/../inhigh/mobile/index.php';
      endif;
      ?>

      <?php
      # ref. #2321 
      if ( $page['category']['slug'] === 'americanfootball' ) :
        include_once __DIR__.'/../stats/ua_kansai/mobile/index.php';
      endif;
      ?>

      <?php
      # ref. #2559
      if ( $page['category']['slug'] === 'basketball' ) :
        $bleague_parts = file_get_contents('https://sportsbull.jp/stats/bleague/webview/sp/');
        echo $bleague_parts;
      endif;
      ?>

      <?php
      # ref. #2264
      if ( $page['category']['slug'] === 'americanfootball' ) :
        include_once __DIR__.'/../stats/ua_kansai/mobile/index.php';
      endif;
      ?>

      <div id="js-headline"></div>
      <div id="category-container"></div>
      <div id="board-container-more"></div>
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->