/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/16 - 18:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// 2016-06-16
// sp にも人気記事表示が必要になったので ViewRanking から分離しました

// app
import {Empty} from '../../app/const/Empty';

// Ga
import {Ga} from '../../ga/Ga';
import {GaData} from '../../ga/GaData';

// React
let React = self.React;
// let ReactDOM = self.ReactDOM;

/**
 * <p>category, category2 から categories を使用する<br>
 * .category-label-wrapper カテゴリー表示</p>
 * @from 2016-06-16
 * @type {Function|ReactClass}
 * @private
 */
let CategoryListNode = React.createClass( {
  propTypes: {
    index: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <span className="category-label-wrapper">
        {
          this.props.categories.map( ( category:Object, i:Number ) => {
            return <span key={`ranking-${this.props.id}-${this.props.index}-${i}`} className="category-label">{category.label}</span>;
          } )
        }
      </span>
    );
  }
} );

/**
 * <p>人気記事一覧</p>
 * <p>SPに人気記事一覧を記事詳細に追加することになったので共通で使用できるように独立させました</p>
 * @from 2016-06-16
 * @type {Function|ReactClass}
 */
export const RankingNode = React.createClass( {
  propTypes: {
    index: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    // slug: React.PropTypes.string.isRequired,
    // category: React.PropTypes.string.isRequired,
    // category2: React.PropTypes.string,
    categories: React.PropTypes.array.isRequired,
    url: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
    empty: React.PropTypes.bool.isRequired,
    total: React.PropTypes.number.isRequired,
    home: React.PropTypes.bool.isRequired,
    detail: React.PropTypes.bool.isRequired,
    thisSlug: React.PropTypes.string.isRequired,
    categorySlug: React.PropTypes.string.isRequired
  },
  getDefaultPropTypes: function() {
    return {
      category2: ''
    };
  },
  render: function() {
    let p = this.props;
    let standing = p.index + 1;
    let imgStyle = {
      'background': `url(${p.thumbnail}) no-repeat center center`,
      'backgroundSize': 'cover'
    };

    // categories 配列の label をつなげる
    let slugAll = ( categories:Array ):string => {
      let cats = '';
      categories.map( ( category:Object, index:Number ) => {
        cats += `${index !== 0 ? '-' : ''}${category.slug}`;
      } );

      return cats;
    };

    /*
     https://github.com/undotsushin/undotsushin/issues/468
     1x1 を厳格に守る
     <img src={p.thumbnail} alt={p.title}/>
     */
    return (
      <li className={'board-item rank' + standing + ' ranking-' + (slugAll( p.categories ))}>
        <a href={p.url} className={'post'} onClick={this.gaSend}>
          <figure className={`post-thumb${ this.props.empty ? '' : ' post-thumb-fill' }`} style={imgStyle}>
            <img src={Empty.THUMB_EMPTY} alt=""/>
          </figure>
          <div className="post-data">
            <p className={'post-category post-category-' + slugAll( p.categories )}>
              <CategoryListNode
                categories={p.categories}
                id={p.id}
                index={p.index}
              />
            </p>
            <h4 className="post-heading">{p.title}</h4>
            <p className="post-date">{p.date}</p>
          </div>
        </a>
      </li>
    );
  },
  // gaSend: function(e) {
  //   e.preventDefault();
  gaSend: function() {
    if (this.props.home) {
      this.gaHome();
    } else if (this.props.detail) {
      this.gaDetail();
    } else {
      this.gaCategory();
    }
  },
  gaHome: function() {
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData('RankingNode.gaHome', 'home_ranking', 'click', this.props.url, parseFloat(this.props.id)) );
    // ----------------------------------------------
  },
  gaCategory: function() {
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData('RankingNode.gaCategory', `${this.props.thisSlug}_ranking`, 'click', this.props.url, parseFloat(this.props.id)) );
    // ----------------------------------------------
  },
  gaDetail: function() {
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData('RankingNode.gaDetail', 'detail_ranking', 'click', this.props.url, parseFloat(this.props.id)) );
    // ----------------------------------------------
  }
} );
