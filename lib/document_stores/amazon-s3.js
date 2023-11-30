/global require, module, process/;

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { S3 } = require("aws-sdk");
const winston = require("winston");

const accessKeyId = "AKIA5QNVP4M6KAJXR54K";
const secretAccessKey = "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";
const region = "ap-south-1";

var AmazonS3DocumentStore = function (options) {
  this.expire = options.expire;
  this.bucket = options.bucket;
  this.client = new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  });

  this.s3Client = new S3({
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
    region: region,
  });
};

AmazonS3DocumentStore.prototype.get = function (key, callback, skipExpire) {
  console.log("key: ", key)
  var _this = this;

  const params = {
    Bucket: _this.bucket,
    Key: key,
  };

  _this.s3Client.getObject(params, (err, data) => {
    if (err) {
      // Handle error
      console.error(`Error getting object from S3: ${err}`);
      return callback(false);
    }

    // Assuming the content is stored as plain text
    const plainText = data.Body.toString("utf-8");

    // You can do something with the plain text here, or pass it to the callback
    callback(plainText);
  });
};

AmazonS3DocumentStore.prototype.set = function (
  key,
  data,
  callback,
  skipExpire
) {
  var _this = this;

  var putObjectCommand = new PutObjectCommand({
    Bucket: _this.bucket,
    Key: key,
    Body: data,
    ContentType: "text/plain",
  });

  _this.client
    .send(putObjectCommand)
    .then(() => {
      callback(true);
      if (_this.expire && !skipExpire) {
        winston.warn("amazon s3 store cannot set expirations on keys");
      }
    })
    .catch((err) => {
      console.error(err);
      callback(false);
    });
};

module.exports = AmazonS3DocumentStore;
