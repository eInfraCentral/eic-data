/**
 * Created by pgl on 24/7/17.
 */
let infile = "../raw/vocabularies.json";
let outdir = "../transformed";
let util = require("util");
let fs = require("fs");
let vocabsJSON = require(infile);
let writeVocabulary = ([type, content]) => {
    let d = util.format("%s/%s.res", outdir, type.toLowerCase());
    if (!fs.existsSync(d)) {
        fs.mkdirSync(d);
    }
    content.forEach(e => fs.writeFile(
        util.format("%s/%s.xml", d, e.id.replace(/\s/g, "_")),
        toXML(Object.assign(e, {type})),
        "utf8"
    ));
};
let toXML = (obj) => {
    let ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<vocabulary xmlns=\"http://einfracentral.eu\">\n";
    for (let i in obj) {
        ret += util.format( "\t<%s>%s</%s>\n", i, obj[i], i);
    }
    ret += "</vocabulary>";
    return ret;
};
let main = () => Object.entries(vocabsJSON).forEach(writeVocabulary);
main();