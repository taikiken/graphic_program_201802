/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/28 - 16:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

export class WidgetType {
  /**
   * RECOMMEND, オススメ記事
   * @return {string} widget-postList_recommend を返します
   */
  static get RECOMMEND():string {
    return 'widget-postList_recommend';
  }
  /**
   * POPULAR, 人気記事
   * @return {string} widget-postList_popular を返します
   */
  static get POPULAR():string {
    return 'widget-postList_popular';
  }
  /**
   * RELATED, 関連記事
   * @return {string} widget-postList_related を返します
   */
  static get RELATED():string {
    return 'widget-postList_related';
  }
}
