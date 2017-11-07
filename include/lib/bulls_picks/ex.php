<?php

$a[] = array("textfield", "日付", "date", "30", "", "", $BILLINGUAL);

for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
  $a[] = array("head", "記事".($articles_itr +1));
  $a[] = array("textfield", "記事ID", "id".$articles_itr, "30", "", "", $BILLINGUAL);

  for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
    $a[] = array(
      "textfield", "コメント".($comment_itr +1), "comment".$articles_itr.$comment_itr, "60", "", "", $BILLINGUAL
    );
  }
}

  include $INCLUDEPATH."print_write.php";

?>