<script>
    import "../../styles/extras.css";

    import { El, Button, Icon } from "yesvelte";
    import Router, { link } from "svelte-spa-router";

    import { version, state } from "../../stores/App";
</script>

<Button href="/" class="goback-button">
    <Icon name="arrow-left" />Go back
</Button>

<El container class="extras-container">
    <h1 class="extras-wn-title">🌎 WorldNote</h1>
    
    <El row alignItems="end">
        <h2>Privacy Policy</h2>
        <p>Effective Date: June 16, 2024</p>
    </El>

    <El row alignItems="end">
        <p>
            Thank you for using WorldNote. 
            <br>
            This Privacy Policy explains how we collect, use, and protect your information when you use our service.
        </p>
    </El>

    <El row alignItems="end">
        <h3>Information We Collect</h3>
        <p>
            When you write a note on WorldNote, we collect the content of your note
            and your IP address (solely for moderation purposes).
        </p>
    </El>

    <El row alignItems="end">
        <h3>Usage Information</h3>
        <p>
            We may collect non-personal information about how you interact with
            our service, such as the pages you visit or the actions you take.
        </p>
    </El>

    <El row alignItems="end">
        <h3>How We Use Your Information</h3>
        <p>
            We use the information we collect to improve our service and prevent abuse.
        </p>
    </El>

    <El row alignItems="end">
        <h3>Information Sharing</h3>
        <p>
            We do not share your personal information with third parties.
            <br> 
            Your notes are publicly visible but are not associated with any personally identifiable information.
        </p>
    </El>

    <El row alignItems="end">
        <h3>Legal Compliance</h3>
        <p>
            If a note is found to be in violation of our Terms of Use and indicates
            involvement in illegal activities or legal disputes, we may share your IP address
            with appropriate authorities for legal purposes.
        </p>
    </El>

    <El row alignItems="end">
        <h3>Data Security</h3>
        <p>
            We take the security of your information seriously and implement appropriate measures to protect it.
        </p>
    </El>

    <El row alignItems="end">
        <h3>Children's Privacy</h3>
        <p>
            WorldNote is not directed at children under the age of 13.
            <br>
            We do not knowingly collect personal information from children under 13.
        </p>
    </El>

    <El row alignItems="end">
        <h3>Contact Us</h3>
        <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@noteonthe.world">hello@noteonthe.world</a>
        </p>
    </El>
</El>
