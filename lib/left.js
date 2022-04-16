const fs = require('fs-extra')

module.exports = left = async (urbae, event) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
    const isLeft = left.includes(event.chat)
    try {
        if (event.action == 'remove' && isLeft) {
            const gChat = await urbae.getChatById(event.chat)
            const pChat = await urbae.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await urbae.getProfilePicFromServer(event.who)
            const capt = `Babayy @${event.who.replace('@c.us', '')}\nSyukron, beban grup *${name}* berkurang 1`
            if (pepe == '' || pepe == undefined || pepe == 'ERROR: 401' || pepe == 'ERROR: 404') {
		var pfp = 'https://i.ibb.co/DthYrSB/a256bae0f5ed.jpg'
		} else {
		var pfp = pepe
		}
                await urbae.sendFileFromUrl(event.chat, pfp, 'profile.jpg', capt)
            }
    } catch (err) {
        console.log(err)
    }
}
