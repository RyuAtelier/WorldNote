export default {
    ENV: process.env.ENV,

    API_FQDN: "https://api.noteonthe.world",

    // Ignores links, emails, and allows text only.
    NOTE_TEXT_REGEX: /^(?!.*(?:https?|ftp):\/\/|.*@)[\p{L}0-9 !?*.,:;'""()\[\]{}]+$/u
}
