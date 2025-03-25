// src/utils/comparePassword.mjs
// Denna används inte för närvarande!
import bcrypt from "bcryptjs";

export const comparePassword = async (inputPassword, storedHashedPassword) => {
  return await bcrypt.compare(inputPassword, storedHashedPassword);
};
