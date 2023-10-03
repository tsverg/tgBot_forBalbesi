const fs = require('fs').promises;
const allfs = require('fs');
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// При изменении этих областей удалите token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// В файле token.json хранятся токены доступа и обновления пользователя, и он
// создается автоматически, когда поток авторизации завершается в первый раз
// время.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Считывает ранее авторизованные учетные данные из файла сохранения.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Сериализует учетные данные в файл, совместимый с GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Загрузка или запрос или авторизация для вызова API.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

let arrayOfGroups = [];

async function listFiles(authClient) {
  const drive = google.drive({version: 'v3', auth: authClient});
  const folderId = '14tASWrvhPMMcKmy-Ec1Yn_k6MfCjUyYI';
  // const res = await drive.files.list({
  //   pageSize: 20,
  //   fields: 'nextPageToken, files(id, name)',
  // });
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
authorize().then(listFiles).catch(console.error);

const TelegramApi = require('node-telegram-bot-api');

const token = '6453665454:AAHKiXQLvtUP1PtnFftF40AdYBPJqjUcQDc';

const bot = new TelegramApi(token, {polling: true});

const chats = {};

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
    ])

    bot.on('message', async msg =>{
        console.log(msg);
        const text = msg.text;
        const chatId = msg.chat.id;
        
        
        if (text === '/start'){
            await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/1bf/558/1bf558c3-9850-46b5-a7ad-9105a634d8d1/192/18.webp`);
            await bot.sendMessage(chatId, `Здравствуй ${msg.chat.first_name}, я бот Пепе, которому ты можешь кидать свою домашку. Как ты будешь готов, нажми кнопку снизу экрана`);
            return bot.sendMessage(chatId, 'пук 😳',{
                reply_markup: {
                    keyboard: [
                        ['Группа'],
                    ],
                }
            })
        }
        if (text === "Группа" || text === "группа"){
            return bot.sendMessage(chatId,  'Выбери группу в которой ты учишься! 🤓',{
                reply_markup: {
                    keyboard: [
                      arrayOfGroups
                    ],
                }
            })
        }
        if (text === "ИСиП-21"){
            return bot.sendMessage(chatId, 'теперь выбери себя 😶‍🌫️', {
                reply_markup: {
                    keyboard: [
                        ['ИСиП-21',],
                        
                    ],
                }
            })
        }
        if (text === "ИСиП-22"){
            return bot.sendMessage(chatId, 'теперь выбери себя 😶‍🌫️', {
                reply_markup: {
                    keyboard: [
                        ['ИСиП-22',], 
                    ],
                }
            })
        }
        if (text === "ИСиП-23"){
            return bot.sendMessage(chatId, 'теперь выбери себя 😶‍🌫️', {
                reply_markup: {
                    keyboard: [
                        ['ИСиП-23',],
                    ],
                }
            })
        }
        if (text === "ИСиП-24"){
            return bot.sendMessage(chatId, 'теперь выбери себя 😶‍🌫️', {
                reply_markup: {
                    keyboard: [
                        ['ИСиП-24',],
                    ],
                }
            })
        }
        else{ bot.sendMessage(chatId, 'Я не понял вашего сообщения 😞');}
        
        
    });
}
start();