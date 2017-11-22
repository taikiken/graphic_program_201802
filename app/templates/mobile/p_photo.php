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
    <?php
    if(false === empty($page['post']['relatedpost'])):
        echo $page['post']['relatedpost'];
    endif;
    ?>
<?php else:?>
  <div id="detail-photoalbum">
    <nav class="nav-photoalbum" style="margin-top: 20px;">
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

    <?php
    if(false === empty($page['post']['relatedpost'])):
        echo $page['post']['relatedpost'];
    endif;
    ?>
<?php endif;?>
