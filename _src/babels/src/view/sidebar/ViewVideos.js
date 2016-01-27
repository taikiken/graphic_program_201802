/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 20:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app
import {Empty} from '../../app/Empty';

// view
import {View} from '../View';
import {ViewError} from '../error/ViewError';
// action
import {Widget} from '../../action/sidebar/Widget';
// data
import {Result} from '../../data/Result';
// dae
import {ArticleDae} from '../../dae/ArticleDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * sidebar video
 */
export class ViewVideos extends View {
  /**
   * sidebar video 5件 を表示します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   * @param {string} [slug=all] category slug です
   */
  constructor( element:Element, option:Object = {}, slug:string = 'all' ) {

    super( element, option );
    this._action = Widget.video( slug, this.done.bind( this ), this.fail.bind( this ) );
    this._slug = slug;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string|*} 捜査 slug を返します
   */
  get slug():string {
    return this._slug;
  }
  // ---------------------------------------------------
  //  METHOD
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
      let error = new Error( '[VIDEOS:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( 'undefinedError', error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[VIDEOS:EMPTY]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( 'emptyError', error );
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

    let element = this.element;
    let slug = this.slug;
    let _this = this;

    // tag block
    let VideosDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired
      },
      render: function() {
        let p = this.props;

        return (
          <a href={p.url} id={'headline-' + p.id} className={'videos videos-' + p.index + ' videos-' + slug}>
            <img src={p.thumbnail} alt={p.title}/>
            <p className={'cat cat-' + p.slug}>{p.category}</p>
            <h3 className='headline-title'>{p.title}</h3>
            <p className="date">{p.date}</p>
          </a>
        );
      }
    } );

    // React Class
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      // isRequired なので getDefaultProps がいらない
      // getDefaultProps: function() {
      //  return {
      //    list: []
      //  };
      // },
      render: function() {

        let list = this.props.list;

        return (

          <div>
            {
              list.map( function( article, i ) {

                let dae = new ArticleDae( article );
                let thumbnail = dae.media.images.thumbnail;
                thumbnail = thumbnail !== '' ? thumbnail : Empty.IMG_SMALL;

                // HeadlineDom instance を使い render
                return <VideosDom
                  key={'ranking-' + dae.id}
                  index={i}
                  id={String( dae.id )}
                  slug={dae.category.slug}
                  category={dae.category.label}
                  url={dae.url}
                  date={dae.formatDate}
                  title={dae.title}
                  thumbnail={thumbnail}
                />;

              } )
            }
          </div>

        );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( 'didMount' );

      }
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: articles } ),
      element
    );


  }// render
}

