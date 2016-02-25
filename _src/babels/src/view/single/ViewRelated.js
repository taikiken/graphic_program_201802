/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 17:52
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

import {Safety} from '../../data/Safety';

import {RelatedDae} from '../../dae/RelatedDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 関連記事表示
 */
export class ViewRelated extends View {
  /**
   * 関連記事, ViewSingle から呼び出されます
   * @param {Element} element root element
   * @param {Array<RelatedDae>} [related=[]] response.related_articles 配列
   */
  constructor( element:Element, related:Array<RelatedDae> = [] ) {
    super( element );
    this._related = Safety.array( related );
    this._rendered = null;
  }
  /**
   * render 処理を開始します
   */
  start():void {
    this.render( this._related );
  }
  /**
   * Dom 生成します
   * @param {Array<RelatedDae>} [related=[]] response.related_articles 配列
   */
  render( related ):void {

    if ( !Safety.isElement( this.element ) ) {
      // nothing do
      return;
    }

    // -------------------------------------------------
    // 配列が空
    // 関連記事がないので処理中止
    if ( related.length === 0 ) {
      return;
    }

    // -------------------------------------------------
    // 関連記事があった

    let element = this.element;

    // React Class
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      getInitialState: function() {
        return {
          list: this.props.list
        };
      },
      render: function() {

        let list = this.state.list;

        return (

          <div className="related-post">
            <div className="comment-heading">
              <h2>関連ニュース</h2>
            </div>

            <ul className="board-small column2">
              {
                list.map( function( dae, i ) {

                  let thumbnail = dae.media.images.thumbnail;
                  // thumbnail = !!thumbnail ? thumbnail : Empty.IMG_SMALL;
                  if ( !thumbnail ) {
                    thumbnail = Empty.IMG_SMALL;
                  } else if ( !Safety.isImg( thumbnail ) ) {
                    // 画像ファイル名に拡張子がないのがあったので
                    // 拡張子チェックを追加
                    thumbnail = Empty.IMG_SMALL;
                  }

                  return (
                    <li className="board-item column2" key={'related-' + dae.id}>
                      <a href={dae.url} id={'related-' + dae.id} className={'post post-' + i}>
                        <figure className="post-thumb">
                          <img src={thumbnail} alt={dae.title}/>
                        </figure>
                        <div className="post-data">
                          <p className={'post-category post-category-' + dae.category.slug}>{dae.category.label}</p>
                          <h3 className='post-heading'>{dae.title}</h3>
                          <p className="post-date">{dae.displayDate}</p>
                        </div>
                      </a>
                    </li>
                  );

                } )
              }
            </ul>
          </div>

        );

      },
      updateList: function( list ) {
        this.setState( { list: list } );
      }
    } );

    // 関連記事 dom 生成
    if ( this._rendered === null ) {

      this._rendered = ReactDOM.render(
        React.createElement( ArticleDom, { list: related } ),
        element
      );

    } else {

      this._rendered.updateList( related );

    }

  }
}
