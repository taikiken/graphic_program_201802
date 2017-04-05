/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/28 - 16:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { WidgetType } from '../../../app/const/WidgetType';

// sp/component
import { SPComponentSinglesWidgetRecommend } from './SPComponentSinglesWidgetRecommend';
import { SPComponentSinglesWidgetPopular } from './SPComponentSinglesWidgetPopular';
import { SPComponentSinglesWidgetRelated } from './SPComponentSinglesWidgetRelated';

// React
const React = self.React;

/**
 * 記事詳細 > オススメ記事・関連記事・人気記事<br>
 * 出力 Component を state.type を元に判断します
 * - {@link WidgetType.RELATED} - {@link SPComponentSinglesWidgetRelated}
 * - {@link WidgetType.POPULAR} - {@link SPComponentSinglesWidgetPopular}
 * - {@link WidgetType.RECOMMEND} - {@link SPComponentSinglesWidgetRecommend}
 * ```
 * <SPComponentSinglesWidget/>
 *    <SPComponentSinglesWidgetRelated />
 *    <SPComponentSinglesWidgetPopular />
 *    <SPComponentSinglesWidgetRecommend />
 * ```
 * @since 2016-09-28
 */
export class SPComponentSinglesWidget extends React.Component {
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
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentSinglesWidget.propTypes}
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
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * オススメ記事
   * @return {XML} SPComponentSinglesWidgetRecommend {@link SPComponentSinglesWidgetRecommend}
   */
  recommend() {
    return (
      <SPComponentSinglesWidgetRecommend
        index={this.state.index}
        single={this.state.single}
        strong={this.state.strong}
        sign={this.state.sign}
      />
    );
  }
  /**
   * 関連記事
   * <pre>
   *   六大学カテゴリーに属する記事に関しては関連記事自体全体を削除で対応お願い致します。
   * </pre>
   * @return {?XML} SPComponentSinglesWidgetRelated {@link SPComponentSinglesWidgetRelated}
   * @see https://github.com/undotsushin/undotsushin/issues/1546#issuecomment-290336418
   * @since 2017-03-28 - 六大学カテゴリーでは表示しない
   */
  related() {
    // @type {CategoryDae}
    const categoriesDae = this.state.single.categories;
    // result @type {boolean}
    // category @type {SlugDae}
    const result = categoriesDae.categories.some(category => category.slug === 'big6tv');
    if (result) {
      return null;
    }
    return (
      <SPComponentSinglesWidgetRelated
        index={this.state.index}
        strong={this.state.strong}
      />
    );
  }
  /**
   * 人気記事
   * @return {XML} SPComponentSinglesWidgetPopular {@link SPComponentSinglesWidgetPopular}
   */
  popular() {
    // console.log('SPComponentSinglesWidget.popular', this.state);
    return (
      <SPComponentSinglesWidgetPopular
        index={this.state.index}
        strong={this.state.strong}
        sign={this.state.sign}
      />
    );
  }
  // ------
  // delegate
  /**
   * オススメ記事・関連記事・人気記事 を出力します
   * @return {?XML} SPComponentSinglesWidgetRecommend|SPComponentSinglesWidgetRelated|SPComponentSinglesWidgetRelated
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
