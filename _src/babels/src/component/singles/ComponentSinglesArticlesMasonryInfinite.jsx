/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/16 - 22:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Empty } from '../../app/const/Empty';

// view
import View from '../../view/View';
import ComponentArticleThumbnail from '../articles/ComponentArticleThumbnail';
import ComponentArticlePopular from '../articles/ComponentArticlePopular';

// data
import { Safety } from '../../data/Safety';

// node(ReactClass)
// import { CategoryLabelNode } from '../../node/category/CategoryLabelNode';
import ComponentCategoryLabels from '../categories/ComponentCategoryLabels';

// import ComponentSingleNewsAd from '../singles-content/ComponentSingleNewsAd';

// React
/**
 * [library] - React
 */
const React = self.React;
// const ReactDOM = self.ReactDOM;

// imagesLoaded, isotope
/**
 * [library] - imagesLoaded
 */
const imagesLoaded = self.imagesLoaded;
/**
 * [library] - Isotope
 */
const Isotope = self.Isotope;

/**
 * 記事一覧 + 無限スクロール + isotope
 * - {@link ComponentArticleThumbnail}
 * - {@link ComponentCategoryLabels}
 * - {@link ComponentArticlePopular}
 * 表示後に `Isotope` で `absolute` layout を実行します
 * @since 2016-09-15
 */
