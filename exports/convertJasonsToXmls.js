let ind = "jsons";
let outd = "xmls";
let listS = "resourceTypes.txt";
let fs = require("fs");
let util = require("util");
let resourceTypes = fs.readFileSync(listS, 'utf8').split("\n");
let toXML = (obj, type) => {
    let ret = util.format("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<%s xmlns=\"http://einfracentral.eu\">\n", type);
    for (let i in obj) {
        if (obj[i] != null) {
            ret += util.format("\t<%s>%s</%s>\n", i, obj[i], i);
        }
    }
    ret += util.format("</%s>", type);
    return ret;
};

let count = 0;
for (let i = 0; i < resourceTypes.length - 1; i++) {
    let type = resourceTypes[i];
    let all = require(util.format("%s/%s/%s.%s", __dirname, ind, type, "json"));
    try {
        fs.mkdirSync(util.format("%s/%s/%s/", __dirname, outd, type));
    } catch (err) {
    }
    for (let k in all) {
        count++;
        let filename = util.format("%s/%s/%s/%s.%s", __dirname, outd, type, k, "xml");
        let content = all[k][0];
        fs.writeFileSync(filename, toXML(content, type), "utf8");
    }
}
console.log(count);
