"use strict";
const ut_metadata_1 = require("../ut-metadata");
const fs = require("fs");
let ut_metadata = new ut_metadata_1.utMetadata(2095, '70e0a655a114040f061572b2c9965d70c43ee2f2');
let f = fs.readFileSync('./results6.txt');
let payload = f.slice(6);
ut_metadata.on('next', (number) => {
    console.log('shoot', number);
});
ut_metadata.on('metadata', (t) => {
    console.log('t: ', t);
});
ut_metadata.on('test', () => {
    console.log('test called');
});
ut_metadata._message(payload);
