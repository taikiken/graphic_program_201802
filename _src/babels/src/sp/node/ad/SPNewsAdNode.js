/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2016/03/31
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

import {Ad} from '../../../app/const/Ad';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP 記事一覧 4件目に表示する広告
 * @type {*|Function|ReactClass}
 */
export let SPNewsAdNode = React.createClass( {
  propTypes: {
    // index, 何番目
    index: React.PropTypes.number.isRequired,
    // loop list の length === 総数
    length: React.PropTypes.number.isRequired,
    // element id に使用する
    uniqueId: React.PropTypes.string.isRequired,
    // 広告をinsertするか
    // ranking / video も共通で使うので on, off スイッチを用意する
    enable: React.PropTypes.bool,
    // ストリーム広告
    adSp: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      enable: false
    };
  },
  getInitialState: function() {
    /**
     * 広告フラッグ（挿入済み）
     * @private
     * @type {boolean}
     */
    this.ok = false;
    // 4番目に表示 => 3番目(index: 2)の後
    return {
      // index が 2 の時に広告をinsert
      third: this.props.index === 2
    };
  },
  render: function() {
    // // ストリーム広告
    // // ID 設定がなかったら出力しない
    // if ( this.props.adSp === '' ) {
    //   return null;
    // }
    // ad element を返し
    // ok property を true にする
    let enableAd = () => {
      this.ok = true;
      return (
        <div className={`news-ad news-ad-${this.props.index}`} ref="news_ad"></div>
      );
    };

    if ( this.props.enable && this.state.third ) {

      return enableAd();

    } else {

      // enable: true
      // index が 2に到達しない, コンテンツ量が少ない時にも広告を表示させる
      // index 2 未満 + 総数 と index が同じ
      // index は 0始まりなので +1 下駄を履かせて比較する
      if ( this.props.enable && (this.props.index < 2 && this.props.index + 1 === this.props.length) ) {
        return enableAd();
      } else {
        return null;
      }
    }
  },
  componentDidMount: function() {
    if ( this.ok ) {
      // ReactDOM.findDOMNode( this.refs.news_ad ).appendChild( Ad.make( Ad.SP_NEWS, this.props.uniqueId ) );
      ReactDOM.findDOMNode( this.refs.news_ad ).appendChild( Ad.makeStream( this.props.uniqueId, this.props.adSp ) );
    }
  }
} );
