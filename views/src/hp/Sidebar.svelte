<script>
</script>

<div id="sidebar-container">
  <div class="logo-wrapper">
    <img src="../../statics/images/icons/logo.ico" alt="" />
    <h2>hepl</h2>
  </div>

  <div class="menu">
    <div class="item btn">
      <i class="fa-solid fa-house" />
      <span> Home</span>
    </div>
    <div class="item btn">
      <i class="fa-solid fa-music" />
      <span>About</span>
    </div>
  </div>
</div>

<style lang="scss">
  $topbar-height: 5em;
  #sidebar-container {
    width: 100%;
    height: 100%;
    .logo-wrapper {
      height: $topbar-height;
      padding: 1em 2em;
      grid-area: logo;
      display: flex;
      justify-content: start;
      border-bottom: var(--thin-border);
      img {
        width: 2rem;
        margin-right: 1em;
      }
      h2 {
        font-size: 1.7em;
      }
    }
    .menu {
      grid-area: menu;
      font-size: 1.2em;
      .item {
        padding: 1em 2em;
        border-bottom: var(--thin-border);
        i {
          margin-right: 1em;
          color: var(--font-blur-color);
        }
        span {
          color: var(--font-blur-color);
        }
        &:hover {
          span {
            color: var(--font-color);
          }
          i {
            color: var(--sig);
          }
        }
      }
    }
  }
</style>
