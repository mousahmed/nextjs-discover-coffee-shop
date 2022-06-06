const getUrlForCoffeeStores = (latLong, query, limit) => {
	return (
		`https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20220105&limit=${limit}`,
		
	);
};
export const fetchCoffeeStores = async () => {
	const response = await fetch(
		getUrlForCoffeeStores(
			"43.65267326999575,-79.39545615725015",
			"coffee stores",
			6
		),
        {
			headers: {
				Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
			},
		}
	);
	const data = await response.json();

	const transformedData =
		data?.results?.map((venue) => {
			return {
				id: venue.fsq_id,
				...venue,
			};
		}) || [];

	return transformedData;
};
