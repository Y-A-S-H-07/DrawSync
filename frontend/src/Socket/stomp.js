import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectSocket = (onConnected) => {
  const token = localStorage.getItem("token"); 

  stompClient = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,
    connectHeaders: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  stompClient.onConnect = () => {
    console.log("Connected via STOMP");
    if (onConnected) onConnected();
  };

  stompClient.activate();
};

export const getStompClient = () => stompClient;