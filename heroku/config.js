"use strict";
const fs = require("fs");
// Example config structure
var config = {
    dbURI: "CHANGE_ME",
    jwtSecret: "CHANGE_ME",
    sendGridKey: "CHANGE_ME"
};
// Check the config is actually there
var configFile = __dirname + "/config.json";
if (!fs.existsSync(configFile))
    throw new Error("You must define a config.json file in /resources/, see config.ts for an example of its contents");
// Load its values
config = JSON.parse(fs.readFileSync(configFile, "utf8"));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
