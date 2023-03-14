import axios from 'axios';
// // import Config from 'Config';

// export const AIRTABLE_API_URL = 'https://api.airtable.com/v0/';

// export const AIRTABLE_API = axios.create({ withCredentials: false, baseURL: AIRTABLE_API_URL });

// const config = {
//   AIRTABLE_API_KEY: 'keyHyLPdaCbr7AoxH'
// }

const generateHeader = (bearer) => {
    const h = {
        'Content-Type': 'application/json',
    };

    if (bearer != null) {
        h.Authorization = `Bearer ${config.AIRTABLE_API_KEY}`;
    }

    return h;
}

// export const run = ({ baseName }) => ({queryToken, base}) => {
//     const headers = generateHeader();
//     const params = base + '/' + queryToken.table + '?filterByFormula=' + queryToken.url;
//     console.log(':~:', __filename.split('/').pop(), 'AirtableUtils.run', 'queryToken', queryToken)
//     return {
//         type: `AIRTABLE_RUN_${baseName}`,
//         meta: actionObject,
//         payload: AIRTABLE_API.get(params, { headers }),
//     };
// }

export default {
  generateHeader
}