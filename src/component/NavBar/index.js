import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Input from 'utils/Input'


export default function NavBar({
  tab,
  setTab
}) {
  return (
      <AppBar position="static">
        {/* <Input/> */}
        <Tabs 
          value={tab}
          onChange={(e, value) => {setTab(value)}}
          textColor="white"
          indicatorColor="secondary"
        >
          <Tab label="Item One" value={0} />
          <Tab label="Item Two" value={1} />
          <Tab label="Item Three" value={2} />
        </Tabs>
      </AppBar>
  );
}