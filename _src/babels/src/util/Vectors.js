/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/08/24 - 13:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * ある点の座標(x, y)と時間(time)を管理します
 *
 * @since 2-16-09-15
 */
export class Vectors {
  /**
   * 座標と現在時間を元にインスタンスを作成します
   * @param {number} [x=0] 座標 x
   * @param {number} [y=0] 座標 y
   * @param {number} [time=0] 時間 milli seconds
   */
  constructor(x = 0, y = 0, time = 0) {
    /**
     * 座標 x
     * @type {number}
     */
    this.x = x;
    /**
     * 座標 y
     * @type {number}
     */
    this.y = y;
    /**
     * 時間 milli seconds
     * @type {number}
     */
    this.time = time;
    /**
     * スクロール中かのフラッグ, true: スクロール中
     * @type {boolean}
     */
    this.scrolling = false;
  }
  /**
   * x, y, time プロパティを全て `0` にします
   * @return {Vectors} メソッドチェイン可能なようにインスタンスを返します
   */
  reset() {
    this.x = 0;
    this.y = 0;
    this.time = 0;

    return this;
  }
  /**
   * x, y, time を更新します
   * @param {number} x 座標 x
   * @param {number} y 座標 y
   * @param {number} [time=Date.now] 時間 milli seconds
   * @return {Vectors} メソッドチェイン可能なようにインスタンスを返します
   */
  update(x, y, time = Date.now()) {
    this.x = x;
    this.y = y;
    this.time = time;

    return this;
  }
  /**
   * 引数 vectors 間の距離を測ります
   * @param {Vectors} vectors 計測したい対象 Vector instance
   * @return {number} 距離を返します
   */
  distance(vectors) {
    const distanceX = this.x - vectors.x;
    const distanceY = this.y - vectors.y;
    const sqrt = (distanceX * distanceX) + (distanceY * distanceY);
    return Math.sqrt(sqrt);
  }
  /**
   * 引数 vectors との時間差を計算します
   * @param {Vectors} vectors 計測したい対象 Vector instance
   * @return {number} 時間差(milli seconds) を返します
   */
  duration(vectors) {
    return this.time - vectors.time;
  }
  /**
   * 複製を作成し返します
   * @return {Vectors} 複製を返します
   */
  clone() {
    const clone = new Vectors(this.x, this.y, this.time);
    clone.scrolling = this.scrolling;
    return clone;
  }
  /**
   * ベクトルの大きさの２乗の平方根を計算します
   * @return {number} ベクトルの大きさの２乗の平方根を返します
   */
  length() {
    const x = this.x;
    const y = this.y;
    return Math.sqrt((x * x) + (y * y));
  }
  /**
   * ベクトルの値を scalar 値で除算します
   *
   * @param {number} scalar 除算母数
   * @return {Vectors} 除算後の Vector を返します
   */
  divideByScalar(scalar) {
    const clone = this.clone();
    if (scalar === 0) {
      clone.x = 0;
      clone.y = 0;
    } else {
      const x = clone.x;
      const y = clone.y;
      const inverse = 1 / scalar;
      clone.x = x * inverse;
      clone.y = y * inverse;
    }

    return clone;
  }
  /**
   * ベクトルの大きさを正規化（大きさを1）した Vector を作成します
   * @return {Vectors} ベクトルの大きさを正規化（大きさを1）した Vectors を返します
   */
  normalize() {
    return this.divideByScalar(this.length());
  }
  /**
   * 引数 vectors との X 値を減算します
   * @param {Vectors} vectors 計測したい対象 Vectors instance
   * @return {number} X 値を減算し返します
   */
  betweenX(vectors) {
    return this.x - vectors.x;
  }
  /**
   * 引数 vectors との Y 値を減算します
   * @param {Vectors} vectors 計測したい対象 Vectors instance
   * @return {number} Y 値を減算し返します
   */
  betweenY(vectors) {
    return this.y - vectors.y;
  }
  /**
   * 引数 vectors との time 値を減算します
   * @param {Vectors} vectors 計測したい対象 Vectors instance
   * @return {number} time 値を減算し返します
   */
  betweenTime(vectors) {
    return this.time - vectors.time;
  }
  /**
   * 引数 vectors との x, y, time 値を減算します
   * @param {Vectors} vectors 計測したい対象 Vectors instance
   * @return {Vectors} 引数 vectors との x, y, time 値を減算した clone を返します
   */
  between(vectors) {
    const clone = this.clone();
    clone.x = clone.betweenX(vectors);
    clone.y = clone.betweenY(vectors);
    clone.time = clone.betweenTime(vectors);

    return clone;
  }
}
