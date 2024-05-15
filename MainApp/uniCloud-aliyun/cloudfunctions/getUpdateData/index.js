'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(event, context);
	return await db.collection("updateApp").get();
};