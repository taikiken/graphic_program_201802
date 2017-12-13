/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/13 - 17:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Model } from '../../../model/Model';
import { Length } from '../../../app/const/Length';
import { Polling } from '../../../tick/Polling';
import { ModelNoticeCount } from '../../../model/notice/ModelNoticeCount';
import { NoticeStatus } from '../../../event/NoticeStatus';

/**
 * [library] - React
 */
const React = self.React;

/**
 * header - お知らせ「バッジ」出力します
 * - 定期的に更新するために (@link Polling} - {@link Length}.interval 間隔で行います
 * - {@link ModelNoticeCount} Ajax 取得します
 * - {@link NoticeStatus} 件数を通知します
 */
export default class ComponentHeaderNoticeTotal extends React.Component {
  // static get propTypes() {
  //   return {
  //     total: React.PropTypes.number.isRequired,
  //   };
  // }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * お知らせ「バッジ」出力準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * バッジ件数 - default `0`
     * @type {{total: number}}
     */
    this.state = {
      // total: props.total,
      total: 0,
    };
    // ----
    const onDone = this.onDone.bind(this);
    const onFail = this.onFail.bind(this);
    const callback = {};
    callback[Model.COMPLETE] = onDone;
    callback[Model.UNDEFINED_ERROR] = onFail;
    callback[Model.RESPONSE_ERROR] = onFail;
    /**
     * bind onDone - {@link ModelNoticeCount} success event handler
     * @type {function}
     */
    this.onDone = onDone;
    /**
     * bind onDone - {@link ModelNoticeCount} error event handler
     * @type {function}
     */
    this.onFail = onFail;
    /**
     * bind onUpdate - {@link Polling}.UPDATE event handler
     * @type {function}
     */
    this.onUpdate = this.onUpdate.bind(this);
    /**
     * ModelNoticeCount callback をセット
     * @private
     * @type {Object}
     */
    this.callback = callback;
    /**
     * Polling instance
     * @private
     * @type {Polling}
     */
    this.polling = new Polling(Length.interval);
    /**
     * ModelNoticeCount instance
     * @private
     * @type {ModelNoticeCount}
     */
    this.model = new ModelNoticeCount(callback);
    /**
     * NoticeStatus instance
     * @private
     * @type {NoticeStatus}
     */
    this.status = NoticeStatus.factory();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * {@link ModelNoticeCount} success event handler
   * - バッジを更新します
   * - restart します
   * @param {Result} result Ajax JSON data
   */
  onDone(result) {
    const total = result.count;
    if (Number.isInteger(total) && total !== this.state.total) {
      this.updateTotal(total);
    }
    this.restart();
  }

  /**
   * {@link ModelNoticeCount} error event handler
   * - restart します
   */
  onFail() {
    this.restart();
  }
  /**
   * {@link Polling}.UPDATE event handler
   * - {@link Polling}.UPDATE unbind します
   * - {@link ModelNoticeCount} request 開始します
   */
  onUpdate() {
    this.polling.off(Polling.UPDATE, this.onUpdate);
    this.model.start();
  }
  /**
   * {@link Polling}.UPDATE unbind します
   */
  dispose() {
    this.polling.off(Polling.UPDATE, this.onUpdate);
  }
  /**
   * {@link Polling}.setPolling します
   */
  restart() {
    const polling = this.polling;
    // 念のため一旦 unbind し bind する
    polling.off(Polling.UPDATE, this.onUpdate);
    polling.on(Polling.UPDATE, this.onUpdate);
    polling.setPolling( Length.interval);
  }
  /**
   * バッジ更新します
   * @param {number} total バッジ件数
   */
  updateTotal(total) {
    this.setState({ total });
    this.status.update(total);
  }

  /**
   * delegate - after mount
   * - {@link Polling}.UPDATE bind します
   * - {@link ModelNoticeCount} request 開始します
   */
  componentDidMount() {
    const polling = this.polling;
    polling.on(Polling.UPDATE, this.onUpdate);
    polling.start();
    // ---
    this.model.start();
  }
  /**
   * delegate - before unmount
   * - `dispose` します
   */
  componentWillUnmount() {
    this.dispose();
  }
  // componentWillReceiveProps(nextProps) {
  //   const { total } = nextProps;
  //   if (total !== this.state.total) {
  //     this.setState({ total });
  //   }
  // }
  /**
   * お知らせバッジを出力します
   * @returns {?XML} `span.notice-num`
   */
  render() {
    const { total } = this.state;
    // console.log('ComponentHeaderNoticeTotal.render', total);
    if (!total) {
      return null;
    }
    return (
      <span className="notice-num">
        {total}
      </span>
    );
  }
}
