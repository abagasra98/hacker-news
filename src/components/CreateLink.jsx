import React from 'react';
import {graphql, gql} from 'react-apollo';
import {ALL_LINKS_QUERY} from './LinkList';
import {GC_USER_ID} from '../constants';

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
    const postedById = localStorage.getItem(GC_USER_ID);
    if (!postedById) {
      console.error('No user logged in');
      return;
    }

    const {description, url} = this.state;
    await this.props.createLinkMutation({
      variables: {
        description,
        url,
        postedById,
      },
      update: (store, {data: {createLink}}) => {
        const data = store.readQuery({query: ALL_LINKS_QUERY});
        data.allLinks.splice(0, 0, createLink);
        store.writeQuery({
          query: ALL_LINKS_QUERY,
          data,
        });
      }
    });
    this.props.history.push('/');
  }
}

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById,
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`

export default graphql(CREATE_LINK_MUTATION, {name: 'createLinkMutation'})(CreateLink);
