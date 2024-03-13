const { Storage } = require("@google-cloud/storage");
const dotenv = require("dotenv");
const upload = require("../middleware/multer");

dotenv.config();

const storage = new Storage({
  keyFilename: `src/config/service-account.json`,
})

const bucketName = process.env.GCP_BUCKET_NAME;

async function uploadFile(fileBuffer, fileName) {
  try {
    const bucket = storage.bucket(bucketName);

    const newFileName = `${Date.now()}-${fileName}`;
    const file = bucket.file(newFileName);

    // Upload the file to the GCP bucket
    await file.save(fileBuffer);

    console.log(`Image ${fileName} uploaded to ${bucketName}.`);

    // Make the file publicly accessible
    await file.makePublic();
    const publicUrl = file.publicUrl();

    return publicUrl;
  } catch (error) {
    console.error(`Error uploading image ${fileName}: ${error}`);
    throw error;
  }
}

module.exports = uploadFile;