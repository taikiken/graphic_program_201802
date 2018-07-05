<?php
/**
 * メンテナンスしにくいので `photo` 部分を別ファイルにします
 * @since 2017-09-11
 * by @taikiken
 */
?>
<?php
if(!isset($_GET['id'])): ?>
  <div id="list-photoalbum">
    <p class="lead"><?php echo $page['post']['body_escape'];?></p>
    <ul>
      <?php foreach($page['photo'] as $id => $photo) :?>
        <li>
          <a href="<?php echo $page['og_url']?>?id=<?php echo $id?>">
            <img class="lazyload" data-src="<?php echo $photo['sp_thumb']?>">
          </a>
        </li>
      <?php endforeach;?>
    </ul>
  </div>
<?php else:?>
  <div id="detail-photoalbum">
    <nav class="nav-photoalbum">
      <p class="prev">
        <?php if($_GET['id'] == 1):?>
        <a href="<?php echo $page['og_url']?>?id=<?php echo count($page['photo'])?>">
          <?php else:?>
          <a href="<?php echo $page['og_url']?>?id=<?php echo $_GET['id'] - 1?>">
            <?php endif;?>
            <i></i>前の写真</a>
      </p>
      <p class="list">
        <a href="<?php echo $page['og_url']?>">
          <i></i>写真一覧</a>
      </p>
      <p class="next">
        <?php if($_GET['id'] == count($page['photo'])):?>
        <a href="<?php echo $page['og_url']?>?id=1">
          <?php else:?>
          <a href="<?php echo $page['og_url']?>?id=<?php echo $_GET['id'] + 1?>">
            <?php endif;?>
            次の写真
            <i></i>
          </a>
      </p>
    </nav>
    <figure>
      <img src="<?php echo $page['photo'][$_GET['id']]['sp_main']?>" alt="">
      <figcaption><?php echo $page['photo'][$_GET['id']]['title']?></figcaption>
    </figure>
    <p class="page">
      <span><?php echo $_GET['id']?>/<?php echo count($page['photo'])?></span>
    </p>
    <?php
    // #ref UNDO_SPBL-890 【web】フォトギャラリー改修
    // 広告追加 since 2018-07-05
    ?>
    <!-- /531683568/article-detail/article-deital-mobile-bigbanner-A -->
    <script>
      googletag.cmd.push(function() {
        googletag.defineSlot('/531683568/article-detail/article-deital-mobile-bigbanner-A', [320, 50], 'div-gpt-ad-1530770705721-0').addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
    </script>
    <div id='div-gpt-ad-1530770705721-0'>
      <script>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1530770705721-0'); });
      </script>
    </div>
    <!-- // /531683568/article-detail/article-deital-mobile-bigbanner-A -->
    <?php
    // ----------------------------------------------
    ?>
    <nav class="nav-photoalbum">
      <p class="prev">
        <?php if($_GET['id'] == 1):?>
        <a href="<?php echo $page['og_url']?>?id=<?php echo count($page['photo'])?>">
          <?php else:?>
          <a href="<?php echo $page['og_url']?>?id=<?php echo $_GET['id'] - 1?>">
            <?php endif;?>
            <i></i>前の写真</a>
      </p>
      <p class="list">
        <a href="<?php echo $page['og_url']?>">
          <i></i>写真一覧</a>
      </p>
      <p class="next">
        <?php if($_GET['id'] == count($page['photo'])):?>
        <a href="<?php echo $page['og_url']?>?id=1">
          <?php else:?>
          <a href="<?php echo $page['og_url']?>?id=<?php echo $_GET['id'] + 1?>">
            <?php endif;?>
            次の写真
            <i></i>
          </a>
      </p>
    </nav>
    <ul class="list-photo">
      <?php
      $start = 1;
      if($_GET['id'] >= 3 && (count($page['photo']) - $_GET['id']) >= 2):
        $start = $_GET['id'] - 2;
      elseif($_GET['id'] < 3):
        $start = 1;
      elseif((count($page['photo']) - $_GET['id']) < 2):
        $start = count($page['photo']) - 4;
      endif;
      for($i = $start; $i < $start + 5; $i++):
        $current = '';
        if($i == $_GET['id']):
          $current = 'class="current"';
        endif;
        ?>

        <li <?php echo $current?>>
          <a href="<?php echo $page['og_url']?>?id=<?php echo $i?>">
            <img class="lazyload" data-src="<?php echo $page['photo'][$i]['thumb']?>"> </a>
        </li>
        <?php
      endfor;
      ?>
    </ul>
  </div>

<?php endif;?>
