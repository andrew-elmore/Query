import axios from 'axios';
// // import Config from 'Config';

export const AIRTABLE_API_URL = 'https://api.airtable.com/v0/';

export const AIRTABLE_API = axios.create({ withCredentials: false, baseURL: AIRTABLE_API_URL });

const config = {
  AIRTABLE_API_KEY: 'keyHyLPdaCbr7AoxH'
}

const generateHeader = () => {
    const h = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.AIRTABLE_API_KEY}`
    };

    return h;
}

const run = ({ baseName }) => (payload) => {
    const headers = generateHeader();
    const {queryToken} = payload;
    const params = queryToken.url;
    return {
        type: `AIRTABLE_RUN_${baseName}`,
        meta: payload,
        payload: AIRTABLE_API.get(params, { headers }),
    };
}

export default {
  generateHeader,
  run
}