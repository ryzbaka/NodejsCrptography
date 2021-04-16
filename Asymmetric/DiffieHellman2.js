const crypto = require('crypto');

const alice = crypto.getDiffieHellman('modp14');
const bob = crypto.getDiffieHellman('modp14');

const alicePublic = alice.generateKeys();
const bobPublic = bob.generateKeys();

const aliceSecret = alice.computeSecret(bobPublic);
const bobSecret = bob.computeSecret(alicePublic);

console.log(aliceSecret);
console.log(bobSecret);

