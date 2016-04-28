/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/10 - 12:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {ViewArchiveMasonryInfinite} from './ViewArchiveMasonryInfinite';

// app
import {Empty} from '../app/const/Empty';
import {User} from '../app/User';
import {MediaType} from '../app/const/MediaType';
import {Message} from '../app/const/Message';

// view
import {View} from './View';

// data
import {Safety} from '../data/Safety';

// dae
import {ArticleDae} from '../dae/ArticleDae';

// node(ReactClass)
import {ReactionNode} from '../node/comment/ReactionNode';
import {CommentUserPlusCountNode} from '../node/comment/CommentUserPlusCountNode';

// Ga
import {Ga} from '../ga/Ga';
import {GaData} from '../ga/GaData';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// imagesLoaded, isotope
let imagesLoaded = self.imagesLoaded;
let Isotope = self.Isotope;

/**
 * 無限スクロール をしない
 */
export class ViewArchiveMasonry extends ViewArchiveMasonryInfinite {
  /**
   * 無限スクロール をしない archive view
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   * @param {Boolean} [useMasonry=true] isotope を行うかの
   */
  constructor( element:Element, moreElement:Element, ActionClass:Function = null, option:Object = {}, useMasonry:Boolean = true ) {
    super( element, moreElement, ActionClass, option, useMasonry );

    this._slug = 'all';
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * category slug
   * @default all
   * @return {string} category slug を返します
   */
  get slug():string {
    return this._slug;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {

    // Masonry flag
    // let useMasonry = this._useMasonry;

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
    // let action = this.action;
    // 参照を保持
    let _this = this;

    // --------------------------------------------
    // More button
    // --------------------------------------------
    /**
     * @private
     * @type {ReactClass}
     * */
    let MoreViewDom = React.createClass( {
      propTypes: {
        show: React.PropTypes.bool.isRequired,
        action: React.PropTypes.object.isRequired,
        loading: React.PropTypes.string,
        // ga のため追加
        home: React.PropTypes.bool.isRequired,
        slug: React.PropTypes.string.isRequired
      },
      getDefaultProps: function() {
        return {
          loading: ''
        };
      },
      getInitialState: function() {
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
      // -----------------------------------------
      // button 関連 custom method
      // rise 関連 event を破棄する
      destroy: function() {
      },
      // button click
      handleClick: function( event:Event ) {
        event.preventDefault();

        this.onRise();
      },
      // button 表示・非表示
      updateShow: function( show:Boolean ) {

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
      updateLoading: function( loading:Boolean = false ) {

        let loadingClass = '';
        if ( loading ) {

          // loading 中は監視を止める
          loadingClass = ' loading';
          this.props.action.next();

          // ga
          if (this.props.home) {
            this.gaHome();
          } else {
            this.gaCategory();
          }
        }

        // loading 表示のための css class を追加・削除
        this.setState( {loading: loadingClass} );

      },
      // Rise.RISE event handler
      // 次 offset JSON を取得する
      onRise: function():void {
        this.updateLoading( true );
      },
      gaHome: function() {
        // ----------------------------------------------
        // GA 計測タグ
        Ga.add( new GaData('ViewArchiveMasonry.render.MoreViewDom.gaHome', 'home_articles', 'view - new', String(++this.page)) );
        // ----------------------------------------------
      },
      gaCategory: function() {
        // ----------------------------------------------
        // GA 計測タグ
        Ga.add( new GaData('ViewArchiveMasonry.render.MoreViewDom.gaCategory', `${this.props.slug}_articles`, 'view - new', String(++this.page)) );
        // ----------------------------------------------
      }
    } );

    // more button 作成関数
    // ArchiveDom から呼び出す
    let moreButton = ( show:Boolean ) => {

      show = !!show;
      // moreElement 存在チェックを行う
      // Element 型を保証する
      // _moreRendered が null の時のみ, instance があれば state を update する
      // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
      if ( this._moreRendered === null ) {
        // チェックをパスし実行する
        this._moreRendered = ReactDOM.render(
          React.createElement( MoreViewDom, { show: show, action: this.action, home: this.home, slug: this.slug } ),
          moreElement
        );

      } else {

        this._moreRendered.updateShow( show );

      }

    };

    // --------------------------------------------
    // COMMENTS Popular second
    // --------------------------------------------
    /**
     * コメント一覧
     * コメント二段目
     * */
    let CommentsSecondDom = React.createClass( {
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
                  let picture = Safety.image( userDae.profilePicture, Empty.USER_EMPTY );
                  let loggedIn = Safety.same( picture, Empty.USER_EMPTY );

                  // CommentsSecond unique key は  記事Id + comment Id + user Id + index を使用する
                  // 同一ユーザーが複数投稿することがあるため
                  // render 内で unique なことを保証する必要がある
                  return (
                    <li key={'user-' + articleId + '-' + commentDae.id + '-' + userDae.id + '-' + i} className={'commented-user-item commented-user-item-' + i}>
                      <span className={'commented-user-thumb ' + loggedIn}>
                        <img src={Empty.refresh(picture)} alt={userDae.userName}/>
                      </span>
                    </li>
                  );
                } )
              }
            </ul>
            <CommentUserPlusCountNode total={this.props.total} />
          </div>
        );

      }
    } );

