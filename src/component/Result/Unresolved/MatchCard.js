import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Input from '../../../UI/Input'
import FieldsDisplay from '../FieldsDisplay';
import CsvRecord from '../../../domain/CsvRecord';

const useStyles = makeStyles((theme) => ({
}));

const MatchCard = ({
  match,
  view
}) => {
  const classes = useStyles();

 
  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
    >
      <FieldsDisplay
        data={match}
        view={view}
        type='airtableField'
        canBeSearchable={false}
      />
    </Grid>
  );
}

MatchCard.propTypes = {

};

export default MatchCard;
