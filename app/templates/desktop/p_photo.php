<?php
/**
 * Created by PhpStorm.
 * User: misawa
 * Date: 2017/11/21
 * Time: 15:45
 */
// メンテナンス性が悪いのでフォトアルバムを外出しします
?>

<?php if(!isset($_GET['id'])):?>
    <div id="list-photoalbum">
        <p class="lead"><?php echo $page['post']['body_escape'];?></p>
        <ul>
            <?php foreach($page['photo'] as $id => $photo) :?>
                <li>
                    <a href="<?php echo $page['og_url']?>?id=<?php echo $id;?>">
                        <img class="lazyload" data-src="<?php echo $photo['thumb']?>">
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
                        <i></i>前の写真
                    </a>
            </p>
            <p class="list">
                <a href="<?php echo $page['og_url']?>">
                    <i></i>写真一覧
                </a>
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
            <img src="<?php echo $page['photo'][$_GET['id']]['main']?>" alt="">
            <figcaption><?php echo $page['photo'][$_GET['id']]['title']?></figcaption>
        </figure>
        <p class="page">
            <span><?php echo $_GET['id']?>/<?php echo count($page['photo'])?></span>
        </p>

      <?php
      // photo gallery ad
      ?>
        <div class="sponsor-link w728">
          <div id='div-gpt-ad-article-deital-desktop-bigbanner-A' class="bnr-dfp" style='height:90px; width:728px;'></div>
        </div>

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