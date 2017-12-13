/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 23:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// コメント詳細上部に表示する 記事タイトル

// view
import View from '../View';
// import ViewError from '../error/ViewError';

// app
import {Message} from '../../app/const/Message';

// action
import {Single} from '../../action/single/Single';

// data
// import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {SingleDae} from '../../dae/SingleDae';

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
 * {@link ViewSingleTitle} - 記事詳細タイトルを出力します
 * @param {string} title 記事タイトル
 * @param {string} id 記事 ID
 * @param {string} url 記事 URL
 * @returns {XML} `div.comment-detail-heading`
 * @constructor
 */
export const SingleTitleComponent = ({ title, id, url }) => (
  <div className={`comment-detail-heading post-heading post-heading-${id}`}>
    <h1>
      <a href={url}>{title}</a>
    </h1>
  </div>
);

/**
 * React.comment-detail-heading
 * @type {{title: string, id: string, url: string}}
 */
SingleTitleComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
};

/**
 * コメント詳細上部に表示する 記事タイトル
 */
export default class ViewSingleTitle extends View {
  /**
   * コメント詳細上部に表示する 記事タイトル
   * @param {Number} id article id, 記事Id
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor(id, element, option = {}) {
    option = Safety.object( option );
    super(element, option);
    /**
     * Action instance を設定します
     * @override
     * @type {Single}
     */
    this.action = new Single(id, this.done.bind(this), this.fail.bind(this));
  }
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.start();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const response = result.response;
    if (typeof response === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[COMMENT_BY_SINGLE:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else {
      this.render(response);
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
  }
  // /**
  //  * ViewError でエラーコンテナを作成します
  //  * @param {string} message エラーメッセージ
  //  */
  // showError(message = '') {
  //   message = Safety.string(message, '');
  //   // Error 時の表示
  //   const error = new ViewError(this.element, this.option, message);
  //   error.render();
  // }
  /**
   * dom を render します
   * @param {Object} response JSON response
   */
  render(response) {
    const single = new SingleDae(response);
    // beforeRender call
    this.executeSafely(View.BEFORE_RENDER, single);

    // /**
    //  * 記事詳細タイトル
    //  * @private
    //  * @type {ReactClass}
    //  */
    // let TitleDom = React.createClass( {
    //   propTypes: {
    //     title: React.PropTypes.string.isRequired,
    //     id: React.PropTypes.string.isRequired,
    //     url: React.PropTypes.string.isRequired
    //   },
    //   render: function() {
    //     return (
    //       <div className={'comment-detail-heading post-heading post-heading-' + this.props.id}>
    //         <h1><a href={this.props.url}>{this.props.title}</a></h1>
    //       </div>
    //     );
    //   }
    // } );
    //
    // ReactDOM.render(
    //   <TitleDom
    //     title={single.title}
    //     id={String(single.id)}
    //     url={single.url}
    //   />,
    //   this.element
    // );
    ReactDOM.render(
      <SingleTitleComponent
        title={single.title}
        id={single.id}
        url={single.url}
      />,
      this.element,
    );
  }
}
