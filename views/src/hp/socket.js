import { io } from "socket.io-client";

const socket = io("/");

socket.on("disconnect", () => {
    alert("disconnected to server");
});

socket.on("authentication-failed", () => {
    alert("please signin hermes-playlist");
    window.location.href = "/#/auth";
});

export default socket;