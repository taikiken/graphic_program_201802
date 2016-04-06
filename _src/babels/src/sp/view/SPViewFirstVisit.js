/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/28 - 19:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {ViewFirstVisit} from '../../view/ViewFirstVisit';

// app
import {Dom} from '../../app/Dom';

import {Scroll} from '../../util/Scroll';

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
 * [SP] 初回起動時のサービス紹介
 * cookie Cookie.EVER_BEEN を調べ存在しなかったら表示します
 */
export class SPViewFirstVisit extends ViewFirstVisit {
  /**
   * [SP] 初回起動時のサービス紹介
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  /**
   * 初回起動時のサービス紹介 を表示する
   */
  render():void {
    // 表示させる
    let FirstDom = React.createClass( {
      getInitialState: function() {
        this.whole = null;
        this.menu = null;
        this.fps = new Gasane.Fps( 1 );

        return {
          show: true,
          css: {opacity: 0, height: '100%'},
          height: {height: '100%'}
        };
      },
      render: function() {

        if ( this.state.show ) {
          return (
            <section className="modal-intro" style={this.state.css}>
              <div className="modal-bg" onClick={this.closeHandle} style={this.state.height}></div>
              <div className="modal-intro-contents">
                <p className="modal-intro-tagline"><img src="/assets/sp/images/intro/tagline.png" alt="CRAZY FOR SPORTS"/></p>
                <h1 className="modal-intro-heading"><img src="/assets/sp/images/intro/logo.png" alt="運動通信"/></h1>
                <p className="modal-intro-copy"><img src="/assets/sp/images/intro/copy.png" alt="世界一足の速い人間が、勉強ができなくてもいい。8万人の目の前でPKを決められる人間が、女好きでもいい。傷ついた少年の勇気になるホームランを打てる人間が、借金を抱えていてもいい。自分より強い相手の顎を砕ける人間が、敬語が使えなくてもいい。動かない両足で世界を制覇できる人間が、時間にルーズでもいい。その瞬間に、その奇跡を起こせる人間に、それ以外のことができる必要なんかない。すべてを犠牲にして、立ち向かった人間に、つまらない常識なんかいらない。そのつまらない定規を捨てよ。奴らのくれる感動に、感動せよ。その最高の奇跡を生み出すために生まれてきた人間を祝福せよ。瞬間に生きることを選んだ人間の美しさに熱狂せよ。熱狂のない世界なんか、いらない。"/></p>
                <div className="mod-btnB01">
                  <a className="modal-intro-close" href="#" onClick={this.closeHandle}><i>&nbsp;</i><i>&nbsp;</i><span>閉じる</span></a>
                </div>
              </div>
            </section>
          );
        } else {
          return null;
        }

      },
      componentDidMount: function() {
        let whole = Dom.page();
        let menu = Dom.serviceMenu();

        // if ( whole !== null ) {
        //   this.whole = new Sagen.Dom( whole );
        //   this.menu = new Sagen.Dom( document.body );
        //
        //   this.setHeight();
        //   window.addEventListener('load', this.onLoad, false);
        //   this.fps.on(Gasane.Fps.ENTER_FRAME, this.update);
        //   this.fps.start();
        // }

        if ( menu !== null && whole !== null ) {
          this.menu = new Sagen.Dom( menu );
          this.whole = whole;
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
        // let height = Math.max( parseInt( this.whole.style( 'height' ), 10 ), 950 );
        // console.log( 'height', this.menu.element(), this.menu.style( 'height' ), );
        let height = Math.max( parseInt( this.menu.style( 'height' ), 10 ), 950 );
        let px = `${height}px`;
        // console.log( 'this.whole', this.whole );
        if ( this.state.height.height !== px ) {
          this.setState( {height: {height: px}} );
        }
        // this.whole.style.cssText = `overflow: hidden; width: 100%; height: ${px}`;
      },
      closeHandle: function( event ) {
        event.preventDefault();

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
          0.5,
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

        Scroll.motion(0, 0.5, 1);
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
