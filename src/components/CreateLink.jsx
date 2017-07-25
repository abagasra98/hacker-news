import React from 'react';
import {graphql, gql} from 'react-apollo';

class CreateLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      url: '',
    };
  }

  render() {
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            type="text"
            className="mb2"
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            placeholder="A description for the link"
          />
          <input
            type="text"
            className="mb2"
            value={this.state.url}
            onChange={(e) => this.setState({url: e.target.value})}
            placeholder="The URL for the link"
          />
        </div>
        <button onClick={() => this._createLink()}>Submit</button>
      </div>
    );
  }

  _createLink = async () => {
    const {description, url} = this.state;
    await this.props.createLinkMutation({
      variables: {
        description,
        url,
      },
    });
  }
}

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(
      description: $description,
      url: $url,
    ) {
      id
      createdAt
      url
      description
    }
  }
`

export default graphql(CREATE_LINK_MUTATION, {name: 'createLinkMutation'})(CreateLink);