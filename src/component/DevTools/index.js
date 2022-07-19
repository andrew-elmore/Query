import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';


const DevTools = ({
  state
}) => {
  const generateState = () => {
    const stateToken = {}
    Object.entries(state).forEach(([sliceName, slice]) => {
      const sliceToken = {}
      Object.entries(slice).forEach(([sectionName, sectionValues]) => {
        console.log(':~:', __filename.split('/').pop(), 'method', 'typeof sectionValues', typeof sectionValues)
        if (typeof sectionValues.getActionToken === 'function') {
          sliceToken[sectionName] = sectionValues.getActionToken()
        } else if (!['tables', 'base'].includes(sectionName)){
          sliceToken[sectionName] = sectionValues
        } 
      })
      stateToken[sliceName] = sliceToken
    })
    console.log(JSON.stringify(stateToken))
  }


  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => { console.log(generateState()) }}
    >
      LogState
    </Button>
  );
}

DevTools.propTypes = {

};

export default DevTools;
