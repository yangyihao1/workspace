'use strict';
let db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(context);
	let {
		id
	} = event;
	let res = await db.collection("feedbackTable").doc(id).remove();
	return res;
};