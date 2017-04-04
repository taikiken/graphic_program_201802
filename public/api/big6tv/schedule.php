<?php
/*

# big6tv - 試合日程・結果

// サンプルなので去年のを使う
http://www.big6.gr.jp/game/league/2016s/2016s_schedule.html

ちなみに今年の日程
https://undo-tsushin.slack.com/files/makihira/F43S7S4FJ/_____________________2017_____________________.pdf


*/

include "local.php";


$gameinfo = array(

  array(
    "week" => "第1週",

    "gamedate" => array(

      // 4/9 (土)
      // ------------------------------
      array(
        "round"        => 1,
        "date"         => "2016-04-09",
        "weekday"      => "土",
        "date_display" => '4/9 (土)',
        "starttime"    => "11:00",
        "game"         => array(
          // 第1試合
          array(
            "gameid" => "0001",
            "team"   => array(
              array(
                "name" => "東大",
                "nameI" => "T",
                "score" => 0,
              ),
              array(
                "name" => "早大",
                "nameI" => "W",
                "score" => 1,
              ),
            ),
          ),
          // 第2試合
          array(
            "gameid" => "0002",
            "team"   => array(
              array(
                "name" => "法大",
                "nameI" => "H",
                "score" => 1,
              ),
              array(
                "name" => "慶大",
                "nameI" => "K",
                "score" => 11,
              ),
            ),
          ),
        ),
      ),

      // 4/10 (日)
      // ------------------------------
      array(
        "round"        => 1,
        "date"         => "2016-04-10",
        "weekday"      => "日",
        "date_display" => '4/10 (日)',
        "starttime"    => "11:00",
        "game"         => array(
          // 第1試合
          array(
            "gameid" => "0001",
            "team"   => array(
              array(
                "name" => "慶大",
                "nameI" => "K",
                "score" => 8,
              ),
              array(
                "name" => "法大",
                "nameI" => "H",
                "score" => 2,
              ),
            ),
          ),
          // 第2試合
          array(
            "gameid" => "0002",
            "team"   => array(
              array(
                "name" => "早大",
                "nameI" => "W",
                "score" => 8,
              ),
              array(
                "name" => "東大",
                "nameI" => "T",
                "score" => 0,
              ),
            ),
          ),
        ),
      ),

    ),
  ),



  // 第2週
  // ==============================
  array(
    "week" => "第2週",

    "gamedate" => array(

      // 4/16 (土)
      array(
        "round"        => 1,
        "date"         => "2016-04-16",
        "weekday"      => "土",
        "date_display" => '4/16 (土)',
        "starttime"    => "11:00",
        "game"         => array(
          // 第1試合
          array(
            "gameid" => "0001",
            "team"   => array(
              array(
                "name" => "東大",
                "nameI" => "T",
                "score" => 0,
              ),
              array(
                "name" => "明大",
                "nameI" => "M",
                "score" => 1,
              ),
            ),
          ),
          // 第2試合
          array(
            "gameid" => "0002",
            "team"   => array(
              array(
                "name" => "法大",
                "nameI" => "H",
                "score" => 4,
              ),
              array(
                "name" => "立大",
                "nameI" => "R",
                "score" => 5,
              ),
            ),
          ),
        ),
      ),

      // 4/17 (日)
      // ------------------------------
      array(
        "round"        => 1,
        "date"         => "2016-04-17",
        "weekday"      => "日",
        "date_display" => '4/17 (日)',
        "starttime"    => "11:00",
        "game"         => array(
          // 第1試合 - ノーゲーム [TODO]
          array(
            "gameid" => "0001",
            "team"   => array(
              array(
                "name" => "立大",
                "nameI" => "R",
                "score" => 0,
              ),
              array(
                "name" => "法大",
                "nameI" => "H",
                "score" => 0,
              ),
            ),
          ),
          // 第2試合 - 中止 [TODO]
          array(
            "gameid" => "0002",
            "team"   => array(
              array(
                "name" => "明大",
                "nameI" => "M",
                "score" => 0,
              ),
              array(
                "name" => "東大",
                "nameI" => "T",
                "score" => 0,
              ),
            ),
          ),
        ),
      ),

      // 4/18 (月)
      // ------------------------------
      array(
        "round"        => 1,
        "date"         => "2016-04-18",
        "weekday"      => "月",
        "date_display" => '4/18 (月)',
        "starttime"    => "11:00",
        "game"         => array(
          // 第1試合
          array(
            "gameid" => "0001",
            "team"   => array(
              array(
                "name" => "立大",
                "nameI" => "R",
                "score" => 1,
              ),
              array(
                "name" => "法大",
                "nameI" => "H",
                "score" => 5,
              ),
            ),
          ),
          // 第2試合
          array(
            "gameid" => "0002",
            "team"   => array(
              array(
                "name" => "明大",
                "nameI" => "M",
                "score" => 2,
              ),
              array(
                "name" => "東大",
                "nameI" => "T",
                "score" => 3,
              ),
            ),
          ),
        ),
      ),

      // 4/19 (火)
      // ------------------------------
      array(
        "round"        => 1,
        "date"         => "2016-04-19",
        "weekday"      => "火",
        "date_display" => '4/19 (火)',
        "starttime"    => "11:00",
        "game"         => array(
          // 第1試合
          array(
            "gameid" => "0001",
            "team"   => array(
              array(
                "name" => "東大",
                "nameI" => "T",
                "score" => 3,
              ),
              array(
                "name" => "明大",
                "nameI" => "M",
                "score" => 12,
              ),
            ),
          ),
          // 第2試合
          array(
            "gameid" => "0002",
            "team"   => array(
              array(
                "name" => "法大",
                "nameI" => "H",
                "score" => 8,
              ),
              array(
                "name" => "立大",
                "nameI" => "R",
                "score" => 6,
              ),
            ),
          ),
        ),
      ),

    ),

  ),

);


$result   = array(
  'response' => array(
    'lastupdate' => date('Y-m-d H:i:s'),
    'gameinfo' => $gameinfo,
  )
);


// print
// ------------------------------
print_json($result,$_SERVER['HTTP_REFERER']);


?>