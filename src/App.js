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
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import GlobalState from './services/Context/InitialStore'
import { PersistGate } from 'redux-persist/integration/react'



const App = () => {


  const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, reducer)


  const Store = createStore(persistedReducer)
  let persistor = persistStore(Store)


  return (
    <ApolloProvider client={client}>
      <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
      <Navigation/>
      {/* <div className="container"> */}
      </PersistGate>
      </Provider>
    </ApolloProvider>

  );
}

export default App;
