/**
 * Created by pgl on 31/10/17.
 */
let infile = process.argv[2];
let separator = process.argv[3] || "$";
console.log({infile, separator});
let outdir = "../transformed/service.res";
let fs = require("fs");
let util = require("util");
let fields = ["id", "url", "name", "tagline", "description", "options", "targetUsers", "userValue", "userBase", "symbol",
    "multimediaURL", "providers", "version", "lastUpdate", "changeLog", "validFor", "lifeCycleStatus", "trl", "category",
    "subcategory", "places", "languages", "tags", "requiredServices", "relatedServices", "request", "helpdesk", "userManual",
    "trainingInformation", "feedback", "price", "serviceLevelAgreement", "termsOfUse", "funding", "serviceAddenda"];
let services = [];
let field = 0;
function toXML(obj) {
    let ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<service xmlns=\"http://einfracentral.eu\">\n";
    for (let i in obj) {
        ret += util.format("\t<%s>%s</%s>\n", i, obj[i], i);
    }
    ret += "</service>";
    return ret;
}
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
function writeOut() {
    for (let s in services) {
        fs.writeFileSync(util.format("%s/%s.xml", outdir, services[s].id), toXML(services[s]), "utf8");
    }
}
require("readline").createInterface({input: fs.createReadStream(infile)}).on("line", insert).on("close", writeOut);