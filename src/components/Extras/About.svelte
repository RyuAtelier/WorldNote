<script>
  import "../../styles/extras.css";

  import { El, Button, Icon } from "yesvelte";
  import Router, { link } from "svelte-spa-router";

  import { version, state } from "../../stores/App";
</script>

<Button href="/" class="goback-button">
	<Icon name="arrow-left" />Go back
</Button>

<El container class="extras-container">
  <h1 class="extras-wn-title">🌎 WorldNote</h1>
  <El row alignItems="center">
    <p>
      WorldNote, an innovative application created by the Ryu Atelier Team.
      WorldNote allows you to leave notes on a world map, sharing your memories
      and experiences with strangers online.
    </p>
  </El>
  <El row alignItems="center">
    <p>
      Our goal is to connect people through shared experiences, making the world
      a smaller and more connected place. Whether it's a memorable trip, a
      significant life event, or just a passing thought, your notes can inspire
      and connect with others.
    </p>
  </El>
  <El row alignItems="end">
    <p>
      By exploring notes left by other users, you can discover new places,
      stories, and perspectives from around the globe. It's a unique way to see
      the world through the eyes of others and find inspiration in their
      experiences.
    </p>
  </El>
  <El row alignItems="end">
    <p>
      Join our community today and start leaving your mark on the world map.
      Together, we can build a tapestry of memories that spans the globe.
    </p>
  </El>
</El>
