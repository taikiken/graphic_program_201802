/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 21:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
import View from '../View';
// import {SingleDae} from '../../dae/SingleDae';

// // app
// import {Url} from '../../app/const/Url';

// // node
// import {BannerNode} from '../../node/single/BannerNode';

// component
// @since 2016-09-24
import { ComponentSingleFooter } from '../../component/singles/ComponentSingleFooter';

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
 * <p>記事詳細</p>
 * detail 下部(tag)
 */
export default class ViewSingleFooter extends View {
  /**
   * detail 下部(tag)
   * @param {Element} element single footer root element
   * @param {SingleDae} single 変換済み JSON data
   */
  constructor(element, single) {
    super(element);
    /**
     * 変換済み JSON data
     * @type {SingleDae}
     * @private
     */
    this._single = single;
    /**
     * ComponentSingleFooter instance
     * @type {?ComponentSingleFooter}
     * @private
     */
    this._rendered = null;
    /**
     * bind executeSafely
     * @type {function}
     */
    this.boundSafely = this.executeSafely.bind(this);
  }
  /**
   * render 処理を開始します
   */
  start() {
    this.render(this._single);
  }
  /**
   * render します
   * @param {SingleDae} singleDae JSON 変換済みデータ
   */
  render(singleDae) {
    // let element = this.element;
    // let FooterDom = React.createClass( {
    //   propTypes: {
    //     single: React.PropTypes.object.isRequired
    //   },
    //   getInitialState: function() {
    //     return {
    //       single: this.props.single
    //     };
    //   },
    //   render: function() {
    //
    //     let single = this.state.single;
    //     let keywords = single.keywords;
    //     // banner key の位置が変更になったのでどちらにも対応できるようにしておく
    //     // 優先は変更後の response.banner
    //     let userBanner = single.user.banner.pc;
    //     let banner = single.banner.pc;
    //
    //     if ( !banner.image && !!userBanner.image ) {
    //       banner = userBanner;
    //     }
    //
    //     if ( keywords.hasKeyword ) {
    //
    //       return (
    //         <div className="post-footer">
    //           <BannerNode banner={banner} />
    //           {/* TAGS */}
    //           <div className="post-tags">
    //             <h2 className="post-tags-heading">TAGS</h2>
    //             <ul className="post-tags-list">
    //               {
    //                 keywords.keywords.map( function( keyword, i ) {
    //
    //                   return (
    //                     <li key={'keyword-' + i} className="post-tags-item">
    //                       {/* link は 検索パターンにしています */}
    //                       <a href={Url.search( keyword )}>{keyword}</a>
    //                     </li>
    //                   );
    //
    //                 } )
    //               }
    //             </ul>
    //           </div>
    //         </div>
    //       );
    //
    //     } else {
    //
    //       return (
    //         <div className="post-footer">
    //           <BannerNode banner={banner} />
    //         </div>
    //       );
    //
    //     }
    //
    //   },
    //   updateSingle: function( single ) {
    //     this.setState( { single: single } );
    //   }
    // } );
    // if (this._rendered === null) {
    //   // this._rendered = ReactDOM.render(
    //   //   React.createElement( FooterDom, { single: singleDae } ),
    //   //   element
    //   // );
    //   // @since 2016-09-24 changed
    //   this._rendered = ReactDOM.render(
    //     <ComponentSingleFooter
    //       single={singleDae}
    //       callback={this.boundSafely}
    //     />,
    //     this.element
    //   );
    // } else {
    //   this._rendered.updateSingle( singleDae );
    // }
    ReactDOM.render(
      <ComponentSingleFooter
        single={singleDae}
        callback={this.boundSafely}
      />,
      this.element,
    );
  }
}
