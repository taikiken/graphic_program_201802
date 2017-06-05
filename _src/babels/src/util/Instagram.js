/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/01/10 - 21:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { Fb } from './Fb';

/**
 * process 実行 timer id
 * @type {number}
 */
let id = 0;

/**
 * 動的追加「話題の投稿」Instagram 画像が表示できない問題に対処するために活性化関数をキックします
 * @see http://stackoverflow.com/questions/27408917/instagram-embeds-not-working-when-adding-embeds-dynamically
 * @see https://github.com/undotsushin/undotsushin/issues/1458
 */
export class Instagram {
  /**
   * instagram global object を取得します
   * @return {Instagram.instgrm} instagram global object
   */
  static instgrm() {
    return self.instgrm;
  }
  /**
   * instagram global object を取得し `Embeds.process` 活性化関数をキックします
   * @return {boolean} キックに成功すると true を返します
   */
  static process() {
    const instgrm = Instagram.instgrm();
    if (!instgrm || !instgrm.Embeds || !instgrm.Embeds.process) {
      return false;
    }
    instgrm.Embeds.process();
    return true;
  }
  /**
   * 遅延し process を行います
   * @param {boolean} [sp=false] SP flag
   * @param {number} [time=1000] 遅延時間(ms)
   */
  static delay(sp = false, time = 1000) {
    clearTimeout(id);
    id = setTimeout(Instagram.process, time);
    if (sp) {
      Fb.delay(time + 100);
    }
  }
}


