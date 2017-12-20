/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/19 - 21:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Empty } from '../../app/const/Empty';
import { MediaType } from '../../app/const/MediaType';

// // node
// import { CategoryLabelNode } from '../../node/category/CategoryLabelNode';

// util
import { Elements } from '../../util/Elements';
import { Num } from '../../util/Num';

// Ga
import { Ga } from '../../ga/Ga';
import { GaData } from '../../ga/GaData';

// dae
import AnotherCategoriesDae from '../../dae/another-categories/AnotherCategoriesDae';
import { ComponentCategoryLabels } from '../categories/ComponentCategoryLabels';

// React
/**
 * [library] - React
 */
const React = self.React;

// ----------------------------------------

/**
 * mediaType で play button を表示するかを判断しタグを返します
 * @param {string} mediaType media type, video / image...
 * @return {?XML} play button を表示する時は img tag をそうでない時は null を返します
 */
const playMark = (mediaType) => {
  if (mediaType === MediaType.VIDEO) {
    return <img src={Empty.VIDEO_PLAY_SMALL_1X1} alt="" className="post-thumb-overlay-movie type-movie"/>;
  }

  return null;
};

/**
 * headline の 1記事
 * @since 2016-09-17
 */
export default class ComponentHeadlineArticle extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  index: number,
   *  id: string,
   *  slug: string,
   *  categories: array,
   *  url: string,
   *  date: string,
   *  title: string,
   *  thumbnail: string,
   *  mediaType: string,
   *  home: bool
   * }} React props
   */
  static get propTypes() {
    return {
      index: React.PropTypes.number.isRequired,
      id: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      // @since 2016-06-27 categories へ切替
      // category: React.PropTypes.string.isRequired,
      // category2: React.PropTypes.string,
      categories: React.PropTypes.array.isRequired,
      url: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      thumbnail: React.PropTypes.string.isRequired,
      mediaType: React.PropTypes.string.isRequired,
      home: React.PropTypes.bool.isRequired,
      // anotherCategories - 2017-09-14
      anotherCategories: React.PropTypes.instanceOf(AnotherCategoriesDae).isRequired,
    };
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 文字を切りつめます
   * @param {string} title 対象文字
   * @param {number} [length=35] 最長文字数、将来表示画像が 16x9 にデザイン変更になった時は数値を見直します
   * @return {string} 最長文字数を超えたら `…` 三点リーダー付きで返します
   * @since 2016-11-15
   */
  static reduce(title, length = 35) {
    if (title.length > length) {
      return `${title.substr(0, length - 1)}…`;
    }
    return title;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentHeadlineArticle.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * bind済み gaSend
     * @type {function}
     */
    this.boundGa = this.gaSend.bind(this);
    /**
     * h3 title tag
     * @type {?Element}
     * @since 2016-11-15
     */
    this.h3 = null;
    /**
     * React state
     * - @type {string} title - title に表示するテキスト、文字数が多い時は切りつめ処理を行います
     * @type {{title: string}}
     * @since 2016-11-15
     */
    this.state = {
      title: props.title
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * マウント後に h3.height をチェックします
   * @since 2016-11-15
   */
  componentDidMount() {
    if (this.h3 !== null) {
      this.titleLength();
    }
  }
  /**
   * h3.height が CSS.min-height を超えていたら<br>
   * タイトル文字長をチェックし切りつめします
   * @since 2016-11-15
   */
  titleLength() {
    const h3 = new Elements(this.h3);
    // Edge は height が常に大きいので小数点1位で切り捨てて比較します
    const minHeight = Num.float(parseFloat(h3.style.get('minHeight')));
    const offset = h3.offset();
    const height = Num.float(offset.height);
    // console.log('min-height', this.props.id, minHeight, height);
    if (height <= minHeight) {
      return;
    }
    const title = ComponentHeadlineArticle.reduce(this.props.title);
    this.setState({ title });
  }
  /**
   * headline 1記事を作成します
   * @return {XML} headline 1記事を返します
   */
  render() {
    const {
      index,
      url,
      title,
      thumbnail,
      mediaType,
      categories,
      id,
      anotherCategories,
      date,
    } = this.props;
    return (
      <li className={`board-item board-item-${index}`}>
        <a className="post" href={url} onClick={this.boundGa}>
          <figure className="post-thumb post-thumb-headline">
            <img src={thumbnail} alt={title}/>
            {playMark(mediaType)}
          </figure>
          <div className="post-data">
            <h3
              className="post-heading"
              ref={(component) => (this.h3 = component)}
            >
              {this.state.title}
            </h3>
            {/*
            <p className={`post-category post-category-${props.slug}`}>
              <CategoryLabelNode
                categories={this.props.categories}
                id={`headline-label-${this.props.id}`}
                index={this.props.index}
                mediaType={this.props.mediaType}
                recommend={false}
                anotherCategories={this.props.anotherCategories}
              />
            </p>
            */}
            <ComponentCategoryLabels
              categories={categories}
              id={`headline-label-${id}`}
              index={index}
              mediaType={mediaType}
              recommend={false}
              anotherCategories={anotherCategories}
            />
            <p className="post-date">{date}</p>
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
    const tag = this.props.home ? 'home' : this.props.slug;
    Ga.add(new GaData('ComponentHeadlineArticle.gaSend', `${tag}_headline`, 'click', this.props.url, parseFloat(this.props.id)));
    // ----------------------------------------------
  }
}
