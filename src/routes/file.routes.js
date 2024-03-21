const express = require('express');
const File = require('../models/File'); // Assuming you have a File model defined
const mime = require('mime-types');

const router = express.Router();

router.get('/:filename', async (req, res) => {
  const filename = req.params.filename;

  try {
    const file = await File.findOne({ where: { filename } });

    if (!file) {
      return res.status(404).send('File not found');
    }

    const contentType = mime.contentType(filename);
    if (!contentType.startsWith('image/')) {
      return res.status(400).send('Unsupported file format');
    }

    res.set('Content-Type', contentType);

    res.send(file.data);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;