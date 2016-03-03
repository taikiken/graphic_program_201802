/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 15:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();
let _category = {
  all: '新着順',
  ranking: 'ランキング',
  video: '動画'
};

/**
 * 各ページのタイトル
 */
export class Title {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Title is static Class. not use new Title().` );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {string} 検索キーワード置き換え文字列
   */
  static get SEARCH_WORD():string {
    return '|__SEARCH_WORD__|';
  }
  /**
   * @return {string} カテゴリー slug all のタイトルを返します
   */
  static get all():string {
    return _category.all;
  }
  /**
   * @return {string} カテゴリー type ranking のタイトルを返します
   */
  static get ranking():string {
    return _category.ranking;
  }
  /**
   * @return {string} カテゴリー type video のタイトルを返します
   */
  static get video():string {
    return _category.video;
  }
  /**
   * @return {string} 検索タイトルの雛形を返します
   */
  static get search():string {
    return `「${Title.SEARCH_WORD}」の検索結果`;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 検索タイトルの雛形 から 検索文字列 を使用しタイトルを生成します
   * @param {string} keyword 検索文字列
   * @return {string} 検索タイトルの雛形 から 検索文字列 を使用しタイトルを生成し返します
   */
  static searchTitle( keyword:string ):string {
    return Title.search.replace( Title.SEARCH_WORD, keyword );
  }
  /**
   *
   * @param {string} slug category slug, type
   * @return {string} category label を返します
   */
  static categoryTitle( slug:string ):string {
    return _category[ slug ];
  }
}

