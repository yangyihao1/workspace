'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(context, event);
	let {
		title,
		content
	} = event;
	let res = await db.collection("feedbackTable").add({
		title,
		content,
		submitTime: Date.now()
	});
	return res;
};