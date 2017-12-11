/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 17:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// app
// import {Empty} from '../../app/const/Empty';

// view
import View from '../View';

// data
import {Safety} from '../../data/Safety';

// // dae
// import {RelatedDae} from '../../dae/RelatedDae';


// component
import { ComponentSingleRelated } from '../../component/singles/ComponentSingleRelated';
import { Env } from '../../app/Env';


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
 * 関連記事表示<br>
 * desktop では使用しない
 * <pre>
 * desktop/p.php
 * `_popIn_recommend` に JS で出力
 * </pre>
 * */
export default class ViewRelated extends View {
  /**
   * 関連記事, ViewSingle から呼び出されます
   * @param {Element} element root element
   * @param {Array<RelatedDae>} [related=[]] response.related_articles 配列
   */
  constructor(element, related = []) {
    super( element );
    /**
     * response.related_articles 配列
     * @type {Array}
     * @private
     */
    this._related = Safety.array(related);
    /**
     * 関連記事 dom 生成 instance
     * @type {null|Object}
     * @private
     */
    this._rendered = null;
  }
  /**
   * render 処理を開始します
   * @param {string} [path=''] option argument
   */
  start(path = '') {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ViewRelated].start', path);
    }
    this.render(this._related);
  }
  /**
   * Dom 生成します
   * @param {Array<RelatedDae>} [related=[]] response.related_articles 配列
   */
  render(related) {
    if (!Safety.isElement(this.element)) {
      // nothing do
      return;
    }

    // -------------------------------------------------
    // 配列が空
    // 関連記事がないので処理中止
    if (related.length === 0) {
      return;
    }

    // -------------------------------------------------
    // 関連記事があった
    //
    // let element = this.element;

    // // React Class
    // let ArticleDom = React.createClass( {
    //   propTypes: {
    //     list: React.PropTypes.array.isRequired
    //   },
    //   getInitialState: function() {
    //     return {
    //       list: this.props.list
    //     };
    //   },
    //   render: function() {
    //
    //     let list = this.state.list;
    //
    //     return (
    //
    //       <div className="related-post">
    //         <div className="comment-heading">
    //           <h2>関連ニュース</h2>
    //         </div>
    //
    //         <ul className="board-small column2">
    //           {
    //             list.map( function( dae, i ) {
    //
    //               /*
    //               let thumbnail = dae.media.images.thumbnail;
    //               // thumbnail = !!thumbnail ? thumbnail : Empty.IMG_SMALL;
    //               if ( !thumbnail ) {
    //                 thumbnail = Empty.IMG_SMALL;
    //               } else if ( !Safety.isImg( thumbnail ) ) {
    //                 // 画像ファイル名に拡張子がないのがあったので
    //                 // 拡張子チェックを追加
    //                 if ( !Safety.isGraph( thumbnail ) ) {
    //                   thumbnail = Empty.IMG_SMALL;
    //                 }
    //               }
    //               */
    //               let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );
    //
    //               return (
    //                 <li className="board-item column2" key={'related-' + dae.id}>
    //                   <a href={dae.url} id={'related-' + dae.id} className={'post post-' + i}>
    //                     <figure className="post-thumb">
    //                       <img src={thumbnail} alt={dae.title}/>
    //                     </figure>
    //                     <div className="post-data">
    //                       <p className={'post-category post-category-' + dae.category.slug}>{dae.category.label}</p>
    //                       <h3 className="post-heading">{dae.title}</h3>
    //                       <p className="post-date">{dae.displayDate}</p>
    //                     </div>
    //                   </a>
    //                 </li>
    //               );
    //
    //             } )
    //           }
    //         </ul>
    //       </div>
    //
    //     );
    //
    //   },
    //   updateList: function( list ) {
    //     this.setState( { list: list } );
    //   }
    // } );

    // 関連記事 dom 生成
    if (this._rendered === null) {
      // this._rendered = ReactDOM.render(
      //   React.createElement( ArticleDom, { list: related } ),
      //   element
      // );
      this._rendered = ReactDOM.render(
        <ComponentSingleRelated
          list={related}
        />,
        this.element,
      );
    } else {
      this._rendered.updateList(related);
    }
  }
}
