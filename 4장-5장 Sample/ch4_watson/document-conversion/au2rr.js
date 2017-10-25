var fs = require('fs');

if (process.argv.length < 3) {
	console.log('Usage: node au2rr.js <answer_unit filename>');
	return;
}
var filename = process.argv[2];
var data = JSON.parse(fs.readFileSync(filename, 'utf8'));

var rr = "{\n";
var gt = "";

for (var i in data.answer_units) {
	var au = data.answer_units[i];
	
	if (au.content[0].text == '') continue;
	var add = {
		doc: {
			id: au.id,
			title: au.title,
			body: au.content[0].text,
		}
	};
	rr += '"add":' + JSON.stringify(add) + ",\n";
	gt += '"' + au.title + '","' + au.id + '","4"\n';
}

rr += '"commit": {}';
rr += "\n}";

fs.writeFile('rr.json', rr);
fs.writeFile('rr-gt.csv', gt);