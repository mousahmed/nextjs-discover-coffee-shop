import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";

import {fetchCoffeeStores} from "../../lib/coffee-stores";

import styles from "../../styles/coffee-store.module.css";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../store/store-context";

export async function getStaticProps(staticProps) {
	const params = staticProps.params;
	const CoffeeStoresData = await fetchCoffeeStores();
	const findCoffeeStoreById = CoffeeStoresData.find((coffeeStore) => {
		return coffeeStore.id.toString() === params.id;
	});
	return {
		props: {
			coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
		},
	};
}

export async function getStaticPaths() {
	const CoffeeStoresData = await fetchCoffeeStores();

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

const CoffeeStore = (initialProps) => {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const id = router.query.id;
	const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
	const {
		state: {coffeeStores},
	} = useContext(StoreContext);
	const {address, name, imgUrl, neighborhood} = coffeeStore;

	const handleUpVoteButton = () => {
		console.log("Up Vote!");
	};

	useEffect(() => {
		if (initialProps.coffeeStore) {
			if (coffeeStores.length > 0) {
				const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
					return coffeeStore.id.toString() === id;
				});
				setCoffeeStore(findCoffeeStoreById);
			}
		}
	}, [id]);

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
								<a> ← Back to home</a>
							</Link>
						</div>
						<div className={styles.nameWrapper}>
							<h1>{name}</h1>
						</div>

						<Image
							src={
								imgUrl ||
								"https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
							}
							width={600}
							height={360}
							alt={name}
						/>
					</div>
					<div className={cls("glass", styles.col2)}>
						<div className={styles.iconWrapper}>
							<Image src="/static/icons/places.svg" width={24} height={24} />
							<p className={styles.text}>{address}</p>
						</div>
						{neighborhood && (
							<div className={styles.iconWrapper}>
								<Image src="/static/icons/nearMe.svg" width={24} height={24} />
								<p className={styles.text}>{neighborhood}</p>
							</div>
						)}
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
