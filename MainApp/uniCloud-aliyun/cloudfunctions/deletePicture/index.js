'use strict';
exports.main = async (event, context) => {
	console.log(context);
	let {
		url
	} = event;
	let res = await uniCloud.deleteFile({
		fileList: [url]
	});
	return res
};