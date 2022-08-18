import { apiInstance } from "./index.js";

const api = apiInstance();

function rooms({ page, accessToken, refreshToken }, success, fail) {
    api.get(`/api/v1/waitingRooms/${page}`, { headers: { Authorization: "Bearer " + accessToken, Authorization2: "Bearer " + refreshToken } })
        .then(success)
        .catch(fail);
}

function connectUsers({ accessToken, refreshToken }, success, fail) {
    api.get(`/api/v1/ws/users`, { headers: { Authorization: "Bearer " + accessToken, Authorization2: "Bearer " + refreshToken } })
        .then(success)
        .catch(fail);
}

function createRoomApi({ headers, roomInfo }, success, fail) {
    api.post(`/api/v1/rooms/create-room`, roomInfo, { headers }).then(success).catch(fail);
}

function setRoomUserApi({ headers, code, id }, success, fail) {
    api.post("/api/v1/rooms/get-token", { code, id }, { headers }).then(success).catch(fail);
}

function leaveRoomApi({ headers, joinInfo }, success, fail) {
    api.post("/api/v1/rooms/leave-room", joinInfo, { headers }).then(success).catch(fail);
}

function setGameHistoryApi({ headers,  roomNo }, success, fail) {
    api.post(`/api/v1/rooms/game?roomNo=${roomNo}`, { headers }).then(success).catch(fail);
}

function setGameScoreApi({ headers, score }, success, fail) {
    api.post("/api/v1/rooms/score", score, { headers }).then(success).catch(fail);
}

export { rooms, connectUsers, createRoomApi, setRoomUserApi, leaveRoomApi, setGameHistoryApi, setGameScoreApi };
