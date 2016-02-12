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

// data
import {Result} from '../data/Result';
import {Safety} from '../data/Safety';

// dae
import {ArticleDae} from '../dae/ArticleDae';

// ui
import {Rise} from '../ui/Rise';

// node(ReactClass)
import {ReactionDom} from '../node/comment/ReactionDom';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// imagesLoaded, isotope
let imagesLoaded = self.imagesLoaded;
let Isotope = self.Isotope;

/**
 * archive 一覧を isotope で
 */
export class ViewArchiveMasonryInfinite extends View {
  /**
   * <p>archive 一覧標示後 isotope で位置調整します<br>
   * + infinite scroll を実装します
   * </p>
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [useMasonry=true] isotope を行うかの
   */
  constructor( element:Element, moreElement:Element, ActionClass:Function = null, option:Object = {}, useMasonry:boolean = true ) {

    option = Safety.object( option );

    super( element, option );
    if ( typeof ActionClass === 'function' ) {

      this._action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );

    }
    this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._articles = [];
    this._useMasonry = !!useMasonry;
    // ArticleDom instance を保持します
    // first render を区別するためにも使用します
    this._articleRendered = null;
    // more button instance を保持します
    this._moreRendered = null;
    // response.request object を保持する
    this._request = null;

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
    console.log( 'ViewArchiveMasonry done ', result );
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

      this._request = result.request;
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

    // Masonry flag
    let useMasonry = this._useMasonry;

    // 既存データ用のglobal配列
    let articlesList = this._articles;

    // 前回までの配列length
    // sequence な index のために必要
    let prevLast = this._articles.length;

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
        show: React.PropTypes.bool.isRequired,
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
            <div id="more" className={'board-btn-viewmore' + this.state.loading}>
              <a className='board-btn-viewmore-link' href={'#more'} onClick={this.handleClick} ><span>VIEW MORE</span></a>
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

