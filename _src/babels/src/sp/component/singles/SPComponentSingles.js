/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/28 - 15:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../../../view/View';

// app
import { WidgetType } from '../../../app/const/WidgetType';

// component
import { SPComponentSinglesWidgetOption } from './SPComponentSinglesWidgetOption';
import { SPComponentSinglesWidget } from './SPComponentSinglesWidget';
import { SPComponentSinglesArticle } from './SPComponentSinglesArticle';

// React
const React = self.React;

/**
 * SP: 記事詳細「次の記事一覧」親コポネント
 *
 * ```
 * <SPComponentSingles>
 *   <SPComponentSinglesArticle>
 *   <SPComponentSinglesWidget>
 * ```
 *
 * <pre>
 * SPViewSingle -> SPViewSingles -> SPComponentSingles
 * の順で呼び出されます
 * 使用 Action class は
 * Singles or SinglesAuth になります
 * </pre>
 *
 * {@link SPViewSingle}
 * {@link SPViewSingles}
 * {@link Singles}
 * {@link SinglesAuth}
 * @since 2016-09-28
 */
export class SPComponentSingles extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentSingles.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{list: Array<SingleDae>, offset: number, length: number}}
     */
    this.state = {
      list: props.list,
      offset: props.offset,
      length: props.length
    };
  }
  /**
   * div.singles-root > SPComponentSinglesArticle を出力します
   * @return {XML} div.singles-root > SPComponentSinglesArticle を返します
   */
  render() {
    const props = this.props;
    const state = this.state;
    const list = state.list;
    const length = list.length;

    // @ToDO 条件簡略化可能か調べる
    // @ToDO 各件数のテスト
    if (length === 0) {
      // 続きの記事 0 件
      // オススメ・関連・人気
      return (
        <div className="singles-root">
          {this.underThree(length)}
        </div>
      );
    } else if (length < 4) {
      // 続きの記事 3件以下
      return (
        <div className="singles-root">
          {
            list.map((single, index) => {
              return (
                <SPComponentSinglesArticle
                  key={`singles-article-${single.id}`}
                  single={single}
                  sign={props.sign}
                  index={index}
                />
              );
            })
          }
          {this.underThree(length)}
        </div>
      );
    } else if (length < 6) {
      // 続きの記事 3件以下
      return (
        <div className="singles-root">
          {
            list.map((single, index) => {
              return (
                <SPComponentSinglesArticle
                  key={`singles-article-${single.id}`}
                  single={single}
                  sign={props.sign}
                  index={index}
                />
              );
            })
          }
          {
            // 関連記事一覧
            this.widget(WidgetType.RELATED, length, true)
          }
          {
            // 人気記事一覧
            this.widget(WidgetType.POPULAR, length + 1, true)
          }
        </div>
      );
    } else if (length < 9) {
      // 続きの記事 9件未満
      return (
        <div className="singles-root">
          {
            list.map((single, index) => {
              return (
                <div className="singles-root-article">
                  <SPComponentSinglesArticle
                    key={`singles-article-${single.id}`}
                    single={single}
                    sign={props.sign}
                    index={index}
                  />
                  <SPComponentSinglesWidgetOption
                    key={`singles-widget-${single.id}`}
                    index={index}
                    single={props.single}
                  />
                </div>
              );
            })
          }
          {
            // 人気記事一覧
            this.widget(WidgetType.POPULAR, length, true)
          }
        </div>
      );
    }

    // 9 件以上
    return (
      <div className="singles-root">
        {
          list.map((single, index) => {
            return (
              <div key={`single-root-${single.id}`} className="singles-root-article">
                <SPComponentSinglesArticle
                  key={`singles-article-${single.id}`}
                  single={single}
                  sign={props.sign}
                  index={index}
                />
                <SPComponentSinglesWidgetOption
                  key={`singles-widget-${single.id}`}
                  index={index}
                  single={props.single}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
  /**
   * delegate, mount 後に呼び出されます<nr>
   * View.DID_MOUNT を発火し、infinite scrollのために moreButton へ続きがあるかを通知します
   */
  componentDidMount() {
    console.log('SPComponentSingles.componentDidMount', this.props.action.hasNext());
    this.props.callback(View.DID_MOUNT);
    // hasNext を元に More View button の表示非表示を決める
    this.props.boundMore(this.props.action.hasNext());
  }
  /**
   * 次の読み込みから表示を更新します
   * @param {Array} list 表示リスト
   * @param {number} offset 読み込み開始位置
   * @param {number} length 読み込み数
   */
  updateList(list, offset, length) {
    // state を変更し appendChild + isotope を行う
    this.setState({ list, offset, length });
  }
  // ---------------------------------------------------
  // 3件以下
  underThree(index) {
    const single = this.props.single;
    const strong = true;

    return (
      <div className="singles-root-under3">
        <SPComponentSinglesWidget
          index={index}
          single={single}
          type={WidgetType.RECOMMEND}
          strong={strong}
        />
        <SPComponentSinglesWidget
          index={index + 1}
          single={single}
          type={WidgetType.RELATED}
          strong={strong}
        />
        <SPComponentSinglesWidget
          index={index + 2}
          single={single}
          type={WidgetType.POPULAR}
          strong={strong}
        />
      </div>
    );
  }
  // ---------------------------------------------------
  // widget
  /**
   * オススメ・関連・人気の記事を出力します
   * @param {string} type オススメ・関連・人気の記事タイプ {@link WidgetType}
   * @param {number} index 記事出力順番
   * @param {boolean} [strong=false] 記事出力順番に関係なく出力するかのフラッグ
   * @return {XML}
   */
  widget(type, index, strong = false) {
    return (
      <SPComponentSinglesWidget
        index={index}
        single={this.props.single}
        type={type}
        strong={strong}
      />
    );
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  static get propTypes() {
    return {
      // Array<SingleDae>
      list: React.PropTypes.array.isRequired,
      // request offset
      offset: React.PropTypes.number.isRequired,
      // request length
      length: React.PropTypes.number.isRequired,
      // action instance
      action: React.PropTypes.object.isRequired,
      // executeSafely
      callback: React.PropTypes.func.isRequired,
      // more button createElement callback
      boundMore: React.PropTypes.func.isRequired,
      // SingleDae - 記事詳細データ recommend_articles 抽出
      single: React.PropTypes.object.isRequired,
      // home container かのフラッグ
      home: React.PropTypes.bool.isRequired,
      // login 済みかのフラッグ
      sign: React.PropTypes.bool.isRequired
    };
  }
  static get defaultProps() {
    // absolutely, not home
    return {
      home: false
    };
  }
}
