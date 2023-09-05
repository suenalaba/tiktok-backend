import argon2 from 'argon2';

async function hashWithArgon2(str: string) {
  return argon2.hash(str, {
    timeCost: 10,
  });
}

async function verifyArgon2Hash(hash: string, str: string) {
  return argon2.verify(hash, str);
}

export { hashWithArgon2, verifyArgon2Hash };
