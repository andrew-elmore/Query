import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import Input from './../../UI/Input'
import WhereTarget from './WhereTarget'
import AndOrTarget from './AndOrTarget'

const QueryTarget = ({
  query,
  base,
  tables,
  csvRecords,
  isChild,
  airtableFieldOptions,
  onChange,
  onAdd,
  onRemove
}) => {

  const handleChange = ({ids = [], field, value}) => {
    onChange({
      field,
      value,
      ids: [query.id, ...ids]
    })
  }

  const handleOnAdd = ({ids = []}) => {
    onAdd({
      ids: [query.id, ...ids]
    })
  }

  const handleOnRemove = ({ids = []}) => {
    onRemove({
      ids: [query.id, ...ids]
    })
  }

  const selectQueryType = () => {
    if (query.type === 'WHERE') {
      return (
      <WhereTarget
        query={query}
        csvRecords={csvRecords}
        isChild={isChild}
        airtableFieldOptions={airtableFieldOptions}
        onChange={handleChange}
        onRemove={handleOnRemove}
      />
      )
    } else {
      return (
        <AndOrTarget
          onChange={handleChange}
          query={query}
          base={base}
          tables={tables}
          csvRecords={csvRecords}
          airtableFieldOptions={airtableFieldOptions}
          onAdd={handleOnAdd}
          onRemove={handleOnRemove}
        />
      )
    }
  }
  return (
    <Card style={{margin: 5, padding: 5}}>
      {selectQueryType()}
    </Card>
  );
}

QueryTarget.propTypes = {

};

export default QueryTarget;
