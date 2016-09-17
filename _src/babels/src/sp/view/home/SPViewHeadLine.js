/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 22:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// parent
import {ViewHeadline} from '../../../view/home/ViewHeadline';

// view
import {View} from '../../../view/View';
import { SPViewHeadlines } from '../headline/SPViewHeadlines';

// app
import {Empty} from '../../../app/const/Empty';
import {MediaType} from '../../../app/const/MediaType';

// dae
import {ArticleDae} from '../../../dae/ArticleDae';

// data
import {Safety} from '../../../data/Safety';

// node
import {CategoryLabelNode} from '../../../node/category/CategoryLabelNode';

// Ga
import {Ga} from '../../../ga/Ga';
import {GaData} from '../../../ga/GaData';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP home headline
 */
export class SPViewHeadLine extends ViewHeadline {
  /**
   * SP home headline
   * @param {Element} element コンテンツ基点Element
   * @param {Object} [option={}] callback 関数をセット
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }

  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    // let _this = this;
    //
    // /**
    //  * headline first big size
    //  * home headline の最初の1件を大きく表示する
    //  * @private
    //  * @type {ReactClass}
    //  */
    // let HeadlineFirstDom = React.createClass( {
    //   propTypes: {
    //     // ArticleDae instance, 記事情報
    //     dae: React.PropTypes.object.isRequired
    //   },
    //   render: function() {
    //
    //     let dae = this.props.dae;
    //     let thumbnail = Safety.image( dae.media.images.large, Empty.IMG_LARGE );
    //
    //     // let category = ( label ):string => {
    //     //   return !label ? '' : <span className="category-label">{label}</span>;
    //     // };
    //
    //     let playMark = (mediaType) => {
    //       if (mediaType === MediaType.VIDEO) {
    //         return <img src={Empty.VIDEO_PICKUP_PLAY} alt="" className="post-thumb-overlay-movie type-movie"/>;
    //       } else {
    //         // return <img src={Empty.VIDEO_PICKUP_PLAY} alt="" className="post-thumb-overlay-movie type-movie"/>;
    //         return null;
    //       }
    //     };
    //
    //     return (
    //       <div className="hero-sec">
    //         <a href={dae.url} onClick={this.gaSend}>
    //           <figure className="post-thumb-headline"><img src={thumbnail} alt=""/>{playMark(dae.mediaType)}</figure>
    //           <div className="post-overview">
    //             <h2 className="post-heading">{dae.title}</h2>
    //             <p className={'post-category post-category-' + dae.categories.all[0].slug}>
    //               <CategoryLabelNode
    //                 categories={dae.categories.all}
    //                 id={`headline-label-${dae.id}`}
    //                 index={1}
    //               />
    //             </p>
    //             <p className="post-date">{dae.displayDate}</p>
    //             <p className="post-comment-num">{dae.commentsCount}</p>
    //           </div>
    //         </a>
    //       </div>
    //     );
    //   },
    //   // gaSend: function(e) {
    //   //   e.preventDefault();
    //   gaSend: function() {
    //     // ----------------------------------------------
    //     // GA 計測タグ
    //     Ga.add( new GaData('SPViewHeadLine.render.HeadlineFirstDom.gaSend', 'home_pickup', 'click', this.props.dae.url, parseFloat(this.props.dae.id)) );
    //     // ----------------------------------------------
    //   }
    // } );
    //
    // /**
    //  * headline の各 1記事
    //  * li で出力
    //  * @private
    //  * @type {ReactClass}
    //  */
    // let HeadlineDom = React.createClass( {
    //   propTypes: {
    //     index: React.PropTypes.number.isRequired,
    //     id: React.PropTypes.string.isRequired,
    //     slug: React.PropTypes.string.isRequired,
    //     // category: React.PropTypes.string.isRequired,
    //     // category2: React.PropTypes.string,
    //     categories: React.PropTypes.array.isRequired,
    //     url: React.PropTypes.string.isRequired,
    //     date: React.PropTypes.string.isRequired,
    //     title: React.PropTypes.string.isRequired,
    //     thumbnail: React.PropTypes.string.isRequired,
    //     mediaType: React.PropTypes.string.isRequired
    //   },
    //   // getDefaultPropTypes: function() {
    //   //   return {
    //   //     category2: ''
    //   //   };
    //   // },
    //   render: function() {
    //     let p = this.props;
    //
    //     // let category = ( label ):string => {
    //     //   return !label ? '' : <span className="category-label">{label}</span>;
    //     // };
    //
    //     let playMark = (mediaType) => {
    //       if (mediaType === MediaType.VIDEO) {
    //         return <img src={Empty.VIDEO_PLAY_SMALL_1X1} alt="" className="post-thumb-overlay-movie type-movie"/>;
    //       } else {
    //         // return <img src={Empty.VIDEO_PLAY_SMALL_1X1} alt="" className="post-thumb-overlay-movie type-movie"/>;
    //         return null;
    //       }
    //     };
    //
    //     return (
    //       <li className={'board-item board-item-' + p.index}>
    //         <a className="post" href={p.url} onClick={this.gaSend}>
    //           <figure className="post-thumb post-thumb-headline"><img src={p.thumbnail} alt={p.title}/>{playMark(p.mediaType)}</figure>
    //           <div className="post-data">
    //             <h3 className="post-heading">{p.title}</h3>
    //             <p className={'post-category post-category-' + p.slug}>
    //               <CategoryLabelNode
    //                 categories={p.categories}
    //                 id={`archive-label-${p.id}`}
    //                 index={p.index}
    //               />
    //             </p>
    //             <p className="post-date">{p.date}</p>
    //           </div>
    //         </a>
    //       </li>
    //     );
    //   },
    //   // gaSend: function(e) {
    //   //   e.preventDefault();
    //   gaSend: function() {
    //     // ----------------------------------------------
    //     // GA 計測タグ
    //     Ga.add( new GaData('SPViewHeadLine.render.HeadlineDom.gaSend', 'home_headline', 'click', this.props.url, parseFloat(this.props.id)) );
    //     // ----------------------------------------------
    //   }
    // } );
    //
    // // React Class
    // /**
    //  * SP home headline 基点 class
    //  * @private
    //  * @type {ReactClass}
    //  */
    // let ArticleDom = React.createClass( {
    //   propTypes: {
    //     list: React.PropTypes.array.isRequired
    //   },
    //   render: function() {
    //
    //     let list = this.props.list;
    //     let first = new ArticleDae( list.shift() );
    //
    //     return (
    //
    //       <div className="headline-root">
    //         {/* 1件目は大きく表示する */}
    //         <HeadlineFirstDom
    //           dae={first}
    //         />
    //
    //         <div className="headline">
    //           <ul className="board-small">
    //             {
    //               list.map( function( article, i ) {
    //
    //                 let dae = new ArticleDae( article );
    //                 let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );
    //
    //                 // HeadlineDom instance を使い render
    //                 return (
    //                   <HeadlineDom
    //                     key={'headline-' + dae.id}
    //                     index={i}
    //                     id={String( dae.id )}
    //                     slug={dae.categories.all[0].slug}
    //                     categories={dae.categories.all}
    //                     url={dae.url}
    //                     date={dae.displayDate}
    //                     title={dae.title}
    //                     thumbnail={thumbnail}
    //                     mediaType={dae.mediaType}
    //                   />
    //                 );
    //
    //               } )
    //             }
    //           </ul>
    //         </div>
    //
    //       </div>
    //
    //     );
    //
    //   },
    //   componentDidMount: function() {
    //
    //     // after mount
    //     _this.executeSafely( View.DID_MOUNT );
    //
    //   }
    // } );
    //
    // // dom 生成
    // ReactDOM.render(
    //   React.createElement( ArticleDom, { list: articles } ),
    //   this.element
    // );

    const list = [];
    articles.forEach((article) => list.push(new ArticleDae(article)));

    ReactDOM.render(
      <SPViewHeadlines
        list={list}
        callback={this.executeSafely.bind(this)}
      />,
      this.element
    );
  }// render
}
