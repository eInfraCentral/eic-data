#!/usr/bin/env node

let fs = require("fs");
let util = require("util");
let shared = require("../transformers/shared.js");

let source = "jsons";
let target = "xmls";

let main = async () => {
    let resourceTypes = (await shared.read("resourceTypes.txt", 'utf8')).split("\n");
    await shared.mkdir(util.format("%s/%s/", __dirname, target));
    for (let i = 0; i < resourceTypes.length - 1; i++) {
        let type = resourceTypes[i];
        if (type == "vocabulary") {
            console.log("Skipping vocabulary");
            continue;
        }
        let count = 0;
        let resourcesOfType = require(util.format("%s/%s/%s.%s", __dirname, source, type, "json"));
        await shared.mkdir(util.format("%s/%s/%s/", __dirname, target, type));
        for (let resource in resourcesOfType) {
            let filename = util.format("%s/%s/%s/%s.%s", __dirname, target, type, resource, "xml");
            let content = resourcesOfType[resource][0];
            await shared.write(filename, shared.toXML(content, type), "utf8");
            count++;
        }
        console.log(util.format("Converted %s resources of type %s", count, type));
    }
};

main();