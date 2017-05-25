<?php
if ($page['category']['slug'] == 'motorsports') {
  // motorsports
  include_once __DIR__.'/category_motorsports.php';
} else {
  include_once __DIR__.'/category_content.php';
}
