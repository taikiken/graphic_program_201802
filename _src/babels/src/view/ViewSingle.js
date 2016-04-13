/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
import {View} from './View';
// import {ViewError} from './error/ViewError';
import {ViewRelated} from './single/ViewRelated';
import {ViewSingleHeader} from './single/ViewSingleHeader';
import {ViewSingleFooter} from './single/ViewSingleFooter';

// action
import {Single} from '../action/single/Single';
import {SingleAuth} from '../action/single/SingleAuth';
// data
import {Result} from '../data/Result';
import {Safety} from '../data/Safety';

// dae
import {SingleDae} from '../dae/SingleDae';

// app
import {User} from '../app/User';
import {Message} from '../app/const/Message';

/**
 * 記事詳細
 *
 * @example
 * let elements = {}
 *  related: document.getElementById('related'),
 *  footer: document.getElementById('footer')
 * }
 * let single = new ViewSingle( articleId, element, elements );
 * single.start();
 *
 */
export class ViewSingle extends View {
  /**
   * 記事ID で 記事詳細JSONを取得し表示します
   *
   * @param {Number} id article id, 記事Id
   * @param {Element} element root element
   * @param {Object} elements root element 関連記事, 各コメント
   * @param {Object} [option={}] optional event handler
   */
  constructor( id:number, element:Element, elements:Object, option:Object = {} ) {

    option = Safety.object( option );

    super( element, option );
    let ActionClass = User.sign ? SingleAuth : Single;
    this._action = new ActionClass( id, this.done.bind( this ), this.fail.bind( this ) );

    /*
    if ( !Safety.isElement( elements.related ) ) {
      console.warn( `un accessible elements.related . ${elements.related }` );
    }
    if ( !Safety.isElement( elements.footer ) ) {
      console.warn( `un accessible elements.footer . ${elements.footer }` );
    }
    */

    this._elements = elements;
    // mount event handler
    this._boundMount = this.headerMount.bind( this );
    // related instance
    this._viewRelated = null;
    // header instance
    this._header = null;
    // footer instance
    this._footer = null;

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
      let error = new Error( Message.undef('[SINGLE:UNDEFINED]') );
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
  // /**
  //  * ViewError でエラーコンテナを作成します
  //  * @param {string} message エラーメッセージ
  //  */
  // showError( message:string = '' ):void {
  //
  //   message = Safety.string( message, '' );
  //
  //   // ToDo: Error 時の表示が決まったら変更する
  //   /*
  //   let error = new ViewError( this.element, this.option, message );
  //   error.render();
  //   */
  //
  // }
  /**
   * dom を render します
   * @param {Object} response JSON response
   */
  render( response:Object ):void {

    let single = new SingleDae( response );

    // beforeRender call
    this.executeSafely( View.BEFORE_RENDER, single );

    let header, footer;

    // header
    if ( this._header === null ) {

      header = new ViewSingleHeader( this.element, single );
      header.on( View.DID_MOUNT, this._boundMount );
      this._header = header;
      header.start();

    } else {

      this._header.render( single );

    }

    // footer
    if ( Safety.isElement( this._elements.footer ) ) {
      // footer element が存在する時のみ
      if ( this._footer === null ) {

        footer = new ViewSingleFooter( this._elements.footer, single );
        this._footer = footer;
        footer.start();

      } else {

        this._footer.render( single );

      }
    }

    // 関連記事 もしもあるなら
    if ( single.hasRelated ) {

      this.related( single.related );

    }

  }// render
  /**
   * header View.DID_MOUNT event handler
   */
  headerMount():void {

    this._header.off( View.DID_MOUNT, this._boundMount );
    this.executeSafely( View.DID_MOUNT );

  }
  /**
   * 関連記事（記事詳細の）
   * @param {Array} related 配列内データ型はRelatedDom
   */
  related( related:Array = [] ):void {

    if ( !Safety.isElement( this._elements.related ) ) {
      // element が不正の時は処理しない
      return;
    }

    related = Safety.array( related );

    // 効率化のために
    // ViewRelated instance が null の時は instance を作成し start を実行する
    // instance が存在するときは render する
    if ( this._viewRelated === null ) {

      let viewRelated = new ViewRelated( this._elements.related, related );
      viewRelated.start();
      this._viewRelated = viewRelated;

    } else {

      this._viewRelated.render( related );

    }

  }// related

}
