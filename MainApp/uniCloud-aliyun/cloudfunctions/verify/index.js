'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(event, context);
	let {
		name,
		password
	} = event;
	let res = await db.collection('dataTable').where({
		name,
		password
	}).get();
	return res;
};