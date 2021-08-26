const { create, vf } = require('@open-wa/wa-automate')
const { color, options } = require('./function')
const left = require('./lib/left')
const welcome = require('./lib/welcome')
const figlet = require('figlet')
const fs = require('fs-extra')
const HandleMsg = require('./HandleMsg')

const start = async (aruga = new aruga()) => {
    console.log(color('------------------------------------------------------------------------', 'white'))
    console.log(color(figlet.textSync('Urbaeexyz Bot', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color('------------------------------------------------------------------------', 'white'))
    console.log(color('[CREATOR]', 'aqua'), color('Thoriq Azzikra', 'magenta'))
    console.log(color('[BOT]', 'aqua'), color('URBAE BOT is now Online!', 'magenta'))
    console.log(color('[VER]', 'aqua'), color('2.5.8', 'magenta'))
    aruga.onStateChanged((state) => {
        console.log(color('-> [STATE]'), state)
        if (state === 'CONFLICT') aruga.forceRefocus()
        if (state === 'UNPAIRED') aruga.forceRefocus()
    })

    aruga.onAddedToGroup(async (chat) => {
        await aruga.sendText(chat.groupMetadata.id, 'Terima kasih sudah memasukkan bot kedalam grup kalian')
        await aruga.leaveGroup(chat.groupMetada.id)
    })

    aruga.onGlobalParticipantsChanged((async (heuh) => {
        await welcome(aruga, heuh)
        left(aruga, heuh)
    }))

    aruga.onMessage((message) => {
        HandleMsg(aruga, message)
    })

    aruga.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        await aruga.sendText(callData.peerJid, 'Maaf sedang tidak bisa menerima panggilan.\n\n-bot')
            .then(async () => {
                // bot akan memblock nomor itu
                await aruga.contactBlock(callData.peerJid)
            })
    })
}
create(options(start))
    .then((aruga) => start(aruga))
    .catch((err) => console.error(err))
