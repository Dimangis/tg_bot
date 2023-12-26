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

/*bot.onText(/\/start/, msg => {
    const {id} = msg.chat
    bot.sendMessage(id, debug(msg))
})

bot.onText(/\/help (.+)/, (msg, arr) => {
    const {id} =msg.chat
    bot.sendMessage(id, debug(arr))
})*/

// bot.on('message', msg => {
// // setTimeout(() => {
// //     bot.sendMessage(msg.chat.id, `https://pecom.ru/services/additional-features/nalozhennyy-platyezh/`,
// //      {disable_web_page_preview: true,
// //     disable_notification: true})
// // }, 4000)
// const chatId = msg.chat.id

// // if (msg.text === 'Закрыть') {
// //     bot.sendMessage(chatId, 'Закрываю клавиатуру', {
// //         reply_markup: {
// //             remove_keyboard: true
// //         }
// //     })
// // } else if (msg.text === 'Ответить'){
// //     bot.sendMessage(chatId, 'Отвечаю', {
// //         reply_markup: {
// //             remove_keyboard: true
// //         }
// //     })
// // } else {
// //     bot.sendMessage(chatId, 'Клавиатура', {
// //         reply_markup: {
// //             keyboard: [
// //                 [{
// //                     text: 'Отправить местоположение',
// //                     request_location: true
// //                 }],
// //                 ['Ответить', 'Закрыть'],
// //                 [{
// //                     text: 'Отправить контакт',
// //                     request_contact: true
// //                 }]
// //             ]
// //         }
// //     })
// // }

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
        'Audi A4', //title
        'Best car ever in tg bot', //description
        'payload', //payload
        '381764678:TEST:74324',
        'SOME_RANDOM_STRING_KEY',
        'RUB',
        [
            {
                label: 'audi_a4',
                amount: 30000 //300.00RUB считаются копейки
            }
        ]
        // {
        //     photo_url: './audi.png',
        //     need_name: true,
        //     is_flexible: true
        // }
    )

})