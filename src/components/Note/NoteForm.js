function getRandomContext() {
    const titles = [
        {
            title: "🏚️ Abandoned Building",
            message: "What memories do you associate with this abandoned building?"
        },
        {
            title: "🌳 Local Park",
            message: "What's your favorite memory in this park?"
        },
        {
            title: "☕ Café Corner",
            message: "What special moments have you experienced at this café?"
        },
        {
            title: "⛰️ Mountain Peak",
            message: "What did you feel when you reached this mountain peak?"
        },
        {
            title: "🏛️ Historical Landmark",
            message: "What historical events took place at this landmark?"
        },
        {
            title: "🌅 Beach Sunset",
            message: "Describe your experience watching the sunset at this beach."
        }
        // Add more titles with relevant messages as needed
    ];
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
};

export default () => {
    const context = getRandomContext();
    return `
    <div class="note-form">
        <h2>✍️ Create a New Note</h2>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" placeholder="${context.title}" />
        </div>
        <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" placeholder="${context.message}" ></textarea>
        </div>
        <div class="form-group">
            <label for="date">Date (in case it's a past event)</label>
            <input type="datetime-local" id="date" />
        </div>
        <button id="saveNote" disabled>Save</button>
        <p id="noteDisclaimer">By saving this note, you acknowledge that it will be public to the whole world.</p>
        <p id="noteDisclaimer">Some characters may not be allowed.</p>
    </div>
    `;
};
