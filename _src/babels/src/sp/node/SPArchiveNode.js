/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/10 - 17:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app
import {Empty} from '../../app/const/Empty';
import {User} from '../../app/User';
import {MediaType} from '../../app/const/MediaType';

// view
import {View} from '../../view/View';

// data
import {Safety} from '../../data/Safety';

import {ReactionNode} from '../../node/comment/ReactionNode';

// React
let React = self.React;

// --------------------------------------------
// COMMENTS Popular second
// --------------------------------------------
let CommentedUsersDom = React.createClass( {
  propType: {
    total: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      total: this.props.total
    };
  },
  render: function() {

    if ( this.state.total === 0 ) {
      return null;
    } else {

      return <span className="commented-user-andmore">+{this.state.total}</span>;
    }

  }

} );


let CommentsSecondDom = React.createClass( {
  propType: {
    seconds: React.PropTypes.array.isRequired,
    articleId: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    hasSecond: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      seconds: this.props.seconds
    };
  },
  render: function() {

    if ( !this.props.hasSecond ) {
      // 描画要素がない
      return null;
    }

    let seconds = this.state.seconds;
    let articleId = this.props.articleId;

    return (
      <div className="commented-user">
        <ul className="comments-second">
          {
            seconds.map( function( commentDae, i ) {

              let userDae = commentDae.user;
              // let picture = userDae.profilePicture ? userDae.profilePicture : Empty.USER_EMPTY;
              let picture = userDae.profilePicture;
              if ( !picture ) {
                picture = Empty.USER_EMPTY;
              } else if ( !Safety.isImg( picture ) ) {
                // 画像ファイル名に拡張子がないのがあったので
                // 拡張子チェックを追加
                picture = Empty.USER_EMPTY;
              }

              let loggedIn = picture === Empty.USER_EMPTY ? '' : 'user-logged-in';

              // CommentsSecond unique key は  記事Id + user Id を使用する
              // 同一ユーザーが複数投稿することがあるため
              // render 内で unique なことを保証する必要がある
              return (
                <li key={'user-' + articleId + '-' + commentDae.id + '-' + userDae.id + '-' + i} className={'commented-user-item commented-user-item-' + i}>
                      <span className={'commented-user-thumb ' + loggedIn}>
                        <img src={picture} alt={userDae.userName}/>
                      </span>
                </li>
              );
            } )
          }
        </ul>
        <CommentedUsersDom total={this.props.total} />
      </div>
    );

  }
} );

// --------------------------------------------
// COMMENTS Popular
// --------------------------------------------

// --------------------------------------------
// first + second comment container
let PopularDom = React.createClass( {
  propType: {
    commentsPopular: React.PropTypes.object.isRequired,
    total: React.PropTypes.number.isRequired,
    articleId: React.PropTypes.string.isRequired,
    uniqueId: React.PropTypes.string.isRequired
  },
  render: function() {

    let commentsPopular = this.props.commentsPopular;
    let total = this.props.total;
    let articleId = this.props.articleId;

    let hasFirst = commentsPopular.hasFirst;
    let hasSecond = commentsPopular.hasSecond;
    let firstDae = commentsPopular.first;
    let secondsDae = commentsPopular.seconds;
    // console.log( 'commentsPopular', articleId, total, hasFirst, hasSecond, firstDae, secondsDae );
    if ( hasSecond ) {
      // 2件目以降も存在する
      // 合計数からアイコン描画数を引く
      total -= secondsDae.length;
    }

    // 1 件 comment があるかをチェクする
    if ( hasFirst ) {

      // 少なくとも1件は存在する
      // 総件数から 1（アイコン描画数） マイナス
      total -= 1;
      console.log( '少なくとも1件は存在する ', articleId );

      // 1件目コメントデータを取り出し
      let first = firstDae;
      // 1件目コメント・ユーザー
      let firstUser = first.user;
      // ユーザーサムネイル
      let picture = firstUser.profilePicture;

      if ( !picture ) {
        picture = Empty.USER_EMPTY;
      } else if ( !Safety.isImg( picture ) ) {
        // 画像ファイル名に拡張子がないのがあったので
        // 拡張子チェックを追加
        picture = Empty.USER_EMPTY;
      }

      let loggedIn = picture === Empty.USER_EMPTY ? '' : 'user-logged-in';

      // login 済かを調べる
      let sign = User.sign;

      return (
        <div className="comments-popular">
          <CommentsSecondDom
            seconds={secondsDae}
            articleId={articleId}
            total={total}
            hasSecond={hasSecond}
          />
          <div className="feature-user comment-item">
            <figure className="comment-user">
                  <span className="comment-user-link">
                    <span className={'comment-user-thumb ' + loggedIn}><img src={picture} alt={firstUser.userName}/></span>
                    <div className="comment-user-data">
                      <p className="comment-user-name">{firstUser.userName}</p>
                      <p className="comment-user-job">{firstUser.bio}</p>
                    </div>
                  </span>
            </figure>
            {/* insert html tag into .comment-content innerHTML */}
            <div className="comment-content" dangerouslySetInnerHTML={{__html: first.body}} />
            <ReactionNode
              uniqueId={this.props.uniqueId}
              articleId={String(articleId)}
              commentId={String(first.id)}
              sign={sign}
              good={first.good}
              bad={first.bad}
              isGood={first.isGood}
              isBad={first.isBad}
              activate={false}
            />
          </div>

        </div>
      );

    } else {

      // 描画するべきものがない
      return null;

    }

  }, // render
  componentDidMount: function() {
    // mount
  }
} );