    // --------------------------------------------
    // COMMENTS Popular
    // --------------------------------------------

    // --------------------------------------------
    /**
     * first + second comment container
     * @private
     * @type {ReactClass}
     * */
    let PopularDom = React.createClass( {
      propType: {
        commentsPopular: React.PropTypes.object.isRequired,
        total: React.PropTypes.number.isRequired,
        articleId: React.PropTypes.string.isRequired,
        uniqueId: React.PropTypes.string.isRequired
      },
      render: function() {

        let commentsPopular = this.props.commentsPopular;
        let total = this.props.total;
        let articleId = this.props.articleId;

        let hasFirst = commentsPopular.hasFirst;
        let hasSecond = commentsPopular.hasSecond;
        let firstDae = commentsPopular.first;
        let secondsDae = commentsPopular.seconds;
        if ( hasSecond ) {
          // 2件目以降も存在する
          // 合計数からアイコン描画数を引く
          total -= secondsDae.length;
        }

        // 1 件 comment があるかをチェクする
        if ( hasFirst ) {

          // 少なくとも1件は存在する
          // 総件数から 1（アイコン描画数） マイナス
          total -= 1;
          // console.log( '少なくとも1件は存在する ', articleId );

          // 1件目コメントデータを取り出し
          let first = firstDae;
          // 1件目コメント・ユーザー
          let firstUser = first.user;
          // ユーザーサムネイル
          let picture = Safety.image( firstUser.profilePicture, Empty.USER_EMPTY );
          let loggedIn = Safety.same( picture, Empty.USER_EMPTY );
          
          // login 済かを調べる
          let sign = User.sign;

          return (
            <div className="comments-popular">
              <div className="feature-user comment-item">
                <figure className="comment-user">
                  <span className="comment-user-link">
                    <span className={'comment-user-thumb ' + loggedIn}><img src={Empty.refresh(picture)} alt={firstUser.userName}/></span>
                    <div className="comment-user-data">
                      <p className="comment-user-name">{firstUser.userName}</p>
                      <p className="comment-user-job">{firstUser.bio}</p>
                    </div>
                  </span>
                </figure>
                {/* insert html tag into .comment-content innerHTML */}
                <div className="comment-content" dangerouslySetInnerHTML={{__html: first.body}} />
                <ReactionNode
                  uniqueId={this.props.uniqueId}
                  articleId={String(articleId)}
                  commentId={String(first.id)}
                  sign={sign}
                  good={first.good}
                  bad={first.bad}
                  isGood={first.isGood}
                  isBad={first.isBad}
                  activate={false}
                  url={first.url}
                />
              </div>
              <CommentsSecondDom
                seconds={secondsDae}
                articleId={articleId}
                total={total}
                hasSecond={hasSecond}
              />
            </div>
          );

        } else {

          // 描画するべきものがない
          return null;

        }

      }
      // , // render
      // componentDidMount: function() {
      //   // mount
      // }
    } );

