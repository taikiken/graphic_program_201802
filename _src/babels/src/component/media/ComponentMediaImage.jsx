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

/**
 * [library] - React
 */
const React = self.React;

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

ComponentMediaImageFigcaption.propTypes = {
  caption: React.PropTypes.string.isRequired,
};

const ComponentMediaImage = ({ images, single }) => {
  // 画像がない記事の時にセットされているのは
  // large と medium と thumbnail らしい
  // original から large と medium と順に探していく

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
        <ComponentMediaImageFigcaption
          caption={caption}
        />
      </figure>
    </div>
  );
};

ComponentMediaImage.propTypes = {
  images: React.PropTypes.shape({
    original: React.PropTypes.string,
    large: React.PropTypes.large,
    medium: React.PropTypes.string,
  }).isRequired,
  // 2018-01-12 - 平昌: タグで powered by 出す必要があるので追加する
  single: React.PropTypes.instanceOf(SingleDae).isRequired,
};

export default ComponentMediaImage;
