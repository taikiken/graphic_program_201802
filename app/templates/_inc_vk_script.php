<?php
/**
 * Date: 2018/04/22
 * Time: 21:39
 */
/*

# VK parts script

- sagen.min.js
- vendor.react.js
- main.bundle.js
- exe.bundle.js

が結合された単体で機能するファイル

/inc/assets/[dir]/responsive/inc.js/
↓
/assets/js/vk_spbl_header.bundle.js
がロードされる
※ 後加工しやすいようphp通して出力する

*/
?>
<script defer id="<?php echo $page['html_prefix']; ?>vk-header_script" src="<?php echo $page['site_url_uts']; ?>/inc/assets/<?php echo $page['directory']; ?>/responsive/inc.js/?v=<?php echo $page['version']; ?>" data-browser="true" data-prefix="<?php echo $page['html_prefix']; ?>" data-domain="<?php echo $page['site_url_uts']; ?>"></script>
<script src="<?php echo $page['site_url_uts']; ?>/assets/js/fb-video.js?v=<?php echo $page['version']; ?>"></script>
