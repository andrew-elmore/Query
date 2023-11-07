import axios from 'axios';
import config from './../utils/config'

export const AIRTABLE_API_URL = 'https://api.airtable.com/v0/';

export const AIRTABLE_API = axios.create({ withCredentials: false, baseURL: AIRTABLE_API_URL });

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

const link = () => (payload) => {
    const headers = generateHeader();
    const params = `https://api.airtable.com/v0/${payload.baseId}/${payload.tableId}/${payload.recordId}`;
    return {
        type: `LINK`,
        meta: payload,
        payload: AIRTABLE_API.get(params, { headers }),
    };
}

export default {
  generateHeader,
  run,
  link
}