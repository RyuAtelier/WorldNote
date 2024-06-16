function getRandomContext(placeholders) {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
};

export default (locs = { 
        notes_new_note,
        notes_title,
        notes_message,
        notes_date,
        notes_save,
        notes_disclaimer_01,
        notes_disclaimer_02 
    }, 
    placeholderLocs) => {
    const context = getRandomContext(placeholderLocs);
    return `
    <div class="note-form">
        <h2>${locs.notes_new_note}</h2>
        <div class="form-group">
            <label for="title">${locs.notes_title}</label>
            <input type="text" id="title" placeholder="${context.title}" />
        </div>
        <div class="form-group">
            <label for="message">${locs.notes_message}</label>
            <textarea id="message" placeholder="${context.message}" ></textarea>
        </div>
        <div class="form-group">
            <label for="date">${locs.notes_date}</label>
            <input type="datetime-local" id="date" />
        </div>
        <button id="saveNote" disabled>${locs.notes_save}</button>
        <p id="noteDisclaimer">${locs.notes_disclaimer_01}</p>
        <p id="noteDisclaimer">${locs.notes_disclaimer_02}</p>
    </div>
    `;
};
