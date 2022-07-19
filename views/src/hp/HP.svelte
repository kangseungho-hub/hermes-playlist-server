<script>
  import Topbar from "./Topbar.svelte";
  import Sidebar from "./Sidebar.svelte";
  import Content from "./Content.svelte";

  import socket from "./socket";
  //socket의 요청에 middleware가 실행되기 때문에 일단

  import { authentication } from "../auth/store";
</script>

<main>
  s
  <section id="topbar">
    <Topbar />
  </section>

  <section id="sidebar">
    <Sidebar />
  </section>
  <section id="content">
    <Content />
  </section>
</main>

<style lang="scss">
  main {
    font-size: 12px;
    display: grid;
  }
  $topbar-height: 5em;
  $sidebar-width: 20em;
  #topbar {
    position: absolute;
    top: 0;
    left: $sidebar-width;
    width: calc(100% - $sidebar-width);
    height: $topbar-height;
    border-bottom: var(--thin-border);
    padding: 1em 2em;
  }

  #sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: $sidebar-width;
    height: calc(100% - $topbar-height);
    border-right: var(--thin-border);
  }
</style>
