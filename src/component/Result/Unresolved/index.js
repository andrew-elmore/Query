import React from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import FieldsDisplay from '../FieldsDisplay';
import MatchCard from './MatchCard';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(1),
  },
  pagination: {
    margin: 10
  },
  approveButton: {
    backgroundColor: theme.palette.success.main,
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.success.dark
    }
  },
  rejectButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  }
}));

const Unresolved = ({
  result,
  view,
  csvRecords,
  handleUpdateCSVRecord,
  onRunQuery,
  onSelectResult
}) => {
  const classes = useStyles();

  const [matchIdx, setMatchIdx] = React.useState(0);
  const csvRecord = csvRecords.find((record) => record.id === result.csvId);

  const handleBlur = (currentFields) => {
    const newCSVRecordData = {...csvRecord}
    newCSVRecordData['currentFields'] = currentFields
    handleUpdateCSVRecord(newCSVRecordData)
  }

  const handleRunQuery = () => {
    onRunQuery([csvRecord])
  }

  const handleSelectResult = () => {
    const newResultData = {
      ...result,
      matches: [result.matches[matchIdx]],
      status: 'resolved',
    }
    onSelectResult(newResultData)
  }
 
  return (
    <Grid container alignItems="center" className={classes.container}>
      <Grid item xs={4} className={classes.currentFieldsContainer}>
        <FieldsDisplay
          data={csvRecord.currentFields}
          view={view}
          type='csvField'
          canBeSearchable={true}
          onBlur={handleBlur}
        />
        <Grid container justifyContent="center" alignItems="center">
          <Button
            variant='contained'
            color='primary'
            className={classes.approveButton}
            onClick={handleRunQuery}
          >
            Search
          </Button>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            variant='contained'
            color='primary'
            className={classes.rejectButton}
            onClick={handleRunQuery}
          >
            Not In Database
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <MatchCard
          index={matchIdx}
          match={result.matches[matchIdx]}
          view={view}
        />
        <Grid container justifyContent="center" alignItems="center">
          <Button
            variant='contained'
            color='primary'
            className={classes.approveButton}
            onClick={handleSelectResult}
          >
            Select
          </Button>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Pagination
            className={classes.pagination}
            siblingCount={0}
            boundaryCount={1}
            count={result.matches.length} 
            page={matchIdx + 1} 
            onChange={(e, v) => {setMatchIdx(v - 1)}}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

Unresolved.propTypes = {

};

export default Unresolved;
