/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/14 - 15:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../../../view/View';

// app
// import {Message} from '../../../app/const/Message';

// component
// @since 2016-09-24
import { SPComponentContinueRead } from '../../component/singles/SPComponentContinueRead';
import { Env } from '../../../app/Env';

// sagen
/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * 「続きを読む」 ボタン制御
 */
export default class SPViewContinueRead extends View {
  /**
   * SP 記事詳細 「続きを読む」 ボタン制御
   * @param {Element} element single header root element
   * @param {Element} button single header #post-content-read-more element
   */
  constructor(element, button) {
    super(element);
    /**
     * single header #post-content-read-more element
     * @type {Element}
     * @private
     */
    this._button = button;
    /**
     * element - Sagen.Dom instance
     * @type {*} Sagen.Dom instance
     */
    this.dom = new Sagen.Dom(element);
  }
  /**
   * render 処理を開始します
   * @param {string} [path=''] option argument
   */
  start(path = '') {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ViewSingle].start', path);
    }
    this.render();
  }
  /**
   * render します
   */
  render() {
    // let ReadMoreDom = React.createClass( {
    //   propTypes: {
    //     dom: React.PropTypes.object.isRequired
    //   },
    //   getInitialState: function() {
    //     return {
    //       show: false
    //     };
    //   },
    //   render: function() {
    //     if ( this.state.show ) {
    //       return (
    //         <a className="post-content-btn-readMore" href="#" onClick={this.clickHandler}>{Message.READ_MORE}</a>
    //       );
    //     } else {
    //       return null;
    //     }
    //   },
    //   componentDidMount: function() {
    //     // https://github.com/undotsushin/undotsushin/issues/152#issuecomment-196812397
    //     // 記事が短いときは
    //     // 記事を表示し READ_MORE 非表示
    //     let height = parseInt( this.props.dom.style( 'height' ), 10 );
    //     if ( height > 260 ) {
    //       this.props.dom.removeClass( 'hidden' );
    //       this.setState( { show: true } );
    //     } else {
    //       this.props.dom.removeClass( 'hidden' );
    //       this.props.dom.removeClass( 'excerpt' );
    //     }
    //   },
    //   componentWillUnMount: function() {
    //
    //   },
    //   clickHandler( event:Event ):void {
    //     event.preventDefault();
    //     this.props.dom.removeClass( 'excerpt' );
    //     this.setState( { show: false } );
    //   }
    // } );
    //
    // ReactDOM.render(
    //   <ReadMoreDom
    //     dom={new Sagen.Dom( this.element )}
    //   />,
    //   this._button
    // );

    // @since 2016-09-24 changed
    ReactDOM.render(
      <SPComponentContinueRead
        dom={this.dom}
      />,
      this._button
    );
  }
}
