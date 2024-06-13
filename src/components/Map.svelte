<script>
  import { onMount, onDestroy } from 'svelte';
  import { Map, Marker } from 'mapbox-gl';

  import { lastMouseCoords } from "../stores/Map.js";

  import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

  const DEFAULT_ZOOM = 1; // Big enough to show the whole world
  const DEFAULT_LNG = 0;
  const DEFAULT_LAT = 0;
  const DEBUG_SHOW_GEOLOCATION = false;

  let map;
  let mapContainer;
  let lng = DEFAULT_LNG, lat = DEFAULT_LAT, zoom = DEFAULT_ZOOM;

  function updateData() {
    zoom = map.getZoom();
    lng = map.getCenter().lng;
    lat = map.getCenter().lat;
  }

  function initializeMap(lng, lat) {
    const initialState = { lng: lng, lat: lat, zoom: zoom };

    map = new Map({
      container: mapContainer,
      accessToken: process.env.MAPBOX_API_TOKEN,
      style: `mapbox://styles/mapbox/outdoors-v11`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    map.on('move', () => {
      updateData();
    });

    map.on('mousemove', (e) => {
      lastMouseCoords.set(e.lngLat);
    });
  }

  onMount(() => {
    // If client allows geolocation, show their location on the map.
    if ("geolocation" in navigator && DEBUG_SHOW_GEOLOCATION) {
      navigator.geolocation.getCurrentPosition(
        position => {
          lng = position.coords.longitude;
          lat = position.coords.latitude;
          zoom = 15; // Big enough to show client's area
          initializeMap(lng, lat);
          console.log("Got client geolocation", position);
        },
        () => {
          initializeMap(DEFAULT_LNG, DEFAULT_LAT);
          console.log("Using default coordinates");
        }
      );
    }
    // If client doesn't allow it, nor their browser doesn't support geolocation, use default coords. 
    else {
      initializeMap(DEFAULT_LNG, DEFAULT_LAT);
      console.log("Geolocation not available, using default coordinates.");
    }

    const marker = new Marker()
    .setLngLat([30.5, 50.5])
    .addTo(map);
  });

  onDestroy(() => {
    if (map) {
      map.remove();
    }
  });
</script>

<div>
  <!-- <div class="sidebar">
    Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom:
    {zoom.toFixed(2)}
  </div> -->
  <div class="map-wrap">
    <div class="map" bind:this="{mapContainer}" />
  </div>
</div>

<style>
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .sidebar {
    background-color: rgb(35 55 75 / 90%);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    margin: 12px;
    border-radius: 4px;
  }
</style>
