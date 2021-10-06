import * as crypto from "crypto";

/**
 * 
 * @returns https://github.com/MichalLytek/type-graphql/blob/v1.1.1/examples/interfaces-inheritance/helpers.ts
 */
export function getId(): string {
  const randomNumber = Math.random();
  const hash = crypto.createHash("sha256");
  hash.update(randomNumber.toString());
  return hash.digest("hex");
}