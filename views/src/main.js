import App from "./App.svelte";

const app = new App({
    target: document.body,
    props: {
        APP_NAME: "hermes-playlist",
    },
});

export default app;