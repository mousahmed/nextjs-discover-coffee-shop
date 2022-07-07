const Airtable = require("airtable");
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(
	process.env.AIRTABLE_BASE_KEY
);
export const table = base("coffee-stores");

export const getMinifiedRecords = (records) => {
	return records.map((record) => {
		return {
			...record.fields,
		};
	});
};
