import utils from "../../lib/Utils";
import { _ } from "svelte-i18n";

export default (formData, locs = { notes_note }, locale) => {
    return `
    <div class="note-data" noteId="${formData.noteId}">
        <h2 class="note-notenumber">${locs.notes_note}</h2>
        <div class="data-group note-title">
            ${formData.title}
        </div>
        <hr class="note-divider">
        <div class="data-group note-message">
            ${formData.message}
        </div>
        <div class="data-group note-date">
            ${utils.formatDate(formData.date, locale)}
        </div>
        <hr class="note-divider" style="margin-bottom: 22px; margin-top: 26px;">
        <div class="note-icons">
            <div class="note-heart">
                <i class="far fa-heart" noteId="${formData.noteId}"></i>
                <span class="note-heart-like-count">${formData.likes}</span>
            </div>
            <div class="note-copy-link" noteId="${formData.noteId}">
                <i class="fa-regular fa-link"></i>
            </div>
        </div>
    </div>
    `;
};
