'use strict';
let db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(context);
	let {
		ban,
		name,
		password,
		avatarPath,
		id
	} = event;
	let res = await db.collection("dataTable").doc(id).update({
		ban,
		name,
		password,
		avatarPath
	});
	return res;
};