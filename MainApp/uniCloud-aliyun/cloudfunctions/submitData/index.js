'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(event, context);
	let {
		name,
		password,
		avatarPath,
		deviceId,
		gender,
		age
	} = event;
	let res = await db.collection("dataTable").add({
		name,
		password,
		avatarPath,
		deviceId,
		gender,
		age,
		regesterTime: Date.now(),
		loginCount: 0
	});
	return {
		res
	}
};