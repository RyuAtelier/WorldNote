<!-- Footer.svelte -->
<script>
    import { link } from "svelte-spa-router";
    import { _ } from "svelte-i18n";

    import { mapLng, mapLtd } from "../stores/Map";

    function getCurrentYear() {
        return new Date().getFullYear();
    }

    $: longitude = $mapLng;
    $: latitude = $mapLtd;
</script>

<div class="footer">
    <!-- Copyright and credits -->
    <div>
        &copy; <span>{getCurrentYear()}</span>, <i class="fas fa-globe"></i> {$_("footer_rights")}
    </div>

    <!-- Longitude and latitude -->
    <div>
        {$_("footer_longitude")}: {longitude.toFixed(2)}, {$_("footer_latitude")}: {latitude.toFixed(2)}
    </div>

    <!-- Privacy policy and terms of use links -->
    <div>
        <a href="/about" use:link>{$_("footer_about")}</a> |
        <a href="/privacy-policy" use:link>{$_("footer_privacy")}</a> |
        <a href="/terms-of-use" use:link>{$_("footer_terms")}</a>
    </div>
</div>

<style>
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        color: white; /* Text color */
        padding: 10px 0; /* Adjust padding as needed */
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 1); /* Text shadow */
        font-size: 0.9em;
    }

    .footer a {
        color: white;
        text-decoration: none;
        margin: 0 10px; /* Adjust link spacing */
    }
</style>
