<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate, tick } from "svelte";

  export let videoId;

  let player;

  beforeUpdate(async () => {
    console.log("App beforeUpdate");
  });

  afterUpdate(async () => {
    player.loadVideoById(videoId, 0);
  });

  onMount(() => {
    player = new YT.Player(videoId, {
      height: "300px",
      width: "300px",
    });
  });
</script>

<div id={videoId}>
  <!---->
</div>

<style lang="scss"></style>
