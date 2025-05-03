import crypto from 'crypto'

const secret_key = crypto.randomBytes(64).toString('ascii');
console.log(secret_key)