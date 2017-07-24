import React from 'react';

export default class Link extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.link.description} ({this.props.link.url})</div>
      </div>
    );
  }

  _voteForLink = async () => {
    // TODO: Implement in Chapter 6
  }
}
