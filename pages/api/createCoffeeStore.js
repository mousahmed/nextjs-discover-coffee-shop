import {getMinifiedRecords, table} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
	if (req.method === "POST" && req.body.id) {
		const {id, name, address, neighbourhood, voting, imgUrl} = req.body;
		try {
			const findCoffeeStoreRecords = await table
				.select({
					filterByFormula: `id=${id}`,
				})
				.firstPage();

			if (findCoffeeStoreRecords.length > 0) {
				const records = getMinifiedRecords(findCoffeeStoreRecords);
				res.status(200);
				res.json(records[0]);
			} else if (id) {
				const createRecords = await table.create([
					{
						fields: {
							id,
							name,
							address,
							neighbourhood,
							voting,
							imgUrl,
						},
					},
				]);
				const records = getMinifiedRecords(createRecords);

				res.json({message: "Create a record", records});
			} else {
				res.status(400);
				res.json({message: "Id or name is missing"});
			}
		} catch (error) {
			console.error("Error finding store: ", error);
			res.status(500);
			res.json({message: "Error finding store", error});
		}
	} else {
		res.status(400);
		res.json({message: "Id is missing"});
	}
};
export default createCoffeeStore;
