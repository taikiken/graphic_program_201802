<?php
/**
 * Created by IntelliJ IDEA.
 * User: inazuma15
 * Date: 2016/01/21
 * Time: 19:41
 */
// pickup
header("Access-Control-Allow-Origin: *");

echo <<< __JSON__
{
  "status": {
    "code": 200,
    "user_message": "",
    "developer_message": ""
  },
  "response": {
    "count": 6,
    "articles": [
      {
        "id": 29,
        "date": "2016-01-14T18:25:45+09:00",
        "display_date": "3日前",
        "title": "名波監督「まずは勝ち点40」Ｕ18小川航に18番",
        "description": "　３年ぶりにＪ１に復帰する磐田は１４日、磐田市のヤマハスタジアムで新体制記者会見を行った。　新加入のＤＦ大井健太郎（３１）、ＧＫ奥田達朗（２７）ＭＦ荒木大吾（２１）ＤＦ大南拓磨（１８）ＦＷ小川航基（１...",
        "category": {
          "label": "サッカー",
          "slug": "soccer"
        },
        "url": "http://www.undotsushin.com/soccer/e29.html",
        "is_bookmarked": false,
        "media_type": "image",
        "media": {
          "images": {
            "thumbnail": "http://www.undotsushin.com/prg_img/thumbnail3/img2016011421185318097600.jpg",
            "medium": "http://www.undotsushin.com/prg_img/thumbnail2/img2016011421185318097600.jpg",
            "large": "http://www.undotsushin.com/prg_img/thumbnail1/img2016011421185318097600.jpg",
            "caption": "新体制記者会見に出席し、名波監督を中心に手を合わせる（左から）加藤ＧＭ、ＤＦ大井、ＧＫ奥田、ＭＦ荒木、ＤＦ大南、ＦＷ小川航、ＦＷ斉藤、ＤＦ中村太、ＤＦ高木、木村社長（撮影・保坂恭子）"
          },
          "video": {
            "thumbnail": "",
            "url": "",
            "caption": ""
          }
        },
        "user": {
          "id": 2,
          "name": "日刊スポーツ新聞社",
          "profile_picture": "",
          "url": "http://www.undotsushin.com/member/e2.html",
          "type": {
            "id": 3,
            "label": "メディア"
          }
        },
        "comments_count": "1",
        "comments_popular": [
          {
            "id": 1,
            "date": "2016-01-13T22:46:35",
            "display_date": "3日前",
            "body": "テストコメント",
            "is_like": false,
            "is_bad": false,
            "like": 1,
            "bad": 1,
            "url": "http://www.undotsushin.com/soccer/e29-1.html",
            "user": {
              "id": 3,
              "name": "三枝真",
              "profile_picture": "",
              "url": "http://www.undotsushin.com/member/e3.html",
              "type": {
                "id": 6,
                "label": "一般ユーザ"
              }
            }
          }
        ]
      },
      {
        "id": 33,
        "date": "2016-01-10T18:37:41+09:00",
        "display_date": "7日前",
        "title": "入江陵介「泳ぎがはまりつつある」高地合宿手応え",
        "description": "　競泳背泳ぎの入江陵介（２５＝イトマン東進）が早期の「昨年超え」で五輪に弾みをつける。　１０日、米アルバカーキの高地合宿から成田空港に帰国。標高１８００メートルの高地では１日最大１万４０００メートルの...",
        "category": {
          "label": "水泳",
          "slug": "swimming"
        },
        "url": "http://www.undotsushin.com/swimming/e33.html",
        "is_bookmarked": false,
        "media_type": "image",
        "media": {
          "images": {
            "thumbnail": "http://www.undotsushin.com/prg_img/thumbnail3/img2016011421263268885800.jpg",
            "medium": "http://www.undotsushin.com/prg_img/thumbnail2/img2016011421263268885800.jpg",
            "large": "http://www.undotsushin.com/prg_img/thumbnail1/img2016011421263268885800.jpg",
            "caption": "米高地合宿から帰国した競泳の入江陵介"
          },
          "video": {
            "thumbnail": "",
            "url": "",
            "caption": ""
          }
        },
        "user": {
          "id": 2,
          "name": "日刊スポーツ新聞社",
          "profile_picture": "",
          "url": "http://www.undotsushin.com/member/e2.html",
          "type": {
            "id": 3,
            "label": "メディア"
          }
        },
        "comments_count": "0",
        "comments_popular": []
      },
      {
        "id": 18,
        "date": "2015-12-09T05:00:00+09:00",
        "display_date": "39日前",
        "title": "車いす作り、情熱継ぐ　千葉の企業、選手に寄り添い信頼",
        "description": "　パラリンピック車いすテニスで３大会連続金メダルの国枝慎吾選手をはじめ、国内外の競技者が信頼を寄せる車いすメーカーが千葉市若葉区にある。自ら障害を負い、使いやすい車いすの開発に情熱を傾けた父の遺志を社...",
        "category": {
          "label": "モータースポーツ",
          "slug": "motorsports"
        },
        "url": "http://www.undotsushin.com/motorsports/e18.html",
        "is_bookmarked": false,
        "media_type": "image",
        "media": {
          "images": {
            "thumbnail": "http://www.undotsushin.com/prg_img/thumbnail3/",
            "medium": "http://www.undotsushin.com/prg_img/thumbnail2/",
            "large": "http://www.undotsushin.com/prg_img/thumbnail1/",
            "caption": ""
          },
          "video": {
            "thumbnail": "",
            "url": "",
            "caption": ""
          }
        },
        "user": {
          "id": 4,
          "name": "朝日新聞社",
          "profile_picture": "",
          "url": "http://www.undotsushin.com/member/e4.html",
          "type": {
            "id": 3,
            "label": "メディア"
          }
        },
        "comments_count": "0",
        "comments_popular": []
      },
      {
        "id": 13,
        "date": "2016-01-04T10:04:00+09:00",
        "display_date": "13日前",
        "title": "完全Ｖ青学大　トイレ、風呂掃除から練習まで厳しく",
        "description": "＜第９２回箱根駅伝＞◇３日◇復路◇箱根－東京（５区間１０９・６キロ）　俺たちが学生最強集団だ！！　青学大が往路に続き、復路も１位を走り続ける完全優勝で総合２連覇を飾った。２位東洋大に７分１１秒差をつけ...",
        "category": {
          "label": "陸上",
          "slug": "athletics"
        },
        "url": "http://www.undotsushin.com/athletics/e13.html",
        "is_bookmarked": false,
        "media_type": "image",
        "media": {
          "images": {
            "thumbnail": "http://www.undotsushin.com/prg_img/thumbnail3/img2016010503021680774200.jpg",
            "medium": "http://www.undotsushin.com/prg_img/thumbnail2/img2016010503021680774200.jpg",
            "large": "http://www.undotsushin.com/prg_img/thumbnail1/img2016010503021680774200.jpg",
            "caption": "優勝を果たしガッツポーズでゴールテープを切る青学大１０区渡辺利（撮影・江口和貴）"
          },
          "video": {
            "thumbnail": "",
            "url": "",
            "caption": ""
          }
        },
        "user": {
          "id": 2,
          "name": "日刊スポーツ新聞社",
          "profile_picture": "",
          "url": "http://www.undotsushin.com/member/e2.html",
          "type": {
            "id": 3,
            "label": "メディア"
          }
        },
        "comments_count": "0",
        "comments_popular": []
      },
      {
        "id": 12,
        "date": "2016-01-01T16:49:00+09:00",
        "display_date": "16日前",
        "title": "原江里菜、女王イ・ボミ見習い完全復活の16年に",
        "description": "　女子ゴルフの原江里菜（２８＝ＮＥＣ）が、長いトンネルを抜けた。１５年夏、大東建託レディースで７年ぶり２回目の優勝。それまで勝てそうで勝てない日々が続き、重圧もあっただけに「やっと解放された」とその心...",
        "category": {
          "label": "ゴルフ",
          "slug": "golf"
        },
        "url": "http://www.undotsushin.com/golf/e12.html",
        "is_bookmarked": false,
        "media_type": "image",
        "media": {
          "images": {
            "thumbnail": "http://www.undotsushin.com/prg_img/thumbnail3/img2016010502581237456600.jpg",
            "medium": "http://www.undotsushin.com/prg_img/thumbnail2/img2016010502581237456600.jpg",
            "large": "http://www.undotsushin.com/prg_img/thumbnail1/img2016010502581237456600.jpg",
            "caption": "原江里菜"
          },
          "video": {
            "thumbnail": "",
            "url": "",
            "caption": ""
          }
        },
        "user": {
          "id": 2,
          "name": "日刊スポーツ新聞社",
          "profile_picture": "",
          "url": "http://www.undotsushin.com/member/e2.html",
          "type": {
            "id": 3,
            "label": "メディア"
          }
        },
        "comments_count": "0",
        "comments_popular": []
      },
      {
        "id": 1,
        "date": "2016-01-03T09:50:00+09:00",
        "display_date": "14日前",
        "title": "ロッテ小林敦　ケガに泣いた５年間生かすスカウトに",
        "description": "＜さよならプロ野球＞　久しぶりに会った彼は、スーツ姿だった。「このスーツ、社会人の時のなんですよ」。かつての銀行マンは、そう言ってスケジュール帳を開いた。「今 週はあいさつ回りです。千葉で東海大系列中...",
        "category": {
          "label": "野球",
          "slug": "baseball"
        },
        "url": "http://www.undotsushin.com/baseball/e1.html",
        "is_bookmarked": false,
        "media_type": "image",
        "media": {
          "images": {
            "thumbnail": "http://www.undotsushin.com/prg_img/thumbnail3/img2016010313285797715900.jpg",
            "medium": "http://www.undotsushin.com/prg_img/thumbnail2/img2016010313285797715900.jpg",
            "large": "http://www.undotsushin.com/prg_img/thumbnail1/img2016010313285797715900.jpg",
            "caption": "ロッテのスカウトに就任した小林敦氏"
          },
          "video": {
            "thumbnail": "",
            "url": "",
            "caption": ""
          }
        },
        "user": {
          "id": 2,
          "name": "日刊スポーツ新聞社",
          "profile_picture": "",
          "url": "http://www.undotsushin.com/member/e2.html",
          "type": {
            "id": 3,
            "label": "メディア"
          }
        },
        "comments_count": "0",
        "comments_popular": []
      }
    ]
  }
}
__JSON__;
