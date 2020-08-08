const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const credentials = require('./keys.json');

// function getCredentials() {
//   const filePath = path.join(__dirname, 'keys.json');
//   console.log(filePath);
// //   if (fs.existsSync(filePath)) {
// //     return require(filePath);
// //   }
// //   if (process.env.CREDENTIALS) {
// //     return JSON.parse(process.env.CREDENTIALS);
// //   }
//   throw new Error('Unable to load credentials-1');
// }

// const getClient = ({ scopes }) => {
//   return google.auth.getClient({
//     credentials: JSON.parse(
//       Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, 'base64').toString(
//         'ascii',
//       ),
//     ),
//     scopes,
//   });
// };

async function getFiles() {
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
  //var dest = fs.createWriteStream(‘./FILE_NAME.extension’);
  const params = {
    fileId,
    alt: 'media',
    //mimeType: 'application/pdf',
  };
  return drive.files.get(params);

//   const client = await getClient({
//     scopes: ['https://www.googleapis.com/auth/drive'],
//   });
//   const drive = google.drive({
//     version: 'v2',
//     auth: client,
//   });
//   return drive.files.list();
}

exports.handler = function (event, context, callback) {
  //console.log(`DATE! ${new Date()}`);
//   const parseBody = JSON.parse(event.body);
//   console.log(parseBody);
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
