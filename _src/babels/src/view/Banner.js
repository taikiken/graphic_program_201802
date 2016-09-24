/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 0:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// data
import { Safety } from '../data/Safety';

// node
import { BannerNode } from '../node/single/BannerNode';

/**
 * `BannerNode` を出力します
 * @since 2016-09-24
 */
export class Banner {
  /**
   * pc banner を生成します
   * @param {SingleDae} single 記事詳細 JSON data
   * @return {?ReactClass} `div.sponsor-link` or null を返します
   */
  static pc(single) {
    const userBanner = single.user.banner.pc;
    let banner = single.banner.pc;
    // banner データを決定します
    if (!banner.image && !!userBanner.image) {
      banner = userBanner;
    }
    if (!banner) {
      return null;
    }

    return (
      <BannerNode
        banner={banner}
      />
    );
  }
  /**
   * sp banner を生成します
   * @param {SingleDae} single 記事詳細 JSON data
   * @param {Element} element マウントする親エレメント
   * @return {?ReactClass} `div.sponsor-link` or null を返します
   */
  static sp(single, element) {
    if (!Safety.isElement(element)) {
      return null;
    }

    const userBanner = single.user.banner.sp;
    let banner = single.banner.sp;
    // banner データを決定します
    if (!banner.image && !!userBanner.image) {
      banner = userBanner;
    }
    if (!banner) {
      return null;
    }

    return (
      <BannerNode
        banner={banner}
        pc={false}
      />
    );
  }
}
