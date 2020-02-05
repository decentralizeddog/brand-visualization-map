
var placeSchema = require('../models/productSchema');



exports.fetchDatabase = function (req, res) {
	console.log('GET DATA REQUEST');

	/* Place Type Query */
	var placeSearchQuery = {};

	var searchQuery = [];
	var placeTypeArr = req.body.place_currentlist;
	if (placeTypeArr.length !== 0) {
		for (var i = 0; i < placeTypeArr.length; i++) {
			searchQuery.push({
				"type": {
					$regex: ".*" + placeTypeArr[i] + ".*"
				}
			});
		}
		placeSearchQuery = {
			$or: searchQuery
		};
	}


	/* S2ID Query */
	var s2idSearchQuery = {};

	searchQuery = [];
	var s2idSearchArr = req.body.s2id_currlist;

	const { s2level } = req.body;
	var querytext = "";

	switch (s2level) {
		case 11:
			querytext = "s2id11";
			break;
		case 12:
			querytext = "s2id12";
			break;
		case 13:
			querytext = "s2id13";
			break;
		case 14:
			querytext = "s2id14";
			break;
		default:
			break;
	}

	if (s2idSearchArr.length !== 0) {
		for (var i = 0; i < s2idSearchArr.length; i++) {
			searchQuery.push({
				[querytext]: {
					$regex: ".*" + s2idSearchArr[i] + ".*"
				}
			});
		}
		s2idSearchQuery = {
			$or: searchQuery
		};
	}
	/* Company Query */
	var companySearchQuery = {};

	searchQuery = [];
	var companySearchArr = req.body.company_currentlist;
	if (companySearchArr.length !== 0) {
		for (var i = 0; i < companySearchArr.length; i++) {
			searchQuery.push({
				company: {
					$regex: companySearchArr[i].replace('_', ' ') + "|" + companySearchArr[i].replace('_', '%20'),
					$options: 'i'
				}
			});
		}
		console.log(searchQuery)
		companySearchQuery = {
			$or: searchQuery
		};
	}

	placeSchema.find({
		$and: [
			placeSearchQuery,
			s2idSearchQuery,
			companySearchQuery
		]
	}).then(result => {
		res.send({
			success: true,
			data: result
		})
	}).catch(error => {
		res.send({
			success: false,
			error
		})
	});
};

exports.returnS2Id = function (req, res) {
	const { level } = req.body;
	var query = "";

	switch (level.level) {
		case 11:
			query = "s2id11";
			break;
		case 12:
			query = "s2id12";
			break;
		case 13:
			query = "s2id13";
			break;
		case 14:
			query = "s2id14";
			break;
		default:
			break;
	}

	placeSchema.distinct(query).then(result => {
		res.send({
			success: true,
			data: result
		})
	}).catch(error => {
		res.send({
			success: false,
			error
		})
	});
}

exports.returnCompanyList = function (req, res) {
	const { types } = req.body;
	var companyList = [];

	var companySearchQuery = {};

	var searchQuery = [];
	if (types.length !== 0) {
		for (var i = 0; i < types.length; i++) {
			searchQuery.push({
				"type": {
					$regex: ".*" + types[i] + ".*"
				}
			});
		}
		companySearchQuery = {
			$or: searchQuery
		};
	}

	placeSchema.distinct("company", companySearchQuery).then(result => {
		res.send({
			success: true,
			data: result
		})
	}).catch(error => {
		res.send({
			success: false,
			error
		})
	});

}
