const crypto = require('crypto');

const alice = crypto.createDiffieHellman(1024);
const prime = alice.getPrime();
const generator = alice.getGenerator();
const bob = crypto.createDiffieHellman(prime,generator);

alice.generateKeys();
bob.generateKeys();

const alicePublicKey = alice.getPublicKey();
const bobPublicKey = bob.getPublicKey();

const aliceSecret = alice.computeSecret(bobPublicKey);
const bobSecret = bob.computeSecret(alicePublicKey)

console.log(aliceSecret);
console.log(bobSecret);
