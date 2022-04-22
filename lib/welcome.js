const fs = require('fs-extra')

module.exports = welcome = async (urbae, event) => {
	const welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
	const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await urbae.getChatById(event.chat)
            const pChat = await urbae.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await urbae.getProfilePicFromServer(event.who)
            const capt = `Halo @${event.who.replace('@c.us', '')} 👋\nSelamat datang di *Grup ${name}*\nSelamat bergabung dan juga semoga betah disini.\n\n*Group Description:\n${groupMetadata.desc}`
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
