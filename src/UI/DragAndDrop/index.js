import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DraggableContainer from './DraggableContainer';

import Grid from '@mui/material/Grid';


function DragAndDrop({
  items,
  onUpdate,
  id,
  itemRender
}) {

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    let newItems
    if (typeof items.getActionToken === 'function') {
      newItems = items.getActionToken();
    } else {
      newItems = [...items]
    }
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    onUpdate(newItems);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={id}>
        {(provided) => (
          <Grid container className={id} {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => {
              return (
                <DraggableContainer
                  id={item.id}
                  index={index}
                  item={item}
                  itemRender={itemRender}
                />
              );
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragAndDrop

