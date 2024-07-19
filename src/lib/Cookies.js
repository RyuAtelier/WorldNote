const DEFAULT_COOKIE_EXPIRE = 7; // Default to 7 days

const COOKIES = {
    MAP_STYLE: "mapStyle",
    LIKED_NOTES: "likedNotes"
};

function setCookie(document, { name, value, days = DEFAULT_COOKIE_EXPIRE }) {
    if (!document) {
        throw new Error("Document is undefined. Make sure you are running in a browser environment.");
    }

    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

function readCookie(document, name) {
    if (!document) {
        throw new Error("Document is undefined. Make sure you are running in a browser environment.");
    }

    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

module.exports = { setCookie, readCookie, COOKIES };
