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
import { SPViewHeadline } from './SPViewHeadline';

// app
import { Empty } from '../../../app/const/Empty';

// data
import { Safety } from '../../../data/Safety';

// React
const React = self.React;

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
          <ul className="board-small">
            {
              list.map((dae, i) => {
                const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.IMG_SMALL);
                return (
                  <SPViewHeadline
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
