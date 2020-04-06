import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import 'bootstrap/dist/css/bootstrap.min.css';

import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {  ApolloClient } from 'apollo-boost'
import { resolvers, typeDefs } from './graphql/resolvers';


import data from './graphql/initial-data'

const httpLink=createHttpLink({
  uri:'/graphql'
})

const cache=new InMemoryCache()

const client=new ApolloClient({
  link:httpLink,
  cache,
  typeDefs,
  resolvers
})

client.writeData({data})

ReactDOM.render(
  
  <ApolloProvider client={client} >

<App />

  </ApolloProvider>



  ,document.getElementById('root')
);


serviceWorker.unregister();
