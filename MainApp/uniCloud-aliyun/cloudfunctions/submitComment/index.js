'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(context, event);
	let {
		title,
		content,
		picture,
		name,
		gender,
		avatarPath
	} = event;
	let res = await db.collection("commentTable").add({
		title,
		content,
		picture,
		name,
		gender,
		avatarPath,
		commentTime: Date.now()
	});
	return res
};