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
import View from '../../view/View';

// view/headlines
import ComponentHeadlineArticle from './ComponentHeadlineArticle';

// app
import { Empty } from '../../app/const/Empty';
// import { Message } from '../../app/const/Message';
import { Ad } from '../../app/const/Ad';

// data
import { Safety } from '../../data/Safety';
import { ArticleDae } from '../../dae/ArticleDae';
import { RelatedDae } from '../../dae/RelatedDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * div.headline を出力します
 * - {@link ComponentHeadlineArticle}
 * @since 2016-09-17
 */
export default class ComponentHeadlines extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{list: Array<ArticleDae>, callback: Function, home: boolean }} React props
   */
  static get propTypes() {
    return {
      // articles 配列を元にDomを作成する
      // list: React.PropTypes.array.isRequired,
      list: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
          React.PropTypes.instanceOf(ArticleDae).isRequired,
          React.PropTypes.instanceOf(RelatedDae).isRequired,
        ]).isRequired,
      ).isRequired,
      callback: React.PropTypes.func.isRequired,
      home: React.PropTypes.bool
    };
  }
  /**
   * defaultProps
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
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentHeadlines.propTypes}
   */
  constructor(props) {
    super(props);
    // ---
    this.sponsorLink = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * マウント時に call され、View.DID_MOUNT を通知します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
    this.ad();
  }
  /**
   * headline 6 件目の広告<br>
   * `app/template/desktop/index.php`#line.27
   * @since 2016-10-03
   */
  ad() {
    // const element = this.refs.sponsorLink;
    const element = this.sponsorLink;
    if (!element) {
      return;
    }
    const div = document.createElement('div');
    const script = document.createElement('script');
    script.src = `${Ad.host()}/sdk/js/adg-script-loader.js?id=34481&targetID=adg_34481&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0`;
    div.appendChild(script);
    element.appendChild(div);
  }
  /**
   * div.headline を出力します<br>
   * this.props.list.length が `0` の時は null を返します
   * @return {?XML} div.headline を返します
   */
  render() {
    const { list, home } = this.props;
    // length check
    if (list.length === 0) {
      return null;
    }
    console.log('ComponentHeadlines.render', list);
    // const home = this.props.home;

    return (
      <div className="headline">
        {/*
        // 2017-12-18 トルツメ
        <div className="headline-heading">
          <h2 className="headline-heading-title"><img src="/assets/images/common/headline-heading.png" alt="HEADLINE NEWS" /></h2>
          <span className="headline-heading-ruby">{Message.HEADLINE_TITLE}</span>
        </div>
        */}
        <div className="board-small column2">
          {
            list.map((dae, i) => {
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
                  anotherCategories={dae.anotherCategories}
                  isNew={dae.isNew || false}
                />
              );
            })
          }
          <div className="board-item sponsor-link">
            <div ref={(element) => (this.sponsorLink = element)} />
          </div>
        </div>
      </div>
    );
  }
}