// ------------------------------------------------
// 基点 React class
// ------------------------------------------------
// 記事一覧のサムネイル
let ThumbnailDom = React.createClass( {
  propType: {
    mediaType: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    masonry: React.PropTypes.bool.isRequired,
    action: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title
    };
  },
  render: function() {
    let mediaType = this.props.mediaType;

    // media type で thumbnail 切替
    if ( mediaType === MediaType.IMAGE ) {
      // type: image
      return (
        <figure className={'post-thumb post-thumb-' + mediaType}>
          <img src={this.props.thumbnail} alt={this.props.title}/>
        </figure>
      );
    } else if ( mediaType === MediaType.VIDEO ) {
      // type: video
      return (
        <figure className={'post-thumb post-thumb-' + mediaType}>
          <img className="video-thumbnail" src={this.props.thumbnail} alt={this.props.title}/>
          <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY} />
        </figure>
      );
    } else {
      // 該当なし
      return null;
    }
  }
} );

// 個別の 記事Dom
// React Class, SPArchiveNode Dom
/**
 * SP 個別の 記事Dom
 * @type {React.component}
 */
export let SPArchiveNode = React.createClass( {
  propTypes: {
    list: React.PropTypes.array,
    // request offset
    offset: React.PropTypes.number,
    // request length
    length: React.PropTypes.number,
    // action instance
    action: React.PropTypes.object,
    // scope 呼び出し元 instance
    scope: React.PropTypes.object,
    // more button
    moreButton: React.PropTypes.func,
    // home or not
    home: React.PropTypes.bool
  },
  getDefaultPropTypes: function() {
    return {
      moreButton: function() {},
      home: false
    };
  },
  getInitialState: function() {

    return {
      arranged: 'prepare',
      list: this.props.list,
      offset: this.props.offset,
      length: this.props.length
    };
  },
  render: function() {

    // console.log( '****************************************** render', this.state.list );
    let home = this.props.home;

    // dom出力する
    return (
      <div ref="boardRout" className="board-stack">
        {
          // loop start
          this.state.list.map( function( dae, i ) {

            let commentsPopular = dae.commentsPopular;
            let commentsTotal = dae.commentsCount;
            let thumbnail;

            thumbnail = dae.media.images.medium;

            // thumbnail が空の時は代替画像
            if ( !thumbnail ) {
              thumbnail = Empty.IMG_MIDDLE;
            } else if ( !Safety.isImg( thumbnail ) ) {
              // 画像ファイル名に拡張子がないのがあったので
              // 拡張子チェックを追加
              thumbnail = Empty.IMG_MIDDLE;
            }

            let category = ( label ):string => {
              return !label ? '' : <span className="category-label">{label}</span>;
            };

            let recommend = '';
            if ( !!dae.isRecommend && home ) {
              recommend = <i className="post-label_recommend">おすすめ記事</i>;
            }

            // unique key(React)にarticle id(number)記事Idを使用します
            return (
              <div key={'archive-' + dae.id} className={'board-item board-item-' + i}>
                <a className="post" href={dae.url}>
                  <ThumbnailDom
                    mediaType={dae.mediaType}
                    thumbnail={thumbnail}
                    title={dae.title}
                  />
                  <h2 className='post-heading'>{dae.title}</h2>
                  <div className="post-data">
                    {recommend}
                    <p className={'post-category post-category-' + dae.category.slug}>{category(dae.category.label)}{category(dae.category2.label)}</p>
                    <p className="post-date">{dae.displayDate}</p>
                    <div className="post-excerpt-text">{dae.description}</div>
                  </div>
                </a>
                <PopularDom
                  key={'comment-' + dae.id}
                  uniqueId={'comment-' + dae.id}
                  commentsPopular={commentsPopular}
                  total={commentsTotal}
                  articleId={String(dae.id)} />
              </div>
            );
            // loop end
          } )
        }
      </div>
    );

  },
  // state 変更し dom が更新された後に呼び出される delegate
  componentDidUpdate: function() {

  },
  // dom が表示された後に1度だけ呼び出される delegate
  componentDidMount: function() {
    // console.log( '************ componentDidMount ************', this.props.masonry );
    // after mount
    this.props.scope.executeSafely( View.DID_MOUNT );
    // hasNext を元に More View button の表示非表示を決める
    this.props.moreButton( this.props.action.hasNext() );

  },
  // dom が削除される前に呼び出される delegate
  componentWillUnmount: function() {
  },
  // -----------------------------------------------------
  // 以降 custom
  // isotope 前準備
  shouldMasonry: function() {

  },
  // 画像読み込む完了 event handler, isotope を実行
  onImages: function() {

  },
  updateList: function( list, offset, length ) {
    // state を変更し appendChild + isotope を行う
    this.setState( { list: list, offset: offset, length: length } );
    this.props.moreButton( this.props.action.hasNext() );

  },
  // didUpdate から呼び出される
  appendImages: function() {

    // hasNext を元に More View button の表示非表示を決める
    this.setState( { loading: '' } );
    this.props.moreButton( this.props.action.hasNext() );

  }
} );// SPArticleDom
