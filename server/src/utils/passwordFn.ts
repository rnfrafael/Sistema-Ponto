import { pbkdf2Sync } from "crypto";
import * as dotEnv from "dotenv";
dotEnv.config();

export const stringCodification = (password: string) => {
  const salt = getSaltVarFromEnv();
  return pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
};

function getSaltVarFromEnv(): string {
  if (process.env.SALT) {
    return process.env.SALT;
  } else {
    throw new Error(
      "Variavel SALT não existe no Env. Crie uma e tente novamente"
    );
  }
}
