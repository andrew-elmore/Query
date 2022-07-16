import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import QueryTarget from '../component/QueryTarget';

import DragAndDrop from '../UI/DragAndDrop';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Grid from '@mui/material/Grid';

function QueryScreen({
  actions: {
    AppStateActions
  }
}) {

  const itemsAInit = [
    {
      id: 'gary',
      label: 'Gary Goodspeed',
      test: 'ABC'
    },
    {
      id: 'cato',
      label: 'Little Cato',
      test: 'ABC'
    },
    {
      id: 'kvn',
      label: 'KVN',
      test: 'ABC'
    },
    {
      id: 'mooncake',
      label: 'Mooncake',
      test: 'ABC'
    },
    {
      id: 'quinn',
      label: 'Quinn Ergon',
      test: 'ABC'
    }
  ]
  

  const [itemsA, setItemsA] = React.useState(itemsAInit);

  return (
    <Grid container style={{margin: 10}}>
      <Grid item xs={12}>
        <DragAndDrop
          items={itemsA}
          onUpdate={setItemsA}
          id='DnD1'
          itemRender={({dragHandle, item, onChange}) => (
            <QueryTarget
              dragHandle={dragHandle}
              item={item}
              onChange={onChange}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

const propMap = (store) => ({
});


export default connect(propMap, actionProvider)(QueryScreen)

