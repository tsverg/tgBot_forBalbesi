const {authorize} = require('./auth.js');
const {listFiles, arrayOfGroups} = require("./drive.js");

const TelegramApi = require('node-telegram-bot-api');
const token = '6453665454:AAHKiXQLvtUP1PtnFftF40AdYBPJqjUcQDc';
const bot = new TelegramApi(token, {polling: true});

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
            await authorize().then(listFiles).catch(console.error);
            await bot.sendMessage(chatId,  'Выбери группу в которой ты учишься! 🤓',{
                reply_markup: {
                    keyboard: [arrayOfGroups,]
                }
            })
            return arrayOfGroups = [];
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
        else{ bot.sendMessage(chatId, 'Я не понял вашего сообщения 😞');}
        
        
    });
}
start();