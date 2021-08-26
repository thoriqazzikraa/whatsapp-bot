const fs = require('fs-extra')
	
module.exports = welcome = async (aruga, event) => {
	const welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
	const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await aruga.getChatById(event.chat)
            const pChat = await aruga.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await aruga.getProfilePicFromServer(event.who)
            const capt = `Halo @${event.who.replace('@c.us', '')} 👋\nSelamat datang di *Grup ${name}*\n═══════════════════\nSelamat bergabung dan juga semoga betah disini.\n═══════════════════\n`
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