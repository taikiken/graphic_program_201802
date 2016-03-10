/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 22:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app
import {Empty} from '../../app/const/Empty';
import {User} from '../../app/User';
import {MediaType} from '../../app/const/MediaType';

// view
import {View} from './../../view/View';
import {ViewError} from './../../view/error/ViewError';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// node(ReactClass)
import {ReactionNode} from '../../node/comment/ReactionNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * archive 一覧標示
 */
export class SPViewArchive extends View {
  /**
   * <p>archive 一覧標示</p>
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, ActionClass:Function = null, option:Object = {} ) {

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
    // ArticleDom instance を保持します
    // first render を区別するためにも使用します
    this._articleRendered = null;
    // more button instance を保持します
    this._moreRendered = null;
    // response.request object を保持する
    this._request = null;

    this._home = false;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Element|*} more button root element を返します
   */
  get moreElement():Element {
    return this._moreElement;
  }
  /**
   * home flag
   * @return {boolean|*} home flag boolean を返します
   */
  get home():boolean {
    return this._home;
  }
  /**
   * home flag
   * @param {boolean} home flag
   */
  set home( home:boolean ):void {
    this._home = home;
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
    // console.log( 'ViewArchiveMasonry done ', result );
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
    let MoreViewDom = React.createClass( {
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

    // more button 作成関数
    // ArchiveDom から呼び出す
    let moreButton = ( show:boolean ) => {

      show = !!show;
      // moreElement 存在チェックを行う
      // Element 型を保証する
      // _moreRendered が null の時のみ, instance があれば state を update する
      // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
      if ( _this._moreRendered === null ) {
        // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {

        // チェックをパスし実行する
        _this._moreRendered = ReactDOM.render(
          React.createElement( MoreViewDom, { show: show, action: this.action } ),
          moreElement
        );

      } else {

        _this._moreRendered.updateShow( show );

      }

    };

    // --------------------------------------------
    // COMMENTS Popular second
    // --------------------------------------------
    let CommentedUsersDom = React.createClass( {
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
                  // let picture = userDae.profilePicture ? userDae.profilePicture : Empty.USER_EMPTY;
                  let picture = userDae.profilePicture;
                  if ( !picture ) {
                    picture = Empty.USER_EMPTY;
                  } else if ( !Safety.isImg( picture ) ) {
                    // 画像ファイル名に拡張子がないのがあったので
                    // 拡張子チェックを追加
                    picture = Empty.USER_EMPTY;
                  }

                  let loggedIn = picture === Empty.USER_EMPTY ? '' : 'user-logged-in';

                  // CommentsSecond unique key は  記事Id + user Id を使用する
                  // 同一ユーザーが複数投稿することがあるため
                  // render 内で unique なことを保証する必要がある
                  return (
                    <li key={'user-' + articleId + '-' + commentDae.id + '-' + userDae.id + '-' + i} className={'commented-user-item commented-user-item-' + i}>
                      <span className={'commented-user-thumb ' + loggedIn}>
                        <img src={picture} alt={userDae.userName}/>
                      </span>
                    </li>
                  );
                } )
              }
            </ul>
            <CommentedUsersDom total={this.props.total} />
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
        // console.log( 'commentsPopular', articleId, total, hasFirst, hasSecond, firstDae, secondsDae );
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
          console.log( '少なくとも1件は存在する ', articleId );

          // 1件目コメントデータを取り出し
          let first = firstDae;
          // 1件目コメント・ユーザー
          let firstUser = first.user;
          // ユーザーサムネイル
          let picture = firstUser.profilePicture;

          if ( !picture ) {
            picture = Empty.USER_EMPTY;
          } else if ( !Safety.isImg( picture ) ) {
            // 画像ファイル名に拡張子がないのがあったので
            // 拡張子チェックを追加
            picture = Empty.USER_EMPTY;
          }

          let loggedIn = picture === Empty.USER_EMPTY ? '' : 'user-logged-in';

          // login 済かを調べる
          let sign = User.sign;

          return (
            <div className="comments-popular">
              <div className="feature-user comment-item">
                <figure className="comment-user">
                  <span className="comment-user-link">
                    <span className={'comment-user-thumb ' + loggedIn}><img src={picture} alt={firstUser.userName}/></span>
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

      }, // render
      componentDidMount: function() {
        // mount
      }
    } );

