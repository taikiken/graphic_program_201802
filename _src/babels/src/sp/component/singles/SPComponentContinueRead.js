/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 0:30
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../../app/const/Message';

// React
const React = self.React;

/**
 * SP: 記事詳細「続きを読む」ボタンを汎用化のために `SPViewContinueRead` {@link SPViewContinueRead} から分離します
 * @since 2016-09-24
 */
export class SPComponentContinueRead extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentContinueRead.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{show: boolean}}
     */
    this.state = {
      show: false
    };
    /**
     * bind 済み clickHandler
     * @type {function}
     */
    this.boundClick = this.clickHandler.bind(this);
  }

  /**
   * delegate, mount 後に呼び出されます<br>
   * プロパティ dom の高さを調べ表示・非表示を決定します
   */
  componentDidMount() {
    // https://github.com/undotsushin/undotsushin/issues/152#issuecomment-196812397
    // 記事が短いときは
    // 記事を表示し READ_MORE 非表示
    const dom = this.props.dom;
    const height = parseInt(dom.style('height'), 10);
    // 高さを調べます
    if (height > 260) {
      // 高さが高いのでボタンを表示します
      dom.removeClass('hidden');
      this.setState({ show: true });
    } else {
      // 高さが短いので記事をそのまま表示します
      dom.removeClass('hidden');
      dom.removeClass('excerpt');
    }
  }
  /**
   * 「続きを読む」ボタン click handler
   * @param {Event} event click handler event
   */
  clickHandler(event) {
    event.preventDefault();
    // 記事を表示しボタンを非表示にします
    this.props.dom.removeClass('excerpt');
    this.setState({ show: false });
  }
  /**
   * a.post-content-btn-readMore を出力します
   * @return {?XML} a.post-content-btn-readMore を返します、非表示の時は null を返します
   */
  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <a className="post-content-btn-readMore" href="#" onClick={this.boundClick}>
        {Message.READ_MORE}
      </a>
    );
  }
}
/**
 * プロパティ
 * @type {{dom: Sagen.Dom}}
 */
SPComponentContinueRead.propTypes = {
  dom: React.PropTypes.object.isRequired
};
