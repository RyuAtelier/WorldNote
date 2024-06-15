<!-- Footer.svelte -->
<script>
    import { mapLng, mapLtd } from "../stores/Map"; // Import your longitude and latitude stores

    // Function to get the current date
    function getCurrentYear() {
        return new Date().getFullYear();
    }

    $: longitude = $mapLng;
    $: latitude = $mapLtd;
</script>

<div class="footer">
    <!-- Copyright and credits -->
    <div>
        &copy; <span>{getCurrentYear()}</span>, <i class="fas fa-globe"></i> WorldNote,
        All Rights Below to RyuAtelier
    </div>

    <!-- Longitude and latitude -->
    <div>
        Longitude: {longitude.toFixed(2)}, Latitude: {latitude.toFixed(2)}
    </div>

    <!-- Privacy policy and terms of use links -->
    <div>
        <a href="/privacy-policy">Privacy Policy</a> |
        <a href="/terms-of-use">Terms of Use</a>
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
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Text shadow */
        font-size: 0.9em;
    }

    .footer a {
        color: white;
        text-decoration: none;
        margin: 0 10px; /* Adjust link spacing */
    }
</style>
