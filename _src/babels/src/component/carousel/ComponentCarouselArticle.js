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

// node
import { CategoryLabelNode } from '../../node/category/CategoryLabelNode';

// app
import { Empty } from '../../app/const/Empty';
import { MediaType } from '../../app/const/MediaType';

// Ga
import { Ga } from '../../ga/Ga';
import { GaData } from '../../ga/GaData';

// React
const React = self.React;

/**
 * 引数 type が `MediaType.VIDEO` と等しかったら<br>
 *  `img` タグを返します。<br>
 *  それ以外は `null` を返します
 * @param {string} type JSON response media type
 * @return {XML} `img` タグを返します
 */
const videoPlay = (type) => type === MediaType.VIDEO ? <img src={Empty.VIDEO_PICKUP_PLAY} alt="" className="overlay overlay-play" /> : null;
/**
 * カルーセルスライドショー一記事を作成します<br>
 * 記事クリックで GA 計測タグを送信します
 * @since 2016-09-15
 */
export class ComponentCarouselArticle extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentCarouselArticle.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * bind済み gaSend
     * @type {function}
     */
    this.boundGa = this.gaSend.bind(this);
  }
  /**
   * カルーセルスライドショー一記事コンテナを作成します
   * @return {XML} カルーセルスライドショー一記事を返します
   */
  render() {
    const props = this.props;

    return (
      <li id={`pickup-${props.index}`} className={`pickup pickup-${props.index}`}>
        <a href={props.url} style={{'background': `url(${props.large}) no-repeat 50% 50% / cover`}} onClick={this.boundGa}>
          <img src={Empty.KV_OVERLAY} alt="" className="overlay"/>
          {videoPlay(props.mediaType)}
          <div className="post-overview">
            <p className={`post-category post-category-${props.slug}`}>
              <CategoryLabelNode
                categories={props.categories}
                id={`pickup-label-${props.id}`}
                index={props.index}
              />
            </p>
            <h2 className="post-heading">{props.title}</h2>
            <p className="post-date">{props.date}</p>
            {/*
            // @since 2016-10-01 remove comment count
            <p className="post-comment-num">{props.commentsCount}</p>
            */}
          </div>
        </a>
      </li>
    );
  }
  /**
   * GA 計測タグを送信します {@link Ga.add}, {@link GaData}
   */
  gaSend() {
    // ----------------------------------------------
    // GA 計測タグ
    const tag = this.props.home ? 'home_pickup' : `${this.props.slug}_pickup`;
    Ga.add( new GaData('ComponentCarouselArticle.gaSend', tag, 'click', this.props.url, parseFloat(this.props.id)) );
    // ----------------------------------------------
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  index: number,
   *  id: string,
   *  slug: string,
   *  categories: Array<SlugDae>,
   *  url: string,
   *  date: string,
   *  title: string,
   *  large: string,
   *  commentsCount: number,
   *  mediaType: string,
   *  home: boolean
   * }} React props
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
      large: React.PropTypes.string.isRequired,
      commentsCount: React.PropTypes.number.isRequired,
      mediaType: React.PropTypes.string.isRequired,
      // home であるかを表す
      home: React.PropTypes.bool.isRequired
    };
  }
}
//
// /**
//  * ViewCarouselArticle React プロパティー
//  * @static
//  * @type
//  * {{
//  *  index: number,
//  *  id: string,
//  *  slug: string,
//  *  categories: [string],
//  *  url: string,
//  *  date: string,
//  *  title: string,
//  *  large: string,
//  *  commentsCount: number,
//  *  mediaType: string,
//  *  home: boolean
//  * }}
//  */
// ComponentCarouselArticle.propTypes = {
//   index: React.PropTypes.number.isRequired,
//   id: React.PropTypes.string.isRequired,
//   slug: React.PropTypes.string.isRequired,
//   categories: React.PropTypes.array.isRequired,
//   url: React.PropTypes.string.isRequired,
//   date: React.PropTypes.string.isRequired,
//   title: React.PropTypes.string.isRequired,
//   large: React.PropTypes.string.isRequired,
//   commentsCount: React.PropTypes.number.isRequired,
//   mediaType: React.PropTypes.string.isRequired,
//   // home であるかを表す
//   home: React.PropTypes.bool.isRequired
// };
//
// /**
//  * デフォルト・プロパティ, home を false 設定します
//  * @static
//  * @type {{home: boolean}}
//  */
// ComponentCarouselArticle.defaultProps = {
//   home: false
// };
