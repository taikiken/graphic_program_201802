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

// event
import { CarouselStatus } from '../../event/CarouselStatus';

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
      length: React.PropTypes.number.isRequired,
      onPager: React.PropTypes.func.isRequired
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

    this.index = props.index;
    this.state = {
      current: ''
    };
    // ------
    if (props.length > 1) {
      const status = CarouselStatus.factory();
      status.on(CarouselStatus.POSITION, this.onPosition.bind(this));
    }
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  onPosition(events) {
    let current = '';

    if (events.index === this.index) {
      current = 'current';
    }
    this.setState({ current });
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
  /**
   * カルーセル・ページャーの1つを作成します
   * @return {XML} カルーセル・ページャーの1つを返します
   */
  render() {
    const props = this.props;
    const no = props.index;
    return (
      <li className={`pager-item pager-${no} ${this.state.current}`}>
        <a href={`#pickup-${no}`} className="pager-link" onClick={this.boundClick} >{no}</a>
      </li>
    );
  }
}
