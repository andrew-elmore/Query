import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Input from '../../../UI/Input'
import FieldsDisplay from '../FieldsDisplay';
import CsvRecord from './../../../domain/CsvRecord';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const Unresolved = ({
  result,
  view,
  csvRecords,
  handleUpdateCSVRecord
}) => {
  const classes = useStyles();

  const csvRecord = csvRecords.find((record) => record.id === result.csvId);

  const handleBlur = (currentFields) => {
    const newCSVRecordData = {...csvRecord}
    newCSVRecordData['currentFields'] = currentFields
    handleUpdateCSVRecord(newCSVRecordData)
  }
 
  return (
    <Grid container alignItems="center" className={classes.container}>
      <Grid item xs={4}>
        <FieldsDisplay
          data={csvRecord.currentFields}
          view={view}
          type='csvField'
          canBeSearchable={true}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={8}>
        {JSON.stringify(csvRecord.currentFields)}
      </Grid>
    </Grid>
  );
}

Unresolved.propTypes = {

};

export default Unresolved;
