import { writable } from "svelte/store";

//svelte app's global user information variable
//authentication web socket의 authentication-success가 emit되면 update된다.
export const userInfo = writable({
    id: undefined,
    username: undefined,
    pfp: undefined,
    email: undefined,
});

//현재 svelte app의 signin 상태를 추적하는 variable.
export const authentication = writable(false);