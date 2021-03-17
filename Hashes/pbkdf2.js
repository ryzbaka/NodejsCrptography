const crypto = require('crypto');
const randomBytes = crypto.randomBytes;
const password = (process.argv.slice(2).join(" ") || "password");
const salt = randomBytes(256).toString('hex'); //salt generation
const numIter = 100000; //number of iterations for pbkf2
const algorithm = "sha512"; //hashing algorithm to be used.
const numBytes = 512 //number of bytes we want back from the function.
const hash = crypto.pbkdf2Sync(password,salt,numIter,numBytes,algorithm);//synchronous hashing. Outputs a buffer.
console.log(hash.toString('hex'))