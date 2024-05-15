'use strict';
let db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(context, event);
	let {
		id
	} = event;
	let res = await db.collection("commentTable").doc(id).remove();
	return res;
};