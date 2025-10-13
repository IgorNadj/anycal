import crypto from "node:crypto";

// Generates a cryptographically secure random salt (hex-encoded)
export const generateSalt = (bytes: number = 16): string => {
  return crypto.randomBytes(bytes).toString("hex");
};

// Hash the password using sha256 with the provided salt
// Note: For production, prefer a memory-hard KDF like argon2id or scrypt/bcrypt.
export const hashPassword = (password: string, salt: string): string => {
  return crypto
    .createHash("sha256")
    .update(`${salt}:${password}`)
    .digest("hex");
};

// Verify a password against a stored hash using timing-safe comparison where possible
export const verifyPassword = (
  password: string,
  salt: string,
  expectedHashHex: string,
): boolean => {
  const computedHex = hashPassword(password, salt);
  try {
    const a = Buffer.from(computedHex, "hex");
    const b = Buffer.from(expectedHashHex, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    // Fallback to simple comparison if anything goes wrong converting buffers
    return computedHex === expectedHashHex;
  }
};
