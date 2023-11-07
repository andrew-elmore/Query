import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { CSVDownloader } from 'react-papaparse';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Input from '../UI/Input'
import AirtableFieldSelect from '../component/ActionFieldSelect/airtableFieldSelect';

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
  airtableFields,
  baseId,
  tables,
  actions: {
    DownloadActions
  }
}) {

  const classes = useStyles();

  const handleChangeAirtableFields = (ids, include) => {
    DownloadActions.setAirtableFields(airtableFields.setIncludeByIds(ids, include))
  }

  const handleLink = (field) => {
    const linkTokens = results.getLinkTokens(field)
    linkTokens.forEach((token) => {
      DownloadActions.link({...token, baseId, name: field.name})
    })
    const linkedTableId = field.linkedTable.id
    const linkedFields = tables.filter(table => table.id === linkedTableId)[0]?.fields
    DownloadActions.setAirtableFields(airtableFields.setLinkedFieldsById(field.id, linkedFields))
  }

  const [exportData, setExportData] = React.useState([])
  const [fileName, setFileName] = React.useState('')
  React.useEffect(() => {
    if (results.length && csvRecords.length) {
      setExportData(results.getDownloadToken(csvRecords, airtableFields))
    }
  }, [results, csvRecords])

  React.useEffect(() => {
    DownloadActions.setAirtableFields(results.getAirtableFields())
  }, [])

  return (
    <Grid container className={classes.root}>
      {/* <Grid item xs={6}>
      </Grid> */}
      <Grid item xs={12}>
        <Grid container>
          {airtableFields.map((field) => {
            return (
              <Grid item xs={12}>
                <AirtableFieldSelect
                  field={field}
                  onChange={handleChangeAirtableFields}
                  onLink={handleLink}
                />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
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
            data={() => {results.getDownloadToken(csvRecords, airtableFields)}}
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
  csvRecords: store.upload.records,
  airtableFields: store.download.airtableFields,
  baseId: store.appState.base._id,
  tables: store.appState.tables
});


export default connect(propMap, actionProvider)(ActionScreen)

