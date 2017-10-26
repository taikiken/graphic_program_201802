/**
 * draft 2016, CSS classes
 */
export default class Classes {
  /**
   * draft 2016 CSS class
   * @returns {string} is-checked
   */
  static get CHECKED() {
    return 'is-checked';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} pitcher
   */
  static get PITCHER() {
    return 'pitcher';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} catcher
   */
  static get CATCHER() {
    return 'catcher';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} infielder
   */
  static get INFIELDER() {
    return 'infielder';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} OUTFIELDER
   */
  static get OUTFIELDER() {
    return 'outfielder';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} etc
   */
  static get ETC() {
    return 'etc';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} highschool
   */
  static get HIGH_SCHOOL() {
    return 'highschool';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} university
   */
  static get UNIVERSITY() {
    return 'university';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} works
   */
  static get WORKS() {
    return 'works';
  }
  /**
   * draft 2016 CSS class
   * @returns {string} independent
   */
  static get INDEPENDENT() {
    return 'independent';
  }
  /**
   * 指名状況: situation class を出力します
   *
   * - 4: status-win
   * - 3: status-lose
   *
   * @param {number} situation 指名状況
   * @return {string} situation class
   */
  static situation(situation) {
    switch (situation) {
      case 4: {
        return 'status-win';
      }
      case 3: {
        return 'status-lose';
      }
      default: {
        return '';
      }
    }
  }
}
