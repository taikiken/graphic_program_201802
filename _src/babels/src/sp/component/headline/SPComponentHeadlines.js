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
import { SPComponentHeadlineArticle } from './SPComponentHeadlineArticle';

// app
import { Empty } from '../../../app/const/Empty';
import { Message } from '../../../app/const/Message';
import { Ad } from '../../../app/const/Ad';

// data
import { Safety } from '../../../data/Safety';

// React
const React = self.React;

/**
 * SP: headline 記事一覧を出力します
 *
 * <pre>
 *   <SPComponentHeadlines/>
 *      <SPViewHeadline/>
 *        <CategoryLabelNode/>
 * </pre>
 * @since 2016-09-16
 */
export class SPComponentHeadlines extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{list: Array.<ArticleDae>, callback: Function, home: boolean}} React props
   */
  static get propTypes() {
    return {
      // Array.<ArticleDae>
      list: React.PropTypes.array.isRequired,
      // executeSafely.bind
      callback: React.PropTypes.func.isRequired,
      home: React.PropTypes.bool
    };
  }
  /**
   * defaultProps, home を false 設定します
   * @return {{home: boolean}} React props
   */
  static get defaultProps() {
    return {
      home: false
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPViewHeadline.propTypes}
   */
  constructor(props) {
    super(props);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // --------------------------------------------
  // delegate
  /**
   * delegate method, マウントした時にコールされます
   *
   * `View.DID_MOUNT` をコールバックに通知します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
    this.ad();
  }
  /**
   * headline 6 件目の広告<br>
   * `app/template/mobile/index.php`#line.27
   * @since 2016-10-03
   */
  ad() {
    const element = this.refs.sponsorLink;
    if (!element) {
      return;
    }

    const div = document.createElement('div');
    let script = document.createElement( 'script' );
    script.src = `${Ad.ssl()}/sdk/js/adg-script-loader.js?id=42707&targetID=adg_42707&displayid=2&adType=INFEED&async=false&async=true&tagver=2.0.0`;
    div.appendChild(script);
    element.appendChild(div);
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
          {/* @since 2016-09-2 title 必須になりました */}
          <div className="headline-heading">
            <h2 className="headline-heading-title">{Message.HEADLINE_TITLE}</h2>
          </div>
          <ul className="board">
            {
              /* @since 2016-09-20 16x9 thumbnail changed */
              list.map((dae, i) => {
                const thumbnail = Safety.image(dae.media.images.medium, Empty.IMG_MIDDLE);
                return (
                  <SPComponentHeadlineArticle
                    key={`headline-${dae.id}`}
                    index={i}
                    id={String( dae.id )}
                    slug={dae.categories.slug}
                    categories={dae.categories.all}
                    url={dae.url}
                    date={dae.displayDate}
                    title={dae.title}
                    thumbnail={thumbnail}
                    mediaType={dae.mediaType}
                    home={this.props.home}
                    anotherCategories={dae.anotherCategories}
                  />
                );
              })
            }
            <li className="board-item sponsor-link">
              <div ref="sponsorLink" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
