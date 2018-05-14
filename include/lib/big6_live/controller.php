<?php

$s3_key = $BIG6_FILENAME;
$tmp_filename = $TMP_BIG6;

if ($q->get_dir() === 1) { // 編集

  if ($q->get_file() === 0) {

    $S3Module = new S3Module;
    $url = $cf_bucket. $s3_key;
    $file = file_get_contents($url);

    $big6_json = json_decode($file,true);

    $date = date('Y-m-d H:i:s');

    $val = [];

    $sources = [];
    $sources_sp = [];

    foreach ($big6_json as $article) {
      foreach ($article["live"]["video"]["sources"] as $pc){
        $sources[] = [
            "label" => $pc["label"],
            "default" => $pc["default"],
            "res" => $pc["res"],
            "url" => $pc["url"]
        ];
      }
      foreach ($article["live"]["video"]["sources_sp"] as $sp){
        $sources_sp[] = [
          "label" => $sp["label"],
          "default" => $sp["default"],
          "res" => $sp["res"],
          "url" => $sp["url"]
        ];
      }
        $val =
          [
              "alt-large" => $article["live"]["alt"]["large"],
              "alt-medium" => $article["live"]["alt"]["medium"],
              "error-large" => $article["live"]["error"]["large"],
              "error-medium" => $article["live"]["error"]["medium"],
              "interval" => $article["live"]["interval"],
              "isPlaying" => $article["live"]["isPlaying"],
              "video_id" => $article["live"]["video"]["id"],
              "android" => $article["live"]["video"]["ad_url"]["android"],
              "ios" => $article["live"]["video"]["ad_url"]["ios"],
              "pc" => $article["live"]["video"]["ad_url"]["pc"],
              "sp" => $article["live"]["video"]["ad_url"]["sp"],
              "source" => $article["live"]["video"]["source"],
              "sources" => $sources,
              "sources_sp" => $sources_sp
          ];
    }
  } elseif ($q->get_file() === 1) { // 確認
    data_conf();
  } elseif ($q->get_file() === 2) { // 保存

    $alt = [
      "large"  => $_POST["p_alt-large"],
      "medium" => $_POST["p_alt-medium"]
    ];
    $error = [
      "large" => $_POST["p_error-large"],
      "medium" => $_POST["p_error-medium"]
    ];
    $ad_url = [
      "android" => $_POST["p_android"],
      "ios" => $_POST["p_ios"],
      "pc" => $_POST["p_pc"],
      "sp" => $_POST["p_sp"],
    ];

    $sources = [];
    $sources_sp = [];

    for($i=0;$i<4;$i++){
      $isDefault = $_POST["p_default".$i] === "true"? TRUE : FALSE;
        $sources[] = [
          "label" => $_POST["p_label".$i],
          "default" => $isDefault,
          "res" => (int)$_POST["p_res".$i],
          "url" => $_POST["p_url".$i],
        ];
    }

    for($i=0;$i<3;$i++){
      $isDefault_sp = $_POST["p_sp_default".$i]==="true" ? TRUE : FALSE;

      $sources_sp[] = [
        "label" => $_POST["p_sp_label".$i],
        "default" => $isDefault_sp,
        "res" => (int)$_POST["p_sp_res".$i],
        "url" => $_POST["p_sp_url".$i],
      ];
    }

    $video = [
      "id" => $_POST["p_video_id"],
      "ad_url" => $ad_url,
      "source" => $_POST["p_source"],
      "sources" => $sources,
      "sources_sp" => $sources_sp
    ];

    $isPlaying = $_POST["p_isPlaying"] === "中継中" ? TRUE : FALSE;

    $json_array = [
      "lastupdate" => date("Y-m-d H:i:s"),
      "live" => [
        "alt" => $alt,
        "error" => $error,
        "interval" => $_POST["p_interval"],
        "isPlaying" => $isPlaying,
        "video" => $video
      ],
    ];

    // 入力内容で アーカイブbig6.json作成
    include $INCLUDEPATH . "lib/" . $CURRENTDIRECTORY . "/ex.php";

    $response = [
      "response" => $json_array
    ];

    $json = json_encode($response);
    file_put_contents($tmp_filename, $json);

    $S3Module = new S3Module;
    // static/big6/live.json で保存する
    $e =s3upload($tmp_filename,$s3_key);
    unlink($json);

  }
}

