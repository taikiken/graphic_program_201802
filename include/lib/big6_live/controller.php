<?php

$s3_key = $BIG6_FILENAME;
$tmp_filename = $TMP_BIG6;

if ($q->get_dir() === 1) { // 編集

  if ($q->get_file() === 0) {

    $S3Module = new S3Module;
    $url = $S3Module->getUrl($BIG6_FILENAME);
    if ($bucket=="img-sportsbull-jp")
    {
      $url = str_replace('https://s3-ap-northeast-1.amazonaws.com/img-sportsbull-jp', 'https://img.sportsbull.jp', $url);
    }
    $file = file_get_contents($url);

    $toj_json = json_decode($file,true);

    $date = date('Y-m-d H:i:s');

    $val = [];

    foreach ($toj_json as $article) {
        $val =
          [
              "alt-large" => $article["alt"]["large"],
              "alt-medium" => $article["alt"]["medium"],
              "error-large" => $article["error"]["large"],
              "error-medium" => $article["error"]["medium"],
              "interval" => $article["interval"],
              "isPlaying" => $article["isPlaying"],
              "video_id" => $article["video"]["id"],

          ];
    }
  } elseif ($q->get_file() === 1) { // 確認
    data_conf();
  } elseif ($q->get_file() === 2) { // 保存
    $S3Module = new S3Module;

    $alt = [
      "large"  => $_POST["p_alt-large"],
      "medium" => $_POST["p_alt-medium"]
    ];
    $error = [
      "large" => $_POST["p_error-large"],
      "medium" => $_POST["p_error-medium"]
    ];
    $video = [
      "id" => $_POST["p_video_id"]
    ];

    $json_array = [
      "lastupdate" => date("Y-m-d H:i:s"),
      "live" => [
        "alt" => $alt,
        "error" => $error,
        "interval" => $_POST["p_interval"],
        "isPlaying" => $_POST["p_isPlaying"],
        "video" => $video
      ]
    ];

    // 入力内容で アーカイブtoj.json作成
    include $INCLUDEPATH . "lib/" . $CURRENTDIRECTORY . "/ex.php";

    $json = json_encode($json_array);
    file_put_contents($tmp_filename, $json);

    // static/toj/live.json で保存する
    $e =s3upload($tmp_filename,$s3_key);
    unlink($json);

  }
}

