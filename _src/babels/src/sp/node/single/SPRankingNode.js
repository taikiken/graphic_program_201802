/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/29 - 20:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
// import {Message} from '../../../app/const/Message';
import {Empty} from '../../../app/const/Empty';
// dae
import {ArticleDae} from '../../../dae/ArticleDae';
// data
import {Safety} from '../../../data/Safety';
// view
import {View} from '../../../view/View';
// node
import {RankingNode} from '../../../node/sidebar/RankingNode';

// React
let React = self.React;

/**
 * div.widget-ranking タグを作成します
 * @type {*|Function|ReactClass}
 */
export let SPRankingNode = React.createClass( {
  propTypes: {
    list: React.PropTypes.array.isRequired,
    home: React.PropTypes.bool.isRequired,
    detail: React.PropTypes.bool.isRequired,
    slug: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    scope: React.PropTypes.object.isRequired,
    aa: React.PropTypes.string
  },
  render: function() {

    let list = this.props.list;
    let home = this.props.home;
    let detail = this.props.detail;
    let thisSlug = this.props.slug;
    
    // return null;
    return (

      <div className="widget-ranking">
        {/* title */}
        <div className="mod-headingA01">
          <h2>{this.props.title}</h2>
        </div>
        <ul className="board">
          {
            list.map( function( article, i ) {

              let dae = new ArticleDae( article );
              let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );
              let empty = thumbnail === Empty.IMG_SMALL;

              // RankingDom instance を使い render
              return (
                <RankingNode
                  key={'ranking-' + dae.id}
                  index={i}
                  id={String( dae.id )}
                  slug={dae.categories.slug}
                  categories={dae.categories.all}
                  url={dae.url}
                  date={dae.displayDate}
                  title={dae.title}
                  thumbnail={thumbnail}
                  empty={empty}
                  total={dae.commentsCount}
                  home={home}
                  detail={detail}
                  thisSlug={thisSlug}
                  categorySlug={thisSlug}
                />
              );

            } )
          }
        </ul>
      </div>

    );

  },
  componentDidMount: function() {
    // after mount
    this.props.scope.executeSafely.call( this, View.DID_MOUNT );
  }
} );
