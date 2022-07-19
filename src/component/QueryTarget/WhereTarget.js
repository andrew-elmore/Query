import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

import Input from './../../UI/Input'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const WhereTarget = ({
  query,
  base,
  tables,
  csvRecords,
  onChange,
  onRemove,
  isChild
}) => {

  const tableOptions = tables.map((t) => {
    return ({
      id: t.id,
      label: t.name
    })
  })

  const airtableFieldOptions = () => {
    if (query.table?.id) {
      const table = base.getTableById(query.table.id)
      return table.fields.map((f) => {
        return {
          id: f.id,
          label: f.name
        }
      })
    } else {
      return []
    }
  }

  const csvFieldOptions = () => {
    if (csvRecords) {
      return Object.keys(csvRecords[0].currentFields)
    } else {
      return []
    }
  }

  return (
    <Grid container style={{margin: 5}}>
      <Grid item xs={12} md={2}>
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
      <Grid item xs={12} md={2}>
        <Input
          field="table"
          onChange={onChange}
          value={query.table}
          label='Table'
          type="autocomplete"
          options={tableOptions}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Input
          field="airtableField"
          onChange={onChange}
          value={query.airtableField}
          label='Airtable Field'
          type="autocomplete"
          options={airtableFieldOptions()}
        />
      </Grid>
      <Grid item xs={12} md={2}>
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
