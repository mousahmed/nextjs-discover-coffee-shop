const Airtable = require("airtable");
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(
	process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee-stores");

const createCoffeeStore = (req, res) => {
    if (req.method === "POST") {
        res.json({message: "Airtable"})
    }else{
        res.json({message: "Not a post request"})

    }
}
export default createCoffeeStore;
