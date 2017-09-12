let subdir = "./vocabulary.res";
let vocabsJSON = require("./vocabulary.jason");
let util = require("util");
let fs = require("fs");

for (let v in vocabsJSON) {
    vocabsJSON[v].forEach(function (e) {
        fs.writeFileSync(
            util.format("%s/%s-%s.xml", subdir, v, e.id),
            toXML(Object.assign(e, {type: v})),
            "utf8"
        );
    });
}

function toXML(obj) {
    let ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<vocabulary xmlns=\"http://einfracentral.eu\">\n";
    for (let i in obj) {
        ret += util.format("\t<%s>%s</%s>\n", i, obj[i], i);
    }
    ret += "</vocabulary>";
    return ret;
}
