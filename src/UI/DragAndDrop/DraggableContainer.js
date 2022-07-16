import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import IconButton from '@mui/material/IconButton';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const DraggableContainer = ({
  id,
  index,
  item,
  itemRender,
  onUpdateItem
}) => {


  const dragAnchor = (dragHandleProps) => {
    return (
      <div {...dragHandleProps} style={{display: 'inline', padding: 5}}>
        <IconButton disabled>
          <DragHandleIcon/>
        </IconButton>
      </div>
    )
  }


  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps}>
          {
            itemRender({
              dragHandle: dragAnchor(provided.dragHandleProps),
              onChange: (props) => {onUpdateItem({...props, index})},
              item
            })
          }
        </Grid>
      )}
    </Draggable>
  );
}

DraggableContainer.propTypes = {

};

export default DraggableContainer;
