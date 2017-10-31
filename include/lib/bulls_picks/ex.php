<?php
// s3ファイルを表示
$filename = '/tmp/picks.xml';
$picks_xml = simplexml_load_file($filename);
$picks_xml = $picks_xml->xpath('/date')[0];

$date = (string)$picks_xml->articles->attributes()->date;

$ids = [];
$comments = [];

$article_count = 0; // コメント配列管理用
foreach ($picks_xml->articles->article as $article) {
  $ids[] = (string)$article->id;

  foreach ($article->comments as $value) {
    foreach ($value as $comment) {
      $comments[$article_count][] = (string)$comment;
    }
  }
  $article_count ++;
}

$a[] = array("textfield", "日付", "date", "55", $date."<BR>", "", $BILLINGUAL);

for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
  $a[] = array("head", "記事".($articles_itr +1));
  $a[] = array("textfield", "記事ID", "id".$articles_itr, "55", $ids[$articles_itr]."<BR>", "", $BILLINGUAL);

  for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
    $a[] = array(
      "textfield", "コメント".($comment_itr +1),
      "comment".$articles_itr.$comment_itr,
      "120",
      $comments[$articles_itr][$comment_itr]."<BR>",
      "",
      $BILLINGUAL
    );
  }
}

  include $INCLUDEPATH."print_write.php";

?>