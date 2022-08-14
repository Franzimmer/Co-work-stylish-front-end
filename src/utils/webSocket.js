import webSocket from "socket.io-client";
const webSocket = {
  hostname: "https://www.domingoos.store/api/1.0",
  jwt: localStorage.getItem("jwtToken"),
  ws: webSocket(this.hostname, jwt),

  init() {
    this.ws.on("connect", () => console.log("success connected!"));
  },

  disconnect() {
    this.ws.on("disconnect", () => console.log("success connected!"));
  },

  sendLiveStatus(data) {
    this.ws.emit("live", data);
  },

  getFollowList() {
    this.ws.on(" ", (followList) => console.log(followList));
  },

  getNotification() {
    this.ws.on("notice", (notice) => console.log(notice));
  },
};

export default webSocket;
