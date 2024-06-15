<script>
  import { onMount, onDestroy } from 'svelte';

  import { Map, Marker, NavigationControl } from 'mapbox-gl';

  import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

  import { map, mapContainer, isAddingNote, lastMouseCoords, mapZoom, mapLng, mapLtd } from "../../stores/Map.js";

  const DEFAULT_LNG = 0;
  const DEFAULT_LAT = 0;
  const DEBUG_SHOW_GEOLOCATION = true;

  let lng = DEFAULT_LNG, lat = DEFAULT_LAT;

  function updateData() {
    $mapZoom = $map.getZoom();
    $mapLng = $map.getCenter().lng;
    $mapLtd = $map.getCenter().lat;
  };

  /**
   * Initalizes the map using MapBox-GL, focused on given longtitude and latitude.
   * @param lng
   * @param lat
   */
  function initializeMap(lng, lat) {
    const initialState = { lng: $mapLng, lat: $mapLtd, zoom: $mapZoom };

    // Create and set a new map
    $map = new Map({
      container: $mapContainer,
      accessToken: process.env.MAPBOX_API_TOKEN,
      style: `mapbox://styles/mapbox/outdoors-v11`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      projection: 'globe' // Globe projection
    });

    // Add zoom actions
    $map.addControl(new NavigationControl());

    // When map is moved by client, update variables
    $map.on('move', () => {
      updateData();
    });

    // Update lastMouseCoords on each mouse movement
    $map.on('mousemove', (e) => {
      lastMouseCoords.set(e.lngLat);
    });

    // Add fog style to globe
    $map.on('style.load', () => {
      $map.setFog({
        color: 'rgb(186, 210, 235)', // Lower atmosphere
        'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
        'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        'space-color': 'rgb(11, 11, 25)', // Background color
        'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
      });
    });

  }

  onMount(() => {
    // If client allows geolocation, show their location on the $map.
    if ("geolocation" in navigator && DEBUG_SHOW_GEOLOCATION) {
      navigator.geolocation.getCurrentPosition(
        position => {
          $mapLng = position.coords.longitude;
          $mapLtd = position.coords.latitude;
          $mapZoom = 15; // Big enough to show client's area
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
  });

  // When destroyed remove map
  onDestroy(() => {
    if (map) {
      $map.remove();
    }
  });
</script>

<div>
  <div class="map-wrap">
    <div class="map" bind:this="{$mapContainer}" />
  </div>
</div>

<style>
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
