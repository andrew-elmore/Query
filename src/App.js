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

// import DevTools from './component/DevTools'



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
        const table = base.getTableById(tableId)
        const fields = table.fields.map(({id}) => {
          const field = table.getFieldById(id)
          const linkedTableId = field.options?.linkedTableId
          const linkedTableName = linkedTableId ? base.getTableById(linkedTableId).name : null
          return {
            type: field.type,
            name: field.name,
            id: field.id,
            linkedTable: linkedTableId ? {
              id: linkedTableId,
              name: linkedTableName,
            } : null
          }
        })
        return {
          name: table.name,
          id: table.id,
          fields: fields
        }
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
      {/* <DevTools
        state={state}
      /> */}
    </Paper>
  );
}

const propMap = (store) => ({
  tab: store.appState.tab,
  state: store,
  queryProgress: store.query.fulfilledRequestCount / (store.query.pendingRequestCount || 0)
});


export default connect(propMap, actionProvider)(App)

