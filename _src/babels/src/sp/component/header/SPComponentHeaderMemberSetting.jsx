/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/12 - 21:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Length } from '../../../app/const/Length';
import Polling from '../../../tick/Polling';
import { Model } from '../../../model/Model';
import { ModelNoticeCount } from '../../../model/notice/ModelNoticeCount';
import { NoticeStatus } from '../../../event/NoticeStatus';
import View from '../../../view/View';
import { Safety } from '../../../data/Safety';
import { Empty } from '../../../app/const/Empty';
import { Url } from '../../../app/const/Url';

/**
 * [library] - React
 */
const React = self.React;

/**
 * SP: header - member setting menu
 */
export default class SPComponentHeaderMemberSetting extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{userName: string, icon: string, safely: function, did: function}}
   * React.propTypes
   */
  static get propTypes() {
    return {
      userName: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      safely: React.PropTypes.func.isRequired,
      did: React.PropTypes.func.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * SP: header - member setting menu 出力準備をします
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * @type {{total: number, userName: string, icon: string}}
     */
    this.state = {
      total: 0,
      userName: props.userName,
      icon: props.icon,
    };
    const onDone = this.onDone.bind(this);
    const onFail = this.onFail.bind(this);
    const callbacks = {};
    callbacks[Model.COMPLETE] = onDone;
    callbacks[Model.UNDEFINED_ERROR] = onFail;
    callbacks[Model.RESPONSE_ERROR] = onFail;
    /**
     * callback list
     * @type {*}
     * */
    this.callbacks = callbacks;
    /**
     * bind onUpdate
     * @type {function}
     * */
    this.onUpdate = this.onUpdate.bind(this);
    /**
     * bind onDone
     * @type {function}
     * */
    this.onDone = onDone;
    /**
     * bind onFail
     * @type {function}
     * */
    this.onFail = onFail;
    /**
     * Polling instance - 定期的に {@link ModelNoticeCount} を実行します
     * @type {Polling}
     * */
    this.polling = new Polling(Length.interval);
    /**
     * notice count を取得しバッジ表示します
     * @type {ModelNoticeCount}
     * */
    this.model = new ModelNoticeCount(callbacks);
    /**
     * お知らせ更新を通知する管理マネージャー
     * @type {NoticeStatus}
     * */
    this.status = NoticeStatus.factory();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * {@link Polling}.UPDATE event handler
   * */
  onUpdate() {
    this.polling.off(Polling.UPDATE, this.onUpdate);
    this.model.start();
  }
  /**
   * {@link ModelNoticeCount} success callback
   * @param {Result} result Ajax JSON
   * */
  onDone(result) {
    const total = result.count;
    if (Number.isInteger(total) && total !== this.state.total) {
      this.updateTotal(total);
    }
    this.restart();
  }
  /**
   * {@link ModelNoticeCount} fail callback
   * */
  onFail() {
    this.restart();
  }
  /**
   * お知らせ件数を update します
   * @param {number} total notice 件数
   * */
  updateTotal(total) {
    this.setState({ total });
    this.status.update(total);
  }
  /**
   * event を unbind します
   * */
  destroy() {
    const polling = this.polling;
    polling.off(Polling.UPDATE, this.onUpdate);
  }
  /**
   * {@link Polling} を restart します
   * */
  restart() {
    const polling = this.polling;
    polling.off(Polling.UPDATE, this.onUpdate);
    polling.on(Polling.UPDATE, this.onUpdate);
    polling.setPolling(Length.interval);
  }
  /**
   * delegate - after mount
   * - props callback function を実行します
   * - {@link Polling} を  開始します
   * */
  componentDidMount() {
    const { safely, did } = this.props;
    safely(View.DID_MOUNT);
    did();
    // ----
    this.model.start();
    // -----
    const polling = this.polling;
    polling.off(Polling.UPDATE, this.onUpdate);
    polling.on(Polling.UPDATE, this.onUpdate);
    polling.start();
  }
  /**
   * delegate - will mount - `destroy` 実行します
   * */
  componentWillUnmount() {
    this.destroy();
  }
  /**
   * delegate - 更新 props を state と比較し更新するかを決定します
   * @param {{icon: string, userName: string}} nextProps 更新 props
   * */
  componentWillReceiveProps(nextProps) {
    const { icon, userName } = nextProps;
    if (icon !== this.state.icon || userName !== this.state.userName) {
      this.setState({ icon, userName });
    }
  }
  /**
   * SP: member setting menu を出力します
   * @returns {XML} `div.user`
   * */
  render() {
    const { total, icon, userName } = this.state;
    const noticeStyle = total === 0 ? { display: 'none' } : { display: 'block' };
    const iconImg = Safety.image(icon, Empty.USER_EMPTY);
    const loggedIn = Safety.same(iconImg, Empty.USER_EMPTY);
    return (
      <div className="user">
        <div className="preference">
          {/*
          UNDO_SPBL-403 【Web】記事ブックマーク / コメント機能の廃止にともなう対応
          ログイン後のユーザーアイコンのリンク先を /settings/ に
          2018-02-06
          <a href={Url.notifications()} className="preference-opener">
          */}
          <a href={Url.settings()} className="preference-opener">
            {/*
                 画像を変えてもファイル名が変わらない
                 キャッシュ問題を回避するためにDate.nowを加える
                 通常もキャッシュが効かない〜
                 */}
            <span className={`preference-avatar ${loggedIn}`}>
              <img src={Empty.refresh(icon)} alt={userName} />
            </span>
          </a>
          <span className={'preference-num'} style={noticeStyle}>{total}</span>
        </div>
      </div>
    );
  }
}
