'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(event, context);
	let res = await db.collection("commentTable").orderBy("commentTime", "desc").get();
	return res;
};