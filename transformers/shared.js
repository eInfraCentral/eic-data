let fs = require("fs");
let util = require("util");

let singulars = {
    "providers": "provider", "places": "place", "languages": "language", "tags": "tag",
    "requiredServices": "requiredService", "relatedServices": "relatedService", "termsOfUse": "termOfUse"
};

exports.read = util.promisify(fs.readFile);
exports.write = util.promisify(fs.writeFile);
exports.exists = util.promisify(fs.exists);
exports.mkdir_ = util.promisify(fs.mkdir);

exports.toXML = (resource, type, vocType) => {
    let xmlString = util.format("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<%s xmlns=\"http://einfracentral.eu\">\n", type);
    for (let attribute in resource) {
        if (resource.hasOwnProperty(attribute)) {
            if (resource[attribute] !== null) {
                if (resource[attribute] instanceof Array) {
                    if (resource[attribute].length > 0) {
                        let xmlStringForArray = "";
                        for (let j = 0; j < resource[attribute].length; j++) {
                            xmlStringForArray += util.format("<%s>%s</%s>", singulars[attribute], resource[attribute][j], singulars[attribute]);
                        }
                        resource[attribute] = xmlStringForArray;
                    }
                }
                if (attribute === "id") {
                    if (type === "vocabulary") {
                        if (resource[attribute].indexOf(vocType) <= 0) {
                            resource[attribute] = util.format("%s-%s", vocType, resource[attribute]);
                        }
                    }
                    resource[attribute] = resource[attribute].replace(/\s/g, "_");
                }
                xmlString += util.format("\t<%s>%s</%s>\n", attribute, resource[attribute], attribute);
            }
        }
    }
    xmlString += util.format("</%s>", type);
    return xmlString.replace("&", "&amp;");
};

exports.mkdir = async (dir) => {
    if (!(await exports.exists(dir))) {
        await exports.mkdir_(dir);
    }
};
