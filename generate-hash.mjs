// generate-hash.js
import bcrypt from 'bcryptjs';

const password = 'Password1';
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then((hash) => {
  console.log('Hashed password:', hash);
});

