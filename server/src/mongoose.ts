import mongoose from "mongoose";
import fs from "fs";
import { Application } from "./declarations";
import logger from "./logger";

export default function (app: Application): void {
  const certFile = "./ca-certificate.crt";
  if (process.env.CA_CERT && fs.existsSync(certFile) === false) {
    fs.writeFileSync(certFile, process.env.CA_CERT);
  }

  console.log(app.get("mongodb"));
  console.log(process.env.CA_CERT);
  console.log(certFile);
  const str = fs.readFileSync(certFile, 'utf8');
  console.log(str);

  mongoose
    .connect(app.get("mongodb"), {
      useCreateIndex: true,
      useNewUrlParser: true,
      tls: process.env.CA_CERT ? true : undefined,
      tlsCAFile: process.env.CA_CERT ? certFile : undefined,
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  app.set("mongooseClient", mongoose);
}
