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
import View from '../../../view/View';
import SPComponentSingleHeadlineArticle from './SPComponentSingleHeadlineArticle';

// app
import { Empty } from '../../../app/const/Empty';
// import { Message } from '../../../app/const/Message';
// import { Ad } from '../../../app/const/Ad';

// data
import { Safety } from '../../../data/Safety';
import { ArticleDae } from '../../../dae/ArticleDae';
import { RelatedDae } from '../../../dae/RelatedDae';
import SPComponentSingleHeadlineArticleAd from './SPComponentSingleHeadlineArticleAd';
import { AdDae } from '../../../dae/theme/AdDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * SP: headline 記事一覧を出力します
 * - {@link SPComponentSinglesHeadlines}
 *   - {@link SPComponentSingleHeadlineArticle}
 *     - {@link ComponentArticleThumbnail}
 *     - {@link ComponentCategoryLabels}
 * - {@link SPComponentSingleHeadlineArticleAd}
 *
 * @since 2016-09-16
 */
export default class SPComponentSinglesHeadlines extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *   list: Array.<ArticleDae>,
   *   callback: Function,
   *   home: boolean,
   *   archive: boolean
   * }} React props
   */
  static get propTypes() {
    return {
      // Array.<ArticleDae>
      // list: React.PropTypes.array.isRequired,
      list: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
          React.PropTypes.instanceOf(ArticleDae).isRequired,
          React.PropTypes.instanceOf(RelatedDae).isRequired,
        ]).isRequired,
      ).isRequired,
      // executeSafely.bind
      callback: React.PropTypes.func.isRequired,
      ad: React.PropTypes.instanceOf(AdDae),
      home: React.PropTypes.bool,
      archive: React.PropTypes.bool,
    };
  }
  /**
   * defaultProps, home を false 設定します
   * - home - home flag
   * - archive - category headline flag
   * @return {{home: boolean, archive: boolean}} React props
   */
  static get defaultProps() {
    return {
      home: false,
      archive: false,
      ad: new AdDae({}),
    };
  }
  // // ---------------------------------------------------
  // //  CONSTRUCTOR
  // // ---------------------------------------------------
  // /**
  //  * default property を保存し必要な関数・変数を準備します
  //  * @param {Object} props React props プロパティー {@link SPComponentSinglesHeadlines.propTypes}
  //  */
  // constructor(props) {
  //   super(props);
  //   // ---
  //   this.sponsorLink = null;
  //   console.log('SPComponentSinglesHeadlines', props);
  // }
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
    if (typeof this.props.callback === 'function') {
      this.props.callback(View.DID_MOUNT);
    }
    // this.ad();
  }
  // /**
  //  * headline 6 件目の広告<br>
  //  * `app/template/mobile/index.php`#line.27
  //  * @since 2016-10-03
  //  */
  // ad() {
  //   const element = this.sponsorLink;
  //   if (!element) {
  //     return;
  //   }
  //
  //   const div = document.createElement('div');
  //   const script = document.createElement( 'script' );
  //   script.src = `${Ad.ssl()}/sdk/js/adg-script-loader.js?id=42707&targetID=adg_42707&displayid=2&adType=INFEED&async=false&async=true&tagver=2.0.0`;
  //   div.appendChild(script);
  //   element.appendChild(div);
  // }
  /**
   * `div.headline-root` を作成し headline 一覧を出力します
   * @return {?XML} `div.headline-root` あるいは null を返します
   */
  render() {
    // const { list, home, archive } = this.props;
    const { list, home, ad } = this.props;
    if (list.length === 0) {
      return null;
    }
    // console.log('SPComponentSinglesHeadlines.render this.props', this.props);
    return (
      <div className="headline-root">
        <div className="headline">
          {/* @since 2016-09-2 title 必須になりました */}
          {/*
          // 2017-12-18 トルツメ
          <div className="headline-heading">
            <h2 className="headline-heading-title">{Message.HEADLINE_TITLE}</h2>
          </div>
          */}
          {/* // 2018-01-16 mod-headingA01追加 */}
          <div className="mod-headingA01">
            <h2>
              <img src="/assets/sp/images/detail/ttl_headline.png" alt="HEADLINE" />
              編集部おすすめ記事
            </h2>
          </div>
          <div className="board">
            {
              /* @since 2016-09-20 16x9 thumbnail changed */
              list.map((dae, i) => {
                // const thumbnail = Safety.image(dae.media.images.medium, Empty.IMG_MIDDLE);
                const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.THUMB_EMPTY);
                let adID = null;
                if( i === 0 ) {
                  adID = Number(ad[0]);
                } else if( i === 3 ) {
                  adID = Number(ad[1]);
                }
                if(i < 5) {
                  return (
                    <div className="headline__wrapper">
                      <SPComponentSingleHeadlineArticle
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
                        anotherCategories={dae.anotherCategories}
                        isNew={dae.isNew || false}
                      />
                      <SPComponentSingleHeadlineArticleAd
                        index={i}
                        ad={adID}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })
            }
            {/*
            <div className="board-item sponsor-link">
              <div ref={(element) => (this.sponsorLink = element)} />
            </div>
            */}
            {/* <SPComponentSingleHeadlineArticleAd
              ad={ad}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}
