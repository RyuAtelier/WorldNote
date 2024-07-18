<script>
	import "../styles/navbar.css";

	import { El, Navbar, NavbarItem } from 'yesvelte';
    import { _ } from "svelte-i18n";
</script>

<Navbar theme="dark">
	<El row>
		<El col tag="h1" mb="0" class="navbar-logo">🌎 WorldNote
			<El tag="small" class="version-text">Beta 1.0.1</El>
		</El>
	</El>
	<NavbarItem icon="brand-x" title={$_("navbar_twitter")} href="https://x.com/noteontheworld" target="_blank"/>
	<NavbarItem icon="brand-discord" title={$_("navbar_discord")} href="https://discord.gg/D36HJ8HsV6" target="_blank"/>
	<NavbarItem icon="brand-github" title={$_("navbar_github")} href="https://github.com/RyuAtelier" target="_blank"/>
	<NavbarItem icon="mail" title={$_("navbar_contact")} href="mailto:hello@noteonthe.world" target="_blank"/>
</Navbar>