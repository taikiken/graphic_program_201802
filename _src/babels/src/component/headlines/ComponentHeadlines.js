/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/19 - 20:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../../view/View';

// view/headlines
import { ComponentHeadlineArticle } from './ComponentHeadlineArticle';

// app
import { Empty } from '../../app/const/Empty';
import { Message } from '../../app/const/Message';

// data
import { Safety } from '../../data/Safety';

// React
const React = self.React;

/**
 * div.headline を出力します
 * @since 2016-09-17
 */
export class ComponentHeadlines extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentHeadlines.propTypes}
   */
  constructor(props) {
    super(props);
  }
  /**
   * div.headline を出力します<br>
   * this.props.list.length が `0` の時は null を返します
   * @return {?XML} div.headline を返します
   */
  render() {
    // length check
    if (this.props.list.length === 0) {
      return null;
    }

    const home = this.props.home;

    return (
      <div className="headline">
        <div className="headline-heading">
          <h2 className="headline-heading-title"><img src="/assets/images/index/headline-heading.png" alt="HEADLINE NEWS" /></h2>
          <span className="headline-heading-ruby">{Message.HEADLINE_TITLE}</span>
        </div>
        <ul className="board-small column2">
          {
            this.props.list.map((dae, i) => {
              const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.IMG_SMALL);
              return (
                <ComponentHeadlineArticle
                  key={`headline-${dae.id}`}
                  index={i}
                  id={String(dae.id)}
                  slug={dae.categories.slug}
                  categories={dae.categories.all}
                  url={dae.url}
                  date={dae.displayDate}
                  title={dae.title}
                  thumbnail={thumbnail}
                  mediaType={dae.mediaType}
                  home={home}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }
  /**
   * マウント時に call され、View.DID_MOUNT を通知します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
}

/**
 * プロパティ
 * @type {{
 *  list: Array<ArticleDae>,
 *  callback: Function,
 *  home: boolean
 * }}
 */
ComponentHeadlines.propTypes = {
  // articles 配列を元にDomを作成する
  list: React.PropTypes.array.isRequired,
  callback: React.PropTypes.func.isRequired,
  home: React.PropTypes.bool
};

/**
 * デフォルトプロパティ
 * @type {{
 *  home: boolean
 * }}
 */
ComponentHeadlines.defaultProps = {
  home: false
};
