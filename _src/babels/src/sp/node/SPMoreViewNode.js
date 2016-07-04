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


import {Message} from '../../app/const/Message';

// Ga
import {Ga} from '../../ga/Ga';
import {GaData} from '../../ga/GaData';

// React
let React = self.React;

// --------------------------------------------
// More button
// --------------------------------------------
/**
 * SP 次を見る VIEW MORE button
 * @type {ReactClass}
 */
export let SPMoreViewNode = React.createClass( {
  propTypes: {
    // 表示・非表示, true: 表示
    show: React.PropTypes.bool.isRequired,
    // button click 後の action
    action: React.PropTypes.object.isRequired,
    loading: React.PropTypes.string,
    // for ga
    // home flag
    home: React.PropTypes.bool.isRequired,
    // category slug
    slug: React.PropTypes.string.isRequired,
    // ranking | movie
    type: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      loading: '',
      type: ''
    };
  },
  getInitialState: function() {
    /**
     * 現在のページナンバー<br>
     * 計測タグへ次の（表示する）ページナンバーを送信するために使用します
     * @type {number}
     * @private
     */
    this.page = 1;

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
          <a className="board-btn-viewmore-link" href={'#more'} onClick={this.handleClick} ><span>{Message.BUTTON_VIEW_MORE}</span></a>
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
  // componentDidMount: function() {
  // },
  componentWillUnmount: function() {
    // unmount 時に rise 破棄を行う
    this.destroy();
  },
  // -----------------------------------------
  // // button 関連 custom method
  // // rise 関連 event を破棄する
  // destroy: function() {
  // },
  // button click
  handleClick: function( event:Event ) {
    event.preventDefault();
    this.onRise();
  },
  // button 表示・非表示
  updateShow: function( show:Boolean ) {

    this.setState( { show: show, loading: '' } );

  },
  // Rise.RISE event handler
  // 次 offset JSON を取得する
  onRise: function(/* event */) {
    this.updateLoading( true );
  },
  // loading 表示 on / off
  // on: true, off: false
  updateLoading: function( loading:Boolean = false ) {

    let loadingClass = '';
    if ( loading ) {

      // loading 中は監視を止める
      loadingClass = ' loading';
      this.props.action.next();

      if ( this.props.type !== '' ) {
        // ----------------------------------------------
        // GA 計測タグ
        // PC/スマホカテゴリー一覧の新着記事, movie, ranking
        Ga.add( new GaData('SPMoreViewNode.updateLoading', `${this.props.slug}_articles`, `view - ${this.props.type}`, String(++this.page), 0, true) );
        // ----------------------------------------------
      } else {
        // ga
        if (this.props.home) {
          this.gaHome();
        } else {
          this.gaCategory();
        }
      }
      // ----------------------------------------------
    }

    // loading 表示のための css class を追加・削除
    this.setState( {loading: loadingClass} );

  },
  gaHome: function() {
    // ----------------------------------------------
    // GA 計測タグ
    // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
    Ga.add( new GaData('SPMoreViewNode.gaHome', 'home_articles', 'view - new', String(++this.page), true) );
    // ----------------------------------------------
  },
  gaCategory: function() {
    // ----------------------------------------------
    // GA 計測タグ
    // PC/スマホカテゴリー一覧の新着記事
    Ga.add( new GaData('SPMoreViewNode.gaCategory', `${this.props.slug}_articles`, 'view - new', String(++this.page), 0, true) );
    // ----------------------------------------------
  }
} );
