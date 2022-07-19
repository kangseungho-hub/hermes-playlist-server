import { io } from "socket.io-client";
import { authentication, userInfo } from "../auth/store";
const socket = io("/");

// server와 ws connection이 끊어진 경우
socket.on("disconnect", () => {
    alert("disconnected to server");
});

//client의 모든 socket request에 대해 server의 middleware가 token 검증하도록해서 authentication에 성공 하면
//user에 data가 담아서 authentication-success가 emit.
//인증이 실패할 경우 authentication-failed가 emit.

//모든 socket의 요청에 대해 jwt 검증에 실패하면 signin page (/#/auth) 로 redirecting돰
socket.on("authentication-failed", () => {
    //isAuthenticated를 false로 변경
    authentication.update((isAuthenticated) => false);

    //redirecting
    window.location.href = "/#/auth";

    //userinfo를 empty object로 변경한다.
    userInfo.update((userInfo) => {
        return {};
    });
});

socket.on("authentication-success", (user) => {
    //isAuthenticated를 true로 변경
    authentication.update((isAuthenticated) => true);

    //authentication에 성공해서 가져온 user data를 return해서 store의 데이터를 업데이트
    // =>subscribe하고 있는 모든 data들이 업데이트 될것.
    userInfo.update((userInfo) => {
        return user;
    });
});

//main page에 접속시 server의 middleware로 token을 검증하여 signin으로 redirecting시키거나, authentication-success를 emit하여
//userinformation을 update하여 렌더링 하기 위해 보내는 메시지
socket.send("hello server");

export default socket;