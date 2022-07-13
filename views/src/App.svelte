<script>
  import Router from "svelte-spa-router";

  import Auth from "./auth/Auth.svelte";
</script>

<main>
  <Router
    routes={{
      "/auth": Auth,
    }}
  />
</main>

<style lang="scss">
</style>
