// generate-hash.js
import bcrypt from 'bcryptjs';

const password1 = 'Password1';
const password2 = 'Password2';
const password3 = 'Password3';
const password4 = 'Password4';
const adminPassword = 'AdminPass1';
const userPassword = 'UserPass1';
const saltRounds = 10;

bcrypt.hash(password1, saltRounds).then((hash) => {
  console.log('Hashed password1:', hash);
});

bcrypt.hash(password2, saltRounds).then((hash) => {
  console.log('Hashed password2:', hash);
});

bcrypt.hash(password3, saltRounds).then((hash) => {
  console.log('Hashed password3:', hash);
});

bcrypt.hash(password4, saltRounds).then((hash) => {
  console.log('Hashed password4:', hash);
});

bcrypt.hash(adminPassword, saltRounds).then((hash) => {
  console.log('Hashed admin password:', hash);
});

bcrypt.hash(userPassword, saltRounds).then((hash) => {
  console.log('Hashed user password:', hash);
});
