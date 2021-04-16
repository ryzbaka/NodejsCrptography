# Node.js Cryptography
Exploring and understanding cryptography using Node.js.

## Introduction
* This repo contains code for using cryptography for the following use cases:
    * Protecting passwords
    * Protecting data at rest (in a database)
    * Protecting data in transit
    * Two Factor Authentication

## Crypto Libraries
* Crypto : A built-in module **in** node.js
    * Contains the `Cipher` and `Decipher` classes for encrypting and decrypting data respectively.
    * The `DiffieHellman` class is used for exchanching keys for assymetric cryptography.
    * The `ECDH`(Elliptic Curve Diffie Hellman) class uses an elliptic curve to create keys.
    * The `Hash` class generates hash digests of data. It transforms plaintext to fixed length random output.
    * `HMAC` is a class used for generating hash based message authentication codes. They're used to verify the identity of the sender and the integrity of the message.
    * `Sign`/`Verify` classes are used for cryptographic signing.
    * Other various crypto methods line RNG (Random Number Generation).

## Protecting Passwords
* Since good passwords are hard to remember, users tend to choose passwords that are easy to guess and are hence vulnerable to dictionary attacks.
* Users also tend to use the same password on multiple websites, so if an account on one website gets compromised it's highly likely that the user's other accounts have been compromised too.
* Data breaches put all the users of a website at risk.
* The best way to protect a password is to use hashing.

### Hashing Algorithms
* A hashing algorithm takes an plaintext input of arbitrary length and outputs a **digests/hashes** of fixed length.
* A good hash encryption function makes it very difficult to derive the input given the hash. They are hence considered one way functions.
* Think of it this way, we know that 10234*255 = 2609670; given 2609670, it can prove to be pretty difficult to guess the original factors of the number that were used to generate it.
* Not all hashing algorithms are created and some of them have well documented vulnerabilities.
* The `Hashes/messageDigest5.js` file demonstrates generation of hashes using the `Crypto.js` library.
*  Good hashing algorithms:
    * [Argon2](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
    * Password Based Key Derivation Function 2 (PBKDF2)
    * scrypt : Optimized to prevent hardware based attacks making it difficult to brute force hashes even if the attacker has a GPU accelerated system.
    * [bcrypt](https://openbase.com/js/bcryptjs/documentation) : Based on the blowfish algorithm.
    * [List of good hashing algorithms for passwords (OWASP).](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

### Salts
* A salt is a random value that is added to the password entered and it must be different for every login credential to be truly secure.
* If two users use the same password with the same algorithms, rainbow tables won't be effective since the algorithm would produce two different outputs.
* Lets assume the plaintext pass word to be **P@$$woRd** and the randomly generated salt to be **HesY7L3p1**, the output hash would be a truly random output. This is why good RNGs are essential for hashing functions.
* `Hashes/pbkf2.js` demonstrates the use of salts in the PBKF2 hashing algorithm.
* It doesn't matter if the attacker knows the salt for any particular hash, it's not a secret. Using a different salt for each password means the attacker can't precompute hashes using common values. With a different salt on each one, they would need to recompute any tables for every password which makes them useless.
* Lets say that the attacker knows the value of the salt since they know how a library like bcrypt stores the salt in the hash. They would need to compute all the hashes in their rainbow table for that salt, this is very computationally expensive when compared to the process of precomputing all the hashes of common passwords using a hashing algorithm that doesn't use salts since the attacker would have to recompute hash values for their rainbow table for each individual password since the salt used to encrypt it is completely random.
* `Hashes/bcryptDemo.js` demonstrates the working of salt based hashing algorithms using **bcrypt**. 

## Protecting Data at Rest
* Data at rest refers to data stored on disk. Files and databases have to be protected to prevent loss of confidentiality, integrity and availability.
* Symmetric encryption is the best way to protect data at risk.
* You encrypt the data and store it in disk; when required, the data is decrypted.
* Only one key is used in symmetric encryption.
* Node.js tools for symmetric encryption:
  * `Crypto.createCipheriv` : Creates an instance of the cipher class. iv -> initialization vector.
  * `Update` : Add data to cipher.
  * `Final` : Encrypt data.
* `Symmetric/aes.js` demonstrates symmetric encryption and decryption in Node.js .
* Symmetric encryptions is only effective as long as the attacker does not have access to the keys.
* A robust Key Management System (KMS) should be used:
  * A key store is a piece of software the stores keys by encrypting them (using a master key).
  * Keys should be rotated regularly.
  * AWS Key Management service and Azure Keystore are great.
  * But I'm cheap, so I'll probably end up using Vault by Hashicorp because its open source.

## Protecting Data in Transit
* The two main threats to data in transit are:
  * Attacker can see the data being exchanged between two parties and/or changes it.
  * Attacker impersonates one of the parties.
* A common attack is the MITM attack.
* Asymmetric encryption ses 2 keys, one to encrypt a message and another to decrypt it.
* HMAC(Hash Based Message Authentication Code) helps validate contents of the message. It creates a keyed hash from the contents of the data.
* Digital Signatures use both asymmetric encryption and hashing. Hash message->encrypt using key1->send->decrypt using key2->recalculate hash to verify integrity of received doc.
* 