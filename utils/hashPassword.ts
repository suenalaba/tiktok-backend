import { User } from '../models/User';
import { hashWithArgon2 } from './hashing';

function isPasswordHashed(password: string) {
  // Check if the password starts with the Argon2 prefix and contains all required parameters
  const argon2Prefix = '$argon2';
  const requiredParams = ['v=', 'm=', 't=', 'p=', '$'];
  const hasArgon2Prefix = password.startsWith(argon2Prefix);
  const hasRequiredParams = requiredParams.every((param) =>
    password.includes(param)
  );
  return hasArgon2Prefix && hasRequiredParams;
}

async function hashPasswordHook(user: User) {
  if (!isPasswordHashed(user.password as string)) {
    const hash = await hashWithArgon2(user.password as string);
    user.password = hash;
  }
}

async function hashPassword(plaintextPassword: string) {
  const hashedPassword = await hashWithArgon2(plaintextPassword);
  return hashedPassword;
}

export { isPasswordHashed, hashPasswordHook, hashPassword };
