  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
  import App from './App.js';
  import './index.css';
  import { Provider } from 'react-redux';
  import store from './store.js';
import { BrowserRouter } from 'react-router-dom';

  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>,
  );
