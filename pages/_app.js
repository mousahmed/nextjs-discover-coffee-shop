import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<div className="container">
				<Component {...pageProps} />
			</div>
			<footer className="footer"> This my personal website</footer>
		</>
	);
}

export default MyApp;
