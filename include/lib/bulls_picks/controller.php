<?php

//$TABLE="bulls_picks";

if($q->get_dir()===1){ // 編集

  if($q->get_file()===1){
    data_conf();

  }elseif($q->get_file()===2){
    include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

    // テストxml作成
    $dom = new DomDocument('1.0', 'UTF-8');

    $date = $dom->appendChild($dom->createElement('date'));

    $articles = $date->appendChild($dom->createElement('articles'));
    $articles_date = $dom->createAttribute('date');
    $articles_date->value = date('m月d日');
    $articles->appendChild($articles_date);

    for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
      $article = $articles->appendChild($dom->createElement('article'));
      $id = $article->appendChild($dom->createElement('id'));
      $id->appendChild(
        $dom->createTextNode(date('His'))
      );

      $comments = $article->appendChild($dom->createElement('comments'));
      for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
        $comment = $comments->appendChild($dom->createElement('comment'));
        $comment->appendChild(
          $dom->createTextNode('コメント' .$articles_itr . $comment_itr)
        );
      }
    }
    $dom->formatOutput = true;
    $dom->save('/tmp/picks.xml'); // save as file
  }
}

?>