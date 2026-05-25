import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export const connectSocket = (onConnected) => {
  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("WebSocket Connected");
    if (onConnected) onConnected();
  });
};

export const getStompClient = () => stompClient;