    // ------------------------------------------------
    // 基点 React class
    // ------------------------------------------------
    // 記事一覧のサムネイル
    let ThumbnailDom = React.createClass( {
      propType: {
        mediaType: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        masonry: React.PropTypes.bool.isRequired,
        action: React.PropTypes.object.isRequired
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

        // media type で thumbnail 切替
        if ( mediaType === MediaType.IMAGE ) {
          // type: image
          return (
            <figure className={'post-thumb post-thumb-' + mediaType}>
              <img src={this.props.thumbnail} alt={this.props.title}/>
            </figure>
          );
        } else if ( mediaType === MediaType.VIDEO ) {
          // type: video
          return (
            <figure className={'post-thumb post-thumb-' + mediaType}>
              <img className="video-thumbnail" src={this.props.thumbnail} alt={this.props.title}/>
              <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY} />
            </figure>
          );
        } else {
          // 該当なし
          return null;
        }
      }
    } );

    // 個別の 記事Dom
    // React Class, Archive Dom
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired,
        // request offset
        offset: React.PropTypes.number.isRequired,
        // request length
        length: React.PropTypes.number.isRequired,

        // action instance
        action: React.PropTypes.object.isRequired
      },
      getInitialState: function() {
        this.isotope = null;
        this.img = null;
        this.elements = [];

        return {
          arranged: 'prepare',
          list: this.props.list,
          offset: this.props.offset,
          length: this.props.length
        };
      },
      render: function() {

        // console.log( '****************************************** render' );
        // dom出力する
        return (
          <div ref="boardRout" className="board-large-column board-stack">
            {
              // loop start
              this.state.list.map( function( dae, i ) {

                let commentsPopular = dae.commentsPopular;
                let commentsTotal = dae.commentsCount;
                let thumbnail;

                thumbnail = dae.media.images.medium;

                // thumbnail が空の時は代替画像
                if ( !thumbnail ) {
                  thumbnail = Empty.IMG_MIDDLE;
                } else if ( !Safety.isImg( thumbnail ) ) {
                  // 画像ファイル名に拡張子がないのがあったので
                  // 拡張子チェックを追加
                  thumbnail = Empty.IMG_MIDDLE;
                }

                let category = ( label ):string => {
                  return !label ? '' : <span className="category-label">{label}</span>;
                };

                let recommend = '';
                if ( !!dae.isRecommend && _this.home ) {
                  recommend = <i className="post-label_recommend">おすすめ記事</i>;
                }

                // unique key(React)にarticle id(number)記事Idを使用します
                return (
                  <div key={'archive-' + dae.id} className={'board-item board-item-' + i}>
                    <a className="post" href={dae.url}>
                      <ThumbnailDom
                        mediaType={dae.mediaType}
                        thumbnail={thumbnail}
                        title={dae.title}
                      />
                      <h2 className='post-heading'>{dae.title}</h2>
                      <div className="post-data">
                        {recommend}
                        <p className={'post-category post-category-' + dae.category.slug}>{category(dae.category.label)}{category(dae.category2.label)}</p>
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

      },
      // dom が表示された後に1度だけ呼び出される delegate
      componentDidMount: function() {
        // console.log( '************ componentDidMount ************', this.props.masonry );
        // after mount
        _this.executeSafely( View.DID_MOUNT );
        // hasNext を元に More View button の表示非表示を決める
        moreButton( this.props.action.hasNext() );

      },
      // dom が削除される前に呼び出される delegate
      componentWillUnmount: function() {
      },
      // -----------------------------------------------------
      // 以降 custom
      // isotope 前準備
      shouldMasonry: function() {

      },
      // 画像読み込む完了 event handler, isotope を実行
      onImages: function() {

      },
      updateList: function( list, offset, length ) {
        // state を変更し appendChild + isotope を行う
        this.setState( { list: list, offset: offset, length: length } );
        moreButton( this.props.action.hasNext() );

      },
      // didUpdate から呼び出される
      appendImages: function() {

        // hasNext を元に More View button の表示非表示を決める
        this.setState( { loading: '' } );
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
        React.createElement( ArticleDom, { list: articlesList, offset: this._request.offset, length: this._request.length, masonry: this._useMasonry, action: this.action } ),
        element
      );

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList( articlesList, this._request.offset, this._request.length );

    }

  }// render
}
