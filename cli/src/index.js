import React from 'react';
import ReactDOM from 'react-dom/client';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import App from './App';

const client = new ApolloClient({ /* (создаем клиента, передаем в Provider при подключении приложения) */
  uri: "http://localhost:5000/graphql", /* (адрес сервера) */
  cache: new InMemoryCache() /* (подключаем кеширование) */
}) 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider> 
  </React.StrictMode>
);



