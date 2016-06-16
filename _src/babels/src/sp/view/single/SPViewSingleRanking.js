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

import {ViewRanking} from '../../../view/sidebar/ViewRanking';
import {View} from '../../../view/View';

// app
import {Length} from '../../../app/const/Length';
import {Message} from '../../../app/const/Message';
import {Empty} from '../../../app/const/Empty';

// data
import {Safety} from '../../../data/Safety';

// dae
import {ArticleDae} from '../../../dae/ArticleDae';

// node
import {RankingNode} from '../../../node/sidebar/RankingNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP 記事詳細, 人気記事 一覧
 * @from 2016-06-16
 */
export class SPViewSingleRanking extends ViewRanking {
  /**
   * SP 記事詳細, 人気記事 一覧, PC と違い 10 件ずつ表示
   * @param {Element} element 一覧表示用 element
   * @param {Object} [option={}] callback 関数をセット
   * @param {string} [slug=all] category slug
   * @param {Number} length SP 記事詳細・人気記事, 記事表示件数
   */
  constructor( element:Element, option:Object = {}, slug:string = 'all', length:Number = Length.spRanking ) {
    length = Safety.integer( length, Length.ranking );
    console.log( 'SPViewSingleRanking', length );
    super( element, option, slug, length );
  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {

    this.executeSafely( View.BEFORE_RENDER, articles, this.slug );

    let element = this.element;
    let categorySlug = this.slug;
    let _this = this;

    // React Class
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired,
        home: React.PropTypes.bool.isRequired,
        detail: React.PropTypes.bool.isRequired,
        slug: React.PropTypes.string.isRequired
      },
      render: function() {

        let list = this.props.list;
        let home = this.props.home;
        let detail = this.props.detail;
        let thisSlug = this.props.slug;

        return (

          <div className="widget-ranking">
            {/* title */}
            <div className="mod-headingA01">
              <h2>{Message.RANKING_TITLE}</h2>
            </div>
            <ul className="board-small">
              {
                list.map( function( article, i ) {

                  let dae = new ArticleDae( article );
                  let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );
                  let empty = thumbnail === Empty.IMG_SMALL;

                  // RankingDom instance を使い render
                  return (
                    <RankingNode
                      key={'ranking-' + dae.id}
                      index={i}
                      id={String( dae.id )}
                      // slug={dae.category.slug}
                      // category={dae.category.label}
                      // category2={dae.category2.label}
                      categories={dae.categories}
                      url={dae.url}
                      date={dae.displayDate}
                      title={dae.title}
                      thumbnail={thumbnail}
                      empty={empty}
                      total={dae.commentsCount}
                      home={home}
                      detail={detail}
                      thisSlug={thisSlug}
                      categorySlug={categorySlug}
                    />
                  );

                } )
              }
            </ul>
          </div>

        );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );

      }
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, {
        list: articles,
        home: this.home,
        detail: this.detail,
        slug: this.slug } ),
      element
    );
  }
}
