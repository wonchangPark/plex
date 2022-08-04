import { apiInstance } from "./index.js";

const api = apiInstance();

function rooms(page, success, fail){
    api.get(`/api/v1/waitingRooms/${page}`).then(success).catch(fail);
}

export {rooms};