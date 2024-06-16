import config from "../config";

class Utils {
    isNoteTextValid(text) {
        const regex = config.NOTE_TEXT_REGEX;
        return regex.test(text);
    };

    isDev(env) {
        return ["dev", "local"].includes(env);
    };

    formatDate(dateStr, locale = "en-US") {
        const formattedDate = new Date(dateStr).toLocaleString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return formattedDate;
    };
};

export default new Utils();