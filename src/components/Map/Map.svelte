<script>
  import "../../styles/notes.css";
  import config from "../../config.js";

  import { onMount, onDestroy } from "svelte";
  import Mapboxgl from "mapbox-gl";
  import { Map, Marker, Popup, NavigationControl } from "mapbox-gl";
  import { MapboxAddressAutofill, MapboxSearchBox, MapboxGeocoder } from "@mapbox/search-js-web";
  import { _, locale } from "svelte-i18n";

  // Components
  import Note from "../Note/Note";

  // Libraries
  import { success, error } from "../../lib/Toasts";

  // Stores
  import { map, mapContainer, mapStyle, lastMouseCoords, mapZoom, mapLng, mapLtd, loadedNotes, doneAddingNote, loadedNoteIds } from "../../stores/Map.js";
    import { COOKIES, readCookie } from "../../lib/Cookies";

  const DEFAULT_LNG = 0;
  const DEFAULT_LAT = 0;
  const DEBUG_SHOW_GEOLOCATION = true;
  const DEFAULT_MAP_STYLE = "outdoors-v11";
  
  // Set mapStyle from cookie / if it doesnt exist use default map style
  if (!$mapStyle) $mapStyle = readCookie(document, COOKIES.MAP_STYLE) || DEFAULT_MAP_STYLE;

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
  function initializeMap() {
    const initialState = { lng: $mapLng, lat: $mapLtd, zoom: $mapZoom };

    // Create and set a new map
    $map = new Map({
      container: $mapContainer,
      accessToken: process.env.MAPBOX_API_TOKEN,
      style: `mapbox://styles/mapbox/${$mapStyle}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      projection: "globe",
    });

    // Load notes inital
    loadNotes();

    // Add a search bar on the map
    const searchBox = new MapboxSearchBox();
    searchBox.accessToken = process.env.MAPBOX_API_TOKEN;
    searchBox.options = {
        types: "address,poi",
        proximity: [-73.99209, 40.68933]
    };
    searchBox.marker = true;
    searchBox.mapboxgl = Mapboxgl;
    $map.addControl(searchBox);

    // Add zoom actions
    $map.addControl(new NavigationControl());

    // When map is moved by client, update variables
    $map.on("move", () => {
      updateData();
    });

    // Update lastMouseCoords on each mouse movement
    $map.on("mousemove", (e) => {
      lastMouseCoords.set(e.lngLat);
    });

    // Add fog style to globe
    $map.on("style.load", () => {
      $map.setFog({
        color: "rgb(186, 210, 235)", // Lower atmosphere
        "high-color": "rgb(36, 92, 223)", // Upper atmosphere
        "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        "space-color": "rgb(11, 11, 25)", // Background color
        "star-intensity": 0.6 // Background star brightness (default 0.35 at low zoooms )
      });
    });

    // INFO: map language is set by App.svelte
  };

  async function loadNotes() {
    if (!$map) return;

    const url = new URL(`${config.API_FQDN}/notes/v1/view`);
    const data = {
      lng: $mapLng,
      lat: $mapLtd,
      loaded: $loadedNoteIds
    };

    fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 429) {
            throw new Error("Too Many Requests: You are being rate limited.");
        }
        return response.json();
    })
    .then(data => {
        const { results } = data;

        // Extracting noteIds from results
        const noteObjects = results.map(n => ({ id: n.noteId, data: n }));

        // Filtering out already loaded notes
        const newNotes = noteObjects.filter(({ id }) => !$loadedNotes[id]);

        // Only do stuff if there are new notes
        if (newNotes.length > 0) {
            console.log(`Loaded ${newNotes.length} new notes.`);
            
            // Adding new notes to $loadedNotes
            newNotes.forEach(({ id, data }) => {
                $loadedNotes[id] = data;

                $loadedNoteIds.push(id);
                $loadedNoteIds = $loadedNoteIds;
            });

            // Add notes to the map as marker
            newNotes.forEach(({ id, data }) => {
                const note = $loadedNotes[id];
                const lngLat = [ note.position.coordinates[0], note.position.coordinates[1] ];
                const noteLocs = {
                  notes_note: $_("notes_note") + note.noteNumber
                };

                // Initate a HTML for the note with it"s data
                const noteHtml = Note(note, noteLocs, $locale);
                
                // Create a popup for the marker
                const notePopup = new Popup({
                    closeButton: false,
                    closeOnClick: false,
                    closeOnMove: true
                })
                  .setHTML(noteHtml);

                // Create a marker for the note
                const noteMarker = new Marker()
                  .setLngLat(lngLat)
                  .setPopup(notePopup)
                  .addTo($map)

                  // When the marker is hovered, the popup should be shown and the cancel button should be hidden.
                  const markerDiv = noteMarker.getElement();

                  markerDiv.addEventListener("mouseenter", () => {
                      noteMarker.togglePopup();
                  });
                  markerDiv.addEventListener("mouseleave", () => {
                      noteMarker.togglePopup();
                  });
            });
        }
    })
    .catch(err => {
        error($_("cant_view_notes"));
        throw new Error(`Unknown error from API while viewing notes: ${err}`);
    });
  };

  onMount(() => {
    // If client allows geolocation, show their location on the $map.
    if ("geolocation" in navigator && DEBUG_SHOW_GEOLOCATION) {
      navigator.geolocation.getCurrentPosition(
        position => {
          $mapLng = position.coords.longitude;
          $mapLtd = position.coords.latitude;
          $mapZoom = 15; // Big enough to show client"s area
          initializeMap();
          console.log("Got client geolocation", position);
        },
        () => {
          initializeMap();
          console.log("Using default coordinates");
        }
      );
    }
    // If client doesn"t allow it, nor their browser doesn"t support geolocation, use default coords. 
    else {
      initializeMap();
      console.log("Geolocation not available, using default coordinates.");
    }
  });

  // When destroyed remove map
  onDestroy(() => {
    if ($map) {
      $map.remove();
    }
  });

  // When map lng and ltd changes
  // or
  // When doneAddingNote changes (which might mean client might"ve added a new note)
  // Reload notes
  $: $mapLng, $mapLtd, loadNotes()
  $: $doneAddingNote, loadNotes()
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
