/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/28 - 18:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// https://github.com/undotsushin/undotsushin/issues/451
// 初回起動時のサービス紹介

import {View} from './View';

// app
import {Dom} from '../app/Dom';

// net
import {Cookie} from '../net/Cookie';

// util
import {Time} from '../util/Time';
import {Scroll} from '../util/Scroll';

// sagen
let Sagen = self.Sagen;

// Gasane
let Gasane = self.Gasane;

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

/**
 * 初回起動時のサービス紹介
 * cookie Cookie.EVER_BEEN を調べ存在しなかったら表示します
 */
export class ViewFirstVisit extends View {
  /**
   * 初回起動時のサービス紹介
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  /**
   * cookie をチェックし表示するかを決める
   */
  start():void {
    if ( Cookie.get( Cookie.EVER_BEEN ) === '1' ) {
      // きたことある
      return;
    }

    // cookie set 10 years
    Cookie.save( '1', Cookie.EVER_BEEN, Time.later( 365 * 10 ) );
  }

  /**
   * 初回起動時のサービス紹介 を表示する
   */
  render():void {
    // 表示させる
    let FirstDom = React.createClass( {
      getInitialState: function() {
        /**
         * #whole element
         * @private
         * @type {null|Element}
         */
        this.whole = null;
        /**
         * Fps instance
         * @private
         * @type {Gasane.Fps}
         */
        this.fps = new Gasane.Fps( 1 );

        return {
          show: true,
          css: {opacity: 0},
          height: {height: '100%'}
        };
      },
      render: function() {

        if ( this.state.show ) {
          return (
            <div style={this.state.css}>
              <div className="modal-intro" style={this.state.height}>
                <div className="modal-bg" onClick={this.closeHandle} style={this.state.height} />
                <div className="modal-intro-contents">
                  <a href="#" className="modal-intro-close" onClick={this.closeHandle}><i>&nbsp;</i><i>&nbsp;</i><span>閉じる</span></a>
                  <div className="modal-intro-tagline">CRAZY FOR SPORTS</div>
                  <dib className="modal-intro-heading">運動通信</dib>
                  <p className="modal-intro-copy">世界一足の速い人間が、勉強ができなくてもいい。8万人の目の前でPKを決められる人間が、女好きでもいい。傷ついた少年の勇気になるホームランを打てる人間が、借金を抱えていてもいい。自分より強い相手の顎を砕ける人間が、敬語が使えなくてもいい。動かない両足で世界を制覇できる人間が、時間にルーズでもいい。その瞬間に、その奇跡を起こせる人間に、それ以外のことができる必要なんかない。すべてを犠牲にして、立ち向かった人間に、つまらない常識なんかいらない。そのつまらない定規を捨てよ。奴らのくれる感動に、感動せよ。その最高の奇跡を生み出すために生まれてきた人間を祝福せよ。瞬間に生きることを選んだ人間の美しさに熱狂せよ。熱狂のない世界なんか、いらない。</p>
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }

      },
      componentDidMount: function() {
        let whole = Dom.whole();
        if ( whole !== null ) {
          this.whole = new Sagen.Dom( whole );
          // this.setHeight();
          window.addEventListener('load', this.onLoad, false);
          this.fps.on(Gasane.Fps.ENTER_FRAME, this.update);
          this.fps.start();
        }
      },
      update: function() {
        this.setHeight();
      },
      setHeight: function() {
        let height = Math.max( parseInt( this.whole.style( 'height' ), 10 ), 950 );
        this.setState( {height: {height: `${height}px`}} );
        // console.log( 'pc height ', height );
      },
      closeHandle: function( event ) {
        event.preventDefault();
        // window.removeEventListener('resize', this.setHeight);
        this.fps.off(Gasane.Fps.ENTER_FRAME, this.update);
        // this.fps.stop();

        this.closeModal();
      },
      onLoad: function() {
        window.removeEventListener('load', this.onLoad);
        this.openModal();
      },
      openModal: function() {
        let object = { opacity: 0 };
        let _this = this;

        TweenLite.to(
          object,
          0.36,
          {
            opacity: 1,
            easing: easing.Linear.easeNone,
            onUpdate: function() {
              _this.setState( { css: {opacity: object.opacity} } );
            },
            onComplete: function() {
              _this.setState( { css: {opacity: 1} } );
            }
          }
        );
      },
      closeModal: function( delay:Number = 0 ) {
        let object = { opacity: 1 };
        let _this = this;

        TweenLite.to(
          object,
          0.5,
          {
            delay: delay,
            opacity: 0,
            easing: easing.Linear.easeNone,
            onUpdate: function() {
              _this.setState( { css: {opacity: object.opacity} } );
            },
            onComplete: function() {
              _this.setState( { css: {opacity: 0}, show: false } );
              Scroll.motion(0);
            }
          }
        );
      }
    } );

    ReactDOM.render(
      <FirstDom/>,
      this.element
    );

  }
}
