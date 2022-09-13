import express from "express";
import multer from "multer";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region: region,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    req.file.buffer;

    const params = {
      Bucket: bucketName,
      Key: req.body.name,
      Body: req.file.buffer,
      ContenntType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);
    return res.status(200).json("File Uploaded Successfully");
  } catch (error) {
    console.log(error);
  }
});

export default router;

// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// router.post("/", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File Uploaded Successfully");
//   } catch (error) {
//     console.log(error);
//   }
// });

// export default router;
