/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/15 - 16:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// 2016-03-15
// design 変更により タイトル と メイン画像 を分離出力する必要が出たので作成する

import View from '../View';

// dae
// import {SingleDae} from '../../dae/SingleDae';

// node
import {MediaNode} from '../../node/single/MediaNode';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * PC main visual
 */
export default class ViewSingleVisual extends View {
  /**
   * PC main visual
   * @param {Element} element 基点 element
   * @param {SingleDae} single SingleDae instance
   */
  constructor(element, single) {
    super(element);
    /**
     * 記事詳細 API 取得 JSON を SingleDae instance とし保存し利用します
     * @type {SingleDae}
     */
    this.single = single;
    console.log('ViewSingleVisual single', single);
  }
  /**
   * render 処理を開始します
   */
  start() {
    this.render();
  }
  /**
   * render します
   */
  render() {
    const single = this.single;

    ReactDOM.render(
      <MediaNode
        articleId={String(single.id)}
        mediaType={single.mediaType}
        media={single.media}
        isShowImage={single.isShowImage}
        index={0}
        // 2018-01-12 追加する
        single={single}
      />,
      this.element,
    );
  }
}
