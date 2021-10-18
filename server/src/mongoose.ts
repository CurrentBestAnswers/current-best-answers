import mongoose from "mongoose";
import fs from "fs";
import { Application } from "./declarations";
import logger from "./logger";

export default function (app: Application): void {
  const certFile = "./ca-certificate.crt";

  console.log(fs.existsSync(certFile));
  console.log(fs.unlinkSync(certFile));
  // if (process.env.CA_CERT && fs.existsSync(certFile) === false) {
  //   fs.writeFileSync(certFile, process.env.CA_CERT);
  // }

  console.log(app.get("mongodb"));
  console.log(process.env.CA_CERT);
  console.log(certFile);
  const str = fs.readFileSync(certFile, 'utf8');
  console.log(str);

  mongoose
    .connect(app.get("mongodb"), {
      useCreateIndex: true,
      useNewUrlParser: true,
      tls: true,
      tlsCAFile: certFile,
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  app.set("mongooseClient", mongoose);
}
