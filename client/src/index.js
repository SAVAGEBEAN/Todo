import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider} from 'react-redux';
import store from './features/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryclient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>
    <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
