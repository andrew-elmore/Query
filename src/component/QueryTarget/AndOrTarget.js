import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Input from './../../UI/Input'
import Query from './index'

const AndOrTarget = ({
  query,
  csvRecords,
  onChange,
  onAdd,
  onRemove,
  airtableFieldOptions
}) => {

  return (
    <Grid container style={{margin: 5}}>
      <Grid item xs={12}>
        <Input
          field="type"
          onChange={onChange}
          value={query.type}
          label='Type'
          type="autocomplete"
          options={[
            'WHERE',
            'AND',
            'OR'
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        {query.subQuerys.map((subquery) => {
          return (
            <Query
              key={subquery.id}
              query={subquery}
              csvRecords={csvRecords}
              isChild={true}
              airtableFieldOptions={airtableFieldOptions}
              onChange={onChange}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          )
        })}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <IconButton
            onClick={onAdd}
          >
            <AddBoxIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

AndOrTarget.propTypes = {

};

export default AndOrTarget;
