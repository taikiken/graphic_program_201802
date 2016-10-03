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

// // app
// import { Empty } from '../../../app/const/Empty';
// import { MediaType } from '../../../app/const/MediaType';

// node
import { CategoryLabelNode } from '../../../node/category/CategoryLabelNode';

// view
import { ComponentArticleThumbnail } from '../../../component/articles/ComponentArticleThumbnail';

// Ga
import { Ga } from '../../../ga/Ga';
import { GaData } from '../../../ga/GaData';

// React
const React = self.React;

// --------------------------------------------
// private

// /**
//  * media type が `MediaType.VIDEO` かを判定し<br>
//  * img tag か null を返します
//  * @since 2016-09-16
//  * @param {string} mediaType 比較対象 media_type
//  * @return {?XML} img.post-thumb-overlay-movie tag か null を返します
//  */
// const playMark = (mediaType) => {
//   if (mediaType === MediaType.VIDEO) {
//     return <img src={Empty.VIDEO_PLAY_SMALL_1X1} alt="" className="post-thumb-overlay-movie type-movie"/>;
//   } else {
//     return null;
//   }
// };

/**
 * sp headline 出力を汎用化
 * @since 2016-09-16
 */
export class SPComponentHeadlineArticle extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentHeadlineArticle.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * bind 済み gaSend 関数
     * @type {Function}
     */
    this.boundGa = this.gaSend.bind(this);
  }
  /**
   * headline 一記事をレンダリングします
   * @return {XML} headline 一記事 `li.board-item` を返します
   */
  render() {
    const props = this.props;

    return (
      <li className={`board-item board-item-${props.index}`}>
        <a className="post" href={props.url} onClick={this.boundGa}>
          <ComponentArticleThumbnail
            mediaType={props.mediaType}
            thumbnail={props.thumbnail}
            title={props.title}
            recommend={false}
            small={true}
          />
          <div className="post-data">
            <h3 className="post-heading">{props.title}</h3>
            <p className={`post-category post-category-${props.slug || 'x'}`}>
              <CategoryLabelNode
                categories={props.categories}
                id={`archive-label-${props.id}`}
                index={props.index}
              />
            </p>
            <p className="post-date">{props.date}</p>
          </div>
        </a>
      </li>
    );
  }
  /**
   * GA 計測タグ `xxx_headline` を送信します
   */
  gaSend() {
    // ----------------------------------------------
    // GA 計測タグ
    let prefix = 'home';
    if (!this.props.home) {
      prefix = this.props.slug;
    }
    Ga.add( new GaData('SPViewHeadline.gaSend', `${prefix}_headline`, 'click', this.props.url, parseFloat(this.props.id)) );
    // ----------------------------------------------
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{index: number, id: string, slug: string, categories: Array<CategoriesDae>, url: string, date: string, title: string, thumbnail: string, mediaType: string, home: boolean}} React props
   */
  static get propTypes() {
    return {
      index: React.PropTypes.number.isRequired,
      id: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      categories: React.PropTypes.array.isRequired,
      url: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      thumbnail: React.PropTypes.string.isRequired,
      mediaType: React.PropTypes.string.isRequired,
      home: React.PropTypes.bool.isRequired
    };
  }
}

// /**
//  * プロパティタイプ
//  * @type {{
//  *  index: number,
//  *  id: string,
//  *  slug: string,
//  *  categories: Array,
//  *  url: string,
//  *  date: string,
//  *  title: string,
//  *  thumbnail: string,
//  *  mediaType: string,
//  *  home: boolean
//  * }}
//  */
// SPComponentHeadlineArticle.propTypes = {
//   index: React.PropTypes.number.isRequired,
//   id: React.PropTypes.string.isRequired,
//   slug: React.PropTypes.string.isRequired,
//   categories: React.PropTypes.array.isRequired,
//   url: React.PropTypes.string.isRequired,
//   date: React.PropTypes.string.isRequired,
//   title: React.PropTypes.string.isRequired,
//   thumbnail: React.PropTypes.string.isRequired,
//   mediaType: React.PropTypes.string.isRequired,
//   home: React.PropTypes.bool.isRequired
// };
// /**
//  * デフォルトプロパティ定義
//  * @type {{home: boolean}}
//  */
// SPViewHeadline.defaultProps = {
//   home: false
// };
