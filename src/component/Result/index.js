import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Resolved from './Resolved';
import NotInDatabase from './NotInDatabase';
import Unresolved from './Unresolved/index.js';


const Result = (props) => {
  if (props.result.status === 'unresolved') {
    return <Unresolved {...props}/>
  } else if (props.result.status === 'resolved') {
    return <Resolved {...props}/>
  } else if (props.result.status === 'notInDatabase') {
    return null
    // return <NotInDatabase {...props}/>
  }
}


export default Result;
