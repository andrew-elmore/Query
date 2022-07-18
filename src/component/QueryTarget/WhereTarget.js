import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

import Input from './../../UI/Input'

const WhereTarget = ({
  query,
  base,
  tables,
  csvRecords,
  onChange
}) => {

  const tableOptions = tables.map((t) => {
    return ({
      id: t.id,
      label: t.name
    })
  })

  const handleChange = ({ids = [], field, value}) => {
    onChange({
      field,
      value,
      ids: [...ids, query.id]
    })
  }

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
      <Grid item xs={12} md={1}>
        <Input
          field="type"
          onChange={handleChange}
          value={query.type}
          label='Type'
          type="autocomplete"
          options={[
            'where',
            'and',
            'or'
          ]}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Input
          field="table"
          onChange={handleChange}
          value={query.table}
          label='Table'
          type="autocomplete"
          options={tableOptions}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Input
          field="airtableField"
          onChange={handleChange}
          value={query.airtableField}
          label='Airtable Field'
          type="autocomplete"
          options={airtableFieldOptions()}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Input
          field="rule"
          onChange={handleChange}
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
          onChange={handleChange}
          value={query.csvField}
          label='CSV Field'
          type="autocomplete"
          options={csvFieldOptions()}
        />
      </Grid>
      <Grid item xs={12} md={1}>
        
      </Grid>
    </Grid>
  );
}

WhereTarget.propTypes = {

};

export default WhereTarget;
