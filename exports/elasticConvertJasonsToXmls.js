#!/usr/bin/env node

let fs = require("fs");
let util = require("util");
let shared = require("../transformers/shared.js");

let source = "elasticJasons";
let target = "xmls";

let main = async () => {
    let resourceTypes = (await shared.read("resourceTypes.txt", 'utf8')).split("\n");
    await shared.mkdir(util.format("%s/%s/", __dirname, target));
    for (let i = 0; i < resourceTypes.length - 1; i++) {
        try {
            let type = resourceTypes[i];
            let count = 0;
            let hitsOfType = require(util.format("%s/%s/%s.%s", __dirname, source, type, "json")).hits.hits;
            await shared.mkdir(util.format("%s/%s/%s/", __dirname, target, type));
            for (let hit of hitsOfType) {
                let filename = util.format("%s/%s/%s/%s.%s", __dirname, target, type, hit._source.id, "xml");
                let content = hit._source.payload;
                await shared.write(filename, content, "utf8");
                count++;
            }
            console.log(util.format("Converted %s resources of type %s", count, type));
        } catch (err) {
            console.error(err);
        }
    }
};

main();