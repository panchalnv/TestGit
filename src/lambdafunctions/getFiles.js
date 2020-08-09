'use strict';

const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');
const os = require('os');
const uuid = require('uuid');

const credentials = require('./keys.json');

async function getFiles () {
  //const credentials = getCredentials();
  const client = await google.auth.getClient({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.metadata',
      'https://www.googleapis.com/auth/drive.photos.readonly',
    ],
  });
  const drive = google.drive({
    version: 'v2',
    auth: client,
  });
  //return drive.files.list();
  const fileId = '1jf7ktkf7Jq22N3aSMFAUUQSPShi1UU9f';
  // return drive.files.get({
  //   fileId,
  //   alt: 'media',
  // });
  return drive.files
    .get({ fileId, alt: 'media' }, { responseType: 'stream' })
    .then((res) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join('./NikunjResume.pdf');
        console.log(filePath);
        console.log(`writing to ${filePath}`);
        const dest = fs.createWriteStream(filePath);
        let progress = 0;

        res.data
          .on('end', () => {
            console.log('Done downloading file.');
            resolve(filePath);
          })
          .on('error', (err) => {
            console.error('Error downloading file.');
            reject(err);
          })
          .on('data', (d) => {
            progress += d.length;
            if (process.stdout.isTTY) {
              process.stdout.clearLine();
              process.stdout.cursorTo(0);
              process.stdout.write(`Downloaded ${progress} bytes`);
            }
          })
          .pipe(dest);
      });
    });
}

exports.handler = function (event, context, callback) {
  getFiles().then((res) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(res.data),
    });
  }).catch((e) => {
    callback(e);
  });

//   callback(null, {
//     statusCode: 200,
//     body: JSON.stringify({
//       value: 'OM SAI RAM',
//       url: 'https://drive.google.com//uc?id=1jf7ktkf7Jq22N3aSMFAUUQSPShi1UU9f&export=download',
//     }),
//   });
};
