import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import Input from './../../UI/Input'
import WhereTarget from './WhereTarget'
import AndOrTarget from './AndOrTarget'

const QueryTarget = ({
  onChange,
  query,
  base,
  tables,
  csvRecords
}) => {

  const selectQueryType = () => {
    if (query.type === 'where') {
      return (
        <WhereTarget
          onChange={onChange}
          query={query}
          base={base}
          tables={tables}
          csvRecords={csvRecords}
        />
      )
    } else {
      return (
        <AndOrTarget
          onChange={onChange}
          query={query}
          base={base}
          tables={tables}
          csvRecords={csvRecords}
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
