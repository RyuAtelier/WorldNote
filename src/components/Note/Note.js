import utils from "../../lib/Utils";

export default (formData) => {
    return `
    <div class="note-data">
        <h2 class="note-notenumber">✍🏻 Note #${formData.noteNumber}</h2>
        <div class="data-group note-title">
            ${formData.title}
        </div>
        <hr class="solid">
        <div class="data-group note-message">
            ${formData.message}
        </div>
        <div class="data-group note-date">
            ${utils.formatDate(formData.date)}
        </div>
    </div>
    `;
};