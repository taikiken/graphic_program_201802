/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/13 - 15:49
 * @license MIT
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * version @@version
 * build @@buildTime
 */
'use strict';

import Tabs from './ms/ui/Tabs';
import Accordions from './ms/ui/Accordions';

// ----------------------------------------
/**
 * tab menu を実装します
 */
const initTab = () => {
  const elements = Tabs.init();
  elements.map((element) => {
    const tab = new Tabs(element);
    tab.start();
    return tab;
  });
};

const initAccordion = () => {
  const { triggers, bodies } = Accordions.init();
  triggers.map((trigger, index) => {
    const accordion = new Accordions(trigger, bodies[index]);
    accordion.start();
    return accordion;
  });
};

// ----------------------------------------
// DOMContentLoaded - body bottom 記述なので event 使用しない

// tab setting
initTab();

initAccordion();
