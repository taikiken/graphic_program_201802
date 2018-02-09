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
// import { CategoryLabelNode } from '../../node/category/CategoryLabelNode';

// app
import { Empty } from '../../app/const/Empty';
import { MediaType } from '../../app/const/MediaType';

// Ga
import { Ga } from '../../ga/Ga';
import { GaData } from '../../ga/GaData';

// dae
import AnotherCategoriesDae from '../../dae/another-categories/AnotherCategoriesDae';
// import { ComponentCategoryLabels } from '../categories/ComponentCategoryLabels';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * {@link ComponentPickupArticle} - thumbnail video play 表示判定処理します
 * - 引数 type が `MediaType.VIDEO` と等しかったら`img` タグを返します。
 * - それ以外は `null` を返します
 * @param {string} type JSON response media type
 * @return {XML} `img` タグを返します
 */
const videoPlay = (type) => type === MediaType.VIDEO ? <img src={Empty.VIDEO_PICKUP_PLAY} alt="" className="overlay overlay-play" /> : null;
/**
 * カルーセルスライドショー一記事を作成します<br>
 * 記事クリックで GA 計測タグを送信します
 * @since 2016-09-15
 */
export default class ComponentPickupArticle extends React.Component {
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
   *  home: boolean,
   *  position: number
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
      home: React.PropTypes.bool.isRequired,
      // 現在 スライドNo.
      // @since 2017-03-28
      position: React.PropTypes.number.isRequired,
      // anotherCategories - 2017-09-14
      anotherCategories: React.PropTypes.instanceOf(AnotherCategoriesDae).isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentPickupArticle.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * bind済み gaSend
     * @type {function}
     */
    this.boundGa = this.gaSend.bind(this);
    /**
     * component state
     * - current {string} - CSS class
     * - position {number} - slide position
     * @type {{current: string, position: number}}
     * @since 2017-03-28 JS control
     */
    this.state = {
      current: props.index === props.position ? 'current' : '',
      position: props.position
    };
    /**
     * pager index
     * @type {number}
     * @since 2017-03-28 JS control
     */
    this.index = props.index;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
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
  // ------
  // delegate
  /**
   * property 変更をキャチし `state` を変更するかを決定します
   * - nextProps.position が 0 以上 - 循環アニメーションのために負数(index)を使用することがある
   * - 現在ポシションと次プロパティ・ポジションが違うと変更する
   * - nextProps.position と this.index が等価の時は CSS class `current` を与える
   * @param {Object} nextProps 更新されたプロパティ
   * @since 2017-03-28 JS control
   */
  componentWillReceiveProps(nextProps) {
    const position = nextProps.position;
    // console.log('ComponentPickupArticle.componentWillReceiveProps', this.index, position, this.state.position);
    if (position >= 0 && this.index < 1000 && position !== this.state.position) {
      let current = position === this.index ? 'current' : '';
      // length 2 の時は 4 としてコード運用する - +2 して再度比較します
      if (current === '' && this.props.length === 2) {
        current = position === (this.index + 2) ? 'current' : '';
      }
      // state update
      this.setState({ position, current });
    }
  }
  /**
   * カルーセルスライドショー一記事コンテナを作成します
   * @return {XML} カルーセルスライドショー一記事を返します `li.pickup`
   */
  render() {
    const props = this.props;

    return (
      <li id={`pickup-${props.index}`} className={`pickup pickup-${props.index} ${this.state.current}`}>
        <a href={props.url} style={{'background': `url(${props.large}) no-repeat 50% 50% / cover`}} onClick={this.boundGa}>
          <img src={Empty.KV_OVERLAY} alt="" className="overlay"/>
          {videoPlay(props.mediaType)}
          <div className="post-overview">
            {/*
            <p className={`post-category post-category-${props.slug}`}>
              <CategoryLabelNode
                categories={props.categories}
                id={`pickup-label-${props.id}`}
                index={props.index}
              />
            </p>
            */}
            {/*
            // category remove 2017-12-18
            <ComponentCategoryLabels
              categories={props.categories}
              id={`pickup-label-${props.id}`}
              index={props.index}
            />
            */}
            <h2 className="post-heading">{props.title}</h2>
            {/*
            // post date remove 2017-12-18
            <p className="post-date">{props.date}</p>
            */}
            {/*
            // @since 2016-10-01 remove comment count
            <p className="post-comment-num">{props.commentsCount}</p>
            */}
          </div>
        </a>
      </li>
    );
  }
}
