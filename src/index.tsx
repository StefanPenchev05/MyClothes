import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './app/store';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </Provider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
