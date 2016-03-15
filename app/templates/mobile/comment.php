<div class="body-sec">
  <div class="category-heading">
    <h1>
      <?php echo $page['category']['label']; ?>
    </h1>
  </div><!-- /.category-heading -->

  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="post-detail">

        <div id="single-header-container"></div>

        <div id="comment-normal-container"></div>

        <div class="sponsor-link">
          <a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-710x78.jpg" alt=""></a>
        </div>

        <div class="post-sns_lower">
          <div class="post-sns-list">
            <div class="post-sns-fixed">
              <div class="post-sns-item_fbgood"><div class="fb-like" data-href="<?php echo (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . parse_url($_SERVER["REQUEST_URI"])['path'] ?>" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div></div>
            </div>

            <div class="post-sns-flex">
              <div class="post-sns-flex-inner">
                <ul class="post-sns-flex-list">
                  <li class="post-sns-item post-sns-item_fb"><a href="http://www.facebook.com/share.php" target="_blank"><span>facebook</span></a></li>
                  <li class="post-sns-item post-sns-item_tw"><a href="http://twitter.com/share?&text=<?php echo $page['title'] ?>&via=undotsushin" target="_blank"><span>ツイート</span></a></li>
                  <li class="post-sns-item post-sns-item_gt"><a href="https://plus.google.com/share" target="_blank"><span>Google+</span></a></li>
                  <li class="post-sns-item post-sns-item_line"><a href="http://line.me/R/msg/text/" target="_blank"><span>LINEへ送る</span></a></li>
                </ul>
              </div>
            </div>
          </div><!-- /.post-sns-list -->

          <div class="post-sns-pr">
            <dl class="post-sns-pr-inner">
              <dt><span>運動通信をいいねして<br>最新ニュースをチェック！</span></dt>
              <dd>
                <div class="fb-like" data-href="https://facebook.com/undotsushin/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
              </dd>
            </dl><!-- /.post-sns-pr-inner -->
          </div><!-- /.post-sns-pr -->
        </div><!-- /.post-sns_lower -->

      </div><!-- /.post-detail -->
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->