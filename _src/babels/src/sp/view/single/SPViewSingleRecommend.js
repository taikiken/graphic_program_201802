/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/29 - 19:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {ViewRecommend} from '../../../view/sidebar/ViewRecommend';
import {View} from '../../../view/View';

// app
import {Length} from '../../../app/const/Length';
import {Message} from '../../../app/const/Message';
// import {Empty} from '../../../app/const/Empty';

// data
import {Safety} from '../../../data/Safety';

// dae
// import {ArticleDae} from '../../../dae/ArticleDae';

// node
import {SPRankingNode} from '../../node/single/SPRankingNode';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP 記事詳細, オススメ記事 一覧
 * @from 2016-06-29
 */
export class SPViewSingleRecommend extends ViewRecommend {
  /**
   * SP 記事詳細, オススメ記事 一覧, PC と違い 10 件ずつ表示
   * @param {Element} element 一覧表示用 element
   * @param {Object} [option={}] callback 関数をセット
   * @param {string} [slug=all] category slug
   * @param {Number} length SP 記事詳細・人気記事, 記事表示件数
   */
  constructor( element:Element, option:Object = {}, slug:string = 'all', length:Number = Length.spRanking ) {
    length = Safety.integer( length, Length.ranking );
    super( element, option, slug, length );
  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {

    this.executeSafely( View.BEFORE_RENDER, articles, this.slug );

    ReactDOM.render(
      <SPRankingNode
        list={articles}
        home={this.home}
        detail={this.detail}
        slug={this.slug}
        title={Message.RECOMMEND_TITLE}
        scope={this}
      />,
      this.element
    );
  }
}
