/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 16:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { WidgetType } from '../../app/const/WidgetType';

// component
import { ComponentSinglesWidgetRecommend } from './ComponentSinglesWidgetRecommend';
import { ComponentSinglesWidgetPopular } from './ComponentSinglesWidgetPopular';
import { ComponentSinglesWidgetRelated } from './ComponentSinglesWidgetRelated';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * PC: 記事詳細「次の記事一覧」 > オススメ記事・関連記事・人気記事<br>
 * 出力 Component を「記事詳細」index を元に判断します
 * @since 2016-09-30
 */
export class ComponentSinglesWidget extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{index: number, single: SingleDae, type: string, strong: boolean, sign: boolean}} React props
   */
  static get propTypes() {
    return {
      // 記事表示順序
      index: React.PropTypes.number.isRequired,
      // SingleDae - 記事詳細データ recommend_articles 抽出
      single: React.PropTypes.object.isRequired,
      // widget type
      type: React.PropTypes.string.isRequired,
      // 記事出力順番に関係なく出力するかのフラッグ
      strong: React.PropTypes.bool.isRequired,
      // ログイン済みかのフラッグ
      sign: React.PropTypes.bool.isRequired
    };
  }
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSinglesWidget.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{index: number, single: SingleDae, type: string, strong: boolean, sign: boolean}}
     */
    this.state = {
      index: props.index,
      single: props.single,
      type: props.type,
      strong: props.strong,
      sign: props.sign
    };
  }
  /**
   * オススメ記事
   * @return {XML} ComponentSinglesWidgetRecommend {@link ComponentSinglesWidgetRecommend}
   */
  recommend() {
    return (
      <ComponentSinglesWidgetRecommend
        index={this.state.index}
        single={this.state.single}
        strong={this.state.strong}
        sign={this.state.sign}
      />
    );
  }
  /**
   * 関連記事
   * @return {XML} ComponentSinglesWidgetRelated {@link ComponentSinglesWidgetRelated}
   */
  related() {
    return (
      <ComponentSinglesWidgetRelated
        index={this.state.index}
        strong={this.state.strong}
        single={this.state.single}
      />
    );
  }
  /**
   * 人気記事
   * @return {XML} ComponentSinglesWidgetPopular {@link ComponentSinglesWidgetPopular}
   */
  popular() {
    return (
      <ComponentSinglesWidgetPopular
        index={this.state.index}
        strong={this.state.strong}
        sign={this.state.sign}
      />
    );
    // return null;
  }
  /**
   * オススメ記事・関連記事・人気記事 を出力します
   * @return {XML} ComponentSinglesWidgetRecommend|ComponentSinglesWidgetRelated|ComponentSinglesWidgetRelated
   */
  render() {
    switch (this.state.type) {
      case WidgetType.RECOMMEND: {
        return this.recommend();
      }
      case WidgetType.RELATED: {
        return this.related();
      }
      case WidgetType.POPULAR:
      default: {
        return this.popular();
      }
    }
  }
}
