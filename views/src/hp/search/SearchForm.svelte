<script>
  import socket from "../socket";

  let searchQuery;

  function search() {
    socket.emit("search", searchQuery);
  }
</script>

<form class="search-form" on:submit|preventDefault={search}>
  <input type="text" placeholder="search" bind:value={searchQuery} />
  <i class="fa-solid fa-magnifying-glass btn" />
</form>

<style lang="scss">
  .search-form {
    width: 10rem;
    background-color: var(--bg-sub-color);
    border-radius: 1rem;
    padding: 0.5em 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    i {
    }
    input {
      margin-right: 1em;
      width: 100%;
      color: var(--font-color);
      background-color: var(--bg-sub-color);
    }
  }
</style>
