const { google } = require('googleapis');
const sharedData = {
  arrayOfGroups: [],
  arrayOfGroupsId: {},
};
async function listGroups(authClient) {
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
  //console.log('Files:');
  files.map((file) => { 
    //console.log(`${file.name} (${file.id})`);
    sharedData.arrayOfGroups.unshift([file.name]);
    sharedData.arrayOfGroupsId[`${file.name}`] = file.id;
  });
  console.log(sharedData.arrayOfGroups);
  console.log(sharedData.arrayOfGroupsId);
}

// async function listStudents(authClient) {
//       const drive = google.drive({version: 'v3', auth: authClient});
//       const GroupId = '1bwqOof2C93W3k_I8E8Drlpy3uXw8NnQB';
//       const res = await drive.files.list({
//         q: `'${GroupId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
//         fields: 'files(id, name)',
//       });
//       const files = res.data.files;
//       if (files.length === 0) {
//         console.log('No files found.');
//         return;
//       }
//       files.map((file) => {
//         console.log(`${file.name} (${file.id})`);
//         sharedData.arrayOfStudents.unshift([file.name]);
//       });
//       console.log(" ");
// }

module.exports = {
  listGroups,
  sharedData,
};
