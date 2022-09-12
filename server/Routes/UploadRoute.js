import express from "express";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    req.file.buffer;
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
