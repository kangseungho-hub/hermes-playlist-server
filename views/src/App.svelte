<script>
  export let name;
  import Router, { location, link } from "svelte-spa-router";

  import Signup from "./auth/Signup.svelte";
  import Signin from "./auth/Signin.svelte";
</script>

<main>
  <!-- <a href="/#/signin">signIn</a>
  <a href="/#/signup">signUp</a> -->
  <a href="/auth/google">signin with google</a>

  <Router
    routes={{
      "/signin": Signin,
      "/signup": Signup,
    }}
  />
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
