/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/05 - 20:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event
import { ReplyStatus } from '../../../event/ReplyStatus';

// React
const React = self.React;

export class ComponentCommentFormOpener extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  uniqueId: string,
   *  independent: boolean,
   *  staticMessage: string,
   *  actionMessage: string,
   *  callback: function
   * }}
   */
  static get propTypes() {
    return {
      uniqueId: React.PropTypes.string.isRequired,
      independent: React.PropTypes.bool.isRequired,
      staticMessage: React.PropTypes.string.isRequired,
      actionMessage: React.PropTypes.string.isRequired,
      callback: React.PropTypes.func.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentCommentFormOpener.propTypes}
   */
  constructor(props) {
    super(props);
    this.state = {
      toggle: 'reply'
    };
    this.replyStatus = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  componentDidMount() {
    // ---------------------------
    // event bind
    let replyStatus = this.replyStatus;
    if (replyStatus === null) {
      // onetime
      replyStatus = ReplyStatus.factory();
      this.replyStatus = replyStatus;
      replyStatus.on(ReplyStatus.START, this.replyStart.bind(this));
      replyStatus.on(ReplyStatus.COMPLETE, this.replyComplete.bind(this));
    }
  }
  componentWillUnmount() {
    let replyStatus = this.replyStatus;
    if (replyStatus !== null) {
      replyStatus.off(ReplyStatus.START, this.replyStart);
      replyStatus.off(ReplyStatus.COMPLETE, this.replyComplete);
      this.replyStatus = null;
    }
  }
  openerClick(event) {
    event.preventDefault();
    this.willOpen();
    this.replyStatus.open(this.props.uniqueId);
  }
  cancelClick(event) {
    event.preventDefault();
    this.willClose();
    this.replyStatus.close(this.props.uniqueId);
  }
  willOpen() {
    this.setState({ toggle: 'cancel' });
  }
  willClose() {
    this.setState({ toggle: 'reply' });
  }
  checkId(events) {
    return this.props.uniqueId === events.id;
  }
  replyStart() {

  }
}
