/**
 * Created by pgl on 24/7/17.
 */
let infile = "../raw/vocabularies.json";
let outdir = "../transformed/vocabulary.res";
let util = require("util");
let fs = require("fs");
let vocabsJSON = require(infile);
for (let v in vocabsJSON) {
    vocabsJSON[v].forEach(function (e) {
        fs.writeFileSync(
            util.format("%s/%s-%s.xml", outdir, v, e.id).replace(/\s/g, "_"),
            toXML(Object.assign(e, {type: v})),
            "utf8"
        );
    });
}
function toXML(obj) {
    let ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<vocabulary xmlns=\"http://einfracentral.eu\">\n";
    for (let i in obj) {
        ret += util.format("\t<%s>%s</%s>\n", i, (i === "id" ? (obj.type + " " + obj[i] ).replace(/\s/g, "_") : obj[i]), i);
    }
    ret += "</vocabulary>";
    return ret;
}
