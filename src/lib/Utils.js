import config from "../config";

class Utils {
    isNoteTextValid(text) {
        const regex = config.NOTE_TEXT_REGEX;
        return regex.test(text);
    };
};

export default new Utils();