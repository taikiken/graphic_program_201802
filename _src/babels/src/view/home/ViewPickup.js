/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/24 - 18:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app
// import {App} from '../../app/App';
import {Empty} from '../../app/const/Empty';
import {User} from '../../app/User';

// view
import {View} from '../View';
import {ViewError} from '../error/ViewError';
// action
import {Pickup} from '../../action/home/Pickup';
import {PickupAuth} from '../../action/home/PickupAuth';
// data
import {Result} from '../../data/Result';
// dae
import {ArticleDae} from '../../dae/ArticleDae';

import {Safety} from '../../data/Safety';

// global object
// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// Gasane
let Polling = self.Gasane.Polling;

/**
 * home > pickup（スライダー）を表示します。
 * <ol>
 *   <li>JSON取得(Ajax)</li>
 *   <li>Dom作成 by React</li>
 * </ol>
 */
export class ViewPickup extends View {
  /**
   * action/Pickup を使い Ajax request 後 element へ dom を作成します
   * @link ViewHeadline
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {

    option = Safety.object( option );

    super( element, option );
    let ActionClass = User.sign ? PickupAuth : Pickup;
    this._action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );
    this._index = 0;
    this._last = 0;
    this._waiting = 1000 * 5;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * interval 間隔, milliseconds, default 5000ms
   * @property {Number} waiting interval milliseconds
   * @default 5000
   * @return {number|*|Number} slideshow interval milliseconds を返します
   */
  get waiting():Number {
    return this._waiting;
  }
  /**
   * slideshow interval milliseconds を設定します
   * @param {Number} milliseconds slideshow interval milliseconds
   */
  set waiting( milliseconds:Number ):void {
    this._waiting = milliseconds;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.start();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let articles = result.articles;

    if ( typeof articles === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[PICKUP:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[PICKUP:EMPTY]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );

    } else {

      this.render( articles );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    message = Safety.string( message, '' );

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {

    let element = this.element;
    let last = articles.length - 1;

    let position = 0;

    // interval を管理する Gasane.Polling instance
    let polling = new Polling( this.waiting );
    let _this = this;

    // --------------------------------------------
    // pager
    // --------------------------------------------
    let PickupPagerDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        length: React.PropTypes.number.isRequired,
        onPager: React.PropTypes.func.isRequired
      },
      render: function() {
        let p = this.props;

        return (
          <li className={'pager-item pager-' + (p.index - p.length)}>
            <a href={'#pickup-' + p.index} className="pager-link"
              onClick={this.handleClick} >{p.index - p.length}</a>
          </li>
        );
      },
      handleClick: function( event ) {
        event.preventDefault();
        this.props.onPager( event.target.innerHTML );
      }
    } );

    // pagers 親コンポーネント
    let PagersDom = React.createClass( {
      propTypes: {
        offset: React.PropTypes.number.isRequired,
        list: React.PropTypes.array.isRequired,
        onPager: React.PropTypes.func.isRequired
      },
      render: function() {
        let list = this.props.list;
        let length = list.length;
        let offset = this.props.offset;
        let onPager = this.props.onPager;

        return (
          <ul className='pager-list'>
            {
              list.map( function( article ) {

                let dae = new ArticleDae( article );

                return <PickupPagerDom
                  key={'pager-' + dae.id}
                  id={String(dae.id)}
                  index={offset++}
                  length={length}
                  onPager={onPager}
                />;

              } )
            }
          </ul>
        );
      }
    } );

    // --------------------------------------------
    // Main Dom
    // --------------------------------------------

