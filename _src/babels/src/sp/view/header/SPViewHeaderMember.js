/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 20:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
import {View} from '../../../view/View';
import {ViewHeaderMember} from '../../../view/header/ViewHeaderMember';

// app
import {Empty} from '../../../app/const/Empty';
import {Url} from '../../../app/const/Url';
import {Length} from '../../../app/const/Length';

// model
import {Model} from '../../../model/Model';
import {ModelNoticeCount} from '../../../model/notice/ModelNoticeCount';

// event
import {NoticeStatus} from '../../../event/NoticeStatus';

// data
import {Safety} from '../../../data/Safety';

// dae
import {UserDae} from '../../../dae/UserDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// Sagen
let Gasane = self.Gasane;

/**
 * SP header ログイン・メンバー 関連メニュー
 */
export class SPViewHeaderMember extends ViewHeaderMember {
  /**
   * <p>SP header ログイン・メンバー 関連メニュー<br>
   * アイコン+drop down menu 表示</p>
   *
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  /**
   * Dom を生成します
   * @param {UserDae} dae JSON UserDae instance
   */
  render( dae:UserDae ):void {

    this.executeSafely( View.BEFORE_RENDER, dae );

    let _this = this;

    /**
     * ログインユーザー
     * @private
     * @type {ReactClass}
     */
    let MemberDom = React.createClass( {
      propTypes: {
        // user name
        userName: React.PropTypes.string.isRequired,
        // profile_picture
        icon: React.PropTypes.string.isRequired
      },
      getInitialState: function() {
        /**
         * ModelNoticeCount に対する callback 関数を格納するObject
         * @private
         * @type {null|Object}
         */
        this.callback = null;
        /**
         * ModelNoticeCount instance
         * @private
         * @type {null|ModelNoticeCount}
         */
        this.model = null;
        /**
         * Polling instance
         * @private
         * @type {null|Polling}
         */
        this.polling = null;
        /**
         * NoticeStatus instance
         * @private
         * @type {null|NoticeStatus}
         */
        this.status = null;

        return {
          total: 0
        };
      },
      render: function() {
        let noticeStyle = ( num ) => {
          return num === 0 ? { display: 'none' } : { display: 'block' };
        };
        let userName = this.props.userName;
        /*
        let icon = this.props.icon;
        if ( !icon ) {
          icon = Empty.USER_EMPTY;
        } else if ( !Safety.isImg( icon ) ) {
          // 画像ファイル名に拡張子がないのがあったので
          // 拡張子チェックを追加
          if ( !Safety.isGraph( icon ) ) {
            icon = Empty.USER_EMPTY;
          }
        }

        let loggedIn = icon === Empty.USER_EMPTY ? '' : 'user-logged-in';
        */
        let icon = Safety.image( this.props.icon, Empty.USER_EMPTY );
        let loggedIn = Safety.same( icon, Empty.USER_EMPTY );

        return (
          <div className="user">
            <div className="preference">
              <a href={Url.notifications()} className="preference-opener">
                {/*
                 画像を変えてもファイル名が変わらない
                 キャッシュ問題を回避するためにDate.nowを加える
                 通常もキャッシュが効かない〜
                 */}
                <span className={'preference-avatar ' + loggedIn}><img src={`${icon}?${Date.now()}`} alt={userName} /></span>
              </a>
              <span className={'preference-num'} style={noticeStyle(this.state.total)}>{this.state.total}</span>
            </div>
          </div>
        );
      },
      componentDidMount: function() {
        // callback
        let callback = this.callback;
        if ( callback === null ) {
          callback = {};
          this.callback = callback;
          callback[ Model.COMPLETE ] = this.done;
          callback[ Model.UNDEFINED_ERROR ] = this.fail;
          callback[ Model.RESPONSE_ERROR ] = this.fail;
        }

        // model
        if ( this.model === null ) {
          this.model = new ModelNoticeCount( callback );
        }

        // status
        if ( this.status === null ) {
          this.status = NoticeStatus.factory();
        }

        // polling
        let polling = this.polling;
        if ( polling === null ) {
          // console.log( '**** polling start **** ' );
          // https://github.com/undotsushin/undotsushin/issues/282
          // 60秒ごとに未読数取得APIを叩いてお知らせの未読数を取得しバッジに反映する
          polling = new Gasane.Polling( Length.interval );
          this.polling = polling;
          polling.on( Gasane.Polling.PAST, this.update );

          // polling で お知らせ count 数 監視
          this.model.start();
          polling.start();

        } else {

          this.restart();

        }

        _this.didMount();
      },
      // polling をリスタートします
      restart: function() {
        let polling = this.polling;
        // console.log( '********* restart ******* ' );
        if ( polling !== null ) {
          // 念のため一旦 unbind し bind する
          polling.off( Gasane.Polling.PAST, this.update );
          polling.on( Gasane.Polling.PAST, this.update );

          polling.setPolling( Length.interval );
        }
      },
      // 定期的に更新します
      // Polling.PAST event handler
      update: function() {
        // console.log( 'update polling' );
        this.polling.off( Gasane.Polling.PAST, this.update );
        this.model.start();
      },
      // update で call された ModelNoticeCount の成功 event handler
      done: function( result ) {
        let count = result.count;
        console.log( '** count done ** ', count );
        if ( Number.isInteger( count ) ) {
          if ( this.state.total !== count ) {
            this.updateTotal( count );
          }
        }

        this.restart();
      },
      // model request 失敗, polling 再スタート
      fail: function() {
        // restart する
        this.restart();
      },
      // total 件数を変える
      updateTotal: function( total ) {

        this.setState( { total: total } );
        this.status.update( total );

      },
      updateUser: function( icon, userName ) {
        console.log( 'user update state ', icon );
        this.setState( { icon: icon, userName: userName } );
      }
    } );

    // --------------------------------------------------
    // user root
    if ( this._component === null ) {
      this._component = ReactDOM.render(
        <MemberDom
          icon={dae.profilePicture}
          userName={dae.userName}
        />,
        this.element
      );
    } else {
      this._component.updateUser( dae.profilePicture, dae.userName);
    }

  }
}
