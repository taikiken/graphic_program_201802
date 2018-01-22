/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/16 - 18:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import ViewRanking from '../../../view/sidebar/ViewRanking';
import View from '../../../view/View';

// app
import {Length} from '../../../app/const/Length';
import {Message} from '../../../app/const/Message';
// import {Empty} from '../../../app/const/Empty';

// data
import {Safety} from '../../../data/Safety';

// dae
// import {ArticleDae} from '../../../dae/ArticleDae';

// node
// import {RankingNode} from '../../../node/sidebar/RankingNode';
import {SPRankingNode} from '../../node/single/SPRankingNode';

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
 * SP 記事詳細, 人気記事 一覧
 * @since 2016-06-16
 */
export default class SPViewSingleRanking extends ViewRanking {
  /**
   * SP 記事詳細, 人気記事 一覧, PC と違い 10 件ずつ表示
   * @param {Element} element 一覧表示用 element
   * @param {Object} [option={}] callback 関数をセット
   * @param {string} [slug=all] category slug
   * @param {number} length SP 記事詳細・人気記事, 記事表示件数
   */
  constructor(element, option = {}, slug = 'all', length = Length.spRanking) {
    const serializeLength = Safety.integer(length, Length.spRanking);
    super(element, option, slug, serializeLength);
  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render(articles) {
    this.executeSafely(View.BEFORE_RENDER, articles, this.slug);
    ReactDOM.render(
      <SPRankingNode
        list={articles}
        home={this.home}
        detail={this.detail}
        slug={this.slug}
        title={Message.RANKING_TITLE}
        scope={this}
      />,
      this.element
    );
  }
}