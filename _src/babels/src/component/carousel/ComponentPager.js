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
 * @since 2016-09-15
 */
export class ComponentPager extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{index: number, id: string, length: number, onPager: function}} React props
   */
  static get propTypes() {
    return {
      index: React.PropTypes.number.isRequired,
      id: React.PropTypes.string.isRequired,
      // スライド総数
      length: React.PropTypes.number.isRequired,
      onPager: React.PropTypes.func.isRequired,
      // 現在 スライドNo.
      // @since 2017-03-28
      position: React.PropTypes.number.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentPager.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * bind 済み onClick
     * @type {function}
     */
    this.boundClick = this.onClick.bind(this);
    /**
     * pager index
     * @type {number}
     * @since 2017-03-28 JS control
     */
    this.index = props.index;
    /**
     * component state
     * - current {string} - CSS class
     * - position {number} - slide position
     * @type {{current: string, position: number}}
     * @since 2017-03-28 JS control
     */
    this.state = {
      current: props.index === props.position ? 'current' : '',
      position: props.position
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
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
  // ------
  // delegate
  /**
   * property 変更をキャチし `state` を変更するかを決定します
   * - nextProps.position が 0 以上 - 循環アニメーションのために負数(index)を使用することがある
   * - 現在ポシションと次プロパティ・ポジションが違うと変更する
   * - nextProps.position と this.index が等価の時は CSS class `current` を与える
   * @param {Object} nextProps 更新されたプロパティ
   * @since 2017-03-28 JS control
   */
  componentWillReceiveProps(nextProps) {
    const position = nextProps.position;
    if (position >= 0 && position !== this.state.position) {
      let current = position === this.index ? 'current' : '';
      // length 2 の時は 4 としてコード運用する - +2 して再度比較します
      if (current === '' && this.props.length === 2) {
        current = position === (this.index + 2) ? 'current' : '';
      }
      // state update
      this.setState({ position, current });
    }
  }
  /**
   * カルーセル・ページャーの1つを作成します
   * @return {XML} カルーセル・ページャーの1つを返します
   */
  render() {
    // const props = this.props;
    const no = this.index;
    return (
      <li className={`pager-item pager-${no} ${this.state.current}`}>
        <a href={`#pickup-${no}`} className="pager-link" onClick={this.boundClick} >{no}</a>
      </li>
    );
  }
}
