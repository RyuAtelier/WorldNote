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
	<NavbarItem icon="map" title="Map" active/>
	<NavbarItem icon="info-circle" title="Info"/>
	<NavbarItem icon="mail" title="Contact"/>
	<NavbarItem icon="brand-discord" title="Discord"/>
</Navbar>