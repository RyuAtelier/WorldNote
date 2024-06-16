<!-- NotFound.svelte -->

<script>
    export let message = "Are you lost baby girl?";

</script>

<div class="not-found">
    <h1>404</h1>
    <img class="notfound-img-container" alt="_"/>
    <p>{message}</p>
</div>

<style>
    /* Style the 404 message */
    .not-found {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
    }

    .not-found h1 {
        font-size: 2em;
        margin-bottom: 10px;
    }

    .not-found p {
        font-size: 1.2em;
    }

    .notfound-img-container {
        background-image: url("/assets/404.jpg");
        background-repeat: no-repeat;
        background-size: 100% auto;
        width: 340px;
        height: 340px;
        margin-bottom: 20px
    }
</style>