export class ComponentSinglesArticlesMasonryInfinite extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{list: Array<ArticleDae>, home: boolean, offset: number, length: number, action: Object, callback: Function, boundMore: Function, masonry: boolean}} React props
   */
  static get propTypes() {
    return {
      list: React.PropTypes.array.isRequired,
      // home container かのフラッグ
      home: React.PropTypes.bool.isRequired,
      // request offset
      offset: React.PropTypes.number.isRequired,
      // request length
      length: React.PropTypes.number.isRequired,
      // action instance
      action: React.PropTypes.object.isRequired,
      // executeSafely
      callback: React.PropTypes.func.isRequired,

      // more button createElement callback
      boundMore: React.PropTypes.func.isRequired,
      // need masonry flag
      masonry: React.PropTypes.bool.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティと初期変数を設定します
   * @param {Object} props React.props {@link ComponentSinglesArticlesMasonryInfinite.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * state option
     * @type {{
     *  arranged: string,
     *  list: Array.<ArticleDae>,
     *  offset: number,
     *  length: number
     * }}
     */
    this.state = {
      arranged: 'prepare',
      list: this.props.list,
      offset: this.props.offset,
      length: this.props.length,
      ad: this.props.ad
    };

    /**
     * Isotope instance
     * @protected
     * @type {null|Isotope}
     */
    this.isotope = null;
    /**
     * imagesLoaded instance
     * @protected
     * @type {null|imagesLoaded}
     */
    this.img = null;
    /**
     * 読み込んだelementを保持する配列
     * @protected
     * @type {Array}
     */
    this.elements = [];

    /**
     * bind 済み appendImages<br>
     * `componentDidUpdate` で event を bind します
     * `imagesLoaded.always` event handler<br>
     * 画像の読み込み完了を待って `isotope` レイアウトを行うために使用します
     * @type {function}
     */
    this.boundAppend = this.appendImages.bind(this);
    /**
     * bind 済み onImages<br>
     * `imagesLoaded.always` event handler<br>
     * 画像の読み込み完了を待って `isotope` レイアウトを行うために使用します
     * @type {function}
     */
    this.boundImages = this.onImages.bind(this);
    /**
     * Element - `div.board-large-column`
     * @type {?Element}
     */
    this.boardRout = null;
  }
  // ---------------------------------------------------
  // METHOD
  // ---------------------------------------------------
  /**
   * dom が更新されると呼び出される delegate
   */
  componentDidUpdate() {
    // isotope 対象 children
    // const boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
    const boardRout = this.boardRout;
    const childNodes = boardRout.childNodes;
    const elements = [];

    // 追加された Element を取得するための start / end point
    // start は request offset
    let i = this.state.offset;
    // end は request offset へ request length を加算したものと
    // children length の小さい方
    const limit = Math.min(i + this.state.length, childNodes.length);
    // start / end から 対象 children を選別
    for (; i < limit; i++) {
      elements.push(childNodes[i]);
    }

    this.elements = elements;

    const img = imagesLoaded(elements);
    // 画像読み込む完了 event へ bind します
    img.off('always', this.boundAppend);
    img.on('always', this.boundAppend);
    this.img = img;
  }
  /**
   * dom が表示された後に1度だけ呼び出される delegate
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
    // hasNext を元に More View button の表示非表示を決める
    this.props.boundMore(this.props.action.hasNext());

    // masonry flag が true の時に shouldMasonry を実行します
    if (this.props.masonry) {
      this.shouldMasonry();
    }
  }
  /**
   * dom が削除される前に呼び出される delegate
   */
  componentWillUnmount() {
    // unmount 時に isotope を破棄します
    if (this.isotope !== null) {
      this.isotope.destroy();
    }
  }
  /**
   * delegate - before props update
   * @param {{list: Array.<ArticleDae>, offset: number, length: number}} nextProps React next props
   */
  componentWillReceiveProps(nextProps) {
    const { list, offset, length } = nextProps;
    if (list || offset !== this.state.offset || length !== this.state.length) {
      this.setState({ list, offset, length });
    }
  }
  /**
   * div.board-large-column を出力します
   * @return {XML} board-large-column を返します
   */
  render() {
    // let adIndex = 0;
    let boardItems = [];
    this.state.list.forEach((dae, i) => {
      const commentsPopular = dae.commentsPopular;
      const commentsTotal = dae.commentsCount;
      const thumbnail = Safety.image( dae.media.images.medium, Empty.IMG_MIDDLE );
      // const AdAddIndex = (()=>{
      //   let id = null;
      //   if( ( i + 1 ) % 3 === 0 && i <= 31 ) {
      //     id = Number(this.state.ad[adIndex]);
      //     adIndex++;
      //   }
      //   return id;
      // })();
      boardItems.push(
        <div key={`archive-${dae.id}`} className={`board-item board-item-${i} board-item-${dae.mediaType}`}>
          <a className="post" href={dae.url}>
            <ComponentArticleThumbnail
              mediaType={dae.mediaType}
              thumbnail={thumbnail}
              title={dae.title}
              masonry={this.props.masonry}
              action={this.props.action}
              recommend={dae.isRecommend && this.props.home}
            />
            <div className="post-data">
              <h3 className="post-heading">{dae.title}</h3>
              <ComponentCategoryLabels
                categories={dae.categories.all}
                id={`post-archive-${dae.id}`}
                index={i}
                mediaType={dae.mediaType}
                recommend={dae.isRecommend && this.props.home}
                anotherCategories={dae.anotherCategories}
              />
            </div>
          </a>
          <ComponentArticlePopular
            key={`comment-${dae.id}`}
            uniqueId={`comment-${dae.id}`}
            commentsPopular={commentsPopular}
            total={commentsTotal}
            articleId={String(dae.id)}
          />
        </div>
      );
      // if(AdAddIndex) {
      //   boardItems.push(
      //     <div key={`archive-adgene-${dae.id}`} className={`board-item board-item-adgene`}>
      //       <ComponentSingleNewsAd
      //         ad={AdAddIndex}
      //         category={this.props.category}
      //       />
      //     </div>
      //   );
      // }
    });
    return (
      <div
        ref={(element) => (this.boardRout = element)}
        className="board-large-column"
        style={{minHeight: '330px'}}
      >
        {boardItems}
      </div>
    );
  }
  // -----------------------------------------------------
  // 以降 custom
  /**
   * isotope 前準備
   */
  shouldMasonry() {
    // isotope 前準備を実行します
    // const boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
    const boardRout = this.boardRout;
    const childNodes = boardRout.childNodes;

    // imagesLoaded を使用し画像ロード完了後に isotope を実行します
    const img = imagesLoaded(childNodes);
    // img {imagesLoaded} always event handler unbind するためにインスタンスを保存します
    this.img = img;
    // 画像読み込む完了 event へ bind します
    img.on('always', this.boundImages);
  }
  /**
   * didUpdate から呼び出される
   */
  appendImages() {
    // event から event handler を unbind します
    this.img.off('always', this.boundAppend);

    // 追加とレイアウト
    this.isotope.appended(this.elements);
    // reload
    // http://isotope.metafizzy.co/methods.html#reloaditems
    this.isotope.reloadItems();
    // isotope 再度レイアウト
    this.isotope.layout();

    // hasNext を元に More View button の表示非表示を決める
    this.props.boundMore(this.props.action.hasNext());
  }
  /**
   * 画像読み込む完了 event handler, isotope を実行
   */
  onImages() {
    // event から event handler を unbind します
    this.img.off('always', this.boundImages);

    // isotope を行います
    // const boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
    const boardRout = this.boardRout;
    this.isotope = new Isotope(boardRout, {
      itemSelector: '.board-item',
      masonry: {
        // gutter: 30
        // 2016-04-29
        // gutter: 28
        // 2017-12-18
        gutter: 20,
      }
    } );
  }
  // /**
  //  * 次の読み込みから表示を更新します
  //  * @param {Array} list 表示リスト
  //  * @param {number} offset 読み込み開始位置
  //  * @param {number} length 読み込み数
  //  */
  // updateList(list, offset, length) {
  //   // state を変更し appendChild + isotope を行う
  //   this.setState({ list, offset, length });
  // }
}
