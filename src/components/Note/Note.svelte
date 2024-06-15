<!-- WIP -->

<script>
    import utils from "../../lib/Utils";
    export let formData = {};

    function formatDate(date) {
        return utils.formatDate(date);
    }
</script>

<div class="note-data">
    <h2 class="note-notenumber">Note #{formData.noteNumber}</h2>
    <div class="data-group note-title">
        {formData.title}
    </div>
    <hr class="solid" />
    <div class="data-group note-message">
        {formData.message}
    </div>
    <div class="data-group note-date">
        {formatDate(formData.date)}
    </div>
</div>

<style>
    /* Style for note data */
    .note-data {
        max-width: 500px;
        margin: 0 auto;
        border-radius: 4px;
        padding: 15px;
        margin-bottom: -5px;
    }

    .note-data h2 {
        margin-bottom: 5px;
    }

    .note-title {
        font-size: 27px;
        font-weight: bold;
        margin-bottom: -10px;
    }

    .note-message {
        font-size: 16px;
        font-weight: normal;
        margin-top: -19px;
        margin-bottom: 15px;
    }

    .note-notenumber {
        font-size: 15px;
        font-weight: 300;
    }

    /* Solid border */
    hr.solid {
        border-top: 2px solid #bbb;
    }
</style>
