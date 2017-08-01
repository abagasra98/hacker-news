import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './Header';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Search from './Search';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/top" component={LinkList} />
            <Route exact path="/new/:page" component={LinkList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
