let subdir = "./vocabulary";
let vocabsJSON = require("./vocabs.json");
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
    let ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<tns:vocabulary xmlns=\"http://einfracentral.eu\" xmlns:tns=\"http://einfracentral.eu\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://einfracentral.eu https://builds.openminted.eu/job/eic-registry-model/ws/target/generated-resources/schemagen/schema1.xsd\">\n";
    for (let i in obj) {
        ret += util.format("\t<%s>%s</%s>\n", i, obj[i], i);
    }
    ret += "</tns:vocabulary>";
    return ret;
}
