let ind = "jsons";
let outd = "split";
let ext = "json";
let listS = "resourceTypes.txt";
let fs = require("fs");
let util = require("util");
let resourceTypes = fs.readFileSync(listS, 'utf8').split("\n");

let count = 0;
for (let i = 0; i < resourceTypes.length - 1; i++) {
    let all = require(util.format("%s/%s/%s.%s", __dirname, ind, resourceTypes[i], ext));
    for (let k in all) {
        count++;
        let filename = util.format("%s/%s.%s", outd, k, ext);
        let content = all[k][0];
        fs.writeFileSync(filename, JSON.stringify(content), "utf8");
    }
}
console.log(count);