    // ------------------------------------------------
    // 基点 React class
    // ------------------------------------------------
    /**
     * 記事一覧のサムネイル
     * @private
     * @type {ReactClass}
     */
    let ThumbnailDom = React.createClass( {
      propType: {
        mediaType: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        masonry: React.PropTypes.bool.isRequired,
        action: React.PropTypes.object.isRequired,
        recommend: React.PropTypes.bool.isRequired
      },
      getInitialState: function() {
        return {
          mediaType: this.props.mediaType,
          thumbnail: this.props.thumbnail,
          title: this.props.title
        };
      },
      render: function() {
        let mediaType = this.props.mediaType;

        let recommend = '';
        if ( this.props.recommend ) {
          // recommend = <i className="post-label_recommend">おすすめ記事</i>;
          recommend = <i className="post-label_recommend">{Message.LABEL_RECOMMEND}</i>;
        }

        // media type で thumbnail 切替
        if ( mediaType === MediaType.IMAGE ) {
          // type: image
          let imgStyle = {
            'background': `url(${this.props.thumbnail}) no-repeat center center`,
            'backgroundSize': 'cover'
          };

          return (
            <figure className={'post-thumb post-thumb-' + mediaType} style={imgStyle}>
              <img className="image-hd" src={Empty.VIDEO_THUMBNAIL} alt=""/>
              {/*
               https://github.com/undotsushin/undotsushin/issues/468
               16x9 を厳格に守る
               <img className="image-thumbnail" src={this.props.thumbnail} alt={this.props.title}/>
               */}
              {recommend}
            </figure>
          );
        } else if ( mediaType === MediaType.VIDEO ) {
          // type: video
          return (
            <figure className={'post-thumb post-thumb-' + mediaType}>
              <img className="video-thumbnail" src={this.props.thumbnail} alt={this.props.title}/>
              <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY} />
              {recommend}
            </figure>
          );
        } else {
          // 該当なし
          return null;
        }
      }
    } );

    /**
     * 個別の 記事Dom
     * @private
     * @type {ReactClass}
     */
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired,
        // request offset
        offset: React.PropTypes.number.isRequired,
        // request length
        length: React.PropTypes.number.isRequired,
        // action instance
        action: React.PropTypes.object.isRequired,
        // home か否かを表す真偽値
        home: React.PropTypes.bool.isRequired
      },
      getInitialState: function() {
        /**
         * Isotope instance
         * @private
         * @type {null|Isotope}
         */
        this.isotope = null;
        /**
         * imagesLoaded instance
         * @private
         * @type {null|imagesLoaded}
         */
        this.img = null;
        /**
         * 読み込んだelementを保持する配列
         * @private
         * @type {Array}
         */
        this.elements = [];

        return {
          arranged: 'prepare',
          list: this.props.list,
          offset: this.props.offset,
          length: this.props.length
        };
      },
      render: function() {

        const home = this.props.home;
        // dom出力する
        return (
          <div ref="boardRout" className="board-large-column">
            {
              // loop start
              this.state.list.map( function( dae, i ) {

                let commentsPopular = dae.commentsPopular;
                let commentsTotal = dae.commentsCount;
                let thumbnail = Safety.image( dae.media.images.medium, Empty.IMG_MIDDLE );

                let category = ( label ):string => {
                  return !label ? '' : <span className="category-label">{label}</span>;
                };

                // unique key(React)にarticle id(number)記事Idを使用します
                return (
                  <div key={'archive-' + dae.id} className={`board-item board-item-${i} board-item-${dae.mediaType}`}>
                    <a className="post" href={dae.url} id={`article-${dae.id}`}>
                      <ThumbnailDom
                        mediaType={dae.mediaType}
                        thumbnail={thumbnail}
                        title={dae.title}
                        recommend={!!dae.isRecommend && home}
                      />
                      <div className="post-data">
                        <p className={'post-category post-category-' + dae.category.slug}>{category(dae.category.label)}{category(dae.category2.label)}</p>
                        <h3 className='post-heading'>{dae.title}</h3>
                        <p className="post-date">{dae.displayDate}</p>
                        <div className="post-excerpt-text">{dae.description}</div>
                      </div>
                    </a>
                    <PopularDom
                      key={'comment-' + dae.id}
                      uniqueId={'comment-' + dae.id}
                      commentsPopular={commentsPopular}
                      total={commentsTotal}
                      articleId={String(dae.id)} />
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
        // console.log( '+++++++++ componentDidUpdate' );

        // isotope 対象 children
        let boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
        let childNodes = boardRout.childNodes;
        let elements = [];
        // 追加された Element を取得するための start / end point
        // start は request offset
        let i = this.state.offset;
        // end は request offset へ request length を加算したものと
        // children length の小さい方
        let limit = Math.min( i + this.state.length, childNodes.length );
        // console.log( 'start - end ', i + '-' + limit );

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
        // console.log( '************ componentDidMount ************', this.props.masonry );
        // after mount
        _this.executeSafely( View.DID_MOUNT );
        // hasNext を元に More View button の表示非表示を決める
        moreButton( this.props.action.hasNext() );

        // masonry flag が true の時に shouldMasonry を実行します
        if ( this.props.masonry ) {

          this.shouldMasonry();

        }

      },
      // dom が削除される前に呼び出される delegate
      componentWillUnmount: function() {
        // unmount 時に isotope を破棄します
        this.isotope.destroy();
      },
      // -----------------------------------------------------
      // 以降 custom
      // isotope 前準備
      shouldMasonry: function() {

        // console.log( '************ shouldMasonry ************' );
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
      // state を変更し appendChild + isotope を行う
      updateList: function( list, offset, length ) {
        this.setState( { list: list, offset: offset, length: length } );
      },
      // didUpdate から呼び出される
      appendImages: function() {

        // console.log( '++++++++++++++++++++ appendImages' );

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
        moreButton( this.props.action.hasNext() );

      }
    } );// ArticleDom

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach( function( article, i ) {

      let dae = new ArticleDae( article );
      // console.log( 'dae ', dae );
      dae.index = prevLast + i;
      articlesList.push( dae );

    } );

    // 通知
    this.executeSafely( View.BEFORE_RENDER, articlesList );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if ( this._articleRendered === null ) {

      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this._articleRendered = ReactDOM.render(
        React.createElement( ArticleDom, {
          home: this.home,
          list: articlesList,
          offset: this._request.offset,
          length: this._request.length,
          masonry: this._useMasonry,
          action: this.action } ),
        element
      );

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList( articlesList, this._request.offset, this._request.length );

    }

  }// render
}

