const fs = require('fs-extra')

module.exports = left = async (aruga, event) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
    const isLeft = left.includes(event.chat)
    try {
        if (event.action == 'remove' && isLeft) {
            const gChat = await aruga.getChatById(event.chat)
            const pChat = await aruga.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await aruga.getProfilePicFromServer(event.who)
            const capt = `Babayy @${event.who.replace('@c.us', '')}\nSyukron, beban grup *${name}* berkurang 1`
            if (pepe == '' || pepe == undefined) {
		var pfp = 'https://i.ibb.co/DthYrSB/a256bae0f5ed.jpg'
		} else {
		var pfp = pepe
		}
                await aruga.sendFileFromUrl(event.chat, pfp, 'profile.jpg', capt)
            }
    } catch (err) {
        console.log(err)
    }
}