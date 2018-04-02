<?php
include "local.php";
include "public/import.php";

// DBオブジェクト作成
$dbo = new db;
$dbo->connect();

$sql =<<<EOD
 SELECT
   u_categories.name AS tabs_name,
   u_categories.name_e AS tabs_name_e
 FROM
   u_categories
 JOIN
   tabs
 ON
   tabs.category_id = u_categories.id
 WHERE
   tabs.flag = 1
 ORDER BY
   tabs.n
EOD;
$dbo->query($sql);

$list = "";
while ($f = $dbo->fetch_array()){
  $text = <<<_EOD
    <li id="bull-{$f['tabs_name_e']}" class="bull-gnav-{$f['tabs_name_e']}">
      <a href="/category/{$f['tabs_name_e']}/">{$f['tabs_name']}</a>
    </li>

_EOD;

  $list = $list . $text;

}
$file = <<<_EOD
<div id="bull-header-container" class="bull-head-sec">
  <div class="bull-head-sec-inner">
    <aside class="bull-f-left clearfix">
      <div id="bull-head-search-container"></div><!-- /.head-search -->
    </aside>

    <h1><a href="/">スポーツブル（スポブル）</a></h1>

    <aside class="bull-f-right clearfix">
      <div id="bull-user-profile-container"></div><!--/.user-profile-container-->
    </aside>
  </div><!-- /.head-sec-inner -->
</div><!-- /.head-sec -->

<nav id="bull-global-nav-container" class="bull-gnav-sec">
  <ul>
    <li id="bull-home" class="bull-gnav-home"><a href="/">TOP</a></li>
{$list}
  </ul>
</nav><!-- /.gnav-sec -->

<div id="bull-js-announce-container"></div>
<div id="bull-pickup-container"></div><!-- /pickup -->
_EOD;

echo $file;

$filename = 'pc_header.html';

file_put_contents($filename,$file);

header("Cache-Control: private",false);
header("Content-Type: application/force-download");
header("Content-Disposition: attachment; filename=$filename");
header("Content-Length:". strlen($filename));

readfile($filename);
