import React from 'react';
import ReactDOM from 'react-dom';
import './assets/custom.css';
import './assets/main.css';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


let client = new ApolloClient({
  credentials: 'include',
  uri: `http://localhost:7000/graphql`
})


ReactDOM.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>

  ,document.getElementById('root')

);

