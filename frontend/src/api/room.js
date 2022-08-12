import { apiInstance } from "./index.js";
const api = apiInstance();
function rooms({ page, accessToken, refreshToken }, success, fail) {
    api.get(`/api/v1/waitingRooms/${page}`, { headers: ({ Authorization:'Bearer ' + accessToken,
                                                        Authorization2: 'Bearer ' + refreshToken})})
        .then(success)
        .catch(fail);
}
function connectUsers({ accessToken, refreshToken }, success, fail) {
    api.get(`/api/v1/ws/users`, { headers: ({ Authorization:'Bearer ' + accessToken,
                                            Authorization2: 'Bearer ' + refreshToken})})
        .then(success)
        .catch(fail);
}
export { rooms, connectUsers };
/*import { apiInstance } from "./index.js";

const api = apiInstance();

function rooms({ page, token }, success, fail) {
    api.get(`/api/v1/waitingRooms/${page}`, { headers: { Authorization: "Bearer " + token } })
        .then(success)
        .catch(fail);
}

function connectUsers({ token }, success, fail) {
    api.get(`/api/v1/ws/users`, { headers: { Authorization: "Bearer " + token } })
        .then(success)
        .catch(fail);
}

export { rooms, connectUsers };*/