        if ( this.state.show && this.rise === null ) {
          // mount 後
          // button が表示されているなら rise 監視を始める
          this.rise = new Rise( element );
          this.rise.on( Rise.RISE, this.onRise );
          this.rise.start();
        }

      },
      componentWillUnmount: function() {
        // unmount 時に rise 破棄を行う
        this.destroy();
      },
      // -----------------------------------------
      // button 関連 custom method
      // rise 関連 event を破棄する
      destroy: function() {
        // rise 監視を破棄する
        if ( this.rise !== null ) {
          this.rise.stop();
          this.rise.off( Rise.RISE, this.onRise );
          this.rise = null;
        }
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

        this.setState( { show: show } );

      },
      // loading 表示 on / off
      // on: true, off: false
      updateLoading: function( loading:boolean = false ) {

        let loadingClass = '';
        if ( loading && this.rise !== null ) {

          // loading 中は監視を止める
          loadingClass = ' loading';
          this.rise.stop();
          action.next();

        } else {

          // loading が終わると監視開始
          this.rise.start();

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

    // more button 作成関数
    // ArchiveDom から呼び出す
    let moreButton = ( show:boolean ) => {

      show = !!show;
      // moreElement 存在チェックを行う
      // Element 型を保証する
      // _moreRendered が null の時のみ, instance があれば state を update する
      if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
      // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {

        // チェックをパスし実行する
        _this._moreRendered = ReactDOM.render(
          React.createElement( MoreView, { show: show } ),
          moreElement
        );

      } else {

        _this._moreRendered.updateShow( show );

      }

    };

    // more button 表示状態を loading on / off 切替えます
    /*
    let loadingButton = ( loading:boolean ) => {

      if ( _this._moreRendered !== null ) {
        _this._moreRendered.updateLoading( !!loading );
      }

    };
    */
    // --------------------------------------------
    // COMMENTS Popular second
    // --------------------------------------------
    let CommentedUsers = React.createClass( {
      propType: {
        total: React.PropTypes.number.isRequired
      },
      getInitialState: function() {
        return {
          total: this.props.total
        };
      },
      render: function() {

        if ( this.state.total === 0 ) {
          return null;
        } else {

          return <span className="commented-user-andmore">{this.state.total}</span>;
        }

      }

    } );


    let CommentsSecond = React.createClass( {
      propType: {
        seconds: React.PropTypes.array.isRequired,
        articleId: React.PropTypes.string.isRequired,
        total: React.PropTypes.number.isRequired,
        hasSecond: React.PropTypes.bool.isRequired
      },
      getInitialState: function() {
        return {
          seconds: this.props.seconds
        };
      },
      render: function() {

        if ( !this.props.hasSecond ) {
          // 描画要素がない
          return null;
        }

        let seconds = this.state.seconds;
        let articleId = this.props.articleId;

        return (
          <div className="commented-user">
            <ul className="comments-second">
              {
                seconds.map( function( commentDae, i ) {

                  let userDae = commentDae.user;
                  let picture = userDae.profilePicture ? userDae.profilePicture : Empty.USER_EMPTY;

                  // CommentsSecond unique key は  記事Id + user Id を使用する
                  // 同一ユーザーが複数投稿することがあるため
                  // render 内で unique なことを保証する必要がある
                  return (
                    <li key={'user-' + articleId + '-' + commentDae.id + '-' + userDae.id + '-' + i} className={'commented-user-item commented-user-item-' + i}>
                      <span className="commented-user-thumb">
                        <img src={picture} alt={userDae.userName}/>
                      </span>
                    </li>
                  );
                } )
              }
            </ul>
            <CommentedUsers total={this.props.total} />
          </div>
        );

      }
    } );

    // --------------------------------------------
    // COMMENTS Popular
    // --------------------------------------------

    // --------------------------------------------
    // first + second comment container
    let PopularDom = React.createClass( {
      propType: {
        commentsPopular: React.PropTypes.object.isRequired,
        total: React.PropTypes.number.isRequired,
        articleId: React.PropTypes.string.isRequired
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
        // console.log( 'commentsPopular', articleId, total, hasFirst, hasSecond, firstDae, secondsDae );
        if ( hasSecond ) {
          // 2件目以降も存在する
          // 2件目以降のDomを生成する
          // second = <CommentsSecond seconds={secondsDae} articleId={articleId} />;
          total -= secondsDae.length;
        }

        // 1 件 comment があるかをチェクする
        if ( hasFirst ) {

          // 少なくとも1件は存在する
          // 総件数から 1 マイナス
          total -= 1;
          console.log( '少なくとも1件は存在する ', articleId );

          // 1件目コメントデータを取り出し
          let first = firstDae;
          // 1件目コメント・ユーザー
          let firstUser = first.user;
          // ユーザーサムネイル
          let picture = !!firstUser.profilePicture ? firstUser.profilePicture : Empty.USER_EMPTY;
          // login 済かを調べる
          let sign = User.sign;

          return (
            <div className="comments-popular">
              <div className="feature-user comment-item">
                <figure className="comment-user">
                  <span className="comment-user-link">
                    <span className="comment-user-thumb"><img src={picture} alt={firstUser.userName}/></span>
                    <div className="comment-user-data">
                      <p className="comment-user-name">{firstUser.userName}</p>
                      <p className="comment-user-job">{firstUser.bio}</p>
                    </div>
                  </span>
                </figure>
                {/* insert html tag into .comment-content innerHTML */}
                <div className="comment-content" dangerouslySetInnerHTML={{__html: first.body}} />
                <ReactionDom
                  articleId={String(articleId)}
                  commentId={String(first.id)}
                  sign={sign}
                  good={first.good}
                  bad={first.bad}
                  isGood={first.isGood}
                  isBad={first.isBad}
                />
              </div>
              {/*
              <div className="commented-user">
                {second}
                <span className="commented-user-andmore">{total > 0 ? '+' + total : ''}</span>
              </div>
              */}
              <CommentsSecond
                seconds={secondsDae}
                articleId={articleId}
                total={total}
                hasSecond={hasSecond}
              />
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
        this.isotope = null;
        this.img = null;
        this.elements = [];

        return {
          arranged: 'prepare',
          list: this.props.list
        };
      },
      render: function() {

        console.log( '****************************************** render' );
        // dom出力する
        return (
          <div ref="boardRout" className="board-large-column">
            {
              // loop start
              this.state.list.map( function( dae, i ) {

                let commentsPopular = dae.commentsPopular;
                let commentsTotal = dae.commentsCount;
                let thumbnail;
                let figureTag;

                console.log( 'ArchiveDom ', dae.id, dae.commentsCount, dae.commentsPopular );

                thumbnail = dae.media.images.medium;

                if ( !thumbnail ) {
                  thumbnail = Empty.IMG_MIDDLE;
                }

                // media type で thumbnail 切替
                if ( dae.mediaType === 'image' ) {

                  // type: image
                  figureTag = <figure className={'post-thumb post-thumb-' + dae.mediaType}>
                    <img src={thumbnail} alt={dae.title}/>
                  </figure>;

                } else {

                  // type: video
                  figureTag = <figure className={'post-thumb post-thumb-' + dae.mediaType}>
                    <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY} />
                    <img src={thumbnail} alt={dae.title}/>
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

                    <PopularDom key={'comment-' + dae.id} commentsPopular={commentsPopular} total={commentsTotal} articleId={String(dae.id)} />
                  </div>
                );
                // loop end
              } )
            }
          </div>
        );

      },
      // state 変更し dom が更新された後に呼び出される delegate
      componentDidUpdate: function() {
        console.log( '+++++++++ componentDidUpdate' );

        // isotope 対象 children
        let boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
        let childNodes = boardRout.childNodes;
        let elements = [];
        // 追加された Element を取得するための start / end point
        // start は request offset
        let i = _this._request.offset;
        // end は request offset へ request length を加算したものと
        // children length の小さい方
        let limit = Math.min( i + _this._request.length, childNodes.length );
        console.log( 'start ', i );
        console.log( 'end ', limit );

        // start / end から 対象 children を選別
        for ( ; i < limit; i++ ) {
          elements.push( childNodes[ i ] );
        }

        this.elements = elements;

        let img = imagesLoaded( elements );
        // 画像読み込む完了 event へ bind します
        img.on( 'always', this.appendImages );
        this.img = img;


      },
      // dom が表示された後に1度だけ呼び出される delegate
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
      // dom が削除される前に呼び出される delegate
      componentWillUnmount: function() {
        console.log( '************ componentWillUnmount ************' );
        // unmount 時に isotope を破棄します
        this.isotope.destroy();
      },
      // -----------------------------------------------------
      // 以降 custom
      // isotope 前準備
      shouldMasonry: function() {

        // isotope 前準備を実行します
        let boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
        let childNodes = boardRout.childNodes;

        // imagesLoaded を使用し画像ロード完了後に isotope を実行します
        let img = imagesLoaded( childNodes );
        // img {imagesLoaded} always event handler unbind するためにインスタンスを保存します
        this.img = img;
        // 画像読み込む完了 event へ bind します
        img.on( 'always', this.onImages );

      },
      // 画像読み込む完了 event handler, isotope を実行
      onImages: function() {

        // event から event handler を unbind します
        this.img.off( 'always', this.onImages );

        // isotope を行います
        let boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
        this.isotope = new Isotope( boardRout, {
          itemSelector: '.board-item',
          masonry: {
            gutter: 30
          }
        } );

      },
      updateList: function( list ) {
        // state を変更し appendChild + isotope を行う
        this.setState( { list: list } );
      },
      // didUpdate から呼び出される
      appendImages: function() {

        console.log( '++++++++++++++++++++ appendImages' );

        // event から event handler を unbind します
        this.img.off( 'always', this.appendImages );

        // 追加とレイアウト
        this.isotope.appended( this.elements );
        // reload
        // http://isotope.metafizzy.co/methods.html#reloaditems
        this.isotope.reloadItems();
        // isotope 再度レイアウト
        this.isotope.layout();

        // hasNext を元に More View button の表示非表示を決める
        moreButton( action.hasNext() );

      }
    } );// ArticleDom

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach( function( article, i ) {

      let dae = new ArticleDae( article );

      dae.index = prevLast + i;
      articlesList.push( dae );

    } );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if ( this._articleRendered === null ) {

      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this._articleRendered = ReactDOM.render(
        React.createElement( ArticleDom, { list: articlesList } ),
        element
      );

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList( articlesList );

    }

  }// render

}// class
