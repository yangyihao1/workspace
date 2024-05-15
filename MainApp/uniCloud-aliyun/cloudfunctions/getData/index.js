'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(context, event);
	let res = await db.collection("dataTable").get();
	return res;
};