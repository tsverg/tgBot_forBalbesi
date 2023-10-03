const { google } = require('googleapis');

let arrayOfGroups = [];

async function listFiles(authClient) {
  const drive = google.drive({version: 'v3', auth: authClient});
  const folderId = '14tASWrvhPMMcKmy-Ec1Yn_k6MfCjUyYI';
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
    fields: 'files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }
  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
    arrayOfGroups.unshift(file.name);
  });
  console.log(arrayOfGroups)
}
arrayOfGroups = [];
module.exports = {
  listFiles,
  arrayOfGroups,
};
