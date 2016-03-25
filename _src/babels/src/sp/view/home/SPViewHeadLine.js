/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 22:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent
import {ViewHeadline} from '../../../view/home/ViewHeadline';

// view
import {View} from '../../../view/View';

// app
import {Empty} from '../../../app/const/Empty';
// import {User} from '../../../app/User';

// dae
import {ArticleDae} from '../../../dae/ArticleDae';

// data
import {Safety} from '../../../data/Safety';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP home headline
 */
export class SPViewHeadLine extends ViewHeadline {
  /**
   * SP home headline
   * @param {Element} element コンテンツ基点Element
   * @param {Object} [option={}] callback 関数をセット
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }

  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    let _this = this;

    /**
     * headline first big size
     * home headline の最初の1件を大きく表示する
     * @private
     * @type {ReactClass}
     */
    let HeadlineFirstDom = React.createClass( {
      propTypes: {
        // ArticleDae instance, 記事情報
        dae: React.PropTypes.object.isRequired
      },
      render: function() {

        let dae = this.props.dae;

        /*
        let thumbnail = dae.media.images.large;

        // thumbnail を check しなければ代替画像にする
        if ( !thumbnail ) {
          thumbnail = Empty.IMG_LARGE;
        } else if ( !Safety.isImg( thumbnail ) ) {
          // 画像ファイル名に拡張子がないのがあったので
          // 拡張子チェックを追加
          if ( !Safety.isGraph( thumbnail ) ) {
            thumbnail = Empty.IMG_LARGE;
          }
        }
        */
        let thumbnail = Safety.image( dae.media.images.large, Empty.IMG_LARGE );

        let category = ( label ):string => {
          return !label ? '' : <span className="category-label">{label}</span>;
        };

        return (
          <div className="hero-sec">
            <a href={dae.url}>
              <img src={thumbnail} alt=""/>
              <div className="post-overview">
                <h2 className="post-heading">{dae.title}</h2>
                <p className={'post-category post-category-' + dae.category.slug}>{category(dae.category.label)}{category(dae.category2.label)}</p>
                <p className="post-date">{dae.displayDate}</p>
                <p className="post-comment-num">{dae.commentsCount}</p>
              </div>
            </a>
          </div>
        );
      }
    } );

    /**
     * headline の各 1記事
     * li で出力
     * @private
     * @type {ReactClass}
     */
    let HeadlineDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        category2: React.PropTypes.string,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired
      },
      getDefaultPropTypes: function() {
        return {
          category2: ''
        };
      },
      render: function() {
        let p = this.props;

        let category = ( label ):string => {
          return !label ? '' : <span className="category-label">{label}</span>;
        };

        return (
          <li className={'board-item board-item-' + p.index}>
            <a className="post" href={p.url}>
              <figure className="post-thumb"><img src={p.thumbnail} alt={p.title}/></figure>
              <div className="post-data">
                <p className={'post-category post-category-' + p.slug}>{category(p.category)}{category(p.category2)}</p>
                <h3 className='post-heading'>{p.title}</h3>
                <p className="post-date">{p.date}</p>
              </div>
            </a>
          </li>
        );
      }
    } );

    // React Class
    /**
     * SP home headline 基点 class
     * @private
     * @type {ReactClass}
     */
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      render: function() {

        let list = this.props.list;
        let first = new ArticleDae( list.shift() );

        return (

          <div className="headline-root">
            {/* 1件目は大きく表示する */}
            <HeadlineFirstDom
              dae={first}
            />

            <div className="headline">
              <ul className="board-small">
                {
                  list.map( function( article, i ) {

                    let dae = new ArticleDae( article );
                    /*
                    let thumbnail = dae.media.images.thumbnail;

                    // thumbnail を check しなければ代替画像にする
                    if ( !thumbnail ) {
                      thumbnail = Empty.IMG_SMALL;
                    } else if ( !Safety.isImg( thumbnail ) ) {
                      // 画像ファイル名に拡張子がないのがあったので
                      // 拡張子チェックを追加
                      if ( !Safety.isGraph( thumbnail ) ) {
                        thumbnail = Empty.IMG_SMALL;
                      }
                    }
                    */
                    let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );

                    // HeadlineDom instance を使い render
                    return <HeadlineDom
                      key={'headline-' + dae.id}
                      index={i}
                      id={String( dae.id )}
                      slug={dae.category.slug}
                      category={dae.category.label}
                      category2={dae.category2.label}
                      url={dae.url}
                      date={dae.displayDate}
                      title={dae.title}
                      thumbnail={thumbnail}
                    />;

                  } )
                }
              </ul>
            </div>

          </div>

        );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );

      }
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: articles } ),
      this.element
    );

  }// render
}
