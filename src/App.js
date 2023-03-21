import React from 'react';
import { useBase } from '@airtable/blocks/ui';
import {actionProvider} from './actions'
import { connect } from 'react-redux';

import UploadScreen from './screens/UploadScreen';
import QueryScreen from './screens/QueryScreen';
import ViewScreen from './screens/ViewScreen';
import ResultScreen from './screens/ResultScreen';
import ActionScreen from './screens/ActionScreen';

import NavBar from './component/NavBar';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';

import DevTools from './component/DevTools'


function App({
  tab,
  state,
  queryProgress,
  actions: {
    AppStateActions
  }
}) {

  const base = useBase();

  React.useEffect(() => {
    if (base) {
      const tables = base._baseData.tableOrder.map((tableId) => {
        return base.getTableById(tableId)
      })
      AppStateActions.init({
        base,
        tables
      })
    }
  }, [])

  if (!state.appState.base) {
    return null
  }

  const tabs = [
    {id: 0, label: 'Data'},
    {id: 1, label: 'Query Design'},
    {id: 2, label: 'View Design'},
    {id: 3, label: 'Results'},
    {id: 4, label: 'Action'}
  ]

  const screens = [
    <UploadScreen/>,
    <QueryScreen/>,
    <ViewScreen/>,
    <ResultScreen/>,
    <ActionScreen/>
  ]

  return (
    <Paper elevation={0}>
      <NavBar
        tabs={tabs}
        tab={tab}
        setTab={AppStateActions.setTab}
      />
      {queryProgress > 0 && queryProgress < 100 && <LinearProgress variant="determinate" value={queryProgress * 100} />}
      {screens[tab]}
      <DevTools
        state={state}
      />
    </Paper>
  );
}

const propMap = (store) => ({
  tab: store.appState.tab,
  state: store,
  queryProgress: store.query.fulfilledRequestCount / (store.query.pendingRequestCount || 0)
});


export default connect(propMap, actionProvider)(App)

