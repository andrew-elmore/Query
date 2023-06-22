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
        try {
          if (sectionValues === null) {
            sliceToken[sectionName] = null
          } else if (typeof sectionValues.getActionToken === 'function') {
            sliceToken[sectionName] = sectionValues.getActionToken()
          } else if (!['tables', 'base'].includes(sectionName)){
            sliceToken[sectionName] = sectionValues
          }
        } catch (error) {
          sliceToken[sectionName] = sectionValues
          console.log('Could not get action token for', sliceName, sectionName, sectionValues, error)
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
