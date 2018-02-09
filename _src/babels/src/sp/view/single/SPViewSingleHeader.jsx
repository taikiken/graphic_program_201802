/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 17:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
// import View from '../../../view/View';
import ViewSingleHeader from '../../../view/single/ViewSingleHeader';

// app
// import {Url} from '../../../app/const/Url';
import {User} from '../../../app/User';

// dae
// import {SingleDae} from '../../../dae/SingleDae';

// node
// import {BookmarkNode} from '../../../node/bookmark/BookmarkNode';
// import {CategoryLabelNode} from '../../../node/category/CategoryLabelNode';
// import {CategoryLabelNodeLink} from '../../../node/category/CategoryLabelNodeLink';

// component
// @since 2016-09-24
import SPComponentSingleHeader from '../../component/singles/SPComponentSingleHeader';

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
 * SP 記事詳細(detail) 上部 - {@link SPComponentSingleHeader}
 * - bookmark
 * - title
 * - 投稿者
 * - カテゴリー
 * - 日付
 */
export default class SPViewSingleHeader extends ViewSingleHeader {
  /**
   * SP 記事詳細(detail) 上部
   * @param {Element} element single header root element
   * @param {SingleDae} single 変換済み JSON data
   */
  constructor(element, single) {
    super(element, single);
    /**
     * bind executeSafely
     * @type {function}
     */
    this.boundSafely = this.executeSafely.bind(this);
  }
  /**
   * render します
   * @param {SingleDae} singleDae JSON 変換済みデータ
   */
  render(singleDae) {
    // let _this = this;
    //
    // /**
    //  * 記事詳細
    //  * 投稿者、日付、カテゴリー、ブックマークボタン
    //  * @type {ReactClass}
    //  * */
    // let SPHeaderDom = React.createClass( {
    //   propTypes: {
    //     single: React.PropTypes.object.isRequired,
    //     sign: React.PropTypes.bool.isRequired
    //   },
    //   getInitialState: function() {
    //     // this.action = null;
    //
    //     return {
    //       sign: this.props.sign,
    //       single: this.props.single,
    //       status: this.props.single.isBookmarked,
    //       bookmarked: this.props.single.isBookmarked ? 'bookmarked enable' : '',
    //       loading: ''
    //     };
    //   },
    //   render: function() {
    //     let single = this.state.single;
    //
    //     // // category label を返す
    //     // // label があれば
    //     // let category = ( label, slug ) => {
    //     //   return !label ? '' : <span className="category-label"><a href={Url.category(slug)}>{label}</a></span>;
    //     // };
    //
    //     return (
    //       <div className="sp-single-header">
    //         <div className={'post-heading post-heading-' + single.id}>
    //           <h1>{single.title}</h1>
    //         </div>
    //         <div className="post-data">
    //           <div className="f-left">
    //             <p className="post-author">{single.user.userName}</p>
    //             <p className="post-category">
    //               <CategoryLabelNodeLink
    //                 categories={single.categories.all}
    //                 id={`single-label-${single.id}`}
    //                 index={1}
    //               />
    //             </p>
    //             <p className="post-date">{single.displayDate}</p>
    //           </div>
    //           {/* div.f-right (bookmark: on / off) */}
    //           <BookmarkNode
    //             sign={this.state.sign}
    //             isBookmarked={this.state.status}
    //             articleId={String(single.id)}
    //           />
    //         </div>
    //       </div>
    //     );
    //   },
    //   // --------------------------------------------
    //   // delegate
    //   componentWillMount: function() {
    //
    //     // will mount
    //     _this.executeSafely( View.WILL_MOUNT );
    //
    //   },
    //   componentDidMount: function() {
    //
    //     // after mount
    //     _this.executeSafely( View.DID_MOUNT );
    //
    //   },
    //   // --------------------------------------------
    //   // update
    //   updateSingle: function( single, sign ) {
    //     this.setState( { single: single, sign: sign } );
    //   }
    // } );

    // if (this.rendered === null) {
    //   /**
    //    * SPHeaderDom instance
    //    * @override
    //    * @type {*}
    //    */
    //   // this.rendered = ReactDOM.render(
    //   //   React.createElement( SPHeaderDom, { single: singleDae, sign: User.sign } ),
    //   //   this.element
    //   // );
    //   // @since 2016-09-24 changed
    //   this.rendered = ReactDOM.render(
    //     <SPComponentSingleHeader
    //       single={singleDae}
    //       sign={User.sign}
    //       callback={this.boundSafely}
    //     />,
    //     this.element
    //   );
    // } else {
    //   this.rendered.updateSingle(singleDae, User.sign);
    // }
    ReactDOM.render(
      <SPComponentSingleHeader
        single={singleDae}
        sign={User.sign}
        callback={this.boundSafely}
      />,
      this.element,
    );
  }
}
