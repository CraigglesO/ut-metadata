// let x = Array.apply(null, Array(5));
//
// console.log(x);
//
// let y = Math.ceil(16484 / 16384);
//
// console.log(y);


// const crc32 = require('fast-crc32c');
var Sse4Crc32 = require("sse4_crc32");
import { Buffer } from 'buffer';
let one = Buffer.from([0x7b, 0xd5, 0x20, 0x0a]);
let two = Buffer.from([0x62, 0x4c, 0x36, 0x20]);

var newCrc = Sse4Crc32.calculate(one);

var lol = Sse4Crc32.calculate(two, newCrc);

console.log(lol);
