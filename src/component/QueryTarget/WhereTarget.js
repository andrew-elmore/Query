import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

import Input from './../../UI/Input'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const WhereTarget = ({
  query,
  csvRecords,
  airtableFieldOptions,
  onChange,
  onRemove,
  isChild
}) => {

  const csvFieldOptions = () => {
    if (csvRecords) {
      return Object.keys(csvRecords[0].currentFields)
    } else {
      return []
    }
  }

  const airtableFieldUnavailable = () => {
    if (query.airtableField === null) {
      return false
    }
    return !airtableFieldOptions.includes(query.airtableField)
  }

  const validation = () => {
    const possibleErrors = [
      airtableFieldUnavailable,
    ]
    return !possibleErrors.some(error => error())
  }

  return (
    <Grid container style={!validation() ? {backgroundColor: 'red',  margin: 5} : {margin: 5}}>
      <Grid item xs={12}  md={2}>
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
      <Grid item xs={12} md={3}>
        <Input
          field="airtableField"
          onChange={onChange}
          value={query.airtableField}
          label='Airtable Field'
          type="autocomplete"
          options={airtableFieldOptions}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Input
          field="rule"
          onChange={onChange}
          value={query.rule}
          label='Rule'
          type="autocomplete"
          options={[
            'contains',
            'does not contain',
            'is',
            'is not',
            'is empty',
            'is not empty'
          ]}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Input
          field="csvField"
          onChange={onChange}
          value={query.csvField}
          label='CSV Field'
          type="autocomplete"
          options={csvFieldOptions()}
        />
      </Grid>
      <Grid item xs={12} md={1}>
        {isChild? (
          <Grid container justifyContent="flex-end" alignItems="center">
            <IconButton
              onClick={onRemove}
            >
              <DeleteIcon/>
            </IconButton>
          </Grid>
        ) : (null)}
      </Grid>
    </Grid>
  );
}

WhereTarget.propTypes = {

};

export default WhereTarget;
