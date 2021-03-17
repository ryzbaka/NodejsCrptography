//Message Digest 5 demo in Node.js
const crypto = require('crypto');
const plaintext = (process.argv.slice(2).join(" ") || "drowssap");
//usage example : node.js messageDigest5.js this is the plaingtext
//                node.js messageDigest5.js

const hashFunction = crypto.createHash('md5');
hashFunction.update(plaintext);
const hash = hashFunction.digest('hex');
console.log(hash);
//if you enter this hash into hashtoolkit.com (which uses a rainbow table look up values of known hashes, you'll see the decrypted value of the hash)
//md5 doesn't protect well against collisons either, this means that different inputs could produce the same hash.