    // pickup slider images
    let PickupDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        large: React.PropTypes.string.isRequired,
        commentsCount: React.PropTypes.number.isRequired
      },
      render: function() {
        let p = this.props;

        return (
          <li id={'pickup-' + p.index} className={'pickup pickup-' + p.index}>
            <a href={p.url}>
              <img src={Empty.KV_OVERLAY} alt="" className="overlay"/>
              <img src={p.large} alt={p.title}/>
              <div className="post-overview">
                <p className={'post-category post-category-' + p.slug}>{p.category}</p>
                <h2 className='post-heading'>{p.title}</h2>
                <p className="post-date">{p.date}</p>
                <p className="post-comment-num">{p.commentsCount}</p>
              </div>
            </a>
          </li>
        );
      }
    } );

    // React Class, pickup dom container
    let ArticleDom = React.createClass( {
      // articles 配列を元にDomを作成する
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      // initial state を設定します
      getInitialState: function() {
        return {
          // default 0
          index: position
        };
      },
      // --------------------------------------------
      // RENDER
      // --------------------------------------------
      render: function() {

        let list = this.props.list;
        let count = 0;

        // slide一つのコンテナ
        let make = ( article, i ) => {

          let dae = new ArticleDae( article );
          let large = dae.media.images.large;

          if ( !large ) {
            large = Empty.IMG_LARGE;
          } else if ( !Safety.isImg( large ) ) {
            // 画像ファイル名に拡張子がないのがあったので
            // 拡張子チェックを追加
            large = Empty.IMG_LARGE;
          }

          // HeadlineDom instance を使い render
          // iteration key は index を使う
          // コンテナを 前後に clone するため article.id が使えない
          return <PickupDom
            key={'pickup-' + i}
            index={i}
            id={String( dae.id )}
            slug={dae.category.slug}
            category={dae.category.label}
            url={dae.url}
            date={dae.displayDate}
            title={dae.title}
            large={large}
            commentsCount={dae.commentsCount}
          />;

        };

        // JSX
        return (
          <div className="hero-sec">
            <div className={'hero-slider pickup-container slide-' + this.state.index}>
              {/* slider */}
              <div className="hero-slider-inner">
                <ul className="pickup-slider">
                  {
                    // 1.first
                    list.map( function( article ) {

                      return make( article, count++ );

                    } )
                  }
                  {
                    // 2.second clone
                    list.map( function( article ) {

                      return make( article, count++ );

                    } )
                  }
                  {
                    // 3.third clone
                    list.map( function( article ) {

                      return make( article, count++ );

                    } )
                  }
                </ul>
              </div>
              <div className="hero-slider-control">
                {/* prev / next */}
                <div className="direction">
                  <a id="prev" className="direction-prev" href="#prev" onClick={this.onPrev}>Prev</a>
                  <a id="next" className="direction-next" href="#next" onClick={this.onNext}>Next</a>
                </div>
                {/* pagers */}
                <div className="pager">
                  <PagersDom
                    list={articles}
                    offset={articles.length}
                    onPager={this.onPagerClick}
                  />
                </div>
              </div>
            </div>
          </div>

        );

      },
      componentDidMount: function() {

        // after mount
        // callback
        _this.executeSafely( View.DID_MOUNT );

        // interval animation
        // mount 後 animation を開始します
        // bind はreactが内部的にする（様子） `this.updateNext.bind(this)` は不要
        polling.on( Polling.PAST, this.updateNext );
        polling.start();

      },
      // ----------------------------------------------------------------
      // next slide
      updateNext: function() {
        // last を超えたら 0 に戻す
        let n = position + 1;
        if ( n > last ) {
          n = 0;
        }
        // change slide
        this.jump( n );
      },
      // next button click
      onNext: function( event ) {
        event.preventDefault();
        console.log( 'next click' );
        // next action は polling からも使うので関数化し共通化する
        this.updateNext();
      },
      // prev button click
      onPrev: function( event ) {
        event.preventDefault();
        console.log( 'prev click' );
        // 0 未満になったら last へ戻す
        let n = position - 1;
        if ( n < 0 ) {
          n = last;
        }
        // change slide
        this.jump( n );
      },
      // slide を変更
      jump: function( index ) {
        console.log( 'jump ', index );
        // polling stop
        polling.stop();
        // --------------
        // 循環アニメーションのために
        if ( index === 0 ) {
          // 先頭に戻る
          if ( position === last ) {
            // 現在がラストだったらアニメーションなしで移動させる
            this.setState( {index: 999} );
            this.delay( index );
          } else {
            // 通常移動
            this.setup( index );
          }
        } else if ( index === last ) {
          // 最終に戻る
          if ( position === 0 ) {
            // 現在が先頭だったらアニメーションなしで移動させる
            this.setState( {index: 1999} );
            this.delay( index );
          } else {
            // 通常移動
            this.setup( index );
          }
        } else {

          // 通常移動
          this.setup( index );

        }
      },
      // 最終から先頭, 先頭から最終へ戻るときに循環アニメーションのために
      // アニメーション無しで移動させた後
      // リフレッシュのために待機させる 1fps
      delay: function( index ) {
        let me = this;
        if ( !!this.timer ) {
          clearTimeout( this.timer );
        }
        this.timer = setTimeout( function() {
          me.setup(index);
        }, 25 );
      },
      // re position, polling restart
      setup: function( index ) {
        // --------------
        // state update
        position = index;
        this.setState( {index: index} );
        // polling start
        polling.start();
      },
      // pager click から呼び出されます
      onPagerClick: function( index ) {
        console.log( 'onPagerClick ', index );
        // 子コンポーネント Pagers -> PickupPager から呼び出される
        // innerHTML 数値を使うので
        // Number 型へ変換する
        this.jump( parseInt( index, 10 ) );
      }
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: articles } ),
      element
    );

  }// render
}// class
