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
      label: 'Gary Goodspeed'
    },
    {
      id: 'cato',
      label: 'Little Cato'
    },
    {
      id: 'kvn',
      label: 'KVN'
    },
    {
      id: 'mooncake',
      label: 'Mooncake'
    },
    {
      id: 'quinn',
      label: 'Quinn Ergon'
    }
  ]
  

  const [itemsA, setItemsA] = React.useState(itemsAInit);


  
  // function handleOnDragEnd(result) {
  //   if (!result.destination) return;

  //   const items = Array.from(characters);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   updateCharacters(items);
  // }

  return (
    <Grid container style={{margin: 10}}>
      <Grid item xs={12}>
        <DragAndDrop
          items={itemsA}
          onUpdate={setItemsA}
          id='DnD1'
          itemRender={({dragHandle, item}) => (
            <QueryTarget
              dragHandle={dragHandle}
              item={item}
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

