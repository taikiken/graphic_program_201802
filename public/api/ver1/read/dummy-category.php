<?php

header('Content-Type: application/json; charset=utf-8');


$json_crazy = <<<__EOL__

{
  "status": {
      "code": 200,
      "user_message": "",
      "developer_message": ""
  },
  "response": {
    "id"          : 134,
    "label"       : "CRAZY",
    "slug"        : "crazy",
    "url"         : "http://dev.undotsushin.com/category/crazy/",
    "title_img"   : "",

    "title"       : "CRAZY ATHLETES",
    "description" : "自らの人生を、その「一瞬」にかけるスポーツアスリート達。多くの犠牲、忍耐と引き換えに彼らが起こす「奇跡」、彼らが我々に提供してくれる「感動」が、人々をスポーツに熱狂させる根源である。",
    "theme"        : {
      "base"             : "dark",
      "background-color" : "#000000",
      "images"      : {
        "pc" : "https://www.undotsushin.com/img/crazy/crazy-pc-index.png",
        "sp" : "https://www.undotsushin.com/img/crazy/crazy-sp-index.png"
      }
    },
    "banner"      : {
      "pc" : {
        "text"  : "ダミーバナーPC用",
        "image" : "https://www.undotsushin.com/prg_img/img/img2016041710335632899600.jpg",
        "link"  : "http://dev.undotsushin.com/?crazy-banner-pc"
      },
      "sp" : {
        "text"  : "ダミーバナーモバイル用",
        "image" : "https://www.undotsushin.com/prg_img/img/img2016041710335632957400.jpg",
        "link"  : "http://dev.undotsushin.com/?crazy-banner-mobile"
      }
    },
    "ad" : {
      "ios"     : "33504",
      "android" : "34424",
      "sp"      : "35244",
      "pc"      : {
        "sidebar-top"    : "",
        "sidebar-bottom" : ""
      }
    }
  }
}

__EOL__;


$json_other = <<<__EOL__

{
  "status": {
      "code": 200,
      "user_message": "",
      "developer_message": ""
  },
  "response": {
    "id"          : 0,
    "label"       : "",
    "slug"        : "",
    "url"         : "",
    "title_img"   : "",

    "title"       : "",
    "description" : "",
    "theme"        : {
      "base"             : "",
      "background-color" : "#eeeeee",
      "images"      : {
        "pc" : "",
        "sp" : ""
      }
    },
    "banner"      : {
      "pc" : {
        "text"  : "",
        "image" : "",
        "link"  : ""
      },
      "sp" : {
        "text"  : "",
        "image" : "",
        "link"  : ""
      }
    },
    "ad" : {
      "ios"     : "33504",
      "android" : "34424",
      "sp"      : "35244",
      "pc"      : {
        "sidebar-top"    : "",
        "sidebar-bottom" : ""
      }
    }
  }
}

__EOL__;


if ( isset($_REQUEST['category']) && $_REQUEST['category'] ) :

  $category = $_REQUEST['category'];

else :

  exit;

endif;



if ( $category == 'crazy' ) :

  $array = json_decode($json_crazy);

else :

  $array                 = json_decode($json_other);
  $array->response->slug = $category;
  $array->response->url  = "http://dev.undotsushin.com/category/{$category}/";

endif;


echo json_encode($array,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);



?>