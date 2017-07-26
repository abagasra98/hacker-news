import React from 'react';
import {GC_USER_ID} from '../constants';
import {timeDifferenceForDate} from '../utils';

export default class Link extends React.Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID);
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-start">
          <span className="gray">{this.props.index + 1}.</span>
          {userId && <div className="ml1 gray f11" onClick={() => this._voteForLink()}>▲</div>}
        </div>
        <div className="ml1">
          <div>{this.props.link.description} ({this.props.link.url})</div>
          <div className="f6 lh-copy gray">{this.props.link.votes.length} votes | by {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'} {timeDifferenceForDate(this.props.link.createdAt)}</div>
        </div>
      </div>
    );
  }

  _voteForLink = async () => {
    // TODO: Implement in Chapter 6
  }
}
