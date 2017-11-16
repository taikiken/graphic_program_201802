// app/draft
import Classes from './Classes';

/**
 * draft 2016 定型句
 */
export default class Text {
  // ---------------------------------------------------
  //  CONSTANT
  // ---------------------------------------------------
  /**
   * draft 2016 定型句
   * @returns {string} 高校生
   */
  static get HIGH_SCHOOL() {
    return '高校生';
  }
  /**
   * draft 2016 定型句
   * @returns {string} 大学生
   */
  static get UNIVERSITY() {
    return '大学生';
  }
  /**
   * draft 2016 定型句
   * @returns {string} 社会人
   */
  static get WORKS() {
    return '社会人';
  }
  /**
   * draft 2016 定型句
   * @returns {string} 独立リーグ
   */
  static get INDEPENDENT() {
    return '独立リーグ';
  }
  /**
   * draft 2016 定型句
   * @returns {string} 投手
   */
  static get PITCHER() {
    return '投手';
  }
  /**
   * draft 2016 定型句
   * @returns {string} 捕手
   */
  static get CATCHER() {
    return '捕手';
  }
  /**
   * draft 2016 定型句
   * @returns {string} 内野手
   */
  static get INFIELDER() {
    return '内野手';
  }
  /**
   * draft 2016 定型句
   * @returns {string} 外野手
   */
  static get OUTFIELDER() {
    return '外野手';
  }
  /**
   * draft 2016 定型句
   * @returns {string} その他
   */
  static get ETC() {
    return 'その他';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * type に合わせた短形単語を取得します
   * @param {string} type position type
   * @returns {string} type に合わせた短形単語を返します
   */
  static short(type) {
    switch (type) {
      case Classes.PITCHER: {
        return '投';
      }
      case Classes.CATCHER: {
        return '捕';
      }
      case Classes.INFIELDER: {
        return '内';
      }
      case Classes.OUTFIELDER: {
        return '外';
      }
      case Classes.ETC: {
        return '他';
      }
      default: {
        return '';
      }
    }
  }
  /**
   * type に合わせた単語を取得します
   * @param {string} type position type
   * @returns {string} type に合わせた単語を返します
   */
  static long(type) {
    switch (type) {
      case Classes.PITCHER: {
        return Text.PITCHER;
      }
      case Classes.CATCHER: {
        return Text.CATCHER;
      }
      case Classes.INFIELDER: {
        return Text.INFIELDER;
      }
      case Classes.OUTFIELDER: {
        return Text.OUTFIELDER;
      }
      case Classes.ETC: {
        return Text.ETC;
      }
      default: {
        return '';
      }
    }
  }
  /**
   * type に合わせた所属種類を取得します
   * @param {string} type 所属種類, identity type
   * @return {string} 所属種類を返します
   */
  static identity(type) {
    switch (type) {
      case Classes.HIGH_SCHOOL: {
        return Text.HIGH_SCHOOL;
      }
      case Classes.UNIVERSITY: {
        return Text.UNIVERSITY;
      }
      case Classes.WORKS: {
        return Text.WORKS;
      }
      case Classes.INDEPENDENT: {
        return Text.INDEPENDENT;
      }
      default: {
        return '';
      }
    }
  }
  /**
   * 「投手」「捕手」から 'pitcher', 'catcher' を取得します
   * @param {string} type 日本語ポジション
   * @return {string} CSS class friendly position を返します
   */
  static position(type) {
    switch (type) {
      case Text.PITCHER: {
        return Classes.PITCHER;
      }
      case Text.CATCHER: {
        return Classes.CATCHER;
      }
      case Text.INFIELDER: {
        return Classes.INFIELDER;
      }
      case Text.OUTFIELDER: {
        return Classes.OUTFIELDER;
      }
      case Text.ETC: {
        return Classes.ETC;
      }
      default: {
        return '';
      }
    }
  }
  /**
   * 高校生|大学生|社会人|独立リーグ から highschool, university ...を取得します
   * @param {string} type 日本語出身
   * @return {string} CSS class friendly identity を返します
   */
  static division(type) {
    switch (type) {
      case Text.HIGH_SCHOOL: {
        return Classes.HIGH_SCHOOL;
      }
      case Text.UNIVERSITY: {
        return Classes.UNIVERSITY;
      }
      case Text.WORKS: {
        return Classes.WORKS;
      }
      case Text.INDEPENDENT: {
        return Classes.INDEPENDENT;
      }
      default: {
        return '';
      }
    }
  }
}
