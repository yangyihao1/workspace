'use strict';
let db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(context, event);
	let {
		name,
		password
	} = event;
	let res = await db.collection("dataTable").where({
		name,
		password
	}).update({
		loginCount: db.command.inc(1),
		loginTime: Date.now()
	});
	return {
		res
	}
};