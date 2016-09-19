/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/19 - 20:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../View';

// view/headlines
import { ViewHeadlineArticle } from './ViewHeadlineArticle';

// app
import { Empty } from '../../app/const/Empty';
import { Message } from '../../app/const/Message';

// data
import { Safety } from '../../data/Safety';

// React
const React = self.React;

export class ViewHeadlines extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const home = this.props.home;

    return (
      <div className="headline">
        <div className="headline-heading">
          <h2 className="headline-heading-title"><img src="/assets/images/index/headline-heading.png" alt="HEADLINE NEWS" /></h2>
          <span className="headline-heading-ruby">{Message.HEADLINE_TITLE}</span>
        </div>
        <ul className="board-small column2">
          {
            this.props.list.map((dae, i) => {
              const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.IMG_SMALL);
              return (
                <ViewHeadlineArticle
                  key={`headline-${ dae.id}`}
                  index={i}
                  id={String(dae.id)}
                  slug={dae.categories.slug}
                  categories={dae.categories.all}
                  url={dae.url}
                  date={dae.displayDate}
                  title={dae.title}
                  thumbnail={thumbnail}
                  mediaType={dae.mediaType}
                  home={home}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
}

ViewHeadlines.propTypes = {
  // articles 配列を元にDomを作成する
  list: React.PropTypes.array.isRequired,
  callback: React.PropTypes.func.isRequired,
  home: React.PropTypes.bool
};

ViewHeadlines.defaultProps = {
  home: false
};
