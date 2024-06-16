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
    <h1 class="extras-wn-title">🌎 WorldNote - Terms of Use</h1>
    <El row alignItems="center">
        <p>
            Welcome to WorldNote, an innovative application created by the Ryu Atelier Team. By using our service, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
        </p>
    </El>
    <El row alignItems="center">
        <h2>1. Acceptance of Terms</h2>
        <p>
            By accessing and using WorldNote, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using WorldNote's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
    </El>
    <El row alignItems="center">
        <h2>2. User Conduct</h2>
        <p>
            Users are expected to use WorldNote responsibly and respectfully.
            <br>
            The following rules are in place to ensure a safe and enjoyable experience for all users:
        </p>
        <ul>
            <li>Do not share personal information of anyone in your notes. This includes phone numbers, email addresses, ID information, home addresses, or any other information that can expose or cause someone to get doxxed.</li>
            <li>You are prohibited from pinpointing anyone's house, office, or other personal spaces on the map and identifying it as the residence of any person. This can lead to harmful actions against that individual.</li>
            <li>Do not post any notes that promote hate speech, including but not limited to homophobia, xenophobia, islamophobia, racism, sexism, or any other form of discrimination or bigotry.</li>
            <li>Do not post any content that is illegal, threatening, abusive, defamatory, or obscene.</li>
            <li>Do not share links, files, or any other content that can lead to viruses, exposed content, NSFW content, gore content, or any leaked information. This includes, but is not limited to, posting links to leaked albums, pirated material, or any other unauthorized content.</li>
            <li>Respect the privacy and experiences of others. Ensure your notes are positive, constructive, and considerate.</li>
        </ul>
    </El>
    <El row alignItems="center">
        <h2>3. Content Ownership and Responsibility</h2>
        <p>
            Users retain ownership of the content they post on WorldNote. However, by posting content, you grant WorldNote a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute your content.
        </p>
        <p>
            You are solely responsible for the content you post. WorldNote does not endorse, support, represent, or guarantee the completeness, truthfulness, accuracy, or reliability of any content posted by users.
        </p>
    </El>
    <El row alignItems="center">
        <h2>4. Termination</h2>
        <p>
            WorldNote reserves the right to terminate or suspend your access to our service without prior notice or liability for any reason, including if you breach the terms of use. If a user violates the terms of service and it escalates to legal levels, their information may be shared with legal authorities. This is also mentioned in our Privacy Policy.
        </p>
    </El>
    <El row alignItems="center">
        <h2>5. Modifications to Terms</h2>
        <p>
            WorldNote reserves the right to modify these terms at any time. Your continued use of the service after any such changes constitutes your acceptance of the new terms.
        </p>
    </El>
    <El row alignItems="center">
        <br>
        <p>
            If you have any questions about these terms, please contact us at <a href="mailto:hello@noteonthe.world?subject=Question regarding the ToS">hello@noteonthe.world</a>
        </p>
    </El>
</El>
