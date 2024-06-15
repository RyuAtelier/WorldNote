<script>
    import { onMount } from 'svelte';
    import { Button, Icon, Tooltip } from 'yesvelte';

    import { Marker, Popup } from 'mapbox-gl';

    import { map, mapContainer, isAddingNote, lastMouseCoords } from '../../stores/Map.js';

    import NoteForm from "../Note/NoteForm.js";

    import Utils from "../../lib/utils.js";

    import "../../styles/map-actions.css";

    let addNoteIcon = "plus";
    let addNoteColor = "#0056b3";
    let addNoteTooltip = "Add A Note";

    let newNotePosition = null;
    let newNotePopup = null;
    let newNoteMarker = null;
    let cancellingNewNote = false;

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

        // If mapContainer is loaded, set the cursor to cell if adding note is enabled.
        if ($mapContainer) {
            const container = document.querySelector('.mapboxgl-canvas-container');
            container.style.setProperty('cursor', 'cell', 'important'); // Change the cursor to "cell"
        }
    };

    // Disabled adding a note mode.
    function stopAddingNote() {
        console.debug('Adding a note disabled');
        isAddingNote.set(false);

        addNoteIcon = "plus";
        addNoteColor = "#0056b3";
        addNoteTooltip = "Add A Note";

        // If mapContainer is loaded, reset the cursor when adding note is exited.
        if ($mapContainer) {
            const container = document.querySelector('.mapboxgl-canvas-container');
            container.style.setProperty('cursor', '', 'important'); // Reset cursor
        }
    };

    // Each time the client's mouse is moved, Map container saves it's coords to $lastMouseCoords
    // And after client picks a place and clicks on it, this is where the click is handled.
    // It receives the coords, disables adding note mode and creates a spot on the map for the client to save the note.
    function handleMapClick(event) {
        if ($isAddingNote) {
            const { offsetX, offsetY } = event;
            console.log('Add note at', $lastMouseCoords);
            
            newNotePosition = $lastMouseCoords;
            createNoteForm($lastMouseCoords);
            stopAddingNote();
        }
    };

    /**
     * Creates a temporary note spot on the map for the client to fill in the details and save the note.
     * Once the note is saved, it's handled by the API.
     */
    function createNoteForm() {
        console.log("Creating a note to fill at coords:", newNotePosition);

        const lngLat = [newNotePosition.lng, newNotePosition.lat];

        // Since we can't pass components to setHTML, we have to set it via pure HTML...
        // TODO: find a solution for this maybe?
        newNotePopup = new Popup({ closeOnClick: false, anchor: "left", maxWidth: "500px" })
            .setHTML(NoteForm())
            .on('open', () => {
                // Since we use pure HTML and cant use svelte components, we need to detect if title and message are filled
                // and disable/enable button in that case.
                const saveButton = document.getElementById('saveNote');
                const titleInput = document.getElementById('title');
                const messageInput = document.getElementById('message');
                const dateInput = document.getElementById('date');

                const toggleSaveButton = () => {
                    // Validate title and message with checking regex
                    if (Utils.isNoteTextValid(titleInput.value.trim()) && Utils.isNoteTextValid(messageInput.value.trim())) {
                        saveButton.removeAttribute('disabled');
                    } else {
                        saveButton.setAttribute('disabled', 'true');
                    }
                };

                const currentDate = new Date().toISOString().slice(0, 16);
                // Set current date if empty
                if (dateInput.value.length == 0)
                    dateInput.value = currentDate;

                titleInput.addEventListener('input', toggleSaveButton);
                messageInput.addEventListener('input', toggleSaveButton);

                saveButton.addEventListener('click', handleNoteFormSave);
            });
        
        // If a popup is closed before saved, cancel creating a new note
        newNotePopup.on('close', function(e) {
            // BUG & TODO: for some reason when popup's close is clicked, the function gets spammed and goes stack overflow and for that reason cancellingNewNote was needed to be implemented.
            if (!cancellingNewNote) {
                cancellingNewNote = true;
                handleNoteFormCancel();
                cancellingNewNote = false;
            }
        });
        
        newNoteMarker = new Marker({})
            .setLngLat(lngLat)
            .setPopup(newNotePopup)
            .addTo($map)
            .togglePopup();
    };

    /**
     * Handles the new note form's save button.
     */
    function handleNoteFormSave() {
        const title = document.getElementById('title').value;
        const message = document.getElementById('message').value;
        const date = document.getElementById('date').value;

        const note = { title, message, date, position: newNotePosition };
        console.log('Saving note', note);
    };

    /**
     * Handles the new note form's cancel (X) button. Destroys the marker.
     */
     function handleNoteFormCancel() {
        // Remove marker
        if (newNotePopup && newNoteMarker) {
            console.log("Client decided to cancel the note.");
            newNotePopup.remove();
            newNoteMarker.remove();
            newNotePopup = null;
            newNoteMarker = null;
        };
    };

    // On mount, attaches map's container to alter the cursor on map and handle clicks
    onMount(() => {
        if ($mapContainer) $mapContainer.addEventListener('click', handleMapClick);
    });
</script>

<div style="z-index: 9999;">
    <Button class="create-note" color={addNoteColor} on:click={addNote}>
        <Icon name={addNoteIcon} />
    </Button>
    <Tooltip text={addNoteTooltip} placement="left"/>
</div>

