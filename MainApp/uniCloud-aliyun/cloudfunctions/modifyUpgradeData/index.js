'use strict';
let db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(context);
	let {
		id,
		new_version,
		content,
		apkUrl
	} = event;
	let res = await db.collection("updateApp").doc(id).update({
		new_version,
		content,
		apkUrl
	});
	return res;
};