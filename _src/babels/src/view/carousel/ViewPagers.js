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
import { ViewPager } from './ViewPager';

// React
const React = self.React;

/**
 * カルーセル・ページャーを作成します<br>
 * プロパティ `list` から必要な数だけのページャー {@link ViewPager} を作成します
 * @since 2016-09-15
 */
export class ViewPagers extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ViewPagers.propTypes}
   */
  constructor(props) {
    super(props);
  }
  /**
   * カルーセル・ページャーコンテナを作成します
   * @return {XML} カルーセル・ページャーコンテナを返します
   */
  render() {
    const props = this.props;
    const list = props.list;
    const length = list.length;
    let offset = props.offset;
    const onPager = props.onPager;

    return (
      <ul className="pager-list">
        {
          list.map((article) => {
            return (
              <ViewPager
                key={`pager-${article.id}`}
                id={String(article.id)}
                index={offset++}
                length={length}
                onPager={onPager}
              />
            );
          })
        }
      </ul>
    );
  }
}

/**
 * プロパティ
 * @static
 * @type {{offset: number, list: []<ArticleDae>, onPager: function}}
 */
ViewPagers.propTypes = {
  offset: React.PropTypes.number.isRequired,
  list: React.PropTypes.array.isRequired,
  onPager: React.PropTypes.func.isRequired
};
