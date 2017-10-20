/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/08
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * d
 */

// // util
// import { default as Type } from '../../util/Type';

// moku/util
import Type from '../../../moku/util/Type';

// ui
import Belong from './Belong';

/**
 * JSON.response data を管理します
 *
 * ```
 * Response
 *  Belong: highschool
 *    Players: pitcher
 *    Players: catcher
 *    Players: infielder
 *    Players: outfielder
 *    Players" etc
 *  Belong: university
 *    ~
 *  Belong: works
 *    ~
 *  Belong: independent
 *    ~
 * ```
 *
 * <pre>
 * 1  "response":{
 * 2    "player":{
 * 3      "highschool":{
 * 4        "pitcher":[
 * 5          {
 * 6            id:"938170",
 * 7            name:"小川 武志",
 * 8            img:"",
 * 9            team:"誉",
 * 10           pref:"愛知",
 * 11           height:"172cm",
 * 12           weight:"68kg",
 * 13           pitchingAndBatting:"右投げ右打ち",
 * 14           comment:"最速148キロの速球で強気に攻めるスリークオーター右腕。
 * 15          },
 * 18        ],
 * 19        "catcher":[
 * 20          {},
 * 23        ],
 * 24        "infielder":[
 * 25          {},
 * 28        ],
 * 29        "outfielder":[
 * 30          {},
 * 33        ],
 * 34        "etc":[
 * 35          {},
 * 38        ]
 * 39      },
 * 40      "university":{
 * 43      },
 * 44      "works":{
 * 47      },
 * 48      "independent":{
 * 51      }
 * 52    }
 * 53  }
 * </pre>
 * @see https://aws-plus.backlog.jp/view/BGATE-71#comment-1150507110
 * */
export default class Response {
  /**
   * JSON data を key を保証し保存します
   * @param {Object} [responseData={}] JSON.response
   */
  constructor(responseData = {}) {
    let response = responseData;
    if (Type.nil(response) || !Type.exist(response)) {
      response = {};
    }
    // let player = response.player;
    // if (Type.nil(player) || !Type.exist(player)) {
    //   player = {};
    // }
    // 仕様変更に伴う code 変更を避けるためコピーします
    // @since 2017 - JSON 仕様変更される - drop player
    const player = response;
    /**
     * JSON.response
     * @type {{}}
     */
    this.origin = response;
    // this.response = response;
    /**
     * JSON.response.player
     * @type {{}}
     */
    this.player = player;
    const highscool = new Belong('highschool', player.highschool);
    const university = new Belong('university', player.university);
    const works = new Belong('works', player.works);
    const independent = new Belong('independent', player.independent);
    /**
     * JSON.highschool
     * @type {Belong}
     */
    this.highschool = highscool;
    /**
     * JSON.university
     * @type {Belong}
     */
    this.university = university;
    /**
     * JSON.works
     * @type {Belong}
     */
    this.works = works;
    /**
     * JSON.independent
     * @type {Belong}
     */
    this.independent = independent;
    /**
     * 全データを1配列にします
     * @type {Array.<Player>}
     */
    this.all = highscool.all.concat(
      university.all,
      works.all,
      independent.all,
    );
  }
}
