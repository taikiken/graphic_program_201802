<?php
/**
 * Date: 2018/04/22
 * Time: 21:39
 */
/*

# VK header / footer script

- sagen.min.js
- vendor.react.js
- main.bundle.js
- exe.bundle.js

が結合された単体で機能するファイル

*/
?>
<script id="<?php echo $page['html_prefix']; ?>vk-header_script" src="/assets/js/vk_spbl_header.bundle.js?v=<?php echo $page['version']; ?>" data-browser="true" data-prefix="<?php echo $page['html_prefix']; ?>" data-domain="<?php echo $page['site_url_uts']; ?>"></script>

<script src="<?php echo $page['site_url_uts']; ?>/assets/js/fb-video.js?v=<?php echo $page['version']; ?>"></script>
