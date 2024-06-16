<script>
	import { El, Navbar, NavbarItem } from 'yesvelte'
</script>

<Navbar theme="dark">
	<El row >
		<El col tag="h1" mb="0" style="
		padding-top: 7px;
		padding-left: 15px;
		padding-right: 15px;
		">🌎 WorldNote</El>
	</El>
	<NavbarItem icon="brand-discord" title="Discord" href="https://discord.gg/EdcMqrY8fP"/>
	<NavbarItem icon="mail" title="Contact" href="mailto:hello@noteonthe.world" target="_blank"/>
</Navbar>