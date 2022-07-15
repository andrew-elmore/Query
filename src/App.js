import React from 'react';
import reducers from './reducers';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './utils/theme';
import NavBar from './component/NavBar';

import Paper from '@mui/material/Paper';



function App() {
  console.log(':~:', __filename.split('/').pop(), 'method', 'reducers', reducers)
  const initialState = {}
  const [state, dispatch] = React.useReducer(reducers, initialState)
  const [tab, setTab] = React.useState(0)
  const handleUpdate = ({type, value}) => {
    dispatch({ type, value })
  }

  const tabs = () => {

  }

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0}>
        <NavBar
          tab={tab}
          setTab={setTab}
        />
        <div>Hello world 🚀</div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
