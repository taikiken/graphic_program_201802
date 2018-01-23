/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/13 - 22:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// carousel
import ComponentPager from './ComponentPager';
import { ArticleDae } from '../../dae/ArticleDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * カルーセル・ページャーを作成します<br>
 * プロパティ `list` から必要な数だけのページャー {@link ComponentPager} を作成します
 * @since 2016-09-15
 */
export default class ComponentPagers extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *   list: *,
   *   onPager: function,
   *   position: number,
   *   length: number
   * }} react props
   */
  static get propTypes() {
    return {
      // list: React.PropTypes.array.isRequired,
      list: React.PropTypes.arrayOf(
        React.PropTypes.instanceOf(ArticleDae).isRequired,
      ).isRequired,
      onPager: React.PropTypes.func.isRequired,
      // sp: React.PropTypes.bool.isRequired,
      // 現在 スライドNo.
      // @since 2017-03-28
      position: React.PropTypes.number.isRequired
    };
  }
  // // ---------------------------------------------------
  // //  CONSTRUCTOR
  // // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentPagers.propTypes}
   */
  constructor(props) {
    super(props);
    // ----
    /**
     * component state
     * - position {number} - slide position
     * @type {{position: number}}
     * @since 2017-03-28 JS control
     */
    this.state = {
      position: props.position
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * property 変更をキャチし `state` を変更するかを決定します
   * - nextProps.position が 0 以上 - 循環アニメーションのために負数(index)を使用することがある
   * - 現在ポシションと次プロパティ・ポジションが違うと変更する
   * @param {Object} nextProps 更新されたプロパティ
   * @since 2017-03-28 JS control
   */
  componentWillReceiveProps(nextProps) {
    const position = nextProps.position;
    if (position >= 0 && position !== this.state.position) {
      this.setState({ position });
    }
  }
  /**
   * カルーセル・ページャーコンテナを作成します
   * @return {XML} カルーセル・ページャーコンテナを返します
   */
  render() {
    const { onPager, list } = this.props;
    // const list = props.list;
    if (list.length < 2) {
      // slide 数が 2未満の時は表示しない
      return null;
    }

    const length = list.length;
    // @type {number} - 開始位置
    let index = 0;
    // const onPager = props.onPager;

    // if (!props.sp) {
    //   return (
    //     <div className="pager">
    //       <ul className="pager-list">
    //         {
    //           list.map((article) => {
    //             return (
    //               <ComponentPager
    //                 key={`pager-${index}`}
    //                 id={String(article.id)}
    //                 index={index++}
    //                 length={length}
    //                 onPager={onPager}
    //                 position={this.state.position}
    //               />
    //             );
    //           })
    //         }
    //       </ul>
    //     </div>
    //   );
    // } else {
    //   return null;
    // }
    return (
      <div className="pager">
        <ul className="pager-list">
          {
            list.map((article) => {
              return (
                <ComponentPager
                  key={`pager-${article.id}`}
                  id={String(article.id)}
                  index={index++}
                  length={length}
                  onPager={onPager}
                  position={this.state.position}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }
}
