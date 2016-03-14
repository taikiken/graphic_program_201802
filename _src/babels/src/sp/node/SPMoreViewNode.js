/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/10 - 17:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Message} from '../../app/const/Message';

// React
let React = self.React;

// --------------------------------------------
// More button
// --------------------------------------------
export let SPMoreViewNode = React.createClass( {
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
    // disable
    // this.setState( { loading: ' loading' } );
    // action.next();
    this.onRise();
  },
  // button 表示・非表示
  updateShow: function( show:boolean ) {

    if ( !show ) {
      // button を非表示にするので rise 監視を止める
      this.destroy();
    } else {
      // button 表示, loading 表示を止める
      this.updateLoading( false );
    }

    this.setState( { show: show, loading: '' } );

  },
  // loading 表示 on / off
  // on: true, off: false
  updateLoading: function( loading:boolean = false ) {

    let loadingClass = '';
    if ( loading ) {

      // loading 中は監視を止める
      loadingClass = ' loading';
      this.props.action.next();

    }

    // loading 表示のための css class を追加・削除
    this.setState( {loading: loadingClass} );

  },
  // Rise.RISE event handler
  // 次 offset JSON を取得する
  onRise: function( event ) {
    console.log( '========================== onRise ', event );

    this.updateLoading( true );
  }
} );
