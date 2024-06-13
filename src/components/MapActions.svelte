<script>
    import { onMount } from 'svelte';
    import { Button, Icon, Tooltip } from 'yesvelte';

    import { mapStore, lastMouseCoords } from '../stores/Map.js';
    import { isAddingNote } from "../stores/MapActions.js";

    import "../styles/map-actions.css";

    let mapContainer;

    let addNoteIcon = "plus";
    let addNoteColor = "primary";
    let addNoteTooltip = "Add A Note";

    // Enables adding a note mode.
    function addNote() {
        if ($isAddingNote) {
            stopAddingNote();
            return;
        }

        console.debug('Adding a note enabled');
        isAddingNote.set(true);

        addNoteIcon = "x";
        addNoteColor = "red";
        addNoteTooltip = "Cancel";

        // Change cursor to cell
        if (mapContainer) {
            mapContainer.style.cursor = "cell";
        };
    };

    // Disabled adding a note mode.
    function stopAddingNote() {
        console.debug('Adding a note disabled');
        isAddingNote.set(false);

        addNoteIcon = "plus";
        addNoteColor = "primary";
        addNoteTooltip = "Add A Note";

        // Reset cursor
        if (mapContainer) {
            mapContainer.style.cursor = "";
        };
    };

    // Handles coords when a place is clicked on map when Add A Note is enabled.
    function handleMapClick(event) {
        if ($isAddingNote) {
            const { offsetX, offsetY } = event;
            console.log('Add note at', $lastMouseCoords);
            
            stopAddingNote();
        }
    }

    // On mount, attaches map's container to alter the cursor on map and handle clicks
    onMount(() => {
        mapContainer = document.querySelector('.mapboxgl-canvas-container');
        if (mapContainer) {
            mapContainer.addEventListener('click', handleMapClick);
        }
    });
</script>

<Button class="create-note" color={addNoteColor} on:click={addNote}>
    <Icon name={addNoteIcon} />
</Button>
<Tooltip text={addNoteTooltip} placement="left"/>
