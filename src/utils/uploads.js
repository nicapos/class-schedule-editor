const { Storage } = require("@google-cloud/storage");
const dotenv = require("dotenv");
const upload = require("../middleware/multer");
const File = require("../models/File");

dotenv.config();

const storage = new Storage({
  keyFilename: `src/config/service-account.json`,
})

const bucketName = process.env.GCP_BUCKET_NAME;

// async function uploadFile(fileBuffer, fileName) {
//   try {
//     const bucket = storage.bucket(bucketName);

//     const newFileName = `${Date.now()}-${fileName}`;
//     const file = bucket.file(newFileName);

//     // Upload the file to the GCP bucket
//     await file.save(fileBuffer);

//     console.log(`Image ${fileName} uploaded to ${bucketName}.`);

//     // Make the file publicly accessible
//     await file.makePublic();
//     const publicUrl = file.publicUrl();

//     return publicUrl;
//   } catch (error) {
//     console.error(`Error uploading image ${fileName}: ${error}`);
//     throw error;
//   }
// }

async function uploadFile(fileBuffer, fileName) {
  try {
    const newFileName = `${Date.now()}-${fileName}`;

    // Save the uploaded file to the database
    await File.create({
      filename: newFileName,
      data: fileBuffer
    });

    console.log(`Image ${fileName} uploaded to ${bucketName}.`);

    return `https://localhost:8080/api/file/${newFileName}`;
  } catch (error) {
    console.error(`Error uploading image ${fileName}: ${error}`);
    throw error;
}
}

module.exports = uploadFile;