/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/14 - 18:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
const React = self.React;

/**
 * カルーセル・ページャーの1つのコンテナを作成します
 */
export class ViewPager extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ViewPager.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * bind 済み onClick
     * @type {function}
     */
    this.boundClick = this.onClick.bind(this);
  }
  /**
   * カルーセル・ページャーの1つを作成します
   * @return {XML} カルーセル・ページャーの1つを返します
   */
  render() {
    const props = this.props;
    const no = props.index - props.length;
    return (
      <li className={`pager-item pager-${no}`}>
        <a href={`#pickup-${props.index}`} className="pager-link" onClick={this.boundClick} >{no}</a>
      </li>
    );
  }
  /**
   * ページャー click event handler<br>
   * コールバックにページャー内数字を通知します
   * @param {Event} event ページャー click event
   */
  onClick(event) {
    event.preventDefault();
    // pager html 内数字をコールバックに通知します
    this.props.onPager(event.target.innerHTML);
  }
}

/**
 * プロパティ
 * @static
 * @type {{index: number, id: string, length: number, onPager: function}}
 */
ViewPager.propTypes = {
  index: React.PropTypes.number.isRequired,
  id: React.PropTypes.string.isRequired,
  length: React.PropTypes.number.isRequired,
  onPager: React.PropTypes.func.isRequired
};
