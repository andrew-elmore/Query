
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const QueryUploader = ({
  query,
  queryTables,
  setQueryData
}) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleUpload = (event) => {
    const fileReader = new FileReader();
    const file = event.target.files[0];

    fileReader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setQueryData(json)
        alert('File loaded successfully!');
      } catch (error) {
        alert('Error reading file!');
      }
    };

    if (file) {
      fileReader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const data = {
      query: query.getActionToken(),
      queryTables: queryTables.getActionToken()
    }
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName || 'download.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDialogOpen(false);
  };

  return (
    <Grid container className={classes.buttonContainer}>
      <input
        accept=".json"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload JSON
        </Button>
      </label>
      <Button variant="contained" onClick={() => setDialogOpen(true)} className={classes.button}>
        Download JSON
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Download JSON File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="File Name"
            type="text"
            fullWidth
            variant="outlined"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDownload}>Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default QueryUploader;
