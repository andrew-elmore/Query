import React from 'react';
import {actionProvider} from './../actions'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import CsvUpload from './../UI/CsvUpload'
import Button from '@mui/material/Button';
import Preview from './../component/Preview'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  approveButton: {
    backgroundColor: theme.palette.success.main,
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.success.dark
    }
  },
}));

function UploadScreen({
  base,
  tables,
  records,
  actions: {
    AppStateActions,
    UploadActions
  }
}) {
  const classes = useStyles();


  const continueButton = () => (
    <Grid item xs={12}>
      <Grid container>
        <Button
          variant='contained'
          color='primary'
          className={classes.approveButton}
          onClick={() => {AppStateActions.setTab(1)}}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <CsvUpload
          uploadData={(data) => {UploadActions.uploadCsvData(data)}}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.root}>
          <Preview
            records={records}
          />
        </Grid>
      </Grid>
      {continueButton()}
    </Grid>
  );
}

const propMap = (store) => ({
  base: store.appState.base,
  tables: store.appState.tables,
  records: store.upload.records
});


export default connect(propMap, actionProvider)(UploadScreen)

