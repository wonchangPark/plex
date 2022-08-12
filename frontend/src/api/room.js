import { apiInstance } from "./index.js";

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

function createRoomApi({ token, roomInfo }, success, fail) {
    api.post(`/api/v1/rooms/create-room`, { roomInfo }, { headers: { Authorization: "Bearer " + token } })
        .then(success)
        .catch(fail);
}

function setRoomUserApi({ token, mySessionId, myUserName }, success, fail) {
    api.post("/api/v1/rooms/get-token", { headers: { Authorization: "Bearer " + token }, data: { code: mySessionId, id: myUserName } })
        .then(success)
        .catch(fail);
}

function leaveRoomApi({ token, joinInfo }, success, fail) {
    api.post("/api/v1/rooms/leave-room", { headers: { Authorization: "Bearer " + token }, data: joinInfo })
        .then(success)
        .catch(fail);
}

export { rooms, connectUsers, createRoomApi, setRoomUserApi, leaveRoomApi };
