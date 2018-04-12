<style type="text/css">
  <?php if (in_array('dark', $whole_classes) || in_array('big6tv', $whole_classes)) : //黒のテーマ ?>

  .ttl-wrapper {
    background-color: #000;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 60px;
    color: #fff;
    font-weight: 700;
    border-top: 4px solid #cc141d;
    padding: 0 20px
  }

  .ttl-wrapper>* {
    font-weight: 700;
    padding-top: 3px
  }

  .ttl-wrapper .ttl {
    font-size: 22px;
    font-size: "2.2rem"
  }

  .ttl-wrapper .ttl.pickup i {
    width: 20px;
    height: 20px;
    background: url(/assets/img/sp_icon_pickup.png) 0 0/contain no-repeat
  }

  .ttl-wrapper .ttl i {
    margin-right: 10px;
    position: relative;
    top: 2px;
    display: inline-block
  }

  .ttl-wrapper .more {
    font-size: 14px;
    font-size: "1.4rem"
  }

  .ttl-wrapper .more a {
    display: block;
    padding-right: 12px;
    position: relative;
    color: #fff;
    -webkit-transition: .4s ease;
    transition: .4s ease
  }

  .ttl-wrapper .more a:hover {
    color: #333
  }

  .main-sec a:hover {
    text-decoration: none
  }

  .ttl-wrapper .more a:hover:after {
    right: -3px
  }

  .ttl-wrapper .more a:after {
    display: inline-block;
    content: "";
    background: url(/assets/images/seriku/icon_arrow_white.png) 100% 0 no-repeat;
    width: 7px;
    height: 12px;
    position: absolute;
    top: 4px;
    right: 0;
    -webkit-transition: .3s ease;
    transition: .3s ease
  }

  .section_pickup_player {
    margin-top: 30px
  }

  .section_pickup_player .ttl-wrapper {
    margin-bottom: 30px
  }

  .pickup_player_list {
    margin-bottom: 5px
  }

  .pickup_player_list .thumb_area {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding: 0 14px;
    margin-left: -20px
  }

  .pickup_player_list .thumb_area li {
    width: 160px;
    margin-left: 20px
  }

  .pickup_player_list .thumb_area li a {
    display: block
  }

  .pickup_player_list .thumb_area li .img {
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 10px;
    height: 160px;
    width: 160px;
    border: 2px solid #cc141d;
    background-color: #000
  }

  .pickup_player_list .thumb_area li .img img {
    -webkit-transition: .4s ease;
    transition: .4s ease;
    position: relative;
    border-radius: 50%;
    width: 100%
  }

  .pickup_player_list .thumb_area li .txt_area {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    text-align: center;
    font-weight: 700
  }

  .pickup_player_list .thumb_area li .txt_area .name {
    font-size: 18px;
    font-size: "1.8rem";
    font-weight: 700;
    color: #fff
  }

  .pickup_player_list .thumb_area li a:hover .txt_area .name {
    color: #cc141d
  }

  .pickup_player_list .thumb_area li .txt_area p {
    font-size: 14px;
    font-size: "1.4rem";
    -webkit-transition: .4s ease;
    transition: .4s ease;
    color: #999
  }

  <?php else : //通常のテーマ ?>

  .ttl-wrapper {
    background-color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 60px;
    color: #000;
    font-weight: 700;
    border-top: 4px solid #0e357f;
    padding: 0 20px
  }

  .ttl-wrapper>* {
    font-weight: 700;
    padding-top: 3px
  }

  .ttl-wrapper .ttl {
    font-size: 22px;
    font-size: "2.2rem"
  }

  .ttl-wrapper .ttl.pickup i {
    width: 20px;
    height: 20px;
    background: url(/assets/img/icon_pickup.png) 0 0/contain no-repeat
  }

  .ttl-wrapper .ttl i {
    margin-right: 10px;
    position: relative;
    top: 2px;
    display: inline-block
  }

  .ttl-wrapper .more {
    font-size: 14px;
    font-size: "1.4rem"
  }

  .ttl-wrapper .more a:hover {
    color: #000
  }

  .ttl-wrapper .more a {
    display: block;
    padding-right: 12px;
    position: relative
  }

  .main-sec a:hover {
    text-decoration: none
  }

  .ttl-wrapper .more a:hover:after {
    right: -3px
  }

  .ttl-wrapper .more a:after {
    display: inline-block;
    content: "";
    background: url(/assets/img/icon_arrow.png) 100% 0 no-repeat;
    width: 7px;
    height: 12px;
    position: absolute;
    top: 4px;
    right: 0;
    -webkit-transition: .3s ease;
    transition: .3s ease
  }

  .section_pickup_player {
    margin-top: 30px
  }

  .section_pickup_player .ttl-wrapper {
    margin-bottom: 30px
  }

  .pickup_player_list {
    margin-bottom: 5px
  }

  .pickup_player_list .thumb_area {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding: 0 14px;
    margin-left: -20px
  }

  .pickup_player_list .thumb_area li {
    width: 160px;
    margin-left: 20px
  }

  .pickup_player_list .thumb_area li a {
    display: block
  }

  .pickup_player_list .thumb_area li .img {
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 10px;
    height: 160px;
    width: 160px;
    border: 2px solid #0e357f;
    background-color: #fff
  }

  .pickup_player_list .thumb_area li .img img {
    -webkit-transition: .4s ease;
    transition: .4s ease;
    position: relative;
    border-radius: 50%;
    width: 100%
  }

  .pickup_player_list .thumb_area li .txt_area {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    text-align: center;
    font-weight: 700
  }

  .pickup_player_list .thumb_area li .txt_area .name {
    font-size: 18px;
    font-size: "1.8rem";
    font-weight: 700;
    color: #000
  }

  .pickup_player_list .thumb_area li a:hover .txt_area .name {
    color: #0e357f
  }

  .pickup_player_list .thumb_area li .txt_area p {
    font-size: 14px;
    font-size: "1.4rem";
    -webkit-transition: .4s ease;
    transition: .4s ease;
    color: #666
  }
  <?php endif; ?>
</style>
<section class="section_pickup_player">
    <div class="ttl-wrapper">
        <h2 class="ttl pickup"><i></i>注目のアスリート</h2>
        <p class="more"><a href="/pickup_athletes/<?php echo $page['category']['slug'] ?>/list/">すべての選手を見る</a></p>
    </div>
    <div class="pickup_player_list">
        <ul class="thumb_area">
            <?php foreach ($page['list'] as $player): ?>
              <li>
                  <a href="/athlete/<?php echo $player->body->no ?>/">
                      <div class="img"><img src="/prg_img/img/<?php echo $player->body->img ?>" alt=""></div>
                      <div class="txt_area">
                          <h3 class="name"><?php echo $player->body->name ?></h3>
                          <p class="genre"><?php echo $player->body->competition ?></p>
                      </div>
                  </a>
              </li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>