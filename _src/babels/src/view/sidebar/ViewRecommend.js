/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/29 - 16:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import {View} from '../View';
import {ViewRanking} from './ViewRanking';

// app
import {Empty} from '../../app/const/Empty';
import {Message} from '../../app/const/Message';

// action
import {Widget} from '../../action/sidebar/Widget';

// data
// import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// node
import {RankingNode} from '../../node/sidebar/RankingNode';
import {RecommendTitleNode} from '../../node/sidebar/RecommendTitleNode';

// Ga
// import {Ga} from '../../ga/Ga';
// import {GaData} from '../../ga/GaData';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;
/**
 * sidebar オススメ記事 5件を表示します
 */
export class ViewRecommend extends ViewRanking {
  /**
   * sidebar オススメ記事 5件 を表示します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   * @param {string} [slug=all] category slug です
   * @param {Number|null} [length=null] 読み込む数
   */
  constructor( element:Element, option:Object = {}, slug:string = 'all', length:Number = null ) {
    super( element, option, slug, length );

    /**
     * Action instance を設定します
     * @override
     * @type {Ranking}
     */
    this.action = Widget.recommend( slug, this.done.bind( this ), this.fail.bind( this ), length );
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

          <div className="board-small widget-ranking">
            {/* title */}
            <RecommendTitleNode
              slug={categorySlug}
              label={list[0].categories[0].label}
              title={Message.RECOMMEND_TITLE}
            />
            <ul className="post-list">
              {
                list.map( function( article, i ) {

                  let dae = new ArticleDae( article );
                  let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );
                  let empty = thumbnail === Empty.IMG_SMALL;

                  // RankingNode instance を使い render
                  return (
                    <RankingNode
                      key={'recommend-' + dae.id}
                      index={i}
                      id={String( dae.id )}
                      categories={dae.categories.all}
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
