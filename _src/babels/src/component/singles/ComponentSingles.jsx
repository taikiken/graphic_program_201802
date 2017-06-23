/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/26 - 20:18
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../../view/View';

// app
import { WidgetType } from '../../app/const/WidgetType';

// component
// import { ComponentSinglesWidgetOption } from './ComponentSinglesWidgetOption';
import { ComponentSinglesWidget } from './ComponentSinglesWidget';

// 記事本文
// import { ComponentSinglesArticle } from './ComponentSinglesArticle';
import { ComponentSinglesArticleMagnet } from '../singles-magnet/ComponentSinglesArticleMagnet';

// ui
import { SinglesManager } from '../../ui/SinglesManager';

// util
import { Fb } from '../../util/Fb';

// React
const React = self.React;

/**
 *  desktop: 記事詳細「次の記事一覧」親コンポーネント
 * @since 2016-09-30
 */
export class ComponentSingles extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React props
   * @return {{list: Array<SingleDae>, offset: number, length: number, action: Object, callback: Function, boundMore: Function, single: SingleDae, home: boolean, sign: boolean}} React props
   */
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
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSingles.propTypes}
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
    /**
     * SinglesManager instance
     * @type {SinglesManager}
     */
    this.manager = SinglesManager.factory(props.single);
    // ---
    /**
     * request offset 値 - 更新を行うかを決定する基準値として使用します
     * @type {number}
     * @default 0
     * @since 2017-04-17
     */
    this.offset = 0;
    /**
     * `this.props.boundMore` を遅延して実行するための timer id
     * @type {number}
     * @default 0
     * @since 2017-04-17
     */
    this.timer = 0;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // ---------------------------------------------------
  // 3件以下
  /**
   * 3件以下の場合、オススメ・関連・人気を連続で強制出力します
   * @param {number} [index=9] 記事出力番号, `SPComponentSinglesWidget` で必須のため使用します
   * @return {XML} `div.singles-root-under3 > SPComponentSinglesWidget` {@link SPComponentSinglesWidget} を返します
   */
  underThree(index = 9) {
    const single = this.props.single;
    const strong = true;
    const sign = this.props.sign;

    return (
      <div className="singles-root-under3">
        <ComponentSinglesWidget
          index={index}
          single={single}
          type={WidgetType.RECOMMEND}
          strong={strong}
          sign={sign}
        />
        <ComponentSinglesWidget
          index={index + 1}
          single={single}
          type={WidgetType.RELATED}
          strong={strong}
          sign={sign}
        />
        <ComponentSinglesWidget
          index={index + 2}
          single={single}
          type={WidgetType.POPULAR}
          strong={strong}
          sign={sign}
        />
      </div>
    );
  }
  // ---------------------------------------------------
  // widget
  /**
   * ComponentSinglesWidget を出力します<br>
   * 3 の倍数チェック or 強制出力フラッグで出力タイプを判断します<br>
   * `SinglesManager.next` {@link SinglesManager} からタイプを取得します
   * @param {number} index 記事 index
   * @param {boolean} [strong=false] 強制出力フラッグ
   * @return {?XML} ComponentSinglesWidget {@Link ComponentSinglesWidget} を返します
   */
  next(index, strong = false) {
    if (!strong) {
      // 0 始まり index を
      // 3 の倍数チェックのために 1 足します
      // `x % 3 === 0` するために
      const count = index + 1;

      // 3 の倍数必須
      if (count % 3 !== 0) {
        return null;
      }
    }

    const single = this.props.single;
    // const strong = false;
    const sign = this.props.sign;
    const type = this.manager.next();

    // console.log('ComponentSingles.next', index, strong, type);

    switch (type) {
      case WidgetType.RECOMMEND: {
        return (
          <ComponentSinglesWidget
            index={index}
            single={single}
            type={WidgetType.RECOMMEND}
            strong={strong}
            sign={sign}
          />
        );
      }
      case WidgetType.RELATED: {
        return (
          <ComponentSinglesWidget
            index={index}
            single={single}
            type={WidgetType.RELATED}
            strong={strong}
            sign={sign}
          />
        );
      }
      case WidgetType.POPULAR: {
        return (
          <ComponentSinglesWidget
            index={index}
            single={single}
            type={WidgetType.POPULAR}
            strong={strong}
            sign={sign}
          />
        );
      }
      default: {
        return null;
      }
    }
  }
  /**
   * オススメ・関連・人気の記事を出力します
   * @param {string} type オススメ・関連・人気の記事タイプ {@link WidgetType}
   * @param {number} index 記事出力順番
   * @param {boolean} [strong=false] 記事出力順番に関係なく出力するかのフラッグ
   * @return {XML} SPComponentSinglesWidget {@link SPComponentSinglesWidget} を返します
   */
  widget(type, index, strong = false) {
    return (
      <ComponentSinglesWidget
        index={index}
        single={this.props.single}
        type={type}
        strong={strong}
        sign={this.props.sign}
      />
    );
  }
  // ---------------------------------------------------
  // /**
  //  * 次の読み込みから表示を更新します
  //  * @param {Array} list 表示リスト
  //  * @param {number} offset 読み込み開始位置
  //  * @param {number} length 読み込み数
  //  */
  // updateList(list, offset, length) {
  //   // state を変更し appendChild + isotope を行う
  //   this.setState({ list, offset, length });
  //   // hasNext を元に More View button の表示非表示を決める
  //   this.props.boundMore(this.props.action.hasNext());
  //   // @since 2016-11-04
  //   Fb.delay();
  // }
  /**
   * 遅延させて `action.hasNext` を元に [More View button] の表示非表示を決める
   * @param {number} [waitSeconds=0.5] 遅延秒数
   * @since 2017-04-17
   */
  delayMore(waitSeconds = 0.5) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.boundMore(this.props.action.hasNext());
    }, waitSeconds * 1000);
  }
  // ---------------------------------------------------
  // delegate
  /**
   * delegate, mount 後に呼び出されます<r>
   * View.DID_MOUNT を発火し、infinite scrollのために       moreButton へ続きがあるかを通知します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
    // hasNext を元に More View button の表示非表示を決める
    this.props.boundMore(this.props.action.hasNext());
    // @since 2016-11-04
    // Facebook like
    // Fb.init();
    this.offset = this.props.offset;
  }
  /**
   * プロパティ `offset` と `nextProps.offset` を比較し処理を行うかを決定します
   * @param {{offset: number, length: number, list: Array<SingleDae>}} nextProps 更新された props
   * @since 2017-04-17
   */
  componentWillReceiveProps(nextProps) {
    // console.log('ComponentSingles.componentWillReceiveProps ------------------------------', nextProps.offset, this.offset);
    if (nextProps.offset !== this.offset) {
      this.offset = nextProps.offset;
      // state を変更し appendChild + isotope を行う
      this.setState({ offset: nextProps.offset, list: nextProps.list, length: nextProps.length });
      // hasNext を元にMore View button の表示非表示を決める
      // console.log('ComponentSingles.componentWillReceiveProps', nextProps.offset, this.offset, this.props.action.hasNext());
      // this.props.boundMore(this.props.action.hasNext());
      this.delayMore();
      // @since 2016-11-04
      Fb.delay();
    }
  }
  // componentWillUnmount() {
  //   console.log('ComponentSingles.componentWillUnmount ------------------------------', this.props.single.id);
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('ComponentSingles.shouldComponentUpdate ------------------------------', nextProps, nextState);
  //   return true;
  // }
  /**
   * desktop: 記事詳細「次の記事一覧」を出力します
   * @return {XML} div.singles-root を返します
   */
  render() {
    const props = this.props;
    const state = this.state;
    const list = state.list;
    const length = list.length;
    // console.log('ComponentSingles.render', length);
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
    } else if (length < 3) {
      // 続きの記事 3件未満
      return (
        <div className="singles-root">
          {
            list.map((single, index) => {
              return (
                <ComponentSinglesArticleMagnet
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
      // 続きの記事 6件未満
      return (
        <div className="singles-root">
          {
            list.map((single, index) => {
              return (
                <div key={`single-root-${single.id}`} className="singles-root-article singles-root-article-under6">
                  <ComponentSinglesArticleMagnet
                    key={`singles-article-${single.id}`}
                    single={single}
                    sign={props.sign}
                    index={index}
                  />
                  {
                    this.next(index)
                  }
                </div>
              );
            })
          }
          {
            // 関連記事一覧
            // this.widget(WidgetType.RELATED, length, true)
            this.next(length, true)
          }
          {
            // 人気記事一覧
            // this.widget(WidgetType.POPULAR, length + 1, true)
            // オススメ記事がある時だけ3番目がある
            this.next(length + 1, this.manager.count < 3)
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
                <div key={`single-root-${single.id}`} className="singles-root-article singles-root-article-under9">
                  <ComponentSinglesArticleMagnet
                    key={`singles-article-${single.id}`}
                    single={single}
                    sign={props.sign}
                    index={index}
                  />
                  {
                    this.next(index)
                  }
                </div>
              );
            })
          }
          {
            // 人気記事一覧
            // this.widget(WidgetType.POPULAR, length, true)
            // オススメ記事がある時だけ3番目がある
            this.next(length, this.manager.count < 3)
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
                <ComponentSinglesArticleMagnet
                  key={`singles-article-${single.id}`}
                  single={single}
                  sign={props.sign}
                  index={index}
                />
                {
                  this.next(index)
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}