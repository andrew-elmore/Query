import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecords } from '@airtable/blocks/ui';

const TableData = ({
  table,
  addRecords
}) => {

  const records = useRecords(table.selectRecords())
  addRecords(table._id, records)

  return (
    null
  );
}

TableData.propTypes = {

};

export default TableData;
