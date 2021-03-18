const crypto = require('crypto');
const algorithm = 'aes-256-cbc'
// aes -> Advanced Encryption Standard
// 256 -> bit output (32 bytes)
// cbc -> cipher block chaining
//bit.ly/crypto-basics

//cipher block chaining : Data is chopped up into blocks and encrypted within
//each block. The output of one block is the input of the next.
//Since the first block does not have an input, we use
//an initialization vector.

//encryption
const password = "This is the password";
const salt = crypto.randomBytes(32);
const key = crypto.scryptSync(password, salt, 32); //salted hash of password
const iv = crypto.randomBytes(16);//why 16?
const cipher = crypto.createCipheriv(algorithm, key, iv);
const data = "192.168.1.1"; //data that we want to encrypted
cipher.update(data, 'utf8','hex');//input is utf-8 output is hex
let encrypted = cipher.final('hex');
console.log(encrypted);

//decryption
const decipher = crypto.createDecipheriv(algorithm, key, iv);
decipher.update(encrypted, 'hex', 'utf8');
const decrypted = decipher.final('utf8');
console.log(decrypted)