/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/17 - 18:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../../../view/View';
import { SPViewHeadlineArticle } from './SPViewHeadlineArticle';

// app
import { Empty } from '../../../app/const/Empty';
import { Message } from '../../../app/const/Message';

// data
import { Safety } from '../../../data/Safety';

// React
const React = self.React;

/**
 * home 以外はタイトルを表示
 * @param {boolean} home home か否かの真偽値
 * @return {?XML} home 以外はタイトルを返します
 * @private
 * @static
 */
const headlineTitle = (home) => {
  if (home) {
    return null;
  }

  return (
    <div className="headline-heading">
      <h2 className="headline-heading-title"><img src="/assets/images/index/headline-heading.png" alt="HEADLINE NEWS" /></h2>
      <span className="headline-heading-ruby">{Message.HEADLINE_TITLE}</span>
    </div>
  );
};

/**
 * SP: headline 記事一覧を出力します
 * @since 2016-09-16
 *
 * <pre>
 *   <SPViewHeadlines/>
 *      <SPViewHeadline/>
 *        <CategoryLabelNode/>
 * </pre>
 */
export class SPViewHeadlines extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPViewHeadline.propTypes}
   */
  constructor(props) {
    super(props);
  }
  /**
   * `div.headline-root` を作成し headline 一覧を出力します
   * @return {?XML} `div.headline-root` あるいは null を返します
   */
  render() {
    const list = this.props.list;

    if (list.length === 0) {
      return null;
    }

    return (
      <div className="headline-root">
        <div className="headline">
          {headlineTitle(this.props.home)}
          <ul className="board-small">
            {
              list.map((dae, i) => {
                const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.IMG_SMALL);
                return (
                  <SPViewHeadlineArticle
                    key={`headline-${dae.id}`}
                    index={i}
                    id={String( dae.id )}
                    slug={dae.categories.all[0].slug}
                    categories={dae.categories.all}
                    url={dae.url}
                    date={dae.displayDate}
                    title={dae.title}
                    thumbnail={thumbnail}
                    mediaType={dae.mediaType}
                    home={this.props.home}
                  />
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
  // --------------------------------------------
  // delegate
  /**
   * delegate method, マウントした時にコールされます
   *
   * `View.DID_MOUNT` をコールバックに通知します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
}
/**
 * プロパティ
 * @type {{list: Array.<ArticleDae>, callback: Function}}
 */
SPViewHeadlines.propTypes = {
  // Array.<ArticleDae>
  list: React.PropTypes.array.isRequired,
  // executeSafely.bind
  callback: React.PropTypes.func.isRequired,
  home: React.PropTypes.bool
};

/**
 * デフォルト・プロパティ, home を false 設定します
 * @static
 * @type {{index: number}}
 */
SPViewHeadlines.defaultProps = {
  home: false
};
