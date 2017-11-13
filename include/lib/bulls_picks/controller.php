<?php

if ($q->get_dir() === 1) { // 編集

  if ($q->get_file() === 0) {

    if ($q->tstr[3] == 'au') {

      // スポブルxml保存時にau xmlを /tmpへ作成するので
      // /tmpのau xmlをフロントに表示する
      if (file_exists($TMP_AU_PICKS)) {
        $picks_xml = simplexml_load_file($TMP_AU_PICKS);
      }
      else {
        $S3Module = new S3Module;
        $url = $S3Module->getUrl($AU_PICKS_FILENAME);
        $picks_xml = simplexml_load_file($url);
      }

      $picks_xml = $picks_xml->xpath('/date')[0];

      $dates = [];
      $ids = [];
      $comments = [];
      $post_blstarticle_id = (string)$picks_xml->articles->blstarticle->id;

      $date_count = 0; // 配列管理用
      foreach ($picks_xml->articles as $articles) {
        $dates[] = (string)$articles->attributes()->date;

        $article_count = 0; // コメント配列管理用  日付変更でリセット
        foreach ($articles->article as $article) {
          $ids[$date_count][] = (string)$article->id;

          foreach ($article->comments as $value) {
            foreach ($value as $comment) {
              $comments[$date_count][$article_count][] = (string)$comment;
            }
          }
          $article_count++;
        }
        $date_count++;
      }

    } else { // spb
      $S3Module = new S3Module;
      $url = $S3Module->getUrl($PICKS_FILENAME);

      $picks_xml = simplexml_load_file($url);
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
    }


  } elseif ($q->get_file() === 1) {
    data_conf();

  } elseif ($q->get_file() === 2) {

    $S3Module = new S3Module;

    if ($q->tstr[3] == 'au') {
      $s3_key = $AU_PICKS_FILENAME;
      $tmp_filename = $TMP_AU_PICKS;
    } else {
      $s3_key = $PICKS_FILENAME;
      $tmp_filename = $TMP_PICKS;
    }

    // アーカイブ作成
    $url = $S3Module->getUrl($s3_key);
    $picks_xml = simplexml_load_file($url);
    $date = (string)$picks_xml->xpath('/date')[0]->articles->attributes()->date;
    $date = str_replace('/', '', $date);
    $picks_xml->asXML($tmp_filename);

    // xml/archives/1031picks.xml
    s3upload($tmp_filename, 'xml/au/archives/' . $date . 'picks.xml');

    // 入力内容でpicks.xml作成
    include $INCLUDEPATH . "lib/" . $CURRENTDIRECTORY . "/ex.php";

    // フォームからxml作成
    $dom = new DomDocument('1.0', 'UTF-8');
    $date = $dom->appendChild($dom->createElement('date'));

    if ($q->tstr[3] == 'au') {
      for ($date_itr = 0; $date_itr < 3; $date_itr++) {
        $articles = $date->appendChild($dom->createElement('articles'));
        $articles_date = $dom->createAttribute('date');
        $articles_date->value = !empty($_POST['p_date' . $date_itr]) ? $_POST['p_date' . $date_itr] : '-';
        $articles->appendChild($articles_date);

        $new_flag = $dom->createAttribute('new');
        $new_flag->value = $date_itr == 0 ? 'true' : 'false';
        $articles->appendChild($new_flag);

        for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
          $post_id = !empty($_POST['p_id' . $date_itr . $articles_itr]) ? $_POST['p_id' . $date_itr . $articles_itr] : 0;
          $post_blstarticle_id = !empty($_POST['p_blstarticle']) ? $_POST['p_blstarticle'] : 0;

          // 動画記事IDを最初の特集内にいれる
          if ($articles_itr == 0 ) {
            $blstarticle = $articles->appendChild($dom->createElement('blstarticle'));
            $blstarticle_id = $blstarticle->appendChild($dom->createElement('id'));
            $blstarticle_id->appendChild(
              $dom->createTextNode($post_blstarticle_id)
            );
          }
          $article = $articles->appendChild($dom->createElement('article'));
          $id = $article->appendChild($dom->createElement('id'));
          $id->appendChild(
            $dom->createTextNode($post_id)
          );

          $comments = $article->appendChild($dom->createElement('comments'));
          for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
            $post_comment = !empty($_POST['p_comment' . $date_itr . $articles_itr . $comment_itr]) ? $_POST['p_comment' . $date_itr . $articles_itr . $comment_itr] : '-';

            $comment = $comments->appendChild($dom->createElement('comment'));
            $comment->appendChild(
              $dom->createTextNode($post_comment)
            );
          }
        }
      }

    } else {
      $articles = $date->appendChild($dom->createElement('articles'));
      $articles_date = $dom->createAttribute('date');
      $articles_date->value = !empty($_POST['p_date']) ? $_POST['p_date'] : '-';
      $articles->appendChild($articles_date);

      for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
        $post_id = !empty($_POST['p_id' . $articles_itr]) ? $_POST['p_id' . $articles_itr] : 0;

        $article = $articles->appendChild($dom->createElement('article'));
        $id = $article->appendChild($dom->createElement('id'));
        $id->appendChild(
          $dom->createTextNode($post_id)
        );

        $comments = $article->appendChild($dom->createElement('comments'));
        for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
          $post_comment = !empty($_POST['p_comment' . $articles_itr . $comment_itr]) ? $_POST['p_comment' . $articles_itr . $comment_itr] : '-';

          $comment = $comments->appendChild($dom->createElement('comment'));
          $comment->appendChild(
            $dom->createTextNode($post_comment)
          );
        }
      }
    }
    $dom->formatOutput = true;
    $dom->save($tmp_filename);

    // s3へ保存
    s3upload($tmp_filename, $s3_key);
    $e = s3upload($tmp_filename, $s3_key);

  }
}

?>