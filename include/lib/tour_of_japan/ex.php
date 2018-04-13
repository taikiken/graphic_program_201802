<?php

$date_itr_max = 1;
for ($date_itr = 0; $date_itr < $date_itr_max; $date_itr++) {
  $a[] = array("head", "");
  $a[] = array("textfield", "日付", "date" . $date_itr, "30", "", "", $BILLINGUAL);

  for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
    $a[] = array("head", "記事" . ($articles_itr + 1));
    $a[] = array("textfield", "記事ID", "id" . $date_itr . $articles_itr, "30", "", "", $BILLINGUAL);

    for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
      $a[] = array(
        "textfield", "コメント" . ($comment_itr + 1), "comment" . $date_itr . $articles_itr . $comment_itr, "60", "", "", $BILLINGUAL
      );
    }
  }
}

  include $INCLUDEPATH."print_write.php";

?>