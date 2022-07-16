<script>
</script>

<div class="topbar-container">
  <div class="search">
    <form class="search-form">
      <input type="text" placeholder="search" />
      <i class="fa-solid fa-magnifying-glass btn" />
    </form>
  </div>

  <div class="avatar">
    <div class="pfp-wrapper">
      <img
        src="https://lh3.googleusercontent.com/a/AItbvmlWDaxaiSARfvMsh45E0DVFgZx_qalBTEJTMtCv=s100"
        alt=""
      />
    </div>
    <div class="username-wrapper">
      <span>username</span>
    </div>
  </div>
</div>

<style lang="scss">
  .topbar-container {
    display: grid;
    grid-template-areas: "search avatar";
    grid-template-columns: 3fr 1fr;

    .search {
      grid-area: search;
      display: flex;
      align-items: center;
      color: var(--font-color);
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
    }

    .avatar {
      grid-area: avatar;
      display: flex;
      flex-direction: row;
      justify-content: end;
      .pfp-wrapper {
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        margin-right: 1em;
        overflow: hidden;
        img {
          width: 2rem;
          height: 2rem;
          object-fit: cover;
        }
      }
      .username-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
        }
      }
    }
  }
</style>
