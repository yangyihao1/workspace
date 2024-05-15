'use strict';
let db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(context);
	let {
		id,
		title,
		content,
		time
	} = event;
	let res = await db.collection("noticeTable").doc(id).update({
		title,
		content,
		time
	});
	return res;
};