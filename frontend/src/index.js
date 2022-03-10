import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routes/AppRouter';
import reportWebVitals from './reportWebVitals';
import configeStore from './store/configureStore';
import { startSetUser } from './actions/auth';

const store = configeStore();

const renderApp = () => {
  //Set user before render the app
  store.dispatch(startSetUser()).then(() => {
    ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})};

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
