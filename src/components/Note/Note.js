import utils from "../../lib/Utils";
import { _ } from "svelte-i18n";

export default (formData, locs = { notes_note }, locale) => {
    return `
    <div class="note-data">
        <h2 class="note-notenumber">${locs.notes_note}</h2>
        <div class="data-group note-title">
            ${formData.title}
        </div>
        <hr class="solid">
        <div class="data-group note-message">
            ${formData.message}
        </div>
        <div class="data-group note-date">
            ${utils.formatDate(formData.date, locale)}
        </div>
    </div>
    `;
};