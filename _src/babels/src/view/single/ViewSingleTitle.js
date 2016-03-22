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
import {View} from '../View';
import {ViewError} from '../error/ViewError';

// action
import {Single} from '../../action/single/Single';
// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {SingleDae} from '../../dae/SingleDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * コメント詳細上部に表示する 記事タイトル
 */
export class ViewSingleTitle extends View {
  /**
   * コメント詳細上部に表示する 記事タイトル
   * @param {Number} id article id, 記事Id
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( id:number, element:Element, option:Object = {} ) {
    option = Safety.object( option );

    super( element, option );
    this._action = new Single( id, this.done.bind( this ), this.fail.bind( this ) );
  }
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.start();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let response = result.response;

    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[COMMENT_BY_SINGLE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else {

      this.render( response );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    message = Safety.string( message, '' );

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Object} response JSON response
   */
  render( response:Object ):void {
    let single = new SingleDae( response );

    // beforeRender call
    this.executeSafely( View.BEFORE_RENDER, single );

    /**
     * 記事詳細タイトル
     * @private
     * @type {ReactClass}
     */
    let TitleDom = React.createClass( {
      propTypes: {
        title: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired
      },
      render: function() {
        return (
          <div className={'comment-detail-heading post-heading post-heading-' + this.props.id}>
            <h1><a href={this.props.url}>{this.props.title}</a></h1>
          </div>
        );
      }
    } );

    ReactDOM.render(
      <TitleDom
        title={single.title}
        id={String(single.id)}
        url={single.url}
      />,
      this.element
    );
  }
}
