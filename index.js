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
//const arrayModel = ["ModelA 👩‍🎓", "ModelB 👩‍🎤", "ModelC 🤰"]
const arrayModel = [
    {
        name: "ModelA",
        age: 19,
        height: 162,
        weith: 63,
        hair: "blonde",
        id: 901
    },
    {
        name: "ModelB",
        age: 27,
        height: 172,
        weith: 83,
        hair: "black",
        id: 902
    },
    {
        name: "ModelC",
        age: 21,
        height: 165,
        weith: 65,
        hair: "brown",
        id: 902
    }
]
const arrayFilm = [
    {
        name: "Video_01",
        model: "ModelA",
        category: ["Category_A", "Category_B"],
        surl: "./Videos/Shorts/SModelA_AB_1001.mp4",
        id: 1001
    },
    {
        name: "Video_02",
        model: "ModelA",
        category: ["Category_C"],
        surl: "./Videos/Shorts/SModelA_C_1002.mp4",
        id: 1002
    },
    {
        name: "Video_03",
        model: "ModelB",
        category: ["Category_B", "Category_C"],
        surl: "./Videos/Shorts/SModelB_AD_1003.mp4",
        id: 1003
    },
    {
        name: "Video_04",
        model: "ModelB",
        category: ["Category_A", "Category_D"],
        surl: "./Videos/Shorts/SModelB_BC_1004.mp4",
        id: 1004
    },
    {
        name: "Video_05",
        model: "ModelC",
        category: ["Category_A", "Category_B", "Category_C"],
        surl: "./Videos/Shorts/SModelC_ABC_1005.mp4",
        id: 1005
    },
    {
        name: "Video_06",
        model: "ModelC",
        category: ["Category_A", "Category_B", "Category_D"],
        surl: "./Videos/Shorts/SModelC_ABD_1006.mp4",
        id: 1006
    }
]

function formMessage(category){
    message = ""
    currentFilmModel = ""
    for( i = 0; i<arrayFilm.length; ++i) {
        for(j =0; j<arrayFilm[i].category.length; ++j){
            if (arrayFilm[i].category[j] == category) {
                message += arrayFilm[i].name + " "
                currentFilmModel = arrayFilm[i].model;                
            }            
        }  
        for(j =0; j<arrayModel.length; ++j){
            if (currentFilmModel == arrayModel[j].name) {message += arrayModel[j].name 
                + " Age: " + arrayModel[j].age
                + " Height: " + arrayModel[j].height 
                + " Weight: " + arrayModel[j].weith
                + " Hair: " + arrayModel[j].hair
                + "\n"
                currentFilmModel = ""
            }
            if (currentFilmModel == "") break
        }  
    }
    return message;
}
function formMessageModel(){
    message += arrayModel[j].name 
    + " Age: " + arrayModel[j].age
    + " Height: " + arrayModel[j].height 
    + " Weight: " + arrayModel[j].weith
    + " Hair: " + arrayModel[j].hair
    + "\n"
}
// for (i = 0; i < 10; ++i) {
//     arrayFilm[i] = "Film_" + i;
//     console.log(arrayFilm[i])
// }
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
} else if (msg.text === 'Category_A 🎦') {
    bot.sendMessage(chatId, formMessage("Category_A"))   
} else if (msg.text === 'Category_B 🎞') { 
    bot.sendMessage(chatId, formMessage("Category_B")) 
} else if (msg.text === 'Category_C 🎬') {
    bot.sendMessage(chatId, formMessage("Category_C"))  
} else if (msg.text === 'Category_D 🦞') {
    bot.sendMessage(chatId, formMessage("Category_D")) 
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

