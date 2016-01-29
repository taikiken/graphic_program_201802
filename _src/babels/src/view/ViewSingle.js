/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app
import {Empty} from '../app/Empty';
import {SingleInfo} from '../app/SingleInfo';

// view
import {View} from './View';
import {ViewError} from './error/ViewError';
// action
import {Single} from '../action/single/Single';
// data
import {Result} from '../data/Result';

// dae
import {SingleDae} from '../dae/SingleDae';

import {Safety} from '../data/Safety';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 記事詳細
 */
export class ViewSingle extends View {
  /**
   * 記事ID で 記事詳細JSONを取得し表示します
   *
   * @example
   * let elements = {}
   *  related: document.getElementById('related'),
   *  comment: {
   *    'self': document.getElementById('self'),
   *    'official': document.getElementById('official'),
   *    'user': document.getElementById('user')
   *  }
   * }
   *
   * @param {Number} id article id, 記事Id
   * @param {Element} element root element
   * @param {Object} elements root element 関連記事, 各コメント
   * @param {Object} [option={}] optional event handler
   */
  constructor( id:number, element:Element, elements:Object, option:Object = {} ) {
    super( element, option );
    this._action = new Single( id, this.done.bind( this ), this.fail.bind( this ) );
    this._elements = elements;
  }
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

    let response = result.response;

    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[SINGLE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else {

      this.render( response );

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

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Object} response JSON response
   */
  render( response:Object ):void {

    let single = new SingleDae( response );
    // global SingleInfoへ保存
    SingleInfo.dae = single;

    // beforeRender call
    this.executeSafely( View.BEFORE_RENDER, single );

    let element = this.element;
    let _this = this;

    // --------------------------------------------
    // image dom
    let ImageDom = React.createClass( {
      propTypes: {
        images: React.PropTypes.array.isRequired
      },
      render: function() {

        let images = this.props.images;

        return (
          <div className="media-type-image">
            {
              images.map( function( image, i ) {

                if ( typeof image.large !== 'undefined' && image.large !== '' ) {
                  return (
                    <div key={'media-type-image-' + i} className={'media-type-image-' + i}>
                      <img src={image.large} alt={image.caption}/>
                    </div>
                  );
                }

              } )
            }
          </div>
        );
      }
    } );

    // --------------------------------------------
    // React Class
    let ArticleDom = React.createClass( {
      propTypes: {
        article: React.PropTypes.object.isRequired
      },
      // isRequired なので getDefaultProps がいらない
      // getDefaultProps: function() {
      //  return {
      //    list: []
      //  };
      // },
      render: function() {

        let article = this.props.article;

        let bodyTag = () => {
          return {
            __html: article.body
          };
        };

        let thumbnail = '';
        if ( article.mediaType === 'image' ) {

          // media type image
          thumbnail = <ImageDom images={article.media.list} />;

        } else if ( article.mediaType === 'video' ) {

          if ( article.media.video.thumbnail !== '' ) {

            thumbnail = <div className="media-type-video">
              <img src={article.media.video.thumbnail} alt={article.media.video.caption}/>
              <img src={Empty.VIDEO_PLAY} alt=''/>
            </div>;

          }

        }

        return (

          <div>
            <h1>{article.title}</h1>
            <div>{article.user.userName}</div>
            <div>{article.formatDate}</div>
            <div>{thumbnail}</div>
            <div className="XXX-OUCH" dangerouslySetInnerHTML={bodyTag()} />
            <div>{article.keywords.concat( ' ' )}</div>
          </div>

        );

      },
      componentWillMount: function() {

        // after mount
        _this.executeSafely( View.WILL_MOUNT );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );

      }
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { article: single } ),
      element
    );

    // 関連記事 もしもあるなら
    if ( single.hasRelated ) {
      this.related( single.related );
    }

    // comment 取得
    // 自動化の場合はここに記述
    // ToDo: 決めかねてる...

  }// render
  /**
   * 関連記事（記事詳細の）
   * @param {Array} related 配列内データ型はRelatedDom
   */
  related( related:Array = [] ):void {

    related = Safety.array( related );

    let element = this._elements.related;

    // tag block
    let RelatedDom = React.createClass( {
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
        let thumbnail = p.thumbnail ? p.thumbnail : Empty.IMG_SMALL;

        return (
          <a href={p.url} id={'headline-' + p.id} className={'headline headline-' + p.index}>
            <img src={thumbnail} alt={p.title}/>
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
      render: function() {

        let list = this.props.list;

        return (

          <div>
            {
              list.map( function( dae, i ) {

                let thumbnail = dae.media.images.thumbnail;
                thumbnail = thumbnail !== '' ? thumbnail : Empty.IMG_SMALL;

                // HeadlineDom instance を使い render
                return <RelatedDom
                  key={'headline-' + dae.id}
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

      }
    } );

    // 関連記事 dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: related } ),
      element
    );

  }// related

}
