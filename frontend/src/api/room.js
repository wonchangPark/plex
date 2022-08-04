import { apiInstance } from "./index.js";

const api = apiInstance();

function rooms({ page, token }, success, fail) {
    api.get(`/api/v1/waitingRooms/${page}`, { headers: { Authorization: "Bearer " + token } })
        .then(success)
        .catch(fail);
}

export { rooms };
