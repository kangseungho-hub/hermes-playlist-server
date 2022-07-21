<script>
  import { onMount } from "svelte";

  export let videoId;

  onMount(() => {
    let player = new YT.Player(videoId, {
      height: "300px",
      width: "300px",
      videoId,
    });
  });
</script>

<div id={videoId}>
  <!---->
</div>

<style lang="scss"></style>
