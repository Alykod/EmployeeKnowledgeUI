import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './sass/App.sass'
import './sass/App.scss'
import { client } from './services/apolloClient'
import Navigation from './services/Navigation/Router'
import { ApolloProvider } from '@apollo/react-hooks'
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import {reducer} from './services/Context/Reducer'
import GlobalState from './services/Context/InitialStore'
const App = () => {

  const Store = createStore(reducer)
  return (
    <ApolloProvider client={client}>
      <Provider store={Store}>
      <div className="container">
      <Navigation/>
      </div>
      {/* <div className="container"> */}
      </Provider>
    </ApolloProvider>

  );
}

export default App;
