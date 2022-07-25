<script>
  import socket from "../socket";
  import YoutubePlayer from "./YoutubePlayer.svelte";

  let videos = [];
  let players = [];

  //listen search form in topbar
  socket.on("r-search", (_videos) => {
    videos = _videos;
    console.log(videos);
  });
</script>

<div>
  <div id="test-player" />
  <ul id="search-results">
    {#each videos as video}
      <li>
        <div class="thumbnail-wrapper">
          <YoutubePlayer videoId={video.id} />
        </div>
        <div class="information">
          <p class="title">{video.title}</p>
          <span class="description">{video.description}</span>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #search-results {
    margin: 3em;
  }
</style>
