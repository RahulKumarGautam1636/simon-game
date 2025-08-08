import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { ErrorBoundary } from './components/companiens/default/utilities';
import { Error } from './components/utils/utils';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose({trace: true});

const store = createStore(reducers, composeEnhancers(applyMiddleware()));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <Provider store={store}>      
        <ErrorBoundary fallback={<Error />}>
          <App />
        </ErrorBoundary>            
      </Provider>
    </React.StrictMode>                 
);


reportWebVitals();


export default store;            // only to get access of store in function in utilities page.


