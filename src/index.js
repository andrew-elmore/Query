import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import store from './store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme';
import App from './App';

function HelloWorldApp() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </Provider>
    )
}

initializeBlock(() => <HelloWorldApp />);
