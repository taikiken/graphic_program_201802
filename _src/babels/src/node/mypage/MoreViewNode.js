/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/15 - 14:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// app
import {Message} from '../../app/const/Message';

// React
let React = self.React;

// --------------------------------------------
// More button
// --------------------------------------------
/**
 * mypage 系 more button
 * PC, SP 共用化するため 汎用class にします
 * @type {ReactClass}
 */
export let MoreViewNode = React.createClass( {
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    action: React.PropTypes.object.isRequired,
    loading: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      loading: ''
    };
  },
  getInitialState: function() {
    // Rise instance を保持する
    this.rise = null;

    return {
      disable: false,
      show: this.props.show,
      loading: this.props.loading
    };
  },
  render: function() {

    // hasNext: true, button を表示する？
    if ( this.state.show ) {

      return (
        <div id="more" className={'board-btn-viewmore loading-root ' + this.state.loading}>
          <a className='board-btn-viewmore-link' href={'#more'} onClick={this.handleClick} ><span>{Message.BUTTON_VIEW_MORE}</span></a>
          <div className="loading-spinner"></div>
        </div>
      );

    } else {

      // button 表示なし
      return (
        <div className="no-more"></div>
      );

    }

  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {
    // unmount 時に rise 破棄を行う
    this.destroy();
  },
  // -----------------------------------------
  // button 関連 custom method
  // rise 関連 event を破棄する
  destroy: function() {

  },
  // 緊急用, button click を残す
  handleClick: function( event:Event ) {
    event.preventDefault();

    this.setState( { loading: ' loading' } );
    this.props.action.next();
  },
  // button 表示・非表示
  updateShow: function( show:boolean ) {

    this.setState( { show: show, loading: '' } );

  }
} );
