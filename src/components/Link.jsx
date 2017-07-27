import React from 'react';
import {gql, graphql} from 'react-apollo';
import {GC_USER_ID} from '../constants';
import {timeDifferenceForDate} from '../utils';

class Link extends React.Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID);
    const voteLabel = (this.props.link.votes.length === 1) ? ' vote' : ' votes';
    
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-start">
          <span className="gray">{this.props.index + 1}.</span>
          {userId && <div className="ml1 gray f11" onClick={() => this._voteForLink()}>▲</div>}
        </div>
        <div className="ml1">
          <div>{this.props.link.description} ({this.props.link.url})</div>
          <div className="f6 lh-copy gray">{this.props.link.votes.length + voteLabel} | by {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'} {timeDifferenceForDate(this.props.link.createdAt)}</div>
        </div>
      </div>
    );
  }

  _voteForLink = async () => {
    const userId = localStorage.getItem(GC_USER_ID);
    const voterIds = this.props.link.votes.map(vote => vote.user.id);
    if (voterIds.includes(userId)) {
      console.log(`User (${userId}) already voted for this link.`);
      return;
    }

    const linkId = this.props.link.id;
    await this.props.createVoteMutation({
      variables: {
        userId,
        linkId,
      },
      update: (store, {data: {createVote}}) => {
        this.props.updateStoreAfterVote(store, createVote, linkId);
      }
    });
  }
}

const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

export default graphql(CREATE_VOTE_MUTATION, {
  name: 'createVoteMutation'
})(Link);
