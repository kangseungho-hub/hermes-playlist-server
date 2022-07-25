<script>
  import { userInfo } from "../auth/store";
  import SearchForm from "./search/SearchForm.svelte";

  let user;

  userInfo.subscribe((_userInfo) => {
    user = _userInfo;
  });
</script>

<div class="topbar-container">
  <div class="search-box">
    <SearchForm />
  </div>

  <div class="avatar">
    <div class="pfp-wrapper">
      <img src={user ? user.pfp : "unknown"} alt="" />
    </div>
    <div class="username-wrapper">
      <span>{user ? user.username : "unknown"}</span>
    </div>
  </div>
</div>

<style lang="scss">
  .topbar-container {
    display: grid;
    grid-template-areas: "search avatar";
    grid-template-columns: 3fr 1fr;

    .search-box {
      grid-area: search;
      display: flex;
      align-items: center;
      color: var(--font-color);
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
