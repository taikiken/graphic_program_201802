/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/29 - 16:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Message} from '../../app/const/Message';

// React
let React = self.React;

/**
 * <p>sidebar recommend title</p>
 * <p>オススメ動画 / おすすめ記事 で共通なので</p>
 * @type {*|Function}
 */
export const RecommendTitleNode = React.createClass( {
  propTypes: {
    slug: React.PropTypes.string.isRequired,
    // category label
    label: React.PropTypes.string,
    // 大見出し
    title: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      label: '',
      title: Message.VIDEOS_TITLE
    };
  },
  render: function() {
    let categoryTitle = '';
    let categoryLabel = this.props.label;
    
    // category api slug が `all` 以外の時に category.label をタイトルに含める
    if ( this.props.slug !== 'all' ) {
      if ( categoryLabel !== '' ) {
        // category.label が空でなかったら '/' と一緒に加える
        categoryTitle = ' / ' + categoryLabel;
      }
    }
    
    // RECOMMEND title
    return (
      <div className="widget-recommend-heading">
        <h3 className="widget-recommend-heading-title">RECOMMEND</h3>
        <span className="widget-recommend-heading-ruby">{this.props.title}{categoryTitle}</span>
      </div>
    );
  }
} );
