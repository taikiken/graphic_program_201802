/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/01 - 22:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app
import {Empty} from '../app/const/Empty';
import {User} from '../app/User';

// view
import {View} from './View';
import {ViewError} from './error/ViewError';
// action
// import {Headline} from '../action/home/Headline';
// data
import {Result} from '../data/Result';
// dae
import {ArticleDae} from '../dae/ArticleDae';

import {Safety} from '../data/Safety';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// imagesLoaded, isotope
let imagesLoaded = self.imagesLoaded;
let Isotope = self.Isotope;

/**
 *
 */
export class ViewArchiveMasonry extends View {
  constructor( element:Element, moreElement:Element, ActionClass, option:Object = {}, useMasonry:boolean = true ) {

    option = Safety.object( option );

    super( element, option );
    this._action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );
    this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._articles = [];

    this._useMasonry = !!useMasonry;

    this._top = 0;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} more button root element を返します
   */
  get moreElement():Element {
    return this._moreElement;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.next();

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
      let error = new Error( '[ARCHIVE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[ARCHIVE:EMPTY]サーバーレスポンスに問題が発生しました。' );
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

    // ---
    // Masonry flag
    let useMasonry = this._useMasonry;

    // 既存データ用のglobal配列
    let articlesList = this._articles;

    // 前回までの配列length
    // sequence な index のために必要
    let prevLast = this._articles.length;
    // ---

    // 記事挿入 root element
    let element = this.element;
    // 'View More' button root element
    let moreElement = this.moreElement;
    // offset, length を使用する Action
    let action = this.action;
    // 参照を保持
    let _this = this;


    // --------------------------------------------
    // More button
    // --------------------------------------------
    let MoreView = React.createClass( {
      propTypes: {
        show: React.PropTypes.bool
      },
      getDefaultProps: function() {
        return {
          show: false
        };
      },
      getInitialState: function() {
        return {
          disable: false
        };
      },
      handleClick: function( event ) {
        event.preventDefault();
        // disable
        this.setState( { disable: true } );
        action.next();
        _this._top = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      },
      render: function() {

        // hasNext: true, button を表示する？
        if ( this.props.show ) {

          return (
            <div id="more" className={'board-btn-viewmore' + this.state.disable ? 'disable' : ''}>
              <a className='board-btn-viewmore-link' href={'#more'} onClick={this.handleClick} ><span>VIEW MORE</span></a>
              <span className="board-btn-more-cover">&nbsp;</span>
            </div>
          );

        } else {

          // button 表示なし
          return (
            <div className="no-more"></div>
          );

        }

      }

    } );

    // more button 作成関数
    // ArchiveDom から呼び出す
    let moreButton = ( show ) => {

      ReactDOM.render(
        React.createElement( MoreView, { show: show } ),
        moreElement
      );

    };
    // --------------------------------------------
    // COMMENTS Popular second
    // --------------------------------------------
    let CommentsSecond = React.createClass( {
      propType: {
        seconds: React.PropTypes.array.isRequired,
        articleId: React.PropTypes.string.isRequired
      },
      render: function() {

        let seconds = this.props.seconds;
        let articleId = this.props.articleId;
        console.log( 'seconds ', seconds );
        return (
          <ul className="comments-second">
            {
              seconds.map( function( commentDae, i ) {

                let userDae = commentDae.user;
                let picture = userDae.profilePicture ? userDae.profilePicture : Empty.USER_PICTURE;

                // CommentsSecond unique key は  記事Id + index + user Id を使用する
                // 同一ユーザーが複数投稿することがあるため
                // render 内で unique なことを保証する必要がある
                return (
                  <li key={'user-' + articleId + '-' + i + '-' + userDae.id} className={'commented-user-item commented-user-item-' + i}>
                    <a className="commented-user-thumb" href={userDae.url}>
                      <img src={picture} alt={userDae.userName}/>
                    </a>
                  </li>
                );
              } )
            }
          </ul>
        );

      }
    } );

    // --------------------------------------------
    // COMMENTS Popular
    // --------------------------------------------

    // good link
    let GoodLink = React.createClass( {
      propType: {
        sign: React.PropTypes.bool.isRequired,
        comment: React.PropTypes.object.isRequired,
        active: React.PropTypes.bool,
        callback: React.PropTypes.func
      },
      getDefaultProps: function() {
        return {
          active: false,
          callback: function() {}
        };
      },
      getInitialState: function() {
        return {
          active: false,
          callback: function() {}
        };
      },
      handleClick: function( event ) {
        event.preventDefault();
        this.props.callback(this.props.comment);
        this.setState( { active: false } );
      },
      render: function() {

        let sign = this.props.sign;
        let comment = this.props.comment;
        let active = this.props.active;
        let activeClass = active ? ' active' : '';

        if ( sign ) {

          // login user
          return (
            <a className={'comment-response-btn comment-response-like' + activeClass} href="#" onClick={this.handleClick}>
              <i>&nbsp;</i>
              <span>{comment.good}</span>
            </a>
          );

        } else {

          // not login user
          return (
            <span className="comment-response-btn comment-response-like">
              <i>&nbsp;</i>
              <span>{comment.good}</span>
            </span>
          );
        }

      }
    } );

    // bad link
    let BadLink = React.createClass( {
      propType: {
        sign: React.PropTypes.bool.isRequired,
        comment: React.PropTypes.object.isRequired,
        active: React.PropTypes.bool,
        callback: React.PropTypes.func
      },
      getDefaultProps: function() {
        return {
          active: false,
          callback: function() {}
        };
      },
      getInitialState: function() {
        return {
          active: false,
          callback: function() {}
        };
      },
      handleClick: function( event ) {
        event.preventDefault();
        this.props.callback(this.props.comment);
        this.setState( { active: false } );
      },
      render: function() {

        let sign = this.props.sign;
        let comment = this.props.comment;
        let active = this.props.active;
        let activeClass = active ? ' active' : '';

        if ( sign ) {

          // login user
          return (
            <a className={'comment-response-btn comment-response-dislike' + activeClass} href="#" onClick={this.handleClick}>
              <i>&nbsp;</i>
              <span>{comment.bad}</span>
            </a>
          );

        } else {

          // not login user
          return (
            <span className="comment-response-btn comment-response-dislike">
              <i>&nbsp;</i>
              <span>{comment.bad}</span>
            </span>
          );
        }

      }
    } );

    // --------------------------------------------
    // first + second comment container
    let PopularDom = React.createClass( {
      propType: {
        commentsPopular: React.PropTypes.object.isRequired,
        total: React.PropTypes.number.isRequired,
        articleId: React.PropTypes.string.isRequired
      },
      goodClick: function( comment ) {
        let commentId = comment.id;
        let userId = comment.user.id;

        console.log( 'goodClick', commentId, userId );
      },
      badClick: function( comment ) {
        let commentId = comment.id;
        let userId = comment.user.id;

        console.log( 'badClick', commentId, userId );
      },
      render: function() {

        let commentsPopular = this.props.commentsPopular;
        let total = this.props.total;
        let articleId = this.props.articleId;

        let emptyFirst = <div className="comments-popular comments-empty"></div>;
        let second = <div className="comments-second comments-empty"></div>;

        let hasFirst = commentsPopular.hasFirst;
        let hasSecond = commentsPopular.hasSecond;
        let firstDae = commentsPopular.first;
        let secondsDae = commentsPopular.seconds;
        console.log( 'commentsPopular', articleId, total, hasFirst, hasSecond, firstDae, secondsDae );
        if ( hasSecond ) {
          // 2件目以降も存在する
          // 2件目以降のDomを生成する
          second = <CommentsSecond seconds={secondsDae} articleId={articleId} />;
          total -= secondsDae.length;
        }

        if ( hasFirst ) {

          // 少なくとも1件は存在する
          total -= 1;

          console.log( '少なくとも1件は存在する ', articleId );
          // 1件目コメントデータを取り出し
          let first = firstDae;
          console.log( 'first ', articleId, first );
          // 1件目コメント・ユーザー
          let firstUser = first.user;
          // ユーザーサムネイル
          let picture = firstUser.profilePicture ? firstUser.profilePicture : Empty.USER_PICTURE_FEATURE;
          // login 済かを調べる
          let sign = User.sign;

          return (
            <div className="comments-popular">
              <div className="feature-user comment-item">
                <figure className="comment-user">
                  <a className="comment-user-link" href={firstUser.url}>
                    <span className="comment-user-thumb"><img src={picture} alt={firstUser.userName}/></span>
                    <div className="comment-user-data">
                      <p className="comment-user-name">{firstUser.userName}</p>
                      <p className="comment-user-job">{firstUser.bio}</p>
                    </div>
                  </a>
                </figure>
                {/* insert html tag into .comment-content innerHTML */}
                <div className="comment-content" dangerouslySetInnerHTML={{__html: first.body}} />
                <div className="comment-response">
                  <GoodLink
                    sign={sign}
                    comment={first}
                    callback={this.goodClick}
                  />
                  <BadLink
                    sign={sign}
                    comment={first}
                    callback={this.badClick}
                  />
                </div>
              </div>
              <div className="commented-user">
                {second}
                <span className="commented-user-andmore">{total > 0 ? '+' + total : ''}</span>
              </div>
            </div>
          );

        }

        return emptyFirst;

      }, // render
      componentDidMount: function() {
        // mount
      }
    } );

    // ------------------------------------------------
    // 基点 React class
    // ------------------------------------------------

    // 個別の 記事Dom
    // React Class, Archive Dom
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      getInitialState: function() {
        return {
          isotope: null,
          img: null,
          route: null,
          nodes: null,
          arranged: 'prepare'
        };
      },
      render: function() {

        let list = this.props.list;

        // dom出力する
        return (
          <div className={this.state.arranged} ref="boardRout">
            {
              list.map( function( dae, i ) {

                //let dae = new ArticleDae( article );
                //articlesList.push( dae );

                let thumbnail;
                let caption;
                if ( dae.mediaType === 'image' ) {
                  thumbnail = dae.media.images.medium;
                  caption = dae.media.images.caption;
                } else {
                  thumbnail = dae.media.video.thumbnail;
                  caption = dae.media.video.caption;
                }

                thumbnail = thumbnail !== '' ? thumbnail : Empty.IMG_MIDDLE;

                let commentsPopular = dae.commentsPopular;
                let figureTag;
                let commentsTotal = dae.commentsCount;

                console.log( 'ArchiveDom ', dae.id, dae.commentsCount, dae.commentsPopular );

                if ( dae.mediaType === 'image' ) {
                  // type: image
                  figureTag = <figure className={'post-thumb post-thumb-' + dae.mediaType}>
                    <img src={thumbnail} alt={caption || dae.title}/>
                  </figure>;

                } else {
                  // type: video
                  figureTag = <figure className={'post-thumb post-thumb-' + dae.mediaType}>
                    <img className="post-thumb-overlay-movie type-movie" src="/assets/images/common/thumb-overlay-movie-340x150.png" />
                    <img src={thumbnail} alt={caption || dae.title}/>
                  </figure>;
                }

                // unique key(React)にarticle id(number)記事Idを使用します
                return (
                  <div key={'archive-' + dae.id} className={'board-item board-item-' + i}>
                    <a className="post" href={dae.url}>
                      {figureTag}
                      <div className="post-data">
                        <p className={'post-category post-category-' + dae.category.slug}>{dae.category.label}</p>
                        <h3 className='post-heading'>{dae.title}</h3>
                        <p className="post-date">{dae.formatDate}</p>
                        <div className="post-excerpt-text">{dae.description}</div>
                      </div>
                    </a>

                    <PopularDom commentsPopular={commentsPopular} total={commentsTotal} articleId={dae.id} />
                  </div>
                );
              } )
            }
          </div>
        );

      },
      componentDidMount: function() {
        // after mount
        _this.executeSafely( View.DID_MOUNT );
        // hasNext を元に More View button の表示非表示を決める
        moreButton( action.hasNext() );

        // masonry flag が true の時に shouldMasonry を実行します
        if ( useMasonry ) {

          this.shouldMasonry();

        }

      },
      shouldComponentUpdate: function() {
        console.log( '------------+++++++++++++ shouldComponentUpdate ------------' );
        // http://stackoverflow.com/questions/25135261/react-js-and-isotope-js
        // isotope がセットアップすると呼び出されるので
        // 常にfalseを返し無視させます
        return false;
      },
      componentWillUnmount: function() {
        console.log( '************ componentWillUnmount ************' );
        // unmount 時に isotope を破棄します
        this.state.isotope.destroy();
      },
      shouldMasonry: function() {
        // isotope を実行します
        let boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
        let childNodes = boardRout.childNodes;
        console.log( 'shouldMasonry', boardRout, childNodes );

        // imagesLoaded を使用し画像ロード完了後に isotope を実行します
        let img = imagesLoaded( childNodes );

        // img {imagesLoaded} always event handler unbind するためにインスタンスを state に保存します
        // route {Element} isotope 基準 element
        // nodes {ElementList} isotope 対象 childNodes, 現在は使用していません, ひょっとすると将来使うかも...
        this.setState( { img: img, nodes: childNodes, route: boardRout } );

        // 画像読み込む完了 event へ bind します
        img.on( 'always', this.onImages );

      },
      // 画像読み込む完了 event handler
      onImages: function() {

        let img = this.state.img;
        let route = this.state.route;

        // event から event handler を unbind します
        img.off( 'always', this.onImages );

        // isotope を行います
        let isotope = new Isotope( route, {
          itemSelector: '.board-item',
          masonry: {
            gutter: 30
          }
        } );

        // ToDo: arranged: 'arranged' が効いていない様子 親コンテナの css class を変えたい
        this.setState( { isotope: isotope, arranged: 'arranged' } );
        console.log( '%%%%%%%%% arrangeComplete %%%%%%%%%%%', _this._top );
        // render 時に 0 位置に戻るので
        // click 時の pageOffsetY へ移動させる
        window.scrollTo( 0, _this._top );

      }
    } );// ArticleDom

    // ------------------------------------------------
    articles.forEach( function( article, i ) {

      let dae = new ArticleDae( article );

      dae.index = prevLast + i;
      articlesList.push( dae );

    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: articlesList } ),
      element
    );

  }
}
