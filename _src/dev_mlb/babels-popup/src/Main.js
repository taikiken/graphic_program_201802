/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 16:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/device
import Android from './moku/device/os/Android';
import iOS from './moku/device/os/iOS';

// net
import Visited from './banner/net/Visited';

// app
import Black from './banner/app/Black';

// ui
import Modal from './banner/ui/Modal';

/**
 * 条件をチェックし `app download banner` を表示します
 */
export default class Main {
  /**
   * `app download banner` を表示します
   * - pc / sp 判定し処理分岐します
   * - modal Element 作成します
   */
  static modal() {
    // console.log('Main.modal');
    const element = document.createElement('div');
    element.className = 'modal-intro';
    // make modal container
    if (Android.phone() || iOS.phone()) {
      Modal.sp(element);
    } else {
      Modal.pc(element);
    }
  }
  /**
   * 条件チェックを行います -> modal 作成・表示します
   * - {@link Black}, {@link Visited}
   */
  static start() {
    // console.log('Main.start', Black.detect(), Visited.already());
    // googletag 条件追加する
    if (!Black.detect() && !Visited.already() && self.googletag) {
      Visited.arrive();
      Main.modal();
    }
  }
}
