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
import {Empty} from '../../app/const/Empty';

// view
import {View} from '../View';
import {ViewError} from '../error/ViewError';
// action
import {Widget} from '../../action/sidebar/Widget';
// data
import {Result} from '../../data/Result';
// dae
import {ArticleDae} from '../../dae/ArticleDae';

import {Safety} from '../../data/Safety';

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
   * @param {Number|null} [length=null] 読み込む数
   */
  constructor( element:Element, option:Object = {}, slug:string = 'all', length:Number = null ) {

    option = Safety.object( option );
    slug = Safety.string( slug, 'all' );

    super( element, option );
    this._action = Widget.video( slug, this.done.bind( this ), this.fail.bind( this ), length );
    this._slug = slug;
    // response.request object を保持する
    this._request = null;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * category slug
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
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[VIDEOS:EMPTY]サーバーレスポンスに問題が発生しました。' );
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

    let element = this.element;
    let categorySlug = this.slug;
    let _this = this;

    // tag block
    let VideosDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        category2: React.PropTypes.string,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired
      },
      getDefaultPropTypes: function() {
        return {
          category2: ''
        };
      },
      render: function() {
        let p = this.props;

        let category = ( label ):string => {
          return !label ? '' : <span className="category-label">{label}</span>;
        };

        return (
          <li className={'board-item videos-' + p.index + ' videos-' + (p.slug || categorySlug)}>
            <a href={p.url} className='post'>
              <figure className="post-thumb post-thumb-video">
                <img className="video-thumbnail" src={p.thumbnail} alt={p.title}/>
                <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY_SMALL} />
              </figure>
              <div className="post-data">
                <p className={'post-category post-category-' + p.slug}>{category(p.category)}{category(p.category2)}</p>
                <h4 className='post-heading'>{p.title}</h4>
                <p className="post-date">{p.date}</p>
              </div>
            </a>
          </li>
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
        let categoryTitle = '';

        let categoryLabel;
        // category api slug が `all` 以外の時に category.label をタイトルに含める
        if ( categorySlug !== 'all' ) {
          categoryLabel = list[ 0 ].category.label;

          if ( categoryLabel !== '' ) {
            // category.label が空でなかったら '/' と一緒に加える
            categoryTitle = ' / ' + categoryLabel;
          }
        }

        return (

          <div className="board-small widget-recommend">
            {/* title */}
            <div className="widget-recommend-heading">
              <h3 className="widget-recommend-heading-title"><img src="/assets/images/common/side-recommend-heading.png" alt="RECOMMEND" /></h3>
              <span className="widget-recommend-heading-ruby">オススメ動画{categoryTitle}</span>
            </div>
            <ul className="board-list">
            {
              list.map( function( article, i ) {

                let dae = new ArticleDae( article );
                let thumbnail = dae.media.images.medium;

                // thumbnail(16x9) を check なければ代替画像にする
                if ( !thumbnail ) {
                  thumbnail = Empty.VIDEO_THUMBNAIL;
                } else if ( !Safety.isImg( thumbnail ) ) {
                  // 画像ファイル名に拡張子がないのがあったので
                  // 拡張子チェックを追加
                  thumbnail = Empty.VIDEO_THUMBNAIL;
                }

                // VideosDom instance を使い render
                return (
                    <VideosDom
                      key={'ranking-' + dae.id}
                      index={i}
                      id={String( dae.id )}
                      slug={dae.category.slug}
                      category={dae.category.label}
                      category2={dae.category2.label}
                      url={dae.url}
                      date={dae.displayDate}
                      title={dae.title}
                      thumbnail={thumbnail}
                    />
                );

              } )// map
            }
            </ul>
          </div>

        );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );

      }
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: articles } ),
      element
    );


  }// render
}

