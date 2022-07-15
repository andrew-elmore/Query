import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import App from './App';

function HelloWorldApp() {
    // YOUR CODE GOES HERE
    return <App/>
}

initializeBlock(() => <HelloWorldApp />);
