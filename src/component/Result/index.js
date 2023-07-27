import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Resolved from './Resolved';
import Unresolved from './Unresolved';
import Input from './../../UI/Input'


const Result = (props) => {
  if (props.result.status === 'unresolved') {
    return <Unresolved {...props}/>
  } else if (props.result.status === 'resolved') {
    return <Resolved {...props}/>
  }
}


export default Result;
