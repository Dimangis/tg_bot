const TelegramBot = require('node-telegram-bot-api')
const debug = require('./helpers')
const fs = require('fs')
const TOKEN = '6654282030:AAGr-Nf11wvGWIlUeQiHxe0SsMCfsXn3HZ8'

console.log('bot has been started')
//381764678:TEST:74324
const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})
arrayModel = ["Model_A 👩‍🎓", "Model_B 👩‍🎤", "Model_C 🤰"]
arrayFilm = []
for (i = 0; i < 10; ++i) {
    arrayFilm[i] = "Film_" + i;
    console.log(arrayFilm[i])
}
// bot.onText(/\/start/, msg => {
//     const {id} = msg.chat
//     bot.sendMessage(id, debug(msg))
// })

// bot.onText(/\/help (.+)/, (msg, arr) => {
//     const {id} =msg.chat
//     bot.sendMessage(id, debug(arr))
// })

bot.on('message', msg => {
// setTimeout(() => {
//     bot.sendMessage(msg.chat.id, `https://pecom.ru/services/additional-features/nalozhennyy-platyezh/`,
//      {disable_web_page_preview: true,
//     disable_notification: true})
// }, 4000)
const chatId = msg.chat.id

if (msg.text === 'Модели 🙎‍♀️') {
    for( i = 0; i<arrayModel.length; ++i) {
        bot.sendMessage(chatId, arrayModel[i])
    }
    
} else if (msg.text === 'Жанры 🎥'){
    // for( i = 0; i<arrayModel.length; ++i) {
    //     bot.sendMessage(chatId, arrayFilm[i])
    // }
    bot.sendMessage(chatId, 'Жанры:', {
        reply_markup: {
            keyboard: [
                ['Category_A 🎦', 'Category_B 🎞'],
                ['Category_C 🎬', 'Category_D 🦞'],
                ['Главная']
            ]
        }
    })
} else if (msg.text === 'Профиль') {
    message = ""    
    for( i = 0; i<arrayFilm.length; ++i) {
        message += arrayFilm[i] + "\n"            
    }
    bot.sendMessage(chatId, message)   
}
else {
    bot.sendMessage(chatId, 'Главная', {
        reply_markup: {
            keyboard: [
                ['Модели 🙎‍♀️', 'Жанры 🎥'],
                ['Профиль', 'Помощь'],
                ['Купить']
            ]
        }
    })
}
})
// bot.sendMessage(chatId, 'Inline keyboard', {
//     reply_markup: {
//         inline_keyboard: [
//             [
//                 {
//                     text: 'Google',
//                     url: 'https://google.com'
//                 }
//             ],
//             [
//                 {
//                     text: 'Second',
//                     callback_data: '2'
//                 },
//                 {
//                     text: 'First',
//                     callback_data: '1'
//                 }
//             ]
//         ]
//     }
// })

// bot.on('callback_query', query => {
//     bot.answerCallbackQuery(query.id, `${query.data}`)
// })
// })

//Отправка картинки
// bot.onText(/\/pic/, msg => {

//     bot.sendPhoto(msg.chat.id, fs.readFileSync(__dirname + '/cat.jpg'))

// })

//Video
// bot.onText(/\/v1/, msg => {
//     const chatId = msg.chat.id

//     bot.sendMessage(chatId, 'Sending video...')
//     // bot.sendVideo(chatId, fs.readFileSync(__dirname + '/v1.mp4'))
//    // bot.sendVideo(chatId, './v1.mp4')
//    fs.readFile(__dirname + '/v1.mp4', (err, video) => {
//     bot.sendVideo(chatId, video)
//    })
// })

bot.onText(/\/pay/, msg => {

    const chatId = msg.chat.id

    bot.sendInvoice(
        chatId,
        'Eskin carpet', 
        'The best carpet in the world for Mike Eskin!!!', 
        'payload', 
        '381764678:TEST:74324',
        'RUB',
        [
            {
                label: 'Black_Carpet',
                amount: 30000 //300.00RUB считаются копейки
            }
        ],
        {
            photo_url: 'https://main-cdn.sbermegamarket.ru/big2/hlr-system/801/408/052/123/232/2/600014045219b0.jpeg'
        }
    )
    bot.on('pre_checkout_query', async ctx => {

        try {
    
            await bot.answerPreCheckoutQuery(ctx.id, true);
    
        }
        catch(error) {
    
            console.log(error);
    
        }
    
    })
    
    bot.on('successful_payment', async ctx => {
    
        try {
            bot.sendMessage(chatId, 'Sending video...')
            bot.sendVideo(chatId, './v1.mp4')
        }
        catch(error) {
    
            console.log(error);
    
        }
    
    })
})

