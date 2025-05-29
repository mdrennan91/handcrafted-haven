import bcrypt from 'bcryptjs';

const inputPassword = 'Password1';
const storedHash = '$2b$10$nnFRpaxJE353uDgjYaxuU.mHof8o7MC7BNs9q57Az9Qy9xxWMrlZy';

bcrypt.compare(inputPassword, storedHash).then(console.log); // should print true
