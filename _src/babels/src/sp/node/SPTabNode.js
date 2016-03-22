/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/10 - 21:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// React
let React = self.React;

/**
 * SP archive ページ 切替タブ
 * @type {ReactClass}
 */
export let SPTabNode = React.createClass( {
  propTypes: {
    callback: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      current: 'latest',
      fixed: 'fixed-top'
    };
  },
  render: function() {
    return (
      <nav className={`lnav ${this.state.fixed} ${this.state.current}`}>
        <ul className="lnav-list">
          <li className="lnav-item">
            <a href="#latest" className="lnav-link lnav-link_new" onClick={this.latestClick}>
              <span className="lnav-icon">新着</span>
            </a>
          </li>
          <li className="lnav-item">
            <a href="#ranking" className="lnav-link lnav-link_popular" onClick={this.rankingClick}>
              <span className="lnav-icon">人気</span>
            </a>
          </li>
          <li className="lnav-item">
            <a href="#videos" className="lnav-link lnav-link_movie" onClick={this.videosClick}>
              <span className="lnav-icon">動画</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  },
  componentDidMount: function() {

  },
  componentWillUnMount: function() {

  },
  latestClick( event:Event ):void {
    event.preventDefault();
    this.props.callback( 'latest' );
    this.setState( { current: 'latest' } );
  },
  rankingClick( event:Event ):void {
    event.preventDefault();
    this.props.callback( 'ranking' );
    this.setState( { current: 'ranking' } );
  },
  videosClick( event:Event ):void {
    event.preventDefault();
    this.props.callback( 'videos' );
    this.setState( { current: 'videos' } );
  }
} );
