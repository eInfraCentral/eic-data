/**
 * Created by pgl on 31/10/17.
 */

let fs = require("fs");
let util = require("util");
let shared = require("shared.js");

let infile = process.argv[2];
let separator = process.argv[3] || "$";

let outdir = "../transformed/service.res";

let fields = ["id", "url", "name", "tagline", "description", "options", "targetUsers", "userValue", "userBase", "symbol",
    "multimediaURL", "providers", "version", "lastUpdate", "changeLog", "validFor", "lifeCycleStatus", "trl", "category",
    "subcategory", "places", "languages", "tags", "requiredServices", "relatedServices", "request", "helpdesk", "userManual",
    "trainingInformation", "feedback", "price", "serviceLevelAgreement", "termsOfUse", "funding", "addenda"];
let services = [];
let field = 0;

function insert(line) {
    let tokens = line.split(separator);
    for (let i = 0; i < tokens.length; i++) {
        services[i] = services[i] || {};
        if (tokens[i] !== "") {
            services[i][fields[field]] = tokens[i].replace(/^"|"$/g, '');
        }
    }
    field++;
}
async function writeOut() {
    for (let s in services) {
        await shared.write(util.format("%s/%s.xml", outdir, services[s].id), shared.toXML(services[s], "service"), "utf8");
    }
}
require("readline").createInterface({input: fs.createReadStream(infile)}).on("line", insert).on("close", writeOut);