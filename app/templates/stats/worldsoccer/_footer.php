  <!-- 共同クレジット -->
  <div>
    <div style="max-width: 1088px; margin: 0 auto;">
      <p style="text-align: center; color: #999; font-size: 10px; padding-top: 35px; padding-bottom: 35px; max-width: 728px;">
          Copyright (C) 2017 STATS LLC. All Rights Reserved.<br />
          Copyright (C) 2017 Kyodo News Digital Co., Ltd. All Rights Reserved.
      </p>
    </div>
  </div>


<?php
// # footer
// ==============================

  $BREADCRUMB = array(
    array(
      'label' => '速報&amp;データ',
      'path'  => '/stats/'
    ),
  );

  if ( $page['breadcrumb'] ) :
    foreach( $page['breadcrumb'] as $key => $value ) :
      $BREADCRUMB[] = $value;
    endforeach;
  endif;

  // footer dom
  include_once __DIR__.'/../../_footer-responsive.php';

?>

</div><!-- /.whole -->

<!-- for facebook -->
<script src="/assets/facebook/init.js?v=<?php echo $page['version']; ?>"></script>
<!-- // for facebook -->

<script src="/assets/js/soccer.bundle.js"></script>
<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
</body>
</html>
