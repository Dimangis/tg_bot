const TelegramBot = require('node-telegram-bot-api')
const debug = require('./helpers')
const TOKEN = '6654282030:AAGr-Nf11wvGWIlUeQiHxe0SsMCfsXn3HZ8'

console.log('bot has been started')

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

bot.on('message', (msg) => {
    const {id} = msg.chat
    bot.sendMessage(id, debug(msg))
})

