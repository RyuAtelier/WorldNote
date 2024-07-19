<script>
    import "../../styles/map-actions.css";
    import config from '../../config.js';

    import { onMount } from 'svelte';
    import { Button, Icon, Tooltip, Dropdown, DropdownItem, DropdownMenu, CheckboxGroup, Checkbox } from 'yesvelte';
    import { Marker, Popup } from 'mapbox-gl';
    import { _, locales } from "svelte-i18n";

    // Components
    import NoteForm from "../Note/NoteForm.js";

    // Libraries
	import { success, error } from '../../lib/Toasts';
    import Utils from "../../lib/Utils.js";
    import { COOKIES, readCookie, setCookie, } from "../../lib/Cookies.js";

    // Stores
    import { map, mapContainer, mapStyle, isAddingNote, lastMouseCoords, doneAddingNote } from '../../stores/Map.js';
    import { clientLang, errorCodes } from "../../stores/App";

    let addNoteIcon = "plus";
    let addNoteColor = "#0056b3";
    let addNoteTooltip = $_("mapactions_add_note");

    let newNotePosition = null;
    let newNotePopup = null;
    let newNoteMarker = null;
    let cancellingNewNote = false;

    let mapStyles = [
        {
            name: $_("map_style_satellite"),
            id: "satellite-streets-v12",
            checked: false
        },
        {
            name: $_("map_style_light"),
            id: "light-v11",
            checked: false
        },
        {
            name: $_("map_style_dark"),
            id: "dark-v11",
            checked: false
        },
        {
            name: $_("map_style_streets"),
            id: "streets-v12",
            checked: true
        },
        {
            name: $_("map_style_outdoors"),
            id: "outdoors-v12",
            checked: false
        }
    ];
    let mapStylesValue = [];
    let mapStyleNames = mapStyles.map(m => m.name);

    // Enables adding a note mode.
    function addNote() {
        $doneAddingNote = false;
        if ($isAddingNote) {
            stopAddingNote();
            return;
        }

        console.debug('Adding a note enabled');
        isAddingNote.set(true);

        addNoteIcon = "x";
        addNoteColor = "red";
        addNoteTooltip = $_("mapactions_cancel_note");

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
        addNoteTooltip = $_("mapactions_add_note");

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
        const noteFormLocales = {
            notes_new_note: $_("notes_new_note"),
            notes_title: $_("notes_title"),
            notes_message: $_("notes_message"),
            notes_date: $_("notes_date"),
            notes_save: $_("notes_save"),
            notes_disclaimer_01: $_("notes_disclaimer_01"),
            notes_disclaimer_02: $_("notes_disclaimer_02")
        };
        const contextLocales = [
            {
                title: $_("noteform_placeholder_01_title"),
                message: $_("noteform_placeholder_01_message"),
            },
            {
                title: $_("noteform_placeholder_02_title"),
                message: $_("noteform_placeholder_02_message"),
            },
            {
                title: $_("noteform_placeholder_03_title"),
                message: $_("noteform_placeholder_03_message"),
            },
            {
                title: $_("noteform_placeholder_04_title"),
                message: $_("noteform_placeholder_04_message"),
            },
            {
                title: $_("noteform_placeholder_05_title"),
                message: $_("noteform_placeholder_05_message"),
            },
            {
                title: $_("noteform_placeholder_06_title"),
                message: $_("noteform_placeholder_06_message"),
            }
        ];

        // Since we can't pass components to setHTML, we have to set it via pure HTML...
        // TODO: find a solution for this maybe?
        newNotePopup = new Popup({ closeOnClick: false, anchor: "left", maxWidth: "500px" })
            .setHTML(NoteForm(noteFormLocales, contextLocales))
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
                console.log("Canceling new note...");
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

        fetch(`${config.API_FQDN}/notes/v1/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    const errorCodeId = err.code;
                    const message = err.message;
                    const errorKey = Object.keys($errorCodes).find(key => $errorCodes[key] === errorCodeId);

                    error($_(errorKey.toLowerCase()));
                    throw new Error(`API Error: ${message} (Code ID: ${errorCodeId} / Code Key: ${errorKey})`);
                });
            };
            return response.json();
        })
        .then(data => {
            // The note was created
            $doneAddingNote = true;
            console.log('Created a note successfully:', data);
            success($_("popups_ok_note_added"));
            closeCurrentPopup();
        })
        .catch(err => {
        });
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

    function closeCurrentPopup() {
        if (newNotePopup) newNotePopup.remove();
    };

    // On mount, attaches map's container to alter the cursor on map and handle clicks
    onMount(() => {
        if ($mapContainer) $mapContainer.addEventListener('click', handleMapClick);
        // Load stored map style from cookie on the map
        const storedMapStyleId = readCookie(document, COOKIES.MAP_STYLE);
        if (storedMapStyleId) {
            mapStyles = mapStyles.map(style => ({
                ...style,
                checked: style.id === storedMapStyleId
            }));
        };
    });

    // Reactive statement to ensure only one style is checked
    $: {
        let checkedCount = mapStyles.filter(style => style.checked).length;
        if (checkedCount > 1) {
            mapStyles.forEach((style, index) => {
                if (index !== 0) style.checked = false;
            });
        }
    }

    function handleCheckboxChange(index) {
        mapStyles = mapStyles.map((style, i) => ({
            ...style,
            checked: i === index
        }));
        // Set the selected style
        const selectedStyle = mapStyles[index].id;

        // Set map style store, map style and cookie
        $mapStyle = selectedStyle;
        $map.setStyle(`mapbox://styles/mapbox/${$mapStyle}`);
        setCookie(document, { name: COOKIES.MAP_STYLE, value: $mapStyle });
    }
</script>

<div style="z-index: 9999;">
    <Dropdown>
        <Button class="change-style-button">
            <!-- TODO: when change style button is pressed the icon should change to "x" -->
            <Icon name="palette"/> {$_("map_style")}
        </Button>
    
        <DropdownMenu class="change-style-menu">
            {#each mapStyles as style, index}
                <Checkbox label={style.name} bind:checked={style.checked} on:change={() => handleCheckboxChange(index)} />
            {/each}
        </DropdownMenu>
    </Dropdown>
    <Button class="create-note" color={addNoteColor} on:click={addNote}>
        <Icon name={addNoteIcon} />
    </Button>
    <Tooltip text={addNoteTooltip} placement="left"/>
</div>