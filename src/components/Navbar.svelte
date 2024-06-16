<script>
	import "../styles/navbar.css";

	import { El, Navbar, NavbarItem } from 'yesvelte';
</script>

<Navbar theme="dark">
	<El row>
		<El col tag="h1" mb="0" class="navbar-logo">🌎 WorldNote
			<El tag="small" class="version-text">Beta 1.0.1</El>
		</El>
	</El>
	<NavbarItem icon="brand-discord" title="Discord" href="https://discord.gg/EdcMqrY8fP"/>
	<NavbarItem icon="mail" title="Contact" href="mailto:hello@noteonthe.world" target="_blank"/>
</Navbar>