/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/18 - 20:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// React
import { InformationDataDae } from '../../dae/information/InformationDae';

/**
 * [library] - React
 */
const React = self.React;

/**
 * type: `img` の出力を行います
 * - link 有り無しで出力を変えます
 * @param {InformationDataDae} information JSON data
 * @returns {?XML} `div.announce`
 * @since 2017-12-18
 */
export const ComponentAnnounceImage = ({ information }) => {
  if (!information.img) {
    return null;
  }
  const backgroundColor = information.backgorundColor;
  const style = {
    bg: backgroundColor ? { backgroundColor } : {},
  };
  if (!information.link) {
    // no link
    return (
      <div
        className="announce announce--image"
        style={style.bg}
      >
        <div className="announce__inner">
          <p className="announce__item">
            <img src={information.img} alt="" />
          </p>
        </div>
      </div>
    );
  }
  // link あり
  return (
    <div
      className="announce announce--image"
      style={style.bg}
    >
      <div className="announce__inner">
        <p className="announce__item">
          <a href={information.link}>
            <img src={information.img} alt="" />
          </a>
        </p>
      </div>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{information: InformationDataDae}}
 */
ComponentAnnounceImage.propTypes = {
  information: React.PropTypes.instanceOf(InformationDataDae).isRequired,
};

/**
 * `information.icon` があれば出力します
 * @param {string} icon icon path
 * @returns {?XML} `img.announce__item__icon`
 * @since 2017-12-18
 */
export const ComponentAnnounceIcon = ({ icon }) => {
  if (!icon) {
    return null;
  }
  return <img className="announce__item__icon" src={icon} alt="" />;
};

/**
 * React.propTypes
 * @type {{icon: string}}
 */
ComponentAnnounceIcon.propTypes = {
  icon: React.PropTypes.string.isRequired,
};

/**
 * information.link なし 出力をします
 * @param {InformationDataDae} information JSON data
 * @returns {XML} `div.announce__item`
 * @since 2017-12-18
 */
export const ComponentAnnounceP = ({ information }) => (
  <p className="announce__item">
    <ComponentAnnounceIcon
      icon={information.icon}
    />
    {information.text}
  </p>
);

/**
 * React.propTypes
 * @type {{information: InformationDataDae}}
 */
ComponentAnnounceP.propTypes = {
  information: React.PropTypes.instanceOf(InformationDataDae).isRequired,
};

/**
 * information.link あり 出力をします
 * @param {InformationDataDae} information JSON data
 * @returns {XML} `div.announce__item`
 * @since 2017-12-18
 */
export const ComponentAnnounceA = ({ information }) => {
  const color = information.textColor;
  const style = {
    color: color ? { color } : {},
  };
  return (
    <p className="announce__item">
      <ComponentAnnounceIcon
        icon={information.icon}
      />
      <a
        href={information.link}
        style={style.color}
      >
        {information.text}
      </a>
    </p>
  );
};

/**
 * React.propTypes
 * @type {{information: InformationDataDae}}
 */
ComponentAnnounceA.propTypes = {
  information: React.PropTypes.instanceOf(InformationDataDae).isRequired,
};

/**
 * information.link property 存在チェックを行い出力を制御します
 * - information.link あり - {@link ComponentAnnounceA}
 * - information.link なし - {@link ComponentAnnounceP}
 * @param {InformationDataDae} information JSON data
 * @returns {XML} {@link ComponentAnnounceA} or {@link ComponentAnnounceP}
 * @since 2017-12-18
 */
export const ComponentAnnounceLink = ({ information }) => {
  if (information.link) {
    return (
      <ComponentAnnounceA
        information={information}
      />
    );
  }
  return (
    <ComponentAnnounceP
      information={information}
    />
  );
};

/**
 * React.propTypes
 * @type {{information: InformationDataDae}}
 */
ComponentAnnounceLink.propTypes = {
  information: React.PropTypes.instanceOf(InformationDataDae).isRequired,
};

/**
 * type `img` 以外の出力をします
 * - {@link ComponentAnnounceLink}
 * - information.text 必須
 * @param {InformationDataDae} information JSON data
 * @returns {?XML} `div.announce`
 * @since 2017-12-18
 */
export const ComponentAnnounceText = ({ information }) => {
  // no text
  if (!information.text) {
    return null;
  }
  const backgroundColor = information.backgorundColor;
  const style = {
    bg: backgroundColor ? { backgroundColor } : {},
  };
  return (
    <div
      className="announce announce--text"
      style={style.bg}
    >
      <div className="announce__inner">
        <ComponentAnnounceLink
          information={information}
        />
      </div>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{information: InformationDataDae}}
 */
ComponentAnnounceText.propTypes = {
  information: React.PropTypes.instanceOf(InformationDataDae).isRequired,
};

/**
 * 上部「お知らせ」表示します
 * - type: image - {@link ComponentAnnounceImage}
 * - type: warning|notice|etc - {@link ComponentAnnounceText}
 * @param {InformationDataDae} information JSON data
 * @returns {?XML} `type` により出力を変えます
 * @since 2017-12-18
 */
const ComponentAnnounce = ({ information }) => {
  if (information.type === 'img') {
    return (
      <ComponentAnnounceImage
        information={information}
      />
    );
  }
  return (
    <ComponentAnnounceText
      information={information}
    />
  );
};

/**
 * React.propTypes
 * @type {{information: InformationDataDae}}
 */
ComponentAnnounce.propTypes = {
  information: React.PropTypes.instanceOf(InformationDataDae).isRequired,
};

export default ComponentAnnounce;
