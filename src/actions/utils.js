// import axios from 'axios';
// // import Config from 'Config';

// const Config = {

// }


// axios.defaults.withCredentials = true;

// /** A function to help action functions get the HTTP header to the backend server. * */
// export function generateHeader(bearer) {
//     const h = {
//         'Content-Type': 'application/json',
//         'X-Parse-Application-Id': Config.apiId,
//         'X-Parse-JavaScript-Key': Config.apiKey,
//         'X-Parse-Revocable-Session': 1,
//     };

//     // const token = SessionUtils.get();
//     // if (token != null) {
//     //     h['X-Parse-Session-Token'] = token;
//     // }

//     if (bearer != null) {
//         h.Authorization = `Bearer ${bearer}`;
//     }

//     return h;
// }

// /** Convenience function for quickly making promises for action function to return * */
// export function asPromise(packet) {
//     return () => (Promise.resolve(packet));
// }

// export const API_URL = Config.apiUrl;

// export const API = axios.create({ withCredentials: false, baseURL: Config.apiUrl });

// /** Basic CRUD Functions * */
// export const add = ({ path, baseName }) => (actionObject) => {
//     const headers = generateHeader();
//     return {
//         type: `${baseName}_ADD`,
//         meta: actionObject,
//         payload: API.post(path, actionObject.getAPIToken(), { headers }),
//     };
// };

// export const update = ({ path, baseName }) => (actionObject) => {
//     const headers = generateHeader();
//     return {
//         type: `${baseName}_UPDATE`,
//         meta: actionObject,
//         payload: API.put(`${path}/${actionObject.id}`, actionObject.getAPIToken(), { headers }),
//     };
// };

// export const save = (props) => (actionObject) => {
//     if (actionObject.isNew()) {
//         return add(props)(actionObject);
//     }
//     return update(props)(actionObject);
// };

// export const get = ({ path, baseName }) => (actionObject) => {
//     const headers = generateHeader();
//     return {
//         type: `${baseName}_GET`,
//         meta: actionObject,
//         payload: API.get(`${path}/${actionObject.id}`, { headers }),
//     };
// };

// export const remove = ({ path, baseName }) => (actionObject) => {
//     const headers = generateHeader();
//     return {
//         type: `${baseName}_REMOVE`,
//         meta: actionObject,
//         payload: API.delete(`${path}/${actionObject.id}`, { headers }),
//     };
// };



