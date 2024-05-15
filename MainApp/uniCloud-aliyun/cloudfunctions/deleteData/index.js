'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(context, event);
	let {
		id
	} = event;
	let res = await db.collection("dataTable").doc(id).remove();
	return res;
};