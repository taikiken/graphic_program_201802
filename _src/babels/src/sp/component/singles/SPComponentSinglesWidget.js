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

export class SPComponentSinglesWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      single: props.single,
      type: props.type,
      strong: props.strong,
      sign: props.sign
    };
  }
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
  related() {
    return (
      <SPComponentSinglesWidgetRelated
        index={this.state.index}
        strong={this.state.strong}
      />
    );
    // return null;
  }
  popular() {
    return (
      <SPComponentSinglesWidgetPopular
        index={this.state.index}
        strong={this.state.strong}
        sign={this.state.sign}
      />
    );
    // return null;
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
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
}
