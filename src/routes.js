import Router from 'svelte-spa-router';

import Main from "./components/Main.svelte";
import About from "./components/Extras/About.svelte";
import PrivacyPolicy from "./components/Extras/PrivacyPolicy.svelte";
import TermsOfUse from "./components/Extras/TermsOfUse.svelte";
import NotFound from "./components/404.svelte";

export const routes = {
    '/': Main,
    '/about': About,
    '/privacy-policy': PrivacyPolicy,
    '/terms-of-use': TermsOfUse,
    '*': NotFound
};