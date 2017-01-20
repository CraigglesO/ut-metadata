"use strict";
var Sse4Crc32 = require("sse4_crc32");
const buffer_1 = require("buffer");
let one = buffer_1.Buffer.from([0x7b, 0xd5, 0x20, 0x0a]);
let two = buffer_1.Buffer.from([0x62, 0x4c, 0x36, 0x20]);
var newCrc = Sse4Crc32.calculate(one);
var lol = Sse4Crc32.calculate(two, newCrc);
console.log(lol);
