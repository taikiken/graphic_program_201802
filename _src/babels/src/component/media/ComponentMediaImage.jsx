/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/01/12 - 21:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// MediaImageNode
import { Safety } from '../../data/Safety';
import { SingleDae } from '../../dae/SingleDae';
import { ImagesDae } from '../../dae/theme/ImagesDae';

/**
 * [library] - React
 */
const React = self.React;

/**
 * [平昌五輪2018ハイライト] のタグのついた記事詳細のみ、サムネイル下にgorin.jpのロゴを記載する
 * @param {SingleDae} single 記事詳細データ
 * @param {boolean} sp sp flag - 画像パスを切り換えます
 * @return {?XML} `span.pyeongchang2018-powered-by`
 * @since 2018-01-12
 */
export const ComponentMediaImagePowered = ({ single, sp }) => {
  const keywords = single.keywords.keywords;
  // console.log('ComponentMediaImagePowered keywords', keywords);
  if (!keywords || !Array.isArray(keywords) || !keywords.length) {
    return null;
  }
  const pyeongchang2018 = keywords.some((keyword) => (keyword === '平昌五輪2018ハイライト'));
  // console.log('ComponentMediaImagePowered', pyeongchang2018, keywords);
  if (!pyeongchang2018) {
    return null;
  }
  const src = sp ?
    '/assets/sp/images/pyeongchang2018/icon-powerdby_gorinjp.png' :
    '/assets/images/pyeongchang2018/icon-powerdby_gorinjp.png';

  return (
    <span className="powered-by pyeongchang2018-powered-by">
      <img src={src} alt="" />
    </span>
  );
};

/**
 * React.propTypes
 * @type {{single: SingleDae, sp: boolean}}
 */
ComponentMediaImagePowered.propTypes = {
  single: React.PropTypes.instanceOf(SingleDae).isRequired,
  sp: React.PropTypes.bool.isRequired,
};

/**
 *  記事詳細上部メインビジュアルの画像下キャプションを出力します
 * @param {string} caption 画像キャプション
 * @return {?XML} `figcaption.caption`
 * @since 2018-01-12
 */
export const ComponentMediaImageFigcaption = ({ caption }) => {
  if (!caption) {
    return null;
  }
  return (
    <figcaption
      className="caption"
      dangerouslySetInnerHTML={{__html: caption}}
    />
  );
};

/**
 * React.props
 * @type {{caption: string}}
 */
ComponentMediaImageFigcaption.propTypes = {
  caption: React.PropTypes.string.isRequired,
};

/**
 * 記事詳細上部メインビジュアルの画像を出力します
 * @param {{original: string, large: string, midium: string}} images 画像パスリスト
 * @param {SingleDae} single 記事詳細データ
 * @param {boolean} sp flag
 * @returns {?XML} `div.post-kv`
 * @since 2018-01-12
 */
const ComponentMediaImage = ({ images, single, sp }) => {
  // 画像がない記事の時にセットされているのは
  // large と medium と thumbnail らしい
  // original から large と medium と順に探していく
  // console.log('ComponentMediaImage images', images);
  // 1. original
  let original = Safety.image(images.original, '');
  // 2. large
  if (original === '') {
    original = Safety.image(images.large, '');
  }
  // 3. medium
  if (original === '') {
    original = Safety.image(images.medium, '');
  }
  console.log('ComponentMediaImage original, single.id', original, single.id, images);
  // exist check
  if (original === '') {
    // no image or no correct image extension
    return null;
  }
  // caption
  const caption = Safety.string(images.caption, '');
  return (
    <div className="post-kv">
      <figure className="post-single-figure">
        <img
          src={original}
          alt=""
          className="post-single-image"
        />
        <ComponentMediaImagePowered
          single={single}
          sp={sp}
        />
        <ComponentMediaImageFigcaption
          caption={caption}
        />
      </figure>
    </div>
  );
};

/**
 * React.props
 * @type {{
 *  images: {original: string, large: string, medium: string},
 *  single: SingleDae
 * }}
 */
ComponentMediaImage.propTypes = {
  images: React.PropTypes.instanceOf(ImagesDae).isRequired,
  // 2018-01-12 - 平昌: タグで powered by 出す必要があるので追加する
  single: React.PropTypes.instanceOf(SingleDae).isRequired,
  sp: React.PropTypes.bool.isRequired,
};

export default ComponentMediaImage;
