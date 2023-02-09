import React from 'react';
import Grid from '@mui/material/Grid';
import Input from './../../UI/Input'
import { makeStyles } from '@mui/styles';
import View from './../../domain/View'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({

}));

const ViewField = ({
  tables,
  csvFields,
  view,
  onChange,
  onRemove
}) => {
  const classes = useStyles();

  const handleChange = ({field, value}) => {
    const newView = new View({
      ...view,
      [field]: value
    })
    onChange(newView)
  }
  const tableFields = view.table ? (
    view.table.fields
  ) : ( [] )

  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <Input
          type="autocomplete"
          field="csvField"
          options={csvFields}
          onChange={handleChange}
          value={view.csvField}
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          type="autocomplete"
          field="table"
          options={tables}
          onChange={handleChange}
          value={view.table}
        />
      </Grid>
      <Grid item xs={4}>
        {view.table ? (
          <Input
            type="autocomplete"
            field="airtableField"
            options={tableFields}
            onChange={handleChange}
            value={view.airtableField}
          />
        ) : (null)}
      </Grid>
      <Grid item xs={1}>
          <IconButton
            onClick={() => { onRemove(view) }}
          >
            <DeleteIcon/>
          </IconButton>
      </Grid>
    </Grid>
  );
}

ViewField.propTypes = {

};

export default ViewField;
