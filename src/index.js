import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider, createNetworkInterface ,ApolloClient} from 'react-apollo';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj5idu3amaq6y0122oqdld4l2',
});

const client = new ApolloClient({
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));
registerServiceWorker();
