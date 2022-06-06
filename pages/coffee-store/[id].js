import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";

import CoffeeStoresData from "../../data/coffee-stores.json";

import styles from "../../styles/coffee-store.module.css";

export function getStaticProps(staticProps) {
	const params = staticProps.params;
	return {
		props: {
			coffeeStore: CoffeeStoresData.find((coffeeStore) => {
				return coffeeStore.id.toString() === params.id;
			}),
		},
	};
}

export function getStaticPaths() {
	const paths = CoffeeStoresData.map((coffeeStore) => {
		return {
			params: {
				id: coffeeStore.id.toString(),
			},
		};
	});
	return {
		paths,
		fallback: true,
	};
}

const CoffeeStore = (props) => {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	const { address, name, neighborhood, imgUrl } = props.coffeeStore;

	const handleUpVoteButton = () => {
		console.log("Up Vote!");
	};

	return (
		<>
			<Head>
				<title>{name}</title>
			</Head>

			<div className={styles.layout}>
				<div className={styles.container}>
					<div className={styles.col1}>
						<div className={styles.backToHome}>
							<Link href="/">
								<a>Back to home</a>
							</Link>
						</div>
						<div className={styles.nameWrapper}>
							<h1>{name}</h1>
						</div>

						<Image src={imgUrl} width={600} height={360} alt={name} />
					</div>
					<div className={cls("glass", styles.col2)}>
						<div className={styles.iconWrapper}>
							<Image src="/static/icons/places.svg" width={24} height={24} />
							<p className={styles.text}>{address}</p>
						</div>
						<div className={styles.iconWrapper}>
							<Image src="/static/icons/nearMe.svg" width={24} height={24} />
							<p className={styles.text}>{neighborhood}</p>
						</div>
						<div className={styles.iconWrapper}>
							<Image src="/static/icons/star.svg" width={24} height={24} />
							<p className={styles.text}>1</p>
						</div>

						<button
							className={styles.upVoteButton}
							onClick={handleUpVoteButton}
						>
							Up Vote
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CoffeeStore;
