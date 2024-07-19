const fs = require('fs');
const path = require('path');

exports.deleteFileImage = (filePath) => {
  const pathImage = path.join(__dirname, '../images', filePath);
  fs.unlink(pathImage, (err) => {
    if (err) {
      console.log('err-delete-file: ', err);
      throw err;
    }
  });
};
