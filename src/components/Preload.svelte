<script>
    import "../styles/preload.css";
    import { El, Spinner } from 'yesvelte';
    import { _ } from "svelte-i18n";

    import { version, state } from "../stores/App";

    let randomText = "";

	// Returns a random message
    function getRandomPreloadText() {
        setTimeout(() => {
            const preloadTexts = [
                $_("preload_welcome_text_01"),
                $_("preload_welcome_text_02"),
                $_("preload_welcome_text_03"),
                $_("preload_welcome_text_04"),
                $_("preload_welcome_text_05"),
                $_("preload_welcome_text_06"),
                $_("preload_welcome_text_07"),
                $_("preload_welcome_text_08"),
                $_("preload_welcome_text_09"),
                $_("preload_welcome_text_10"),
                $_("preload_welcome_text_11")
            ];
            const random = preloadTexts[Math.floor(Math.random() * preloadTexts.length)];
            randomText = random; 
        }, 500)
    };

    getRandomPreloadText();
</script>

<El container class="container">
    <El row>
        <El col class="preload-logo">🌎 WorldNote</El>
    </El>
    <El row>
        <El col class="preload-version">{$state} {$version}</El>
    </El>
    <El row>
        <El col class="preload-message">{randomText}</El>
    </El>
    <El row>
        <El col>
            <Spinner color="primary" class="spinner"/>
        </El>
    </El>
</El>
