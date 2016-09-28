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
 * @since 2016-09-28
 */
export class SPComponentSingles extends React.Component {
  constructor(props) {
    super(props);
    console.log('SPComponentSingles', props);
    this.state = {
      list: props.list,
      offset: props.offset,
      length: props.length
    };
  }
  render() {
    const props = this.props;
    const state = this.state;
    const list = state.list;
    const length = list.length;
    console.log('SPComponentSingles.list', list);
    // @ToDO 条件簡略化可能か調べる
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
                  index={index}
                />
              );
            })
          }
          {
            // 関連記事一覧
            this.widget(WidgetType.RELATED, length)
          }
          {
            // 人気記事一覧
            this.widget(WidgetType.POPULAR, length + 1)
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
            this.widget(WidgetType.POPULAR, length)
          }
        </div>
      );
    }
    // 9 件以上
    return (
      <div className="singles-root">
        {
          list.map((single, index) => {
            console.log('single', index, single.id, single);
            return (
              <div key={`single-root-${single.id}`} className="singles-root-article">

                <SPComponentSinglesArticle
                  key={`singles-article-${single.id}`}
                  single={single}
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
  componentDidMount() {
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

    return (
      <div className="singles-root-under3">
        <SPComponentSinglesWidget
          index={index}
          single={single}
          type={WidgetType.RECOMMEND}
        />
        <SPComponentSinglesWidget
          index={index + 1}
          single={single}
          type={WidgetType.RELATED}
        />
        <SPComponentSinglesWidget
          index={index + 2}
          single={single}
          type={WidgetType.POPULAR}
        />
      </div>
    );
  }
  // ---------------------------------------------------
  // widget
  widget(type, index) {
    return (
      <SPComponentSinglesWidget
        index={index}
        single={this.props.single}
        type={type}
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
      home: React.PropTypes.bool.isRequired
    };
  }
  static get defaultProps() {
    // absolutely, not home
    return {
      home: false
    };
  }
}
