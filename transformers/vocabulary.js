#!/usr/bin/env node


let util = require("util");
let fs = require("fs");
let shared = require("./shared");

let infile = "../raw/vocabularies.json";
let outdir = "../transformed";
let vocabsJSON = require(infile);

let writeVocabulary = async ([type, content]) => {
    let d = util.format("%s/%s.res", outdir, type.toLowerCase());
    await shared.mkdir(d);
    content.forEach(async e => await shared.write(
        util.format("%s/%s.xml", d, e.id.replace(/\s/g, "_")),
        shared.toXML(Object.assign(e, {type}), "vocabulary", type),
        "utf8"
    ));
};

let main = () => Object.entries(vocabsJSON).forEach(writeVocabulary);

main();