import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import Input from './../../UI/Input'
import { IconButton, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const useStyles = makeStyles((theme) => ({
  
}));

const AirtableFieldSelect = ({
  field,
  onChange,
  onLink
}) => {
  const classes = useStyles();

  const handleLink = () => {
    onLink(field)
  }

  const linkedFieldsDisplay = (field) => {
    const cleanLinkedFields = field.linkedFields.filter((linkedField) => {
      return !linkedField.linkedTable
    })
    return (
      <Grid container alignItems="center" style={{margin: 1, marginLeft: 8}}>
        {cleanLinkedFields.map((linkedField) => {
          return (
            <Input
              type='checkbox'
              size='small'
              label={linkedField.name}
              value={linkedField.include}
              field={linkedField.id}
              onChange={(payload) => {onChange([field.id, payload.field], payload.value)}}
            />
          )
        })}
      </Grid>
    )
  }

  if (field.linkedTable) {
    return (
      <Grid container alignItems="center" style={{margin: 1, marginLeft: 4}}>
        <Typography color='primary'>{field.name}</Typography>
        <IconButton size='small' onClick={handleLink}>
          <LinkIcon />
        </IconButton>
        {field.linkedFields.length > 0 ? (
          <>
            {linkedFieldsDisplay(field)}
          </>
        ) : (null)}
      </Grid>
    )
  } else {
    return (
      <Grid container alignItems="center" className={classes.container}>
        <Input
          type='checkbox'
          size='small'
          label={field.name}
          value={field.include}
          field={field.id}
          onChange={(payload) => {onChange([payload.field], payload.value)}}
        />
      </Grid>
    );
  }
}

AirtableFieldSelect.propTypes = {

};

export default AirtableFieldSelect;
