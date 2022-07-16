<script>
  import Router from "svelte-spa-router";

  import Auth from "./auth/Auth.svelte";
  import HP from "./hp/HP.svelte";
</script>

<main>
  <Router
    routes={{
      "/": HP,
      "/auth": Auth,
    }}
  />
</main>

<style lang="scss">
  * {
    color: white;
  }
</style>
