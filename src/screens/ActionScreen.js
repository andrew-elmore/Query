import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { CSVDownloader } from 'react-papaparse';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Input from '../UI/Input'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  downloadButton: {
    margin: theme.spacing(1),
  },
}));

function ActionScreen({
  results,
  csvRecords,
  actions: {
    AppStateActions
  }
}) {

  const classes = useStyles();

  const [exportData, setExportData] = React.useState([])
  const [fileName, setFileName] = React.useState('')
  React.useEffect(() => {
    if (results.length && csvRecords.length) {
      setExportData(results.getDownloadToken(csvRecords))
    }
  }, [results, csvRecords])

  return (
    <Grid container className={classes.root}>
      <Grid item xs={8}>
        <Input
          label={'File Name'}
          value={fileName}
          type='text'
          onChange={({value}) => {setFileName(value)}}
        />
      </Grid>
      <Grid item xs={4}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <CSVDownloader
            filename={fileName}
            data={exportData}
          >
            <Button
              className={classes.downloadButton}
              variant='contained'
              color='primary'
            >
              Download
            </Button>
          </CSVDownloader>
        </Grid>
      </Grid>
    </Grid>
  );
}

const propMap = (store) => ({
  results: store.query.results,
  csvRecords: store.upload.records
});


export default connect(propMap, actionProvider)(ActionScreen)

