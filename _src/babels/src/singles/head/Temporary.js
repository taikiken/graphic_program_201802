/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/27 - 18:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * すぐに書き換えるのではなく, 一時的に情報を保留します
 */
export class Temporary {
  /**
   * 一時情報
   * @param {string} [content='']
   */
  constructor(content = '') {
    /**
     * 一時情報を取得します
     * @return {string} 一時情報を返します
     */
    this.get = () => content;
    /**
     * 一時情報を更新します
     * @param {string} contentData 一時情報
     */
    this.set = (contentData) => {
      content = contentData;
    };
  }
}
