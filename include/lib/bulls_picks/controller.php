<?php

if ($q->get_dir() === 1) { // 編集

  if ($q->get_file() === 1) {
    data_conf();

  } elseif ($q->get_file() === 2) {

    // アーカイブ作成

    // 入力内容でpicks.xml作成
    include $INCLUDEPATH . "lib/" . $CURRENTDIRECTORY . "/ex.php";

    // フォームからxml作成
    $dom = new DomDocument('1.0', 'UTF-8');

    $date = $dom->appendChild($dom->createElement('date'));

    $articles = $date->appendChild($dom->createElement('articles'));
    $articles_date = $dom->createAttribute('date');
    $articles_date->value = $_POST['p_date'];
    $articles->appendChild($articles_date);

    for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
      $article = $articles->appendChild($dom->createElement('article'));
      $id = $article->appendChild($dom->createElement('id'));
      $id->appendChild(
        $dom->createTextNode($_POST['p_id' . $articles_itr])
      );

      $comments = $article->appendChild($dom->createElement('comments'));
      for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
        $comment = $comments->appendChild($dom->createElement('comment'));
        $comment->appendChild(
          $dom->createTextNode($_POST['p_comment' . $articles_itr . $comment_itr])
        );
      }
    }
    $dom->formatOutput = true;
    $dom->save($TMP_PICKS);

    // s3へ保存
    s3upload($TMP_PICKS, $PICKS_FILENAME);
    $e = s3upload($TMP_PICKS, $PICKS_FILENAME);
    unlink($TMP_PICKS);

  }
}

?>