import React from 'react'
import { CSVReader } from 'react-papaparse';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CsvUpload = (props) => {

  const buttonRef = React.createRef()


  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoad = (data) => {
    const uploadedData = []
    const header = data[0].data
    for (let i = 1; i < data.length; i++){
      let row = {}
      header.forEach((colTitle, idx) => {
        row[colTitle] = data[i].data[idx]
      })
      uploadedData.push(row)
    }
    props.uploadData(uploadedData)
  }
  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      noClick
      noDrag
    >
      {({ file }) => (
        <aside
          style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 10,
          width: '80vw'
        }}
        >
          <Button 
            color="primary"
            variant="contained"
            onClick={handleOpenDialog}
          >
            Upload a file
          </Button>
          <Typography
            style={{
              marginLeft: 24,
              marginTop: 8
            }}
          >
            {file && file.name}
          </Typography>
        </aside>

      )}
    </CSVReader>
  )
}

export default CsvUpload