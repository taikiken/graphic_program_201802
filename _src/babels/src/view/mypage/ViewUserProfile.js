/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 14:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';
import {ViewError} from '../error/ViewError';

// action
import {UsersSelf} from '../../action/users/UsersSelf';

// app
import {Empty} from '../../app/const/Empty';
import {Url} from '../../app/const/Url';
import {Message} from '../../app/const/Message';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {UserDae} from '../../dae/UserDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * ユーザー情報 設定画面上
 */
export class ViewUserProfile extends View {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this._action = new UsersSelf( this.done.bind( this ), this.fail.bind( this ) );
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
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
      let error = new Error( '[USER_PROFILE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
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
   * Dom を生成します
   * @param {Object} response JSON response object
   */
  render( response:Object ):void {
    let userDae = new UserDae( response );
    let _this = this;

    let UserProfileDom = React.createClass( {
      propTypes: {
        dae: React.PropTypes.object.isRequired
      },
      render: function() {
        let dae = this.props.dae;
        let categories = dae.interest.category;
        let icon = dae.profilePicture;
        let loggedIn = 'user-logged-in';

        if ( !icon ) {
          icon = Empty.USER_EMPTY;
          loggedIn = '';
        } else if ( !Safety.isImg( icon ) ) {
          icon = Empty.USER_EMPTY;
          loggedIn = '';
        }

        return (
          <div className="user-profile">
            <figure className={'user-profile-avatar ' + loggedIn}>
              <img src={icon} alt={dae.userName}/>
            </figure>
            <div className="user-profile-data">
              <p className="user-profile-name">{dae.userName}</p>
              <p className="user-profile-job">{dae.bio}</p>
              <dl className="user-profile-favorite">
                <dt className="user-profile-favorite-heading">{Message.FAVORITE_SPORTS}</dt>
                <dd className="user-profile-favorite-list">
                  {
                    categories.map( function( category, i ) {
                      return (
                        <span key={'favorite-' + i} className="user-profile-favorite-item">
                          <a href={Url.category( category.slug )}>{category.label}</a>
                        </span>
                      );
                    } )
                  }
                </dd>
              </dl>
            </div>
          </div>
        );
      },
      componentDidMount: function() {
        // callback
        _this.executeSafely( View.DID_MOUNT );
      }
    } );

    ReactDOM.render(
      <UserProfileDom dae={userDae} />,
      this.element
    );

  }
}
