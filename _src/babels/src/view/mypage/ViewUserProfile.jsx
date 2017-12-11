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


import View from '../View';
// import ViewError from '../error/ViewError';

// action
import {UsersSelf} from '../../action/users/UsersSelf';

// app
import {Empty} from '../../app/const/Empty';
import {Url} from '../../app/const/Url';
import {Message} from '../../app/const/Message';

// data
// import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {UserDae} from '../../dae/UserDae';
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
 * ユーザー情報 設定画面上 - HTML 出力します
 * @param {UserDae} dae Ajax JSON 変換データ
 * @param {string} icon user icon path
 * @param {string} loggedIn login class name
 * @param {Array.<{id: number, slug: string, label: string}>} categories 興味があるカテゴリリスト
 * @returns {XML} `div.user-profile`
 * @constructor
 */
export const UserProfileComponent = ({ dae, icon, loggedIn, categories }) => (
  <div className="user-profile">
    <figure className={`user-profile-avatar ${loggedIn}`}>
      <img src={icon} alt={dae.userName}/>
    </figure>
    <div className="user-profile-data">
      <p className="user-profile-name">{dae.userName}</p>
      <p className="user-profile-job">{dae.bio}</p>
      <dl className="user-profile-favorite">
        <dt className="user-profile-favorite-heading">{Message.FAVORITE_SPORTS}</dt>
        <dd className="user-profile-favorite-list">
          {
            categories.map((category, i) => (
              <span key={`favorite-${i}-${category.id}`} className="user-profile-favorite-item">
                <a href={Url.category( category.slug )}>{category.label}</a>
              </span>
            ))
          }
        </dd>
      </dl>
    </div>
  </div>
);

/**
 * React.propTypes
 * @type {{dae:UserDae, icon: string, loggedIn: string, categories: Array.<{id: number, slug: string, label: string}>}}
 */
UserProfileComponent.propTypes = {
  dae: React.PropTypes.instanceOf(UserDae).isRequired,
  icon: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.string.isRequired,
  categories: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      slug: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

/**
 * ユーザー情報 設定画面上
 */
export default class ViewUserProfile extends View {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, option = {}) {
    super(element, option);
    /**
     * Action instance を設定します
     * @override
     * @type {UsersSelf}
     */
    this.action = new UsersSelf(this.done.bind(this), this.fail.bind(this));
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [path=''] option argument
   */
  start(path = '') {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ViewSingle].start', path);
    }
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
      const error = new Error(Message.undef('[USER_PROFILE:UNDEFINED]'));
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
    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError(error.message);
  }
  // /**
  //  * ViewError でエラーコンテナを作成します
  //  * @param {string} message エラーメッセージ
  //  */
  // showError( message:string = '' ):void {
  //
  //   message = Safety.string( message, '' );
  //
  //   // Error 時の表示
  //   let error = new ViewError( this.element, this.option, message );
  //   error.render();
  //
  // }
  /**
   * Dom を生成します
   * @param {Object} response JSON response object
   */
  render(response) {
    // let userDae = new UserDae( response );
    // let _this = this;
    //
    // let UserProfileDom = React.createClass( {
    //   propTypes: {
    //     dae: React.PropTypes.object.isRequired
    //   },
    //   render: function() {
    //     let dae = this.props.dae;
    //     let categories = dae.interest.category;
    //     let icon = Safety.image( dae.profilePicture, Empty.USER_EMPTY );
    //     let loggedIn = Safety.same( icon, Empty.USER_EMPTY );
    //
    //     return (
    //       <div className="user-profile">
    //         <figure className={'user-profile-avatar ' + loggedIn}>
    //           <img src={icon} alt={dae.userName}/>
    //         </figure>
    //         <div className="user-profile-data">
    //           <p className="user-profile-name">{dae.userName}</p>
    //           <p className="user-profile-job">{dae.bio}</p>
    //           <dl className="user-profile-favorite">
    //             <dt className="user-profile-favorite-heading">{Message.FAVORITE_SPORTS}</dt>
    //             <dd className="user-profile-favorite-list">
    //               {
    //                 categories.map( function( category, i ) {
    //                   return (
    //                     <span key={'favorite-' + i} className="user-profile-favorite-item">
    //                       <a href={Url.category( category.slug )}>{category.label}</a>
    //                     </span>
    //                   );
    //                 } )
    //               }
    //             </dd>
    //           </dl>
    //         </div>
    //       </div>
    //     );
    //   },
    //   componentDidMount: function() {
    //     // callback
    //     _this.executeSafely( View.DID_MOUNT );
    //   }
    // } );
    //
    // ReactDOM.render(
    //   <UserProfileDom dae={userDae} />,
    //   this.element
    // );
    const userDae = new UserDae(response);
    const icon = Safety.image(userDae.profilePicture, Empty.USER_EMPTY);
    const loggedIn = Safety.same(icon, Empty.USER_EMPTY);
    const categories = userDae.interest.category;
    ReactDOM.render(
      <UserProfileComponent
        dae={userDae}
        icon={icon}
        loggedIn={loggedIn}
        categories={categories}
      />,
      this.element,
    );
  }
}
