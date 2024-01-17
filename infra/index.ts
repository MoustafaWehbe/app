import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const config = new pulumi.Config();
const s3BucketName = config.require("s3BucketName");

// Create an S3 bucket
const s3Bucket = new aws.s3.Bucket(s3BucketName);

// Upload static files to S3 bucket
const staticFiles = fs.readdirSync("../static");
staticFiles.forEach((file) => {
  const filePath = `../static/${file}`;
  const s3Object = new aws.s3.BucketObject(file, {
    bucket: s3Bucket,
    source: new pulumi.asset.FileAsset(filePath),
  });
});

export const bucketName = s3Bucket.id;
