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
import Visited from './banner/net/Visited';
import Black from './banner/app/Black';
import Android from './moku/device/os/Android';
import iOS from './moku/device/os/iOS';
import Modal from './banner/ui/Modal';

export default class Main {
  static modal() {
    const element = document.getElementById('js-app-popup');
    if (!element) {
      return;
    }
    // make modal container
    if (Android.phone() || iOS.phone()) {
      Modal.sp(element);
    } else {
      Modal.pc(element);
    }
  }
  static start() {
    if (!Black.detect() && !Visited.already()) {
      Main.modal();
    }
  }
}
