const bcrypt = require('bcryptjs');
const plaintext = (process.argv[2]||"password");
const salt = bcrypt.genSaltSync(16); //generate 16 bit salt
const plaintext2 = (process.argv[3] || "password1")
console.log(`Plaintext is : ${plaintext}`);
console.log(`Salt is : ${salt}`);
console.log(`String to which hash is compared to is : ${plaintext2}`);
const hash = bcrypt.hashSync(plaintext, salt);
console.log(`The generated hash is ${hash}`);
const same = bcrypt.compareSync(plaintext2, hash);
same?console.log(`Entered string are the same`):console.log(`Entered strings are different`);