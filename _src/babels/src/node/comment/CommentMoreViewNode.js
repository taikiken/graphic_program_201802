/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/12 - 22:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


let React = self.React;

// --------------------------------------------
// More button
// --------------------------------------------
/**
 * コメント[More View] button + 残件数表示
 * @type {ReactClass}
 */
export let CommentMoreViewNode = React.createClass( {
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    action: React.PropTypes.object.isRequired,
    rest: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      show: false,
      rest: 0
    };
  },
  getInitialState: function() {
    return {
      loading: '',
      show: this.props.show,
      rest: this.props.rest
    };
  },
  render: function() {

    // hasNext: true, button を表示する？
    if ( this.state.show && this.state.rest > 0 ) {

      return (
        <div id="more" className={'comment-andmore loading-root ' + this.state.loading}>
          <a href={'#more'} onClick={this.handleClick} >他{this.state.rest}件を表示</a>
          <span className="loading-spinner">&nbsp;</span>
        </div>
      );

    } else {

      // button 表示なし
      return (
        <div className="no-more"></div>
      );

    }

  },
  // -----------------------------------------
  // button 関連 custom method
  handleClick: function( event ) {
    event.preventDefault();
    // loading 表示
    this.setState( { loading: 'loading' } );
    this.props.action.next();
  },
  // button 表示・非表示
  updateShow: function( show:Boolean, rest:Number ) {
    this.setState( { show: show, rest: rest } );
  }
} );
