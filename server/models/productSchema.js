const mongoose = require('mongoose');

const Places = new mongoose.Schema({
	id: Number,
	name: String,
	category: String,
	main_address: String,
	address: String,
	lat: Number,
	lng: Number,
	phone: String,
	website_url: String,
	rating: Number,
	reviews_count: Number,
	s2id: Number,
	region_name: String,
	google_keyword: String
});

module.exports = mongoose.model('places', Places);