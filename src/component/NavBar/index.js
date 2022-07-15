import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function NavBar({
  tab,
  setTab,
  tabs
}) {
  return (
      <AppBar position="static">
        <Tabs 
          value={tab}
          onChange={(e, value) => {setTab(value)}}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {tabs.map((tab) => {
            return (
              <Tab color='white' key={tab.id} label={tab.label} value={tab.id} />
            )
          })}
        </Tabs>
      </AppBar>
  );
}