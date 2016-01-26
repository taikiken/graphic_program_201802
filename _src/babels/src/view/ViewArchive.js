/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/25 - 10:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';
/*
View More がある Page
Home, Category, Search...
 */

// app
import {Empty} from '../app/Empty';

// view
import {View} from './View';
import {ViewError} from './error/ViewError';
// action
import {Headline} from '../action/home/Headline';
// data
import {Result} from '../data/Result';
// dae
import {ArticleDae} from '../dae/ArticleDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;
/**
 * <h2>View More がある 表示親クラス</h2>
 */
export class ViewArchive extends View {
  /**
   *
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {*} ActionClass Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, ActionClass, option:Object = {} ) {

    super( element, option );
    this._action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );
    this._moreElement = moreElement;
    this._articles = [];

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
      this.executeSafely( 'undefinedError', error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[ARCHIVE:EMPTY]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( 'emptyError', error );
      // this.showError( error.message );

    } else {

      console.log( 'result.total ', result.total );
      // set total
      this.action.total = parseInt( result.total, 10 );
      this.render( articles );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( 'responseError', error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {

    // ToDo: Optimize rendering, Dom rendering の効率化

    let concatArticles = this._articles.concat( articles );
    let element = this.element;
    let moreElement = this.moreElement;
    let action = this.action;
    let _this = this;
    console.log( '********* concatArticles ', concatArticles.length );
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
      },
      render: function() {

        return (
          <div>
            {
              this.props.show ? <div className={this.state.disable ? 'disable' : ''}>
                <a href={'#more'} onClick={this.handleClick} >More View</a>
              </div> : ''
            }
          </div>
        );

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

        return (
          <div className="comments-second">
            {
              seconds.map( function( commentDae, i ) {

                let userDae = commentDae.user;
                let picture = userDae.profilePicture ? userDae.profilePicture : Empty.USER_PICTURE;

                // CommentsSecond unique key は  記事Id + index + user Id を使用する
                // 同一ユーザーが複数投稿することがあるため
                // render 内で unique なことを保証する必要がある
                return (
                  <div key={'user-' + articleId + '-' + i + '-' + userDae.id}>
                    <img src={picture} alt={userDae.userName}/>
                  </div>
                );
              } )
            }
          </div>
        );

      }
    } );

    // --------------------------------------------
    // COMMENTS Popular
    // --------------------------------------------
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

        if ( commentsPopular.hasSecond ) {
          // 2件目以降も存在する
          // 2件目以降のDomを生成する
          second = <CommentsSecond seconds={commentsPopular.seconds} articleId={articleId} />;
        }

        if ( commentsPopular.hasFirst ) {

          // 少なくとも1件は存在する

          // 1件目データを取り出し
          let first = commentsPopular.first;
          let firstUser = first.user;
          let picture = firstUser.profilePicture ? firstUser.profilePicture : Empty.USER_PICTURE;

          return (
            <div className="comments-popular">
              <div className="comment-first">
                <img src={picture} alt={firstUser.userName}/>
                <div>{firstUser.userName}</div>
                <div>{firstUser.bio}</div>
                <div>{first.body}</div>
                <div>GOOD: {first.good}</div>
                <div>BAD: {first.bad}</div>
              </div>
              <div className="comment-second-container">
                {second}
                <div className="comment-total">{total > 0 ? 'Total: ' + total : ''}</div>
              </div>
            </div>
          );

        }

        return emptyFirst;

      }// render
    } );

    // --------------------------------------------
    // Main Dom
    // --------------------------------------------
    // 個別の Dom
    // ToDo: comment など追加
    let ArchiveDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        mediaType: React.PropTypes.string.isRequired,
        commentsPopular: React.PropTypes.object.isRequired,
        commentsCount: React.PropTypes.number.isRequired
      },
      render: function() {
        let p = this.props;
        let commentsPopular = p.commentsPopular;

        return (
          <div className="one-article">
            <img src={p.thumbnail} alt={p.title}/>
            <p className={'cat cat-' + p.slug}>{p.category}</p>
            <a href={p.url} id={'archive-' + p.id} className={'archive archive-' + p.index}>
              <h3 className='archive-title'>{p.title}</h3>
            </a>
            <p className="date">{p.date}</p>
            <p>{p.mediaType}</p>
            <p>{p.description}</p>
            <div className="comments-popular-container">
              <PopularDom commentsPopular={commentsPopular} total={p.commentsCount} articleId={p.id} />
            </div>
          </div>
        );
      }
    } );

    // ArticleDom 呼び出し用関数
    // list.forEach での ReactDOM.render 実行記述を簡略化するため
    let makeDom = ( dae ) => {

      let thumbnail = dae.mediaType === 'image' ? dae.media.images.medium : dae.media.video.thumbnail;
      thumbnail = thumbnail !== '' ? thumbnail : Empty.IMG_MIDDLE;

      // unique key(React)にarticle id(number)記事Idを使用します
      return <ArchiveDom
        key={'archive-' + dae.id}
        index={dae.index}
        id={String( dae.id )}
        slug={dae.category.slug}
        category={dae.category.label}
        url={dae.url}
        date={dae.formatDate}
        title={dae.title}
        thumbnail={thumbnail}
        mediaType={dae.mediaType}
        description={dae.description}
        commentsPopular={dae.commentsPopular}
        commentsCount={dae.commentsCount}
      />;

    };

    // ------------------------------------------------
    // 基点 React class
    // ------------------------------------------------

    // React Class, Archive Dom
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      render: function() {

        let list = this.props.list;
        let even = [];
        let odd = [];

        // even / odd setup
        // even(left) / odd(right) へ振り分けるための配列作成
        list.forEach( function( article, i ) {

          let dae = new ArticleDae( article );
          dae.index = i;

          if ( i % 2 === 0 ) {
            // even
            even.push( dae );
          } else {
            // odd
            odd.push( dae );
          }

        } );

        // dom
        return (
          <div>
            <div className="left">
              {
                even.map( function( dae ) {
                  return makeDom( dae );
                } )
              }
            </div>
            <div className="right">
              {
                odd.map( function( dae ) {
                  return makeDom( dae );
                } )
              }
            </div>
          </div>
        );

      },
      componentDidMount: function() {
        // after mount
        _this.executeSafely( 'didMount' );
        // hasNext を元に More View button の表示非表示を決める
        moreButton( action.hasNext() );
      }
      /*
      componentDidUpdate: function() {

        // after update
        _this.executeSafely( 'didUpdate' );
        // hasNext を元に More View button の表示非表示を決める
        console.log( 'componentDidUpdate ', action.hasNext() );
        moreButton( action.hasNext() );

      }
      */
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: concatArticles } ),
      element
    );

    // save
    this._articles = concatArticles.splice( 0 );

  }
}// class
