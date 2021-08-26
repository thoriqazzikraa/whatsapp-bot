require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const axios = require('axios')
const FormData = require('form-data')
const os = require('os')
const speed = require('performance-now')
const fetch = require('node-fetch')
const chalk = require('chalk')
const translatte = require('translatte')
const ms = require('parse-ms')
const bent = require('bent')
const path = require('path')
const bdr = require('rumus-bdr')
const ffmpeg = require('fluent-ffmpeg')
const canvas = require('canvacord')
const request = require('request-promise')
const emojiUnicode = require('emoji-unicode')
const get = require('got')
const { fetchJson } = require('./utils/fetcher')

const appRoot = require('app-root-path')
const low = require('lowdb')
const google = require('google-it')
const { stdout } = require('process');
const FileSync = require('lowdb/adapters/FileSync')
const db_group = new FileSync(appRoot + '/lib/data/group.json')
const db = low(db_group)
db.defaults({ group: [] }).write()

const {
	removeBackgroundFromImageBase64
} = require('remove.bg')

const {
	exec
} = require('child_process')

const {
	menuId,
	cekResi,
	urlShortener,
	meme,
	translate,
	getLocationData,
	images,
	resep,
	rugaapi,
	downloader,
	sticker,
	level
} = require('./lib')


const {
	stickerburn,
	stickerlight
} = require('./lib/sticker')

const {
	msgFilter,
	color,
	processTime,
	isUrl,
	download
} = require('./utils')

const {
	uploadImages,
	custom,
	picturemis,
} = require('./utils/fetcher')

const fs = require('fs-extra')
const banned = JSON.parse(fs.readFileSync('./settings/banned.json'))
const simi = JSON.parse(fs.readFileSync('./settings/simi.json'))
const ngegas = JSON.parse(fs.readFileSync('./settings/ngegas.json'))
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
const _autostiker = JSON.parse(fs.readFileSync('./lib/helper/autostiker.json'))
const _afk = JSON.parse(fs.readFileSync('./lib/database/afk.json'))
const _leveling = JSON.parse(fs.readFileSync('./lib/database/group/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./lib/database/level.json'))
const _nsfw = JSON.parse(fs.readFileSync('./lib/database/group/nsfw.json'))

let dbcot = JSON.parse(fs.readFileSync('./lib/database/bacot.json'))
let dsay = JSON.parse(fs.readFileSync('./lib/database/say.json'))
let left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
let welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
let antilink = JSON.parse(fs.readFileSync('./lib/helper/antilink.json'))
let prem = JSON.parse(fs.readFileSync('./lib/database/prem.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
let liststicker = JSON.parse(fs.readFileSync('./lib/database/liststiker.json'))
let listvn = JSON.parse(fs.readFileSync('./lib/database/listvn.json'))
let cogann = JSON.parse(fs.readFileSync('./lib/helper/cogan.json'))
let cecann = JSON.parse(fs.readFileSync('./lib/helper/cecan.json'))
let listimg = JSON.parse(fs.readFileSync('./lib/database/listimage.json'))

let {
	groupLimit,
	memberLimit,
	vhtearkey,
	keepSave,
	iTechApi,
	apiKey,
	banChats,
	tobzapi,
	lindowapi,
	onlydev,
	hackapi,
	fahmiapi,
	lolhuman,
	bxhunter,
	dapuhyapi,
	paiskey,
	leysapi,
	zenzapi,
	apikeyvinz, //IF YOU HAVE THIS APIKEY, YOU CAN CUSTOM IT!
	authorstc,
	packstc,
	mtc: mtcState
} = setting

const {
	apiNoBg,
	apiSimi
} = JSON.parse(fs.readFileSync('./settings/api.json'))

function formatin(duit) {
	let reverse = duit.toString().split('').reverse().join('');
	let ribuan = reverse.match(/\d{1,3}/g);
	ribuan = ribuan.join('.').split('').reverse().join('');
	return ribuan;
}



function waktu(seconds) { // TOBZ
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " Day," : " Day,") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " Hours," : " Hours,") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " Minutes," : " Minutes,") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " Second," : " Second") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}


const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const inArray = (needle, haystack) => {
	let length = haystack.length;
	for (let i = 0; i < length; i++) {
		if (haystack[i].id == needle) return i;
	}
	return false;
}


const errorurl = 'https://i.ibb.co/PNR9rT3/IMG-20210412-WA0036.jpg'
const errorurl2 = 'https://i.ibb.co/SfPCmsZ/65307459-647461459071676-8817651150049313976-n.jpg'

const isMuted = (chatId) => {
	if (muted.includes(chatId)) {
		return false
	} else {
		return true
	}
}

function identify(buffer) {
	return new Promise(async (resolve, reject) => {
		const bodyForm = new FormData()
		const pathh = './audio.mp3'
		bodyForm.append('audio', buffer, 'file.mp3')
		bodyForm.append('apikey', `${apikeyvinz}`)
		axios('https://api.zeks.xyz/api/searchmusic', {
			method: 'POST',
			headers: {
				"Content-Type": "multipart/form-data",
				...bodyForm.getHeaders()
			},
			data: bodyForm
		})
			.then(({ data }) => {
				resolve(data)
			}).catch(reject)
	})
}

function banChat() {
	if (banChats == true) {
		return false
	} else {
		return true
	}
}

var timeStart = Date.now() / 1000
moment.tz.setDefault('Asia/Jakarta').locale('id')
module.exports = HandleMsg = async (aruga, message) => {
	try {
		const { type, id, fromMe, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList, } = message
		let { body } = message
		var { name, formattedTitle, gcok } = chat
		let { pushname, verifiedName, formattedName } = sender
		pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
		const botNumber = await aruga.getHostNumber() + '@c.us'
		const groupId = isGroupMsg ? chat.groupMetadata.id : ''
		const groupAdmins = isGroupMsg ? await aruga.getGroupAdmins(groupId) : ''
		const isGroupAdmins = groupAdmins.includes(sender.id) || false
		const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
		const pengirim = sender.id
		const serial = sender.id
		const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
		const isNsfwOn = isGroupMsg ? _nsfw.includes(groupId) : false
		const betime = moment(t * 1000).format('DD/MM/YY')
		const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
		const timee = moment(t * 1000).format('HH:mm:ss')
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const userId = sender.id.substring(9, 13)
		const blockNumber = await aruga.getBlockedIds()
		const groupMembers = isGroupMsg ? await aruga.getGroupMembersId(groupId) : ''
		const GroupLinkDetector = antilink.includes(chatId)
		const stickermsg = message.type === 'sticker'

		// Bot Prefix
		const commands = caption || body || ''
		const argxx = commands.toLowerCase()
		const argss = commands.split(' ')
		const command = commands.toLowerCase().split(' ')[0] || ''
		const prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~`,*zxcv!?@#$%^&.\/\\©^]/.test(command) ? command.match(/^[!?#$,^.,/\/\\©^]/gi) : '-'
		global.prefix
		body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
		const arg = body.trim().substring(body.indexOf(' ') + 1)
		const args = body.trim().split(/ +/).slice(1)
		const q = args.join(' ')
		const isBlocked = blockNumber.includes(sender.id)
		const isCmd = body.startsWith(prefix)
		const tms = (Date.now() / 1000) - (timeStart);
		const cts = waktu(tms)
		const waver = await aruga.getWAVersion()
		const uaOverride = process.env.UserAgent
		const url = args.length !== 0 ? args[0] : ''
		const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
		const isQuotedVideo = quotedMsg && quotedMsg.type === 'video/mp4'
		const isQuotedGif = quotedMsg && quotedMsg.type === 'gif'
		const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
		const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
		const isQuotedFile = quotedMsg && quotedMsg.type === 'file'
		const reason = q ? q : 'Gada'
		const gifcrop = { crop: true, square: 240, fps: 30, loop: 0, startTime: `00:00:00.0`, endTime: `00:00:10.0` }
		const gifxyz = { crop: false, square: 240, fps: 30, loop: 0, startTime: `00:00:00.0`, endTime: `00:00:10.0` }
		const StickerMetadata = { author: authorstc, pack: packstc, keepScale: true }
		const StickerMetadatacrop = { author: authorstc, pack: packstc, keepScale: false }

		// [IDENTIFY]
		const ownerNumber = "62895334951166@c.us"
		const errorImg = "https://i.ibb.co/DYLd6fk/baukrysie.jpg"
		const isOwnerBot = ownerNumber.includes(pengirim)
		const isOwner = ownerNumber.includes(pengirim)
		const isOwnerB = ownerNumber.includes(pengirim)
		const isBanned = banned.includes(pengirim)
		const isSimi = simi.includes(chatId)
		const isNgegas = ngegas.includes(chatId)
		const isAutoStikerOn = _autostiker.includes(chat.id)
		const isImage = type === 'image'
		const isPrem = prem.includes(pengirim)

		//
		if (isCmd && !isGroupMsg) { console.log(color('[EXEC]', 'magenta'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`, 'aqua'), 'from', color(`${pushname}`, 'magenta')) }
		if (isCmd && isGroupMsg) { console.log(color('[EXEC]', 'magenta'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`, 'aqua'), 'from', color(`${pushname}`, 'magenta'), 'in', color(name || formattedTitle, 'aqua')) }

		if (chats == 'Assalamualaikum') {
			aruga.reply(from, 'Waalaikumsalam wr wb.', id)
		}
		if (chats == 'assalamualaikum') {
			aruga.reply(from, 'Waalaikumsalam wr wb.', id)
		}
		if (mentionedJidList.includes(ownerNumber)) { /*Y'ALL CAN CUSTOM THIS WHATEVER YOU WANT!*/
			const sends = sender.id
			const ras = await aruga.getProfilePicFromServer(sends)
			if (ras == undefined) {
				var pfp = 'https://i.ibb.co/PNR9rT3/IMG-20210412-WA0036.jpg'
			} else {
				var pfp = ras
			}
			aruga.reply(from, 'ngapain tag Thoriq?\npc aja kali sabii', id).then(() => {
				aruga.sendFileFromUrl(ownerNumber, pfp, 'img.jpg', `*Note Call*\n\n*From:* ${pushname}\n*Group:* ${name}\n*Nomor:* wa.me/${serial.replace(/@c.us/g, '')}\n*Text:* ${chats}`)
			})
		}

		// ROLE (Change to what you want, or add) and you can change the role sort based on XP.
		const levelRole = level.getLevelingLevel(sender.id, _level)
		var role = 'Copper V'
		if (levelRole >= 5) {
			role = 'Copper IV'
		} else if (levelRole >= 10) {
			role = 'Copper III'
		} else if (levelRole >= 15) {
			role = 'Copper II'
		} else if (levelRole >= 20) {
			role = 'Copper I'
		} else if (levelRole >= 25) {
			role = 'Silver V'
		} else if (levelRole >= 30) {
			role = 'Silver IV'
		} else if (levelRole >= 35) {
			role = 'Silver III'
		} else if (levelRole >= 40) {
			role = 'Silver II'
		} else if (levelRole >= 45) {
			role = 'Silver I'
		} else if (levelRole >= 50) {
			role = 'Gold V'
		} else if (levelRole >= 55) {
			role = 'Gold IV'
		} else if (levelRole >= 60) {
			role = 'Gold III'
		} else if (levelRole >= 65) {
			role = 'Gold II'
		} else if (levelRole >= 70) {
			role = 'Gold I'
		} else if (levelRole >= 75) {
			role = 'Platinum V'
		} else if (levelRole >= 80) {
			role = 'Platinum IV'
		} else if (levelRole >= 85) {
			role = 'Platinum III'
		} else if (levelRole >= 90) {
			role = 'Platinum II'
		} else if (levelRole >= 95) {
			role = 'Platinum I'
		} else if (levelRole > 100) {
			role = 'Exterminator'
		}

		const mess = {
			restmes: 'Rest API sedang error',
			wait: '_Waitt, lemme process this shit_',
			nsfwalready: 'Fitur NSFW sudah aktif sebelumnya di grup ini',
			nsfwoff: 'Fitur NSFW belum aktif di grup ini',
			nsfwon: 'Fitur NSFW sudah aktif di grup ini',
			prem: `Command Premium!\nHalo ${pushname} Mau menjadi user premium? ga mahal kok bang\n\n20rb = PREMIUM SAMPE KIAMAT\n\nJika anda berminat, silahkan chat pada Owner\n\nwa.me/${ownerNumber.replace('@c.us', '')}\n\nTrims~\n-Thoriq Azzikra`,
			error: {
				St: `[❗] Kirim gambar dengan caption *${prefix}sticker* atau tag gambar yang sudah dikirim`,
				Ti: `[❗] Replay sticker dengan caption *${prefix}stickertoimg* atau tag sticker yang sudah dikirim`,
				Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
				Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
				Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
				Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
				Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
				Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
				Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
				Bk: '[❗] Bot tidak bisa memblockir Owner',
				Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
				Iv: '[❗] Link yang anda kirim tidak valid!'
			}
		}


		if (listvn.includes(chats))
			try {
				const getvn = await fs.readFileSync('./media/audio/' + chats + '.mp3', { encoding: "base64" })
				aruga.sendAudio(from, `data:audio/mp3;base64,${getvn.toString('base64')}`, id)
			} catch {
				aruga.reply(from, 'Maaf, sistem error', id)
			}

		if (listimg.includes(chats))
			try {
				const getimg = await fs.readFileSync('./media/image/' + chats + '.jpg', { encoding: "base64" })
				await aruga.sendFile(from, `data:image/jpg;base64,${getimg.toString('base64')}`, '', '', id)
			} catch {
				aruga.reply(from, 'Maaf,sistem error', id)
			}

		if (liststicker.includes(chats))
			try {
				const getstick = await fs.readFileSync('./media/pic/sticker/' + chats + '.jpeg', { encoding: "base64" })
				await aruga.sendImageAsSticker(from, `data:image/jpeg;base64,${getstick.toString('base64')}`, { author: "Urbaeexyz", pack: chats, keepScale: true })
			} catch {
				aruga.reply(from, 'Maaf, sistem error', id)
			}

		const addAfk = (userId, time) => {
			let obj = { id: `${userId}`, time: `${time}`, reason: `${reason}` }
			_afk.push(obj)
			fs.writeFileSync('./lib/database/afk.json', JSON.stringify(_afk))
		}

		const getAfk = (userId) => {
			let isAfk = false
			Object.keys(_afk).forEach((i) => {
				if (_afk[i].id === userId) {
					isAfk = true

				}
			})
			return isAfk
		}

		const getAfkReason = (userId) => {
			let position = false
			Object.keys(_afk).forEach((i) => {
				if (_afk[i].id === userId) {
					position = i
				}
			})
			if (position !== false) {
				return _afk[position].reason
			}
		}

		const getAfkTime = (userId) => {
			let position = false
			Object.keys(_afk).forEach((i) => {
				if (_afk[i].id === userId) {
					position = i
				}
			})
			if (position !== false) {
				return _afk[position].time
			}
		}

		const getAfkId = (userId) => {
			let position = false
			Object.keys(_afk).forEach((i) => {
				if (_afk[i].id === userId) {
					position = i
				}
			})
			if (position !== false) {
				return _afk[position].id
			}
		}


		const isAfkOn = getAfk(sender.id)
		if (isGroupMsg) {
			const checking = getAfk(sender.id)
			for (let ment of mentionedJidList) {
				if (getAfk(ment)) {
					const getId = getAfkId(ment)
					const getReason = getAfkReason(getId)
					const getTime = getAfkTime(getId)
					await aruga.reply(from, `*「 AFK MODE 」*\n\nSssttt! Orangnya lagi afk, jangan diganggu!\n➸ *Alasan*: ${getReason}\n➸ *Sejak*: ${getTime}`, id)
					aruga.sendText(userId, `Seseorang telah tag anda bernama @{pushname}`)
				}
			}
			if (checking && !isCmd) {
				_afk.splice(sender.id, 1)
				fs.writeFileSync('./lib/database/afk.json', JSON.stringify(_afk))
				aruga.sendTextWithMentions(from, `*@${sender.id.replace(/@c.us/g, '')} SEKARANG TIDAK AFK*`)
			}
		}


		//fitur anti link
		if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isOwner) {
			if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
				const inviteLink1 = await aruga.getGroupInviteLink(groupId);
				if (chats.includes(inviteLink1)) return aruga.reply(from, `Ini Link Group *${name}* Kamu tidak akan dikick`, id)
				const check = await aruga.inviteInfo(chats);
				if (!check) {
					return
				} else {
					aruga.reply(from, '*[GROUP LINK DETECTOR]*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(', id).then(() => {
						aruga.removeParticipant(groupId, sender.id)
					})
				}
			}
		}

		// Leveling [BETA] by Slavyan
		if (isGroupMsg && !level.isGained(sender.id) && !isBanned && isLevelingOn) {
			try {
				level.addCooldown(sender.id)
				const currentLevel = level.getLevelingLevel(sender.id, _level)
				const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
				const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
				level.addLevelingXp(sender.id, amountXp, _level)
				if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
					level.addLevelingLevel(sender.id, 1, _level)
					const userLevel = level.getLevelingLevel(sender.id, _level)
					const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
					await aruga.reply(from, `*── 「 LEVEL UP 」 ──*\n\n- *Name*: ${pushname}\n- *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n- *Level*: ${currentLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n- *Role*: *${role}*`, id)
				}
			} catch (err) {
				console.error(err)
			}
		}


		if (isAutoStikerOn && isMedia && isImage) {
			const mediaData = await decryptMedia(message, uaOverride)
			const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
			await aruga.sendImageAsSticker(from, imageBase64, { author: '@thoriqazzikra_', pack: 'Urbaeexyz' })
			console.log(color(`Sticker processed for ${processTime(t, moment())} seconds`, 'aqua'))
		}

		// Kerang Menu

		const estetek = [
			"https://i.ibb.co/Xk1kggV/Aesthetic-Wallpaper-for-Phone.jpg",
			"https://i.ibb.co/wBNyv8X/image.jpg",
			"https://i.ibb.co/hgcJbg7/Leaving-Facebook.jpg",
			"https://i.ibb.co/27TW3bT/Pinterest.jpg",
			"https://i.ibb.co/2MR16Ct/Image-about-vintage-in-ALittle-Bit-Of-This-And-That-by-Little-Nerdy-Gnome.jpg",
			"https://i.ibb.co/WfrzTWH/minteyroul-on-We-Heart-It.jpg",
			"https://i.ibb.co/dMpkfWT/1001-Kreative-Aesthetic-Wallpaper-Ideen-f-r-das-Handy.jpg",
			"https://i.ibb.co/cN3Br2J/red-grunge-wallpaper-dark-edgy-aesthetic-collage-background-trendy-cool-dark-red-iphone-wallpaper.jpg",
			"https://i.ibb.co/c8QMXZv/ee16de425985d4a1b628dddc1461b546.jpg"
		]


		const menupict = [
			"https://i.ibb.co/Fsdgj6p/asha.jpg",
			"https://i.ibb.co/SfPCmsZ/65307459-647461459071676-8817651150049313976-n.jpg",
			"https://i.ibb.co/PNR9rT3/IMG-20210412-WA0036.jpg",
			"https://i.ibb.co/WsPRR5G/baifern.jpg",
			"https://i.ibb.co/3pms02n/krystal.jpg",
			"https://i.ibb.co/stWN2D5/mewnit.jpg",
			"https://i.ibb.co/WBRbkjM/junlee.jpg",
			"https://i.ibb.co/DYLd6fk/baukrysie.jpg",
		]

		const apakah = [
			'Ya',
			'Tidak',
			'Coba Ulangi'
		]

		const bisakah = [
			'Bisa',
			'Tidak Bisa',
			'Coba Ulangi'
		]

		const kapan = [
			'1 Minggu lagi',
			'1 Bulan lagi',
			'1 Tahun lagi',
			'100 tahun lagi',
			'gatau',
			'2030'
		]

		const rate = [
			'100%',
			'95%',
			'90%',
			'85%',
			'80%',
			'75%',
			'70%',
			'65%',
			'60%',
			'55%',
			'50%',
			'45%',
			'40%',
			'35%',
			'30%',
			'25%',
			'20%',
			'15%',
			'10%',
			'5%'
		]


		// Filter Banned People
		if (isBanned && isCmd) {
			console.log(color('[BAN]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`, 'aqua'), 'from', color(pushname, 'magenta'), 'in', color(name || formattedTitle, 'aqua'))
		}
		if (isBanned && isCmd) {
			return aruga.reply(from, `Maaf *_${pushname}_* anda telah dibanned untuk menggunakan command Bot!`, id)
		}

		// Filter Blocked People
		if (isBlocked && isCmd) {
			console.log(color('[BLOCK]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${chats} [${args.length}]`, 'aqua'), 'from', color(pushname, 'magenta'), 'in', color(name || formattedTitle, 'aqua'))
		}

		aruga.setPresence(true)

		if (isCmd && isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwnerB || isPrem) {
			switch (command) {
				// Menu and TnC
				case prefix + 'exif':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Owner Bot!', id)
					const splitauthor = q.split('|')[1]
					const packauthor = q.split('|')[0]
					authorstc = splitauthor
					packstc = packauthor
					aruga.reply(from, `Berhasil mengubah pack stiker menjadi ${splitauthor} dan ${packauthor}`, id)
					break
				case prefix + 'mute':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					if (!isOwnerB) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Owner Bot!', id)
					if (isGroupMsg) {
						isMuted(chatId) == true
						if (muted.includes(chatId)) return aruga.reply(from, 'Grup ini sudah dimute sebelumnya', id)
						muted.push(chatId)
						fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
						aruga.reply(from, 'Bot telah di mute pada grup ini!', id)
					} else {
						muted.push(chatId)
						fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
						aruga.reply(from, 'Bot telah di mute pada grup ini!', id)
					}
					break
				case prefix + 'unmute':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					if (!isOwnerB) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Owner Bot!', id)
					if (isGroupMsg) {
						isMuted(chatId) == false
						let indexsz = muted.indexOf(chatId);
						muted.splice(indexsz, 1)
						fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
						aruga.reply(from, 'Bot telah di unmuted pada grup ini!', id)
					} else {
						let indexsz = muted.indexOf(chatId);
						muted.splice(indexsz, 1)
						fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
						aruga.reply(from, 'Bot telah di unmuted pada grup ini!', id)
					}
					break
				case prefix + 'private':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh owner Bot!', id)
					if (setting.banChats === true) return
					setting.banChats = true
					banChats = true
					fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
					aruga.reply(from, 'Private Commands has been enable', id)
					break
				case prefix + 'public':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh owner Bot!', id)
					if (setting.banChats === false) return
					setting.banChats = false
					banChats = false
					fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
					aruga.reply(from, 'Public commands has been enable', id)
					break
				case prefix + 'speed':
				case prefix + 'ping':
					const loadedMsg = await aruga.getAmountOfLoadedMessages()
					const chatIds = await aruga.getAllChatIds()
					const groups = await aruga.getAllGroups()
					const timestamp = speed();
					const latensi = speed() - timestamp
					const charged = await aruga.getIsPlugged();
					const device = await aruga.getMe()
					const deviceinfo = `- Battery Level : ${device.battery}%\n  ├ Is Charging : ${charged}\n  └ 24 Hours Online : ${device.is24h}\n  ├ OS Version : ${device.phone.os_version}\n  └ Build Number : ${device.phone.os_build_number}\n\n _*Jam :*_ ${moment(t * 1000).format('HH:mm:ss')}`
					aruga.sendText(from, `*Device Info*\n${deviceinfo}\n\nPenggunaan RAM: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*\nCPU: *${os.cpus().length}*\n\nStatus :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats\n\nSpeed: ${latensi.toFixed(4)} _Second_`)
					break
				case prefix + 'setpic':
					if (!isOwnerB) return aruga.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Bot!`, id)
					if (isMedia) {
						const mediaData = await decryptMedia(message)
						const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
						await aruga.setProfilePic(imageBase64)
						aruga.sendTextWithMentions(from, `Makasih @${serial} Foto Profilenye..`)
					} else if (quotedMsg && quotedMsg.type == 'image') {
						const mediaData = await decryptMedia(quotedMsg)
						const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						await aruga.setProfilePic(imageBase64)
						aruga.sendTextWithMentions(from, `Makasih @${serial} Foto Profilenya 😘`, id)
					} else {
						aruga.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan ${prefix}setpic`, id)
					}
					break
				case prefix + 'getpic':
					if (!isGroupMsg) return aruga.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
					const texnugm = body.slice(8)
					const getnomber = await aruga.checkNumberStatus(texnugm)
					const useriq = getnomber.id.replace('@', '') + '@c.us'
					try {
						var jnck = await aruga.getProfilePicFromServer(useriq)

						aruga.sendFileFromUrl(from, jnck, `awok.jpg`, `nehh ngab`)
					} catch (err) {
						aruga.reply(from, `Tidak Ada Foto Profile!`, id)
					}
					break
				case prefix + 'tnc':
					const menus = menuId.textTnC()
					await aruga.reply(from, menus, id)
					break
				case prefix + 'help':
					const bots = `Hi ${pushname}, this is Urbae Bot, to find out the commands menu, type *${prefix}menu* , *${prefix}p*`
					await aruga.reply(from, bots, id)
					break
				case prefix + 'rbts':
					aruga.reply(from, mess.wait, id)
					aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/randomimage/batues?apikey=${dapuhyapi}`, 'img.jpg', 'nehh', id)
					break
				case prefix + 'rvidanime':
					aruga.reply(from, mess.wait, id)
					aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/anime/storyanime?apikey=${dapuhyapi}`, 'anime.mp4', '', id)
					break
				case prefix + 'rexo':
					aruga.reply(from, mess.wait, id)
					aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/randomimage/exontol?apikey=${dapuhyapi}`, 'img.jpg', 'nehh', id)
					break
				case prefix + 'rblackpink':
					aruga.reply(from, mess.wait, id)
					aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/randomimage/blekpink?apikey=${dapuhyapi}`, 'blackpink.jpg', '', id)
					break
				case prefix + 'rcitacita':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://h4ck3rs404-api.herokuapp.com/api/cita-cita?apikey=${hackapi}`, 'citacita.mp3', '', id)
					break
				case prefix + 'ceritahorror':
				case prefix + 'ceritahoror':
					aruga.reply(from, mess.wait, id)
					axios.get(`http://lolhuman.herokuapp.com/api/ceritahoror?apikey=${lolhuman}`)
						.then(async (res) => {
							const becapt = `*Judul:* ${res.data.result.title}\n*Desk:* ${res.data.result.desc}\n*Cerita:* ${res.data.result.story}`
							await aruga.sendFileFromUrl(from, res.data.result.thumbnail, 'thumb.jpg', becapt, id)
								.catch(() => {
									aruga.reply(from, 'Server sedang maintenance atau apikey sudah limit', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'ceritahorror2':
				case prefix + 'ceritahoror2':
				case prefix + 'ceritaseram':
				case prefix + 'ceritahantu':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://leyscoders-api.herokuapp.com/api/cerita-horor?apikey=${leysapi}`)
						.then(async (res) => {
							const titlehor = res.data.result.title
							const deschor = res.data.result.desc
							const storor = res.data.result.story
							aruga.reply(from, `*Judul:* ${titlehor}\n*Desk:* ${deschor}\n\n*Cerita:* ${storor}`, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Terjadi kesalahan, silahkan coba ulangi', id)
								})
						})
					break
				case prefix + 'runtime':
					aruga.reply(from, `*Bot has been active for ${cts}*`, id)
					break
				case prefix + 'eval':
				case prefix + 'ev':
					if (!isOwner) return await aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Owner!', id)
					if (!q) return await aruga.reply(from, 'Masukkan kode Javascript!', id)
					try {
						let evaled = await eval(q)
						if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					} catch (err) {
						console.error(err)
						aruga.reply(from, 'Kode Js salah', id)
					}
					break
				case prefix + 'p':
				case prefix + 'start':
				case prefix + 'menu':
					const jame = moment(t * 1000).format('HH:mm:ss')
					const pictrand = menupict[Math.floor(Math.random() * (menupict.length))]
					aruga.sendFileFromUrl(from, pictrand, 'image.jpg', menuId.help(prefix, jame, betime, prem, blockNumber, banned, cts, waver), id)
						.then(() => ((isGroupMsg) && (isGroupAdmins)) ? aruga.sendText(from, `Menu Admin Grup: *${prefix}menuadmin*`) : null)
					break
				case prefix + 'menuadmin':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Gagal, inget lu itu Member bukan Admin', id)
					const php4 = 'https://i.ibb.co/mHPkCRh/1.jpg'
					await aruga.sendFileFromUrl(from, php4, 'image.jpg', menuId.admin(prefix), id)
					break
				case prefix + 'kodebahasa':
					const kodbhs = menuId.kodebahasa()
					aruga.reply(from, kodbhs, id, true)
					break
				case prefix + 'kodenuklir':
					const benuk = menuId.kodenuklir()
					await aruga.sendText(from, benuk, id, true)
					break
				case prefix + 'donate':
				case prefix + 'donasi':
					const inidonate = menuId.textDonasi()
					await aruga.sendText(from, inidonate, id, true)
					break
				case prefix + 'tod':
					aruga.reply(from, `Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang diberikan.\n\nSilahkan Pilih:\n➥ ${prefix}truth\n➥ ${prefix}dare`, id)
					break
				case prefix + 'rneko':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://api.i-tech.id/anim/nsfwneko?key=6QZWVa-fzRgRY-95xAOH-fspd5y-7eJOkQ`).then(res => {
						aruga.sendFileFromUrl(from, res.data.result, '', '', id)
					})
					break
				case prefix + 'truth':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa digunakan didalam grup!', id)
					fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/truth.txt')
						.then(res => res.text())
						.then(body => {
							let truthx = body.split('\n')
							let truthz = truthx[Math.floor(Math.random() * truthx.length)]
							aruga.reply(from, truthz, id)
						})
						.catch(() => {
							aruga.reply(from, 'Hayolohhh, ada yang error!!', id)
						})
					break
				case prefix + 'dare':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa digunakan didalam grup!', id)
					fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/dare.txt')
						.then(res => res.text())
						.then(body => {
							let darex = body.split('\n')
							let darez = darex[Math.floor(Math.random() * darex.length)]
							aruga.reply(from, darez, id)
						})
						.catch(() => {
							aruga.reply(from, 'Hayolohhh, ada yang error!!', id)
						})
					break
				case prefix + 'citacita'://Piyobot
					if (!isGroupMsg) return aruga.reply(from, menuId.textPrem())
					fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
						.then(res => res.text())
						.then(body => {
							let cita = body.split('\n')
							let raya = cita[Math.floor(Math.random() * cita.length)]
							aruga.sendFileFromUrl(from, raya, 'citacita.mp3', id)
								.then(() => console.log('Success sending cita'))
						})
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'kbbi':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari suatu kata dari Kamus Besar Bahasa Indonesia (KBBI)\nketik: ${prefix}kbbi [kata]`, id)
					const kbbip = body.slice(6)
					const kbbis = await rugaapi.kbbi(kbbip)
					await aruga.reply(from, kbbis, id)
						.catch(() => {
							aruga.reply(from, 'ada yang error!!', id)
						})
					break
				case prefix + 'marvel':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}marvel teks1 teks2\nContoh: ${prefix}marvel Urbaee Xyz`, id)
					aruga.reply(from, mess.wait, id)
					const textmar1 = args[0]
					const textmar2 = args[1]
					aruga.sendFileFromUrl(from, `https://zenzapi.xyz/api/textpro/marvel?text=${textmar1}&text2=${textmar2}&apikey=${zenzapi}`, '', id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'blackpink':
					if (args.length == 0) return aruga.reply(from, `kirim perintah ${prefix}blackpink nama`, id)
					aruga.reply(from, mess.wait, id)
					const bpk = body.slice(11)
					aruga.sendFileFromUrl(from, `https://zenzapi.xyz/api/textpro/blackpink?text=${bpk}&apikey=${zenzapi}`, `${bpk}.jpg`, `nehh ngab`, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'glowtext':
					if (args.length == 0) return aruga.reply(from, `kirim perintah ${prefix}logoff [nama]`, id)
					aruga.reply(from, mess.wait, id)
					const srhdah = body.slice(10)
					aruga.sendFileFromUrl(from, `https://api.vhtear.com/glowtext?text=${srhdah}&apikey=${vhtearkey}`, `${srhdah}.jpg`, `nehh ngab`, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'logoff':
					if (args.length == 0) return aruga.reply(from, `kirim perintah ${prefix}logoff [nama]`, id)
					aruga.reply(from, mess.wait, id)
					const jadiin = body.slice(8)
					aruga.sendFileFromUrl(from, `https://api.zeks.me/api/epep?apikey=${apikeyvinz}&text=${jadiin}`, `${jadiin}.jpg`, 'nehh ngab...', id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'logoph':
					if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}logoph  Teks1 Teks2 ]*,\n\n contoh : *${prefix}logoph Urbaee Xyz*`, id)
					const lpornhub = args[0]
					const lpornhub2 = args[1]
					if (lpornhub > 10) return aruga.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
					if (lpornhub2 > 10) return aruga.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
					aruga.sendFileFromUrl(from, `https://zenzapi.xyz/api/textpro/pornhub?text=${lpornhub}&text2=${lpornhub2}&apikey=${zenzapi}`, '', '', id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				// Level [BETA] by Slavyan
				case prefix + 'level':
					if (!isLevelingOn) return await aruga.reply(from, 'Fitur leveling belum aktif di grup ini!', id)
					if (!isGroupMsg) return await aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					const userLevel = level.getLevelingLevel(sender.id, _level)
					const userXp = level.getLevelingXp(sender.id, _level)
					const ppLink = await aruga.getProfilePicFromServer(serial)
					if (ppLink === 'ERROR: 401') {
						var pepe = errorImg
					} else {
						pepe = ppLink
					}
					const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
					const rank = new canvas.Rank()
						.setAvatar(pepe)
						.setLevel(userLevel)
						.setLevelColor('#ffa200', '#ffa200')
						.setRank(Number(level.getUserRank(sender.id, _level)))
						.setCurrentXP(userXp)
						.setOverlay('#000000', 100, false)
						.setRequiredXP(requiredXp)
						.setProgressBar('#ffa200', 'COLOR')
						.setBackground('COLOR', '#000000')
						.setUsername(pushname)
						.setDiscriminator(sender.id.substring(6, 10))
					rank.build()
						.then(async (buffer) => {
							const imageBase644 = `data:image/png;base64,${buffer.toString('base64')}`
							await aruga.sendImage(from, imageBase644, 'rank.png', '', id)
						})
						.catch(async (err) => {
							console.error(err)
							await aruga.reply(from, 'Error!', id)
						})
					break
				case prefix + 'leveling':
					if (!isGroupMsg) return await aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					if (!isGroupAdmins) return await aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Admin Grup!', id)
					if (args[0] === 'on') {
						if (_leveling.includes(groupId)) return aruga.reply(from, 'Fitur leveling sudah diaktifkan pada grup ini sebelumnya', id)
						_leveling.push(groupId)
						fs.writeFileSync('./lib/database/group/leveling.json', JSON.stringify(_leveling))
						await aruga.reply(from, 'Fitur Leveling berhasil diaktifkan didalam grup ini', id)
					} else if (args[0] === 'off') {
						var thisgroup = _leveling.indexOf(groupId)
						_leveling.splice(thisgroup, 1)
						fs.writeFileSync('./lib/database/group/leveling.json', JSON.stringify(_leveling))
						await aruga.reply(from, 'Fitur Leveling berhasil dinonaktifkan didalam grup ini', id)
					} else {
						await aruga.reply(from, 'Pilih on atau off admin cakep', id)
					}
					break
				case prefix + 'leaderboard':
					if (!isGroupMsg) return await aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					const resp = _level
					_level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
					let leaderboard = '*── 「 LEADERBOARDS 」 ──*\n\n'
					try {
						for (let i = 0; i < 10; i++) {
							var roles = 'Copper V'
							if (resp[i].level >= 5) {
								roles = 'Copper IV'
							} else if (resp[i].level >= 10) {
								roles = 'Copper III'
							} else if (resp[i].level >= 15) {
								roles = 'Copper II'
							} else if (resp[i].level >= 20) {
								roles = 'Copper I'
							} else if (resp[i].level >= 25) {
								roles = 'Silver V'
							} else if (resp[i].level >= 30) {
								roles = 'Silver IV'
							} else if (resp[i].level >= 35) {
								roles = 'Silver III'
							} else if (resp[i].level >= 40) {
								roles = 'Silver II'
							} else if (resp[i].level >= 45) {
								roles = 'Silver I'
							} else if (resp[i].level >= 50) {
								roles = 'Gold V'
							} else if (resp[i].level >= 55) {
								roles = 'Gold IV'
							} else if (resp[i].level >= 60) {
								roles = 'Gold III'
							} else if (resp[i].level >= 65) {
								roles = 'Gold II'
							} else if (resp[i].level >= 70) {
								roles = 'Gold I'
							} else if (resp[i].level >= 75) {
								roles = 'Platinum V'
							} else if (resp[i].level >= 80) {
								roles = 'Platinum IV'
							} else if (resp[i].level >= 85) {
								roles = 'Platinum III'
							} else if (resp[i].level >= 90) {
								roles = 'Platinum II'
							} else if (resp[i].level >= 95) {
								roles = 'Platinum I'
							} else if (resp[i].level > 100) {
								roles = 'Exterminator'
							}
							leaderboard += `${i + 1}. wa.me/${_level[i].id.replace('@c.us', '')}\n➸ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n➸ *Role*: ${roles}\n\n`
						}
						await aruga.reply(from, leaderboard, id)
					} catch (err) {
						console.error(err)
						await aruga.reply(from, 'Perlu setidaknya *10* user yang memiliki level di database!', id)
					}
					break
				case prefix + 'slightning':
					if (isMedia && type === 'image') {
						const mediaData = await decryptMedia(message, uaOverride)
						const getUrle = await uploadImages(mediaData, false)
						const imgnye = await stickerlight(getUrle)
						const Slight = imgnye.result.imgUrl
						await aruga.sendStickerfromUrl(from, Slight)
					} else if (quotedMsg && quotedMsg.type == 'image') {
						const mediaData = await decryptMedia(quotedMsg, uaOverride)
						const getUrle = await uploadImages(mediaData, false)
						const imgnye = await stickerlight(getUrle)
						const Slight = imgnye.result.imgUrl
						await aruga.sendStickerfromUrl(from, Slight)
					} else {
						await aruga.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerlightning`, id)
					}
					break
				case prefix + 'sfire':
				case prefix + 'stickerfire':
					if (isMedia && type === 'image') {
						const mediaData = await decryptMedia(message, uaOverride)
						const getUrli = await uploadImages(mediaData, false)
						const imgnya = await stickerburn(getUrli)
						const Sfire = imgnya.result.imgUrl
						await aruga.sendStickerfromUrl(from, Sfire)
					} else if (quotedMsg && quotedMsg.type == 'image') {
						const mediaData = await decryptMedia(quotedMsg, uaOverride)
						const getUrli = await uploadImages(mediaData, false)
						const imgnya = await stickerburn(getUrli)
						const Sfire = imgnya.result.imgUrl
						await aruga.sendStickerfromUrl(from, Sfire)
					} else {
						await aruga.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan ${prefix}stickerfire`, id)
					}
					break
				case prefix + 'thunder':
					if (args.length === 1) return aruga.reply(from, `Kirim perintah *${prefix}thunder [ Teks ]*, contoh *${prefix}thunder Tobz*`, id)
					aruga.reply(from, mess.wait, id)
					const thndr = body.slice(9)
					if (thndr.length > 10) return aruga.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
					await aruga.sendFileFromUrl(from, `https://api.vhtear.com/thundertext?text=${thndr}&apikey=${vhtearkey}`, 'thndr.jpg', '', id)
					break

				case prefix + 'tebakgambar':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					try {
						const resp = await axios.get('https://zahirr-web.herokuapp.com/api/kuis/tebakgambar?apikey=zahirgans')
						if (resp.data.error) return aruga.reply(from, resp.data.error, id)
						const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
						aruga.sendFileFromUrl(from, resp.data.result.images, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
						aruga.sendText(from, `30 Detik Lagi...`, id)
						await sleep(10000)
						aruga.sendText(from, `20 Detik Lagi...`, id)
						await sleep(10000)
						aruga.sendText(from, `10 Detik Lagi...`, id)
						await sleep(10000)
						aruga.reply(from, jwban, id)
					} catch (err) {
						console.error(err.message)
						await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
					}
					break
				case prefix + 'caklontong':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					try {
						const resp = await axios.get('https://api.vhtear.com/funkuis&apikey=' + vhtearkey)
						if (resp.data.error) return aruga.reply(from, resp.data.error, id)
						const anm2 = `➸ Soal : ${resp.data.result.soal}\n\n➸ Poin : ${resp.data.result.poin}`
						const jwban = `➸ Jawaban : ${resp.data.result.jawaban}\n\n➸ Deskripsi : ${resp.data.result.desk}`
						aruga.reply(from, anm2, id)
						aruga.sendText(from, `30 Detik Lagi...`, id)
						await sleep(10000)
						aruga.sendText(from, `20 Detik Lagi...`, id)
						await sleep(10000)
						aruga.sendText(from, `10 Detik Lagi...`, id)
						await sleep(10000)
						aruga.reply(from, jwban, id)
					} catch (err) {
						console.error(err.message)
						await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
					}
					break
				case prefix + 'ownerbot':
				case prefix + 'owner':
					await aruga.sendContact(from, ownerNumber)
					break
				case prefix + 'maps':
					if (!isGroupAdmins) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam grup!', id)
					rugaapi.maps()
						.then(async (res) => {
							await aruga.reply(from, `${res}`, id)
						})
					break
				case prefix + 'wallpaper':
					aruga.reply(from, mess.wait, id);
					axios.get('https://akaneko-api.herokuapp.com/api/mobileWallpapers').then(res => {
						aruga.sendFileFromUrl(from, res.data.url, 'Desktop Wallpaper.jpeg', 'Enjoy :>', id);
					});
					break
				case prefix + 'loli':
					aruga.reply(from, mess.wait, id);
					aruga.sendFileFromUrl(from, `https://lindow-api.herokuapp.com/api/loli?apikey=${lindowapi}`, 'loli.jpg', '', id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'error', id)
						})
					break
				case prefix + 'autosticker':
				case prefix + 'autostiker':
				case prefix + 'autostik':
					if (args.length == 0) return aruga.reply(from, `Pilih enable atau disable`, id)
					if (args[0] === 'enable') {
						if (isAutoStikerOn) return await aruga.reply(from, 'Fitur auto stiker sudah diaktifkan', id)
						_autostiker.push(chat.id)
						fs.writeFileSync('./lib/helper/autosticker.json', JSON.stringify(_autostiker))
						await aruga.reply(from, 'Fitur autosticker berhasil diaktifkan', id)
					} else if (args[0] === 'disable') {
						_autostiker.splice(chat.id, 1)
						fs.writeFileSync('./lib/helper/autosticker.json', JSON.stringify(_autostiker))
						await aruga.reply(from, 'Fitur autostiker berhasil dinonaktifkan', id)
					} else {
						await aruga.reply(from, 'Format salah', id)
					}
					break
				case prefix + 'neko':
					try {
						aruga.reply(from, mess.wait, id)
						axios.get('https://akaneko-api.herokuapp.com/api/neko').then(res => {
							aruga.sendFileFromUrl(from, res.data.url, 'neko.jpeg', 'Neko *Nyaa*~');
							aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
						});
					} catch (err) {
						console.log(err);
						throw (err);
					};
					break
				case prefix + 'boobs':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/boobs').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, '', 'bakaaa hentaii>~<');
						aruga.sendFileFromUrl(from, res.data.url, StickerMetadata)
					});
					break
				case prefix + 'gifhentai':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/Random_hentai_gif').then(res => {
						aruga.sendFileFromUrl(from, res.data.url, '', '', id)
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					});
					break
				case prefix + 'bjanime':
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					const sblow = await axios.get(`https://tobz-api.herokuapp.com/api/nsfwblowjob?&apikey=${tobzapi}`)
					const rblow = sblow.data
					const giftub = rblow.result
					aruga.sendStickerfromUrl(from, giftub, `RandoBlow.gif`, 'Random Blowjob!', id)
					break
				case prefix + 'pussy':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/pussy').then(res => {
						aruga.sendFileFromUrl(from, res.data.url, '', '', id)
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					});
					break
				case prefix + 'rhentai':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/Random_hentai_gif').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					});
					break
				case prefix + 'kissgif':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/kiss').then(res => {
						const mp4 = res.data.url
						aruga.sendStickerfromUrl(from, mp4, StickerMetadata)
					});
					break
				case prefix + 'sologif':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/solog').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'anal':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/anal').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'feetgif':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/feetg').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'ttgif':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/boobs').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'cumgif':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/cum').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					});
					break
				case prefix + 'bjgif':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/bj').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata);
					});
					break
				case prefix + 'nsfwgif':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/nsfw_neko_gif').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata);
					});
					break
				case prefix + 'waifu':
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/waifu').then(res => {
						aruga.sendFileFromUrl(from, res.data.url, '', 'Waifu UwU', id);
					});
					break
				case prefix + 'slap':
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/slap').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'rhug':
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/hug').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata);
					});
					break
				case prefix + 'animeavatar':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/avatar').then(res => {
						aruga.sendFileFromUrl(from, res.data.url, 'Avatar UwU');
					});
					break
				case prefix + 'nekonsfw':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/nsfw_neko_gif').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'lesbian':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/les').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'wallpaper2':
					aruga.reply(from, mess.wait, id);
					axios.get('https://akaneko-api.herokuapp.com/api/wallpapers').then(res => {
						aruga.sendFileFromUrl(from, res.data.url, 'Desktop Wallpaper.jpeg', 'Enjoy :>', id);
					});
					break
				case prefix + 'baka':
					aruga.reply(from, mess.wait, id);
					axios.get('https://nekos.life/api/v2/img/baka').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'aesthetic':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://api.zeks.xyz/api/estetikpic?apikey=${apikeyvinz}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result.result, 'img.jpg', 'nihh pict estetiknya', id)
								.catch(() => {
									aruga.reply(from, 'Error', id)
								})
						})
						.catch((err) => {
							aruga.reply(from, err, id)
						})
					break
				case prefix + 'antilink':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Wahai admin, jadikan saya sebagai admin grup dahulu :)', id)
					if (args[0] == 'on') {
						var cek = antilink.includes(chatId);
						if (cek) {
							return aruga.reply(from, '*Anti Group Link Detector* sudah aktif di grup ini', id) //if number already exists on database
						} else {
							antilink.push(chatId)
							fs.writeFileSync('./lib/helper/antilink.json', JSON.stringify(antilink))
							aruga.reply(from, '*[Anti Group Link]* telah di aktifkan\nSetiap member grup yang mengirim pesan mengandung link grup akan di kick oleh bot!', id)
						}
					} else if (args[0] == 'off') {
						var cek = antilink.includes(chatId);
						if (!cek) {
							return aruga.reply(from, '*Anti Group Link Detector* sudah non-aktif di grup ini', id) //if number already exists on database
						} else {
							let nixx = antilink.indexOf(chatId)
							antilink.splice(nixx, 1)
							fs.writeFileSync('./lib/helper/antilink.json', JSON.stringify(antilink))
							aruga.reply(from, '*[Anti Group Link]* telah di nonaktifkan\n', id)
						}
					} else {
						aruga.reply(from, `pilih on / off\n\n*[Anti Group Link]*\nSetiap member grup yang mengirim pesan mengandung link grup akan di kick oleh bot!`, id)
					}
					break
				case prefix + 'inv':
				case prefix + 'invite':
					var qmoed = quotedMsgObj.sender.id
					if (!isGroupMsg) return aruga.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
					if (!isGroupAdmins) return aruga.reply(from, `Perintah ini hanya bisa di gunakan oleh admin group`, id)
					if (!isBotGroupAdmins) return aruga.reply(from, `Perintah ini hanya bisa di gunakan ketika bot menjadi admin`, id)
					try {
						await aruga.addParticipant(from, qmoed)
					} catch {
						aruga.reply(from, mess.error.Ad, id)
					}
					break
				case prefix + 'tag':
					if (!isGroupMsg) return aruga.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
					if (!args.length >= 1) return await aruga.reply(from, 'pesan tidak boleh kosong', id); {
						const text = body.slice(5)
						const mem = groupMembers
						const randMem = mem[Math.floor(Math.random() * mem.length)];
						const sapa = `${text} 👉 @${randMem}`
						await aruga.sendTextWithMentions(from, sapa)
					}
					break
				case prefix + 'ava':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa diugnakan di dalam grup', id)
					if (!quotedMsg) return aruga.reply(from, 'Quote/reply pesan seseorang yang akan di download fotonya!!', id)
					try {
						const dp = await aruga.getProfilePicFromServer(quotedMsgObj.sender.id)
						if (dp == undefined) {
							var pfp = aruga.reply(from, 'Dia ini pemalu, mungkin sedang depresi tidak berani memasang foto profil', id)
						} else {
							var pfp = aruga.sendFileFromUrl(from, dp, 'profile.png')
						}
					} catch {
						aruga.reply(from, 'Tidak ada foto profil/private', id)
					}
					break
				case prefix + 'mystat': {
					const userid = sender.id
					const ban = banned.includes(userid)
					const blocked = await aruga.getBlockedIds()
					const isblocked = blocked.includes(userid)
					const myLevel = level.getLevelingLevel(userid, _level)
					const exp = level.getLevelingXp(userid, _level)
					const ct = await aruga.getContact(userid)
					const isOnline = await aruga.isChatOnline(userid) ? '✔' : '❌'
					var sts = await aruga.getStatus(userid)
					const bio = sts
					const premuser = prem.includes(userid) ? 'Premium' : 'Free'
					const admins = groupAdmins.includes(userid) ? 'Admin' : 'Member'
					var found = false
					Object.keys(pengirim).forEach((i) => {
						if (pengirim[i].id == userid) {
							found = i
						}
					})
					var adm = admins
					if (ct == null) {
						return await aruga.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id)
					} else {
						const contact = ct.pushname
						const dp = await aruga.getProfilePicFromServer(userid)
						const pictrand2 = menupict[Math.floor(Math.random() * (menupict.length))]
						if (dp == 'ERROR: 401') {
							var pfp = pictrand2
						} else {
							var pfp = dp
						}
						if (contact == undefined) {
							var nama = 'gada namanya, mungkin wibu'
						} else {
							var nama = contact
						}
						const caption = `*Detail Member* ✨ \n\n● *Name :* ${nama}\n● *Bio :* ${bio.status}\n● *Level :* ${myLevel}\n● *Xp :* ${exp}\n● *Chat link :* wa.me/${sender.id.replace('@c.us', '')}\n● *Premium :* ${premuser}\n● *Role :* ${adm}\n● *Banned by Bot :* ${ban ? '✔' : '❌'}\n● *Blocked by Bot :* ${isblocked ? '✔' : '❌'}\n● *Chat with bot :* ${isOnline}`
						aruga.sendFileFromUrl(from, pfp, 'dp.jpg', caption, id)
					}
				}
					break
				case prefix + 'jadian':
					if (!isGroupMsg) return aruga.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
					const mem = groupMembers
					const aku = mem[Math.floor(Math.random() * mem.length)];
					const kamu = mem[Math.floor(Math.random() * mem.length)];
					const sapa = `Cieee... @${aku.replace(/[@c.us]/g, '')} (💘) @${kamu.replace(/[@c.us]/g, '')} baru jadian nih\nBagi pj nya dong`
					await aruga.sendTextWithMentions(from, sapa)
					break

				case prefix + 'resend':
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, Fitur ini hanya bisa digunakan oleh Admin', id)
					if (quotedMsgObj) {
						let encryptMedia
						let replyOnReply = await aruga.getMessageById(quotedMsgObj.id)
						let obj = replyOnReply.quotedMsgObj
						if (/ptt|audio|video|image|document|sticker/.test(quotedMsgObj.type)) {
							encryptMedia = quotedMsgObj
							if (encryptMedia.animated) encryptMedia.mimetype = ''
						} else if (obj && /ptt|text|audio|video|image/.test(obj.type)) {
							encryptMedia = obj
						} else return
						const _mimetype = encryptMedia.mimetype
						const mediaData = await decryptMedia(encryptMedia)
						await aruga.sendFile(from, `data:${_mimetype};base64,${mediaData.toString('base64')}`, 'file', ':)', encryptMedia.id)
					} else if (quotedMsgObj) {
						let encryptMedia
						let reponr = await aruga.getMessageById(quotedMsgObj.id)
						let obj = reponr.quotedMsgObj
						if (/sticker/.test(quotedMsgObj.type)) {
							encryptMedia = quotedMsgObj
							if (encryptMedia.animated) encryptMedia.mimetype = ''
						} else if (obj && /sticker/.test(obj.type)) {
							encryptMedia = obj
						} else return
						const _mimetype = encryptMedia.mimetype
						const mediaData = await decryptMedia(encryptMedia)
						await aruga.sendImageAsSticker(from, `data:${_mimetype};base64,${mediaData.toString('base64')}`, StickerMetadata)
					} else aruga.reply(from, 'reply pesannya dong', id)
					break
				case prefix + 'pictcogan':
					const cogan = fs.readFileSync('./lib/helper/cogan.json')
					const coganin = JSON.parse(cogan)
					const rondom = Math.floor(Math.random() * coganin.length)
					const ahha = coganin[rondom]
					aruga.sendFile(from, ahha, 'cogan.jpg', 'nehh cogan', id)
					break
				case prefix + 'pictcecan':
					const cecan = fs.readFileSync('./lib/helper/cecan.json')
					const cecanin = JSON.parse(cecan)
					const random2 = Math.floor(Math.random() * cecanin.length)
					const ahhayu = cecanin[random2]
					aruga.sendFile(from, ahhayu, 'img.jpg', 'nehh cecan', id)
					break
				case prefix + 'amel':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					const andani = fs.readFileSync('./lib/amelia.json')
					const amel = JSON.parse(andani)
					const randum = Math.floor(Math.random() * amel.length)
					const uwoyy = amel[randum]
					aruga.sendImage(from, uwoyy.image, 'Amel.jpg', uwoyy.teks, id)
					break
				case prefix + 'bokep': // MFARELS
				case prefix + 'randombokep': // MFARELS
				case prefix + 'bkp': // MFARELS
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					const mskkntl = fs.readFileSync('./lib/18+.json') // MFARELS
					const kntlnya = JSON.parse(mskkntl) // MFARELS
					const rindBkp = Math.floor(Math.random() * kntlnya.length) // MFARELS
					const rindBkep = kntlnya[rindBkp] // MFARELS
					aruga.reply(from, rindBkep.teks, id) // MFARELS
					break
				case prefix + 'join':
					if (args.length == 0) return aruga.reply(from, `Jika kalian ingin mengundang bot kegroup silahkan invite atau dengan\nketik ${prefix}join [link group]`, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, `Chat owner buat joinin`, id)
					let linkgrup = body.slice(6)
					let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
					let chekgrup = await aruga.inviteInfo(linkgrup)
					if (!islink) return aruga.reply(from, 'Maaf link group-nya salah! silahkan kirim link yang benar', id)
					if (isPrem) {
						await aruga.joinGroupViaLink(linkgrup)
							.then(async () => {
								await aruga.sendText(from, 'Berhasil join grup via link!')
								await aruga.sendText(chekgrup.id, `what up y'all , I'm Urbae Bot. To find out the commands on this Bot type ${prefix}menu`)
							})
					} else {
						let cgrup = await aruga.getAllGroups()
						if (cgrup.length > groupLimit) return aruga.reply(from, `Sorry, the group on this bot is full\nMax Group is: ${groupLimit}`, id)
						if (cgrup.size < memberLimit) return aruga.reply(from, `Sorry, Bot wil not join if the group members do not exceed ${memberLimit} people`, id)
						await aruga.joinGroupViaLink(linkgrup)
							.then(async () => {
								await aruga.reply(from, 'Berhasil join grup via link!', id)
							})
							.catch(() => {
								aruga.reply(from, 'Gagal!', id)
							})
					}
					break
				case prefix + 'wattpadstory':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari cerita dari wattpad! Gunakan ${prefix}wattpadstory url story\nContoh : ${prefix}wattpadstory https://www.wattpad.com/story/226120582-my-teacher-levi-x-student-reader`, id)
					const wpstry = body.slice(14)
					aruga.reply(from, mess.wait, id)
					try {
						const datplai = await axios.get(`pstry}`)
						const datplay = datplai.data
						let wtpdst = `*「 WATTPAD STORY 」*\n\n*A U T H O R :* ${datplai.data.author.name}\n`
						for (let i = 0; i < datplay.parts.length; i++) {
							wtpdst += `\n─────────────────\n\n• *Judul :* ${datplai.data.title}\n*•Dibaca :* ${datplai.data.reads}\n• *Votes :* ${datplai.data.votes}\n• *Jumlah Episode :* ${datplai.data.parts_count}\n• *Deskripsi :* ${datplai.data.desc}\n\n`
							wtpdst += `• *Title :* ${datplay.parts[i].title}\n• *URL :* ${datplay.parts[i].url}\n`
						}
						await aruga.sendFileFromUrl(from, datplay.thumb, 'image.jpg', wtpdst, id)
					} catch (err) {
						console.log(err)
					}
					break
				case prefix + 'youwatch':
					if (args.length == 0) return aruga.reply(from, `Mencari sebuah film drakor dari website You Watch!\nContoh : ${prefix}youwatch vagabond`, id)
					await aruga.reply(from, mess.wait, id)
					const youwatchsr = body.slice(10)
					const dataurl = await axios.get(`https://bx-hunter.herokuapp.com/api/youwatchsearch?text=${youwatchsr}&apikey=${bxhunter}`)
					const dataapi = dataurl.data
					const resultdata = dataapi.data
					let ywtch = `*「 Y O U W A T C H 」*`
					for (let i = 0; i < resultdata.length; i++) {
						ywtch += `\n─────────────────\n\n• *Judul:* ${resultdata[i].title}\n• *Kategori:* ${resultdata[i].category}\n• *Url:* ${resultdata[i].source}\n`
					}
					await aruga.sendFileFromUrl(from, resultdata[0].image, 'img.jpg', ywtch, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'shopee':
					if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}shopee [ Query ]*, Contoh : *${prefix}shopee HP Samsul a20*`, id)
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
					const shopek = body.slice(8)
					aruga.reply(from, mess.wait, id)
					try {
						const dataplai = await axios.get(`https://api.vhtear.com/shopee?query=${shopek}&count=5&apikey=${vhtearkey}`)
						const dataplay = dataplai.data.result
						let shopeq = `*「 SHOPEE 」*\n\n*Hasil Pencarian : ${shopek}*\n`
						for (let i = 0; i < dataplay.items.length; i++) {
							shopeq += `\n─────────────────\n\n• *Nama* : ${dataplay.items[i].nama}\n• Harga* : ${dataplay.items[i].harga}\n• *Terjual* : ${dataplay.items[i].terjual}\n• *Lokasi Toko* : ${dataplay.items[i].shop_location}\n• *Deskripsi* : ${dataplay.items[i].description}\n• *Link Product : ${dataplay.items[i].link_product}*\n`
						}
						await aruga.sendFileFromUrl(from, dataplay.items[0].image_cover, `shopee.jpg`, shopeq, id)
					} catch (err) {
						console.log(err)
					}
					break
				case prefix + 'cuaca':
					if (args.length == 0) return aruga.reply(from, `Untuk melihat cuaca pada suatu daerah\nketik: ${prefix}cuaca kab/kota nama kota/kab\nContoh Kabupaten: ${prefix}cuaca kab Bengkayang\nContoh Kota: ${prefix}cuaca kota Pontianak`, id)
					const cuacaq = body.slice(7)
					aruga.reply(from, mess.wait, id)
					try {
						const cuca = await axios.get(`https://urbaee-xyz.herokuapp.com/api/cuaca?kabupaten=${cuacaq}&apikey=Urbaeexyz`)
						const cucaq = cuca.data.result
						const nama2 = cucaq.nama2
						let cuacaqi = `*「 Info Cuaca 」*`
						for (let i = 0; i < cucaq.data.length; i++) {
							cuacaqi += `\n─────────────────\n\n• *Nama:* ${nama2}\n• *Cuaca:* ${cucaq.data[i].cuaca}\n• *Waktu:* ${cucaq.data[i].waktu}\n• *Kelembapan*: ${cucaq.data[i].kelembaban}\n• *Temperatur Celcius:* ${cucaq.data[i].temperatur.celsius}\n• *Temperatur Fahrenheit:* ${cucaq.data[i].temperatur.fahrenheit}\n\n`
						}
						await aruga.reply(from, cuacaqi, id)
							.catch(() => {
								aruga.reply(from, 'Maaf, daerah yang anda cari tidak tersedia')
							})
					} catch (err) {
						aruga.reply(from, 'Maaf, daerah yang kamu cari tidak tersedia', id)
						console.log(err)
					}
					break
				case prefix + 'doaharian':
					aruga.reply(from, mess.wait, id)
					try {
						const dataplaw = await axios.get(`https://urbaee-xyz.herokuapp.com/api/muslim/doaharian?apikey=Urbaeexyz`)
						const dataplax = dataplaw.data.result
						let harian = `*「 DOA HARIAN 」*`
						for (let i = 0; i < dataplax.data.length; i++) {
							harian += `\n─────────────────\n\n• *Judul Doa:* ${dataplax.data[i].title}\n• *Arab:* ${dataplax.data[i].arabic}\n• *Latin:* ${dataplax.data[i].latin}\n• *Arti:* ${dataplax.data[i].translation}\n\n`
						}
						await aruga.reply(from, harian, id)
					} catch (err) {
						aruga.reply(from, 'Error', id)
						console.log(err)
					}
					break
				case prefix + 'playstore':
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
					if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}playstore [ Query ]*, Contoh : *${prefix}playstore Mobile Legends*`)
					const keywotp = body.slice(11)
					aruga.reply(from, mess.wait, id)
					try {
						const dataplai = await axios.get(`https://api.vhtear.com/playstore?query=${keywotp}&apikey=${vhtearkey}`)
						const dataplay = dataplai.data
						let keluarplay = `*「 PLAYSTORE 」*\n\nHasil Pencarian : ${keywotp}*\n`
						for (let i = 0; i < dataplay.result.length; i++) {
							keluarplay += `\n─────────────────\n\n• *Nama* : ${dataplay.result[i].title}\n• *Developer* : ${dataplay.result[i].developer}\n• *Deskripsi* : ${dataplay.result[i].description}\n• *Paket ID* : ${dataplay.result[i].app_id}\n• *Harga* : ${dataplay.result[i].price}\n• *Link App* : https://play.google.com${dataplay.result[i].url}\n`
						}
						await aruga.sendFileFromUrl(from, dataplay.result[0].icon, `iconapk.webp`, keluarplay, id)
					} catch (err) {
						console.log(err)
					}
					break
				case prefix + 'reportbug':
					aruga.reply(from, mess.wait, id)
					const reporter = body.slice(11)
					await aruga.sendText(ownerNumber, `Laporan bug dari : *${pushname}*\nNomor : ${serial.replace('@c.us', '')}\n\nBug : *${reporter}*`)
					aruga.reply(from, 'Laporan berhasil dikirim ke Owner Bot!', id)
					break
				case prefix + 'setgroupname':
					if (!isGroupMsg) return aruga.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
					if (!isGroupAdmins) return aruga.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
					if (!isBotGroupAdmins) return aruga.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
					const namagrup = body.slice(14)
					const sebelum = chat.groupMetadata.gcok
					let halaman = global.page ? global.page : await aruga.getPage()
					await halaman.evaluate((chatId, subject) =>
						Store.WapQuery.changeSubject(chatId, subject), groupId, `${namagrup}`)
					aruga.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us', '')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
					break
				case prefix + 'setname':
					if (!isOwnerB) return aruga.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Bot!`, id)
					const setnem = body.slice(9)
					await aruga.setMyName(setnem)
					aruga.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us', '')} 😘`)
					break
				case prefix + 'read':
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
					if (!quotedMsg) return aruga.reply(from, `Tolong Reply Pesan Bot`, id)
					if (!quotedMsgObj.fromMe) return aruga.reply(from, `Tolong Reply Pesan Bot`, id)
					try {
						const reader = await aruga.getMessageReaders(quotedMsgObj.id)
						let list = ''
						for (let pembaca of reader) {
							list += `- @${pembaca.id.replace(/@c.us/g, '')}\n`
						}
						aruga.sendTextWithMentions(from, `Ngeread doangg.. Nimbrung kagaa\n${list}`)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Maaf, Belum Ada Yang Membaca Pesan Bot atau Mereka Menonaktifkan Read Receipts`, id)
					}
					break
				case prefix + 'setstatus':
					if (!isOwnerB) return aruga.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Bot!`, id)
					const setstat = body.slice(11)
					await aruga.setMyStatus(setstat)
					aruga.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us', '')} 😘`)
					break
				case prefix + 'botstat': {
					const loadedMsg = await aruga.getAmountOfLoadedMessages()
					const charged = await aruga.getIsPlugged();
					const device = await aruga.getMe();
					const deviceinfo = `- Battery Level : ${device.battery}%\n  ├ Is Charging : ${charged}\n  └ 24 Hours Online : ${device.is24h}\n  ├ OS Version : ${device.phone.os_version}\n  └ Build Number : ${device.phone.os_build_number}\n\n\n _*Jam :*_ ${moment(t * 1000).format('HH:mm:ss')}\n`
					const chatIds = await aruga.getAllChatIds()
					const groups = await aruga.getAllGroups()
					const groupsIn = groups.filter(x => x.groupMetadata.participants.map(x => [botNumber, '62895334962050@c.us'].includes(x.id._serialized)).includes(true))
					aruga.sendText(from, `*Device Info*\n${deviceinfo}\n\n\nStatus :\n- *${loadedMsg}* Loaded Messages\n- *${groupsIn.length}* Group Joined\n- *${groups.length - groupsIn.length}* Groups Left\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length - groups.length - groupsIn.length}* Personal Chats Active\n- *${chatIds.length}* Total Chats\n- *${chatIds.length - groupsIn.length}* Total Chats Active\n\n*Whatsapp Version :* ${waver}`)
					break
				}

				//Sticker Converter
				case prefix + 'whatmusic':
				case prefix + 'whatmus':
				case prefix + 'whatsong':
					if (quotedMsg && quotedMsg.type == 'audio' || quotedMsg && quotedMsg.type == 'ptt' || quotedMsg && quotedMsg.type == 'video') {
						try {
							await aruga.reply(from, mess.wait, id)
							const mediaData = await decryptMedia(quotedMsg, uaOverride)
							const detmus = await identify(mediaData)
							aruga.reply(from, `*Judul:* ${detmus.data.title}\n*Artis:* ${detmus.data.artists}\n*Album:* ${detmus.data.album}\n*Release Date:* ${detmus.data.release_date}`, id)
						} catch (err) {
							console.log(err)
							aruga.reply(from, 'Maaf, lagu tidak dapat ditemukan', id)
						}
					} else if (isMedia && type === 'video' || isMedia && type === 'mp4') {
						try {
							await aruga.reply(from, mess.wait, id)
							const mediaData = await decryptMedia(message, uaOverride)
							const detmus = await identify(mediaData)
							aruga.reply(from, `*Judul:* ${detmus.data.title}\n*Artis:* ${detmus.data.artists}\n*Album:* ${detmus.data.album}\n*Genre:* ${detmus.data.genre}\n*Release Date:* ${detmus.data.release_date}`, id)
						} catch (err) {
							console.log(err)
							aruga.reply(from, 'Maaf, lagu tidak dapat ditemukan!', id)
						}
					} else aruga.reply(from, `Post/reply audio atau video dengan caption ${whatsong}`, id)
					break
				case prefix + 'colong':
				case prefix + 'curry':
				case prefix + 'curi':
					if (quotedMsg && quotedMsg.type == 'sticker') {
						await aruga.reply(from, mess.wait, id)
						const mediaData = await decryptMedia(quotedMsg)
						const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						await aruga.sendImageAsSticker(from, imageBase64, StickerMetadata)
					} else {
						aruga.reply(from, 'Reply stikernya bang', id)
					}
					break
				case prefix + 'take':
					if (quotedMsg && quotedMsg.type == 'sticker' || quotedMsg && quotedMsg.type == 'image') {
						if (!q.includes('|')) return await aruga.reply(from, `Untuk mengubah watermark sticker, reply sticker/image dengan caption ${prefix}take package_name | author_name\n\nContoh: ${prefix}takestick PUNYA GUA | videfikri`, id)
						await aruga.reply(from, mess.wait, id)
						const packnames = q.substring(0, q.indexOf('|') - 1)
						const authors = q.substring(q.lastIndexOf('|') + 2)
						const mediaData = await decryptMedia(quotedMsg)
						const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						await aruga.sendImageAsSticker(from, imageBase64, { author: `${authors}`, pack: `${packnames}` })
							.catch(async (err) => {
								console.error(err)
								await aruga.reply(from, 'Error!', id)
							})
					} else if (isMedia && type === 'image' || isMedia && type === 'sticker') {
						await aruga.reply(from, mess.wait, id)
						const packnames = q.substring(0, q.indexOf('|') - 1)
						const authors = q.substring(q.lastIndexOf('|') + 2)
						const mediaData = await decryptMedia(message, uaOverride)
						const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
						await aruga.sendImageAsSticker(from, imageBase64, { author: `${authors}`, pack: `${packnames}` })
					} else {
						aruga.reply(from, 'format pesan salah om', id)
					}
					break
				case prefix + 'stickergiffull':
				case prefix + 'stikergiffull':
				case prefix + 'sgiffull':
					if (isMedia && type === 'video' || mimetype == 'sticker/gif') {
						aruga.reply(from, mess.wait, id)
						try {
							const mediaData = await decryptMedia(message, uaOverride)
							const vidbase = `data:${mimetype};base64,${mediaData.toString('base64')}`
							await aruga.sendMp4AsSticker(from, vidbase, gifxyz, StickerMetadata)
								.then(async () => {
									console.log(color(`Sticker Gif processed for ${processTime(t, moment())} seconds`, 'aqua'))
								})
						} catch (err) {
							console.log(err)
							aruga.reply(from, 'Durasi video terlalu panjang, mohon kecilkan sedikit\nminimal 9 detik', id)
						}
					} else if (quotedMsg && quotedMsg.type === 'sticker' || quotedMsg && quotedMsg.type === 'video') {
						aruga.reply(from, mess.wait, id)
						try {
							const mediaData = await decryptMedia(quotedMsg, uaOverride)
							const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
							await aruga.sendMp4AsSticker(from, videoBase64, gifxyz, StickerMetadata)
								.then(async () => {
									console.log(color(`Sticker Gif processed for ${processTime(t, moment())} seconds`, 'aqua'))
								})
						} catch (err) {
							console.error(err)
							await aruga.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
						}
					} else {
						await aruga.reply(from, `Ukuran video terlalu besar`, id)
					}
					break
				case prefix + 'stickergif':
				case prefix + 'stikergif':
				case prefix + 'sgif':
					if (isMedia && type === 'video' || mimetype === 'sticker/gif') {
						aruga.reply(from, mess.wait, id)
						try {
							const mediaData = await decryptMedia(message, uaOverride)
							const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
							await aruga.sendMp4AsSticker(from, videoBase64, gifcrop, StickerMetadatacrop)
								.then(async () => {
									console.log(color(`Sticker Gif processed for ${processTime(t, moment())} seconds`, 'aqua'))
								})
						} catch (err) {
							console.error(err)
							await aruga.reply(from, `Ukuran video terlalu besar`, id)
						}
					} else if (quotedMsg && quotedMsg.type === 'sticker' || quotedMsg && quotedMsg.type === 'video') {
						aruga.reply(from, mess.wait, id)
						try {
							const mediaData = await decryptMedia(quotedMsg, uaOverride)
							const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
							await aruga.sendMp4AsSticker(from, videoBase64, gifcrop, StickerMetadatacrop)
								.then(async () => {
									console.log(color(`Sticker Gif processed for ${processTime(t, moment())} seconds`, 'aqua'))
								})
						} catch (err) {
							console.error(err)
							await aruga.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
						}
					} else {
						await aruga.reply(from, `Reply/post video atau gif dengan caption ${prefix}sgif`, id)
					}
					break
				case prefix + 'startgif': //By: Thoriq Azzikra
					if (isMedia && type === 'video' || mimetype === 'sticker/gif') {
						try {
							aruga.reply(from, mess.wait, id)
							const mulai = q.split('|')[0]
							const akhir = q.split('|')[1]
							const mediaData = await decryptMedia(message, uaOverride)
							const vidBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
							await aruga.sendMp4AsSticker(from, vidBase64, { crop: true, loop: 0, fps: 30, square: 240, startTime: `00:00:${mulai}.0`, endTime: `00:00:${akhir}.0` }, StickerMetadatacrop)
						} catch (err) {
							console.log(err)
							aruga.reply(from, 'Kecilkan skala video!\nMinimal 240x240', id)
						}
					} else if (quotedMsg && quotedMsg.type === 'sticker' || quotedMsg && quotedMsg.type === 'video') {
						aruga.reply(from, mess.wait, id)
						try {
							const mulaini = q.split('|')[0]
							const akhirni = q.split('|')[1]
							const mediaData = await decryptMedia(quotedMsg, uaOverride)
							const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
							await aruga.sendMp4AsSticker(from, videoBase64, { crop: true, loop: 0, square: 240, fps: 30, startTime: `00:00:${mulaini}.0`, endTime: `00:00:${akhirni}` }, StickerMetadatacrop)
								.then(async () => {
									console.log(color(`Sticker Gif processed for ${processTime(t, moment())} seconds`, 'aqua'))
								})
						} catch (err) {
							console.error(err)
							await aruga.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
						}
					} else {
						await aruga.reply(from, `Ukuran video terlalu besar`, id)
					}
					break
				case prefix + 'sgifwm':
					if (isMedia && type === 'video' || mimetype === 'sticker/gif') {
						if (!q.includes('|')) return await aruga.reply(from, `Untuk membuat stickergif watermark\ngunakan ${prefix}sgifwm author | packname`, id)
						const namaPacksgif = q.substring(0, q.indexOf('|') - 1)
						const authorPacksgif = q.substring(q.lastIndexOf('|') + 2)
						await aruga.reply(from, mess.wait, id)
						try {
							const mediaData = await decryptMedia(message, uaOverride)
							const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
							await aruga.sendMp4AsSticker(from, videoBase64, { crop: true, fps: 30, square: 240, startTime: `00:00:00.0`, endTime: `00:00:10.0`, loop: 0 }, { author: `${authorPacksgif}`, pack: `${namaPacksgif}`, keepScale: false })
								.then(async () => {
									console.log(color(`Sticker Gif processed for ${processTime(t, moment())} seconds`, 'aqua'))

								})
						} catch (err) {
							console.error(err)
							await aruga.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
						}
					} else if (quotedMsg && quotedMsg.type === 'sticker' || quotedMsg && quotedMsg.type === 'video') {
						const namaPacksgif = q.substring(0, q.indexOf('|') - 1)
						const authorPacksgif = q.substring(q.lastIndexOf('|') + 2)
						await aruga.reply(from, mess.wait, id)
						try {
							const mediaData = await decryptMedia(quotedMsg, uaOverride)
							const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
							await aruga.sendMp4AsSticker(from, videoBase64, { crop: true, fps: 30, square: 240, startTime: `00:00:00.0`, endTime: `00:00:10.0`, loop: 0 }, { author: `${authorPacksgif}`, pack: `${namaPacksgif}`, keepScale: false })
								.then(async () => {
									console.log(color(`Sticker Gif processed for ${processTime(t, moment())} seconds`, 'aqua'))

								})
						} catch (err) {
							console.error(err)
							await aruga.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
						}
					} else {
						await aruga.reply(from, `Untuk membuat stickergif dengan watermark\ngunakan ${prefix}sgifwm author | packname`, id)
					}
					break
				case prefix + 'stikertoimg':
				case prefix + 'stickertoimg':
				case prefix + 'stmg':
				case prefix + 'toimg':
					if (quotedMsg && quotedMsg.type == 'sticker') {
						const mediaData = await decryptMedia(quotedMsg)
						aruga.reply(from, `Sedang di proses! Silahkan tunggu sebentar...`, id)
						const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						await aruga.sendFile(from, imageBase64, 'imgsticker.jpg', 'Berhasil convert Sticker to Image!', id)
							.then(() => {
								console.log(`Sticker to Image Processed for ${processTime(t, moment())} Seconds`)
							})
					} else if (!quotedMsg) return aruga.reply(from, `Format salah, silahkan tag sticker yang ingin dijadikan gambar!`, id)
					break


				// Sticker Creator
				case prefix + 'coolteks':
				case prefix + 'cooltext':
					if (args.length == 0) return aruga.reply(from, `Untuk membuat teks keren CoolText pada gambar, gunakan ${prefix}cooltext teks\n\nContoh: ${prefix}cooltext arugaz`, id)
					rugaapi.cooltext(args[0])
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
						})
					break
				case prefix + 'raingif':
					if (args.length == 0) return aruga.reply(from, `Untuk membuat stiker gif rain\nGunakan ${prefix}raingif [url]\n\nContoh : ${prefix}raingif https://avatars.githubusercontent.com/Urbaee`, id)
					const wuya = body.slice(9)
					await aruga.sendStickerfromUrl(from, `http://docs-jojo.herokuapp.com/api/rain_gif?image_url=${wuya}`, `rain.gif`, '', id)
					break
				case prefix + 'kisahnabi':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}kisahnabi nama nabi\nContoh : ${prefix}kisahnabi adam`, id)
					const dudo2 = body.slice(11)
					axios.get(`https://kisahnabi-api-zhirrr.vercel.app/api/searchnabi?q=${dudo2}`)
						.then(async (res) => {
							const textnab = `Nama : *${res.data.nabi.nama}*\nLahir : *${res.data.nabi.lahir}*\nUmur : *${res.data.nabi.umur}*\nTempat : *${res.data.nabi.tempat}*\n\nKisah : ${res.data.nabi.kisah}`
							aruga.reply(from, textnab, id)
								.catch((err) => {
									aruga.reply(from, 'Maaf, nama nabi yang anda masukkan salah', id)
								})
						})
						.catch((err) => {
							aruga.reply(from, 'Maaf, nama nabi yang anda masukkan salah', id)
						})
					break
				case prefix + 'tr':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}tr [kodebahasa] [reply caption]\n\ncontoh : ${prefix}tr id [reply caption}`, id)
					const suwayy0 = arg.split('|')[0]
					const suwayy00 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
					axios.get(`https://amm-api-translate.herokuapp.com/translate?engine=google&text=${suwayy00}&to=${suwayy0}`).then(res => {
						const trans = res.data.data.result
						aruga.reply(from, trans, id)
					})
					break
				case prefix + 'npm':
					if (!q) return await aruga.reply(from, `Format salah!\ngunakan ${prefix}npm package_name`, id)
					try {
						await aruga.reply(from, mess.wait, id)
						const datanpm = await axios.get(`https://videfikri.com/api/npm/?query=${body.slice(5)}`)
						const npm = datanpm.data.result
						await aruga.reply(from, `➸ *ID*: ${npm.id}\n➸ *Package Name*: ${npm.name}\n➸ *REV*: ${npm.rev}\n➸ *Version Latest*: ${npm.version_latest}\n➸ *Description*: ${npm.description}\n➸ *Homepage*: ${npm.homepage}\n➸ *Author Name*: ${npm.author_name}\n➸ *License*: ${npm.license}\n➸ *Maintainer*: ${npm.maintainer}\n➸ *Email*: ${npm.email}\n➸ *Created At*: ${npm.created_at}\n➸ *Last Modified*: ${npm.last_modified}`, id)
					} catch (err) {
						console.error(err)
						await aruga.reply(from, 'Error!', id)
					}
					break
				case prefix + 'addvn':
					let nuhi = body.slice(7)
					if (quotedMsg && quotedMsg.type === 'audio' || quotedMsg && quotedMsg.type === 'ptt') {
						var mediaData = await decryptMedia(quotedMsg, uaOverride)
						var filename = `./media/audio/${nuhi}.mp3`
						await fs.writeFile(filename, mediaData)
						aruga.reply(from, `vn dengan nama ${nuhi} berhasil disimpan didalam database!`, id)
					} else if (isMedia && type === 'audio' || isMedia && type === 'ptt') {
						var mediaData = await decryptMedia(message, uaOverride)
						var filename = `./media/audio/${nuhi}.mp3`
						await fs.writeFileSync(filename, mediaData)
						await aruga.reply(from, `vn dengan nama ${nuhi} berhasil disimpan didalam database!`, id)
					} else {
						return aruga.reply(from, `Error! silahkan coba kembali...`, id)
					}
					listvn.push(nuhi)
					fs.writeFileSync('./lib/database/listvn.json', JSON.stringify(listvn))
					break
				case prefix + 'delallvn':
					if (!isOwnerB) return aruga.reply(from, 'Fitur ini khusus Owner Bot', id)
					let dellall = listvn.includes(chats)
					listvn.splice(dellall)
					fs.writeFileSync('./lib/database/listvn.json', JSON.stringify(listvn))
					aruga.reply(from, `semua vn didalam database berhasil dihapus`, id)
					break
				case prefix + 'delvn':
					let deli = listvn.indexOf(body.slice(7))
					listvn.splice(deli, 1)
					fs.writeFileSync('./lib/database/listvn.json', JSON.stringify(listvn))
					aruga.reply(from, 'vn berhasil didelete dari database', id)
					break
				case prefix + 'delallimg':
					if (!isOwnerB) return aruga.reply(from, `Fitur ini hanya bisa digunakan oleh owner bot!`, id)
					let delimg = listimg.includes(chats)
					listimg.splice(delimg)
					fs.writeFileSync('./lib/database/listimage.json', JSON.stringify(listimg))
					aruga.reply(from, 'semua image didalam database berhasil dihapus', id)
					break
				case prefix + 'delallstik':
					if (!isOwnerB) return aruga.reply(from, 'fitur ini khusus owner bot', id)
					let delalstc = liststicker.includes(chats)
					liststicker.splice(delalstc)
					fs.writeFileSync('./lib/database/liststiker.json', JSON.stringify(liststicker))
					aruga.reply(from, 'semua stiker didalam database berhasil didelete', id)
					break
				case prefix + 'delstiker':
					let delstik = liststicker.indexOf(body.slice(11))
					liststicker.splice(delstik, 1)
					fs.writeFileSync('./lib/database/liststiker.json', JSON.stringify(liststicker))
					aruga.reply(from, 'sticker berhasil didelete dari database', id)
					break
				case prefix + 'luassegitiga':
					if (args.length == 0) return aruga.reply(from, `untuk mencari hasil dari luas segitiga\nGunakan ${prefix}luassegitiga alas tinggi\ncontoh: ${prefix}luassegitiga 12 7`, id)
					try {
						const luasseg = bdr.datar.luas.segitiga(args[0], args[1], false)
						const caraluas = bdr.datar.luas.segitiga(args[0], args[1], true)
						aruga.reply(from, `*Hasil:* ${luasseg}\n*Rumus:* ${caraluas}`, id)
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'kelsegitiga':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari Hasil dari keliling segitiga\nGunakan ${prefix}kelsegitiga sisi1 sisi2 sisi3\nContoh: ${prefix}kelsegitiga 32 10 8`, id)
					try {
						const kelsegitiga = bdr.datar.keliling.segitiga(args[0], args[1], args[2], false)
						const carakel = bdr.datar.keliling.segitiga(args[0], args[1], args[2], true)
						aruga.reply(from, `*Hasil:* ${kelsegitiga}\n*Rumus:* ${carakel}`, id)
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'luaspersegi':
					if (args.length = 0) return aruga.reply(from, `Untuk mencari Hasil dari luas persegi\nGunakan ${prefix}luaspersegi angka\nContoh: ${prefix}luaspersegi 32`, id)
					try {
						const luaspersegi = bdr.datar.luas.persegi(q, false)
						const luaspersegis = bdr.datar.luas.persegi(q, true)
						aruga.reply(from, `*Hasil:* ${luaspersegi}\n*Rumus:* ${luaspersegis}`, id)
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'pythagoras':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari hasil pythagoras\nGunakan ${prefix}pythagoras opsi angka1 angka2\nContoh: ${prefix}pythagoras miring 8 6`, id)
					try {
						const pytha = bdr.rdb.pythagoras(args[0], args[1], args[2], false)
						const rumuspytha = bdr.rdb.pythagoras(args[0], args[1], args[2], true)
						aruga.reply(from, `*Hasil:* ${pytha}\n*Rumus:* ${rumuspytha}`, id)
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'perkalian':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari hasil perkalian\nGunakan ${prefix}perkalian angkaperkalian jumlahperkalian\nContoh: ${prefix}perkalian 5 15`, id)
					try {
						const perkal = bdr.rdb.perkalian(args[0], args[1])
						aruga.reply(from, `*Hasil:* ${perkal}\n*Rumus:* ${rumusperkal}`, id)
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'kelpersegi':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari Hasil dari keliling persegi\nGunakan ${prefix}kelpersegi angka\nContoh: ${prefix}kelpersegi 78`, id)
					try {
						const persegi = bdr.datar.keliling.persegi(q, false)
						const caraPersegi = bdr.datar.keliling.persegi(q, true)
						aruga.reply(from, `*Hasil:* ${persegi}\n*Rumus:* ${caraPersegi}`, id)
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'kuadrat':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari sebuah Hasil Kuadrat\nGunakan ${prefix}kuadrat angka\nContoh: ${prefix}kuadrat 6`, id)
					try {
						const kuadrat = bdr.rdb.kuadrat(q)
						aruga.reply(from, `*Hasil:* ${kuadrat}`, id)
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'kubik':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari sebuah Hasil Kubik\nGunakan ${prefix}kubik angka\nContoh: ${prefix}kubik 9`, id)
					try {
						const kubik = bdr.rdb.kubik(q)
						aruga.reply(from, `*Hasil:* ${kubik}`, id)
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'addimg':
					let addmg = body.slice(8)
					if (quotedMsg && quotedMsg.type === 'image') {
						var mediaData = await decryptMedia(quotedMsg, uaOverride)
						var filename = `./media/image/${addmg}.jpg`
						await fs.writeFile(filename, mediaData)
						await aruga.reply(from, `image dengan nama ${addmg} berhasil disimpan didalam database!`, id)
					} else if (isMedia && type === 'image') {
						var mediaData = await decryptMedia(message, uaOverride)
						var filename = `./media/image/${addmg}.jpg`
						await fs.writeFileSync(filename, mediaData)
						await aruga.reply(from, `image dengan nama ${addmg} berhasil disimpan didalam database!`, id)
					} else {
						return aruga.reply(from, `Error!, silahkan coba kembali nanti...`, id)
					}
					listimg.push(addmg)
					fs.writeFileSync('./lib/database/listimage.json', JSON.stringify(listimg))
					break
				case prefix + 'delimg':
					let delx = listimg.indexOf(body.slice(7))
					listimg.splice(delx, 1)
					fs.writeFileSync('./lib/database/listimage.json', JSON.stringify(listimg))
					aruga.reply(from, `image dengan nama ${delx} berhasil didelete dari database`, id)
					break
				case prefix + 'addstiker': //credit by ./NotF0und
				case prefix + 'addstik':
				case prefix + 'addsticker':
				case prefix + 'addstick':
					let nmHii = body.slice(11)
					if (quotedMsg && quotedMsg.type === 'image' || quotedMsg && quotedMsg.type === 'sticker') {
						var mediaData = await decryptMedia(quotedMsg, uaOverride)
						var filename = `./media/pic/sticker/${nmHii}.jpeg`
						await fs.writeFile(filename, mediaData)
						await aruga.reply(from, `sticker dengan nama ${nmHii} berhasil disimpen!`, id)
					} else if (isMedia && type === 'image' || isMedia && type === 'sticker') {
						var mediaData = await decrpytMedia(message, uaOverride)
						var filename = `./media/pic/sticker/${nmHii}.jpeg`
						await fs.writeFileSync(filename, mediaData)
						await aruga.reply(from, `sticker dengan nama ${nmHii} berhasil disimpan!`, id)
					} else {
						return aruga.reply(from, `Error! Silahkan coba kembali...`, id)
					}
					liststicker.push(nmHii)
					fs.writeFileSync('./lib/database/liststiker.json', JSON.stringify(liststicker))
					break
				case prefix + 'stcfull':
				case prefix + 'stickerfull':
				case prefix + 'stikerfull':
				case prefix + 'sfull':
					if (isMedia && type === 'image') {
						const mediaData = await decryptMedia(message, uaOverride)
						const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
						await aruga.sendImageAsSticker(from, imageBase64, StickerMetadata)
						console.log(color(`Sticker processed for ${processTime(t, moment())} seconds`, 'aqua'))
					} else if (quotedMsg && quotedMsg.type == 'image') {
						const mediaData = await decryptMedia(quotedMsg, uaOverride)
						const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						await aruga.sendImageAsSticker(from, imageBase64, StickerMetadata)
						console.log(color(`Sticker processed for ${processTime(t, moment())} seconds`, 'aqua'))
					} else {
						aruga.reply(from, mess.error.St, id)
					}
					break
				case prefix + 'fakethumb':
					if (isMedia && isImage || isQuotedImage) {
						const strs = chats.match('https') || chats.match('http')
						if (!strs) return aruga.reply(from, 'Masukkan param https/http', id)
						aruga.reply(from, mess.wait, id)
						const qtmds = isQuotedImage ? quotedMsg : message
						const mimtype = isQuotedImage ? quotedMsg.mimetype : mimetype
						const mediaData = await decryptMedia(qtmds, uaOverride)
						const bodslice = body.slice(11)
						const imageBse = `data:${mimtype};base64,${mediaData.toString('base64')}`
						await aruga.sendLinkWithAutoPreview(from, bodslice, '', imageBse)
					} else {
						aruga.reply(from, `Reply foto dengan caption ${prefix}fakethumb url`, id)
					}
					break
				case prefix + 'shutdown':
					if (!isOwnerB) return aruga.reply(from, 'Lu siapa?', id)
					aruga.sendText(from, 'Shutdown Bot in')
					await sleep(1000)
					aruga.sendText(from, '5')
					await sleep(1000)
					aruga.sendText(from, '4')
					await sleep(1000)
					aruga.sendText(from, '3')
					await sleep(1000)
					aruga.sendText(from, '2')
					await sleep(1000)
					aruga.sendText(from, '1')
					await sleep(1000)
					aruga.sendText(from, `See y'all later`)
					await sleep(10000)
					aruga.kill(true)
					break
				case prefix + 'sticker':
				case prefix + 'stiker':
				case prefix + 'stc':
				case prefix + 's':
					if (isMedia && type === 'image') {
						const mediaData = await decryptMedia(message, uaOverride)
						const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
						await aruga.sendImageAsSticker(from, imageBase64, StickerMetadatacrop)
							.then(async () => {
								console.log(color(`Sticker processed for ${processTime(t, moment())} seconds`, 'aqua'))
							})
					} else if (quotedMsg && quotedMsg.type == 'image') {
						const mediaData = await decryptMedia(quotedMsg, uaOverride)
						const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						await aruga.sendImageAsSticker(from, imageBase64, StickerMetadatacrop)
							.then(async (res) => {
								console.log(color(`Sticker processed for ${processTime(t, moment())} seconds`, 'aqua'))
							})
					} else {
						aruga.reply(from, mess.error.St, id)
					}
					break
				case prefix + 'movie':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari suatu film dari website Bajakan:v\n${prefix}movie the uncanny counter`, id)
					await aruga.reply(from, mess.wait, id)
					rugaapi.movie(args)
						.then(async ({ result }) => {
							let mov = '*-----「 MOVIE 」-----*'
							for (let i = 0; i < result.length; i++) {
								mov += `\n\n• *Judul :* ${result[i].title}\n• *URL Download :* ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
							}
							await aruga.sendFileFromUrl(from, result[0].thumb, 'thumb.jpg', mov, id)
							console.log('Success sending Movie from query')
						})
						.catch(async (err) => {
							console.error(err)
							await aruga.reply(from, 'Error njing', id)
						})
					break
				case prefix + 'wattpad':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari sebuah detail dari part cerita Wattpad! Gunakan ${prefix}wattpad [query]\nContoh : ${prefix}wattpad bos birahi`, id)
					await aruga.reply(from, mess.wait, id)
					const bodyslice = body.slice(9)
					try {
						const watpad = await fetch(`http://docs-jojo.herokuapp.com/api/wattpad_search?q=${bodyslice}`)
						const watjs = await watpad.json()
						const { result } = await watjs
						let wtpd = `*-----「 WATTPAD 」-----*\n`
						for (let i = 0; i < result.length; i++) {
							wtpd += `\n─────────────────\n\n*•Judul:* ${result[i].title}\n*•Reads:* ${result[i].reads}\n*•Votes:* ${result[i].votes}\n*•Url:* ${result[i].url}\n*•Description:* ${result[i].description}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumb, 'img.jpg', wtpd, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Error bang', id)
					}
					break
				case prefix + 'neonime':
					if (args.length == 0) return aruga.reply(from, `Mencari anime dari website Neonime!\nContoh: ${prefix}neonime boruto`, id)
					await aruga.reply(from, mess.wait, id)
					rugaapi.neo(body.slice(9))
						.then(async ({ result }) => {
							let neoni = '*-----「 NEONIME 」-----*'
							for (let i = 0; i < result.length; i++) {
								neoni += `\n\n• *Judul :* ${result[i].title}\n• *Url :* ${result[i].url}\n• *Deskripsi :* ${result[i].desc}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
							}
							await aruga.sendFileFromUrl(from, result[0].thumb, 'img.jpg', neoni, id)
							console.log(`Succes sending ${body.slice(9)}`)
						})
						.catch(async (err) => {
							console.error(err)
							aruga.reply(from, 'Error njing', id)
						})
					break
				case prefix + 'brainly':
					if (args.length == 0) return aruga.reply(from, `Mencari sebuah jawaban dari website Brainly!\nContoh : ${prefix} contoh bilangan bulat`, id)
					const brain = body.slice(9)
					aruga.reply(from, mess.wait, id)
					rugaapi.brainly(brain)
						.then(async (res) => {
							const jamban = res.data
							aruga.reply(from, jamban, id)
								.catch((err) => {
									aruga.reply(from, 'Error!', id)
								})
								.catch((err) => {
									aruga.reply(from, 'Error', id)
								})
						})
					break
				case prefix + 'readmore':
					const read = arg.split('|')[0]
					const more = arg.split('|')[1]
					const capts = `${read}͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${more}`
					aruga.reply(from, capts, id)
					break
				case prefix + 'stikergiphy':
				case prefix + 'stickergiphy':
					if (args.length !== 1) return aruga.reply(from, `Maaf, format pesan salah.\nKetik pesan dengan ${prefix}stickergiphy <link_giphy>`, id)
					const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
					const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
					if (isGiphy) {
						const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
						if (!getGiphyCode) { return aruga.reply(from, 'Gagal mengambil kode giphy', id) }
						const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
						const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
						aruga.sendGiphyAsSticker(from, smallGifUrl).then(() => {
							aruga.reply(from, 'Here\'s your sticker')
							console.log(color(`Sticker Processed for ${processTime(t, moment())} Second`, 'aqua'))
						}).catch((err) => console.log(err))
					} else if (isMediaGiphy) {
						const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
						if (!gifUrl) { return aruga.reply(from, 'Gagal mengambil kode giphy', id) }
						const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
						aruga.sendGiphyAsSticker(from, smallGifUrl)
							.then(() => {
								aruga.reply(from, 'Here\'s your sticker')
								console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
							})
							.catch(() => {
								aruga.reply(from, `Ada yang error!`, id)
							})
					} else {
						await aruga.reply(from, 'Maaf, command sticker giphy hanya bisa menggunakan link dari giphy.  [Giphy Only]', id)
					}
					break
				case prefix + 'infobmkg':
					aruga.reply(from, mess.wait, id)
					axios.get(`http://zekais-api.herokuapp.com/gempa`)
						.then(async (res) => {
							if (res.data.status == false) return aruga.reply(from, 'REST-API sedang error', id)
							const imageth = res.data.image
							const magnitudo = res.data.magnitudo
							const kedalamannya = res.data.kedalaman
							const wilayahhh = res.data.wilayah
							const waktuuu = res.data.waktu
							const lintang = res.data.lintang
							const bujur = res.data.bujur
							const txthehe = `Magnitudo: ${magnitudo}\nKedalaman: ${kedalamannya}\nWilayah: ${wilayahhh}\nWaktu: ${waktuuu}\nLintang: ${lintang}\nBujur: ${bujur}`
							aruga.sendFileFromUrl(from, imageth, 'thumb.jpg', txthehe, id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'bucin':
					axios.get(`http://zekais-api.herokuapp.com/bucin`).then(res => {
						const ayamgrg = res.data.result
						aruga.reply(from, ayamgrg, id)
					})
					break
				case prefix + 'setdesc':
					if (!isGroupAdmins) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Admin!')
					const descnya = body.slice(9)
					const ganti = await aruga.setGroupDescription(descnya)
					aruga.setGroupDescription(groupId, ganti)
					break
				case prefix + 'dankmemes':
					aruga.reply(from, mess.wait, id)
					axios.get(`http://zekais-api.herokuapp.com/dankmemes`)
						.then(async (res) => {
							aruga.sendFileFromUrl(from, res.data.result, 'img.jpg', '', id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Rest Api sedang error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'quotesen':
					axios.get(`http://zekais-api.herokuapp.com/quotesen`)
						.then(async (res) => {
							const fto = `author : *${res.data.author}*\n\nQuotes : *${res.data.quotes_en}*`;
							aruga.reply(from, fto, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Rest Api sedang error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'detail':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari detail suatu wilayah!\nContoh : ${prefix}detail Jakarta`, id)
					const jamu = await axios.get(`https://api.i-tech.id/tools/jam?key=qTOfqt-6mDbIq-8lJHaR-Q09mTR-D6pAtD&kota=${body.slice(8)}`).then(res => {
						const husal = `*Wilayah :* ${res.data.timezone}\n*Kota :* ${res.data.address}\n*Tanggal :* ${res.data.date}\n*Jam :* ${res.data.time}\n*Latitude :* ${res.data.latitude}\n*Longitude :* ${res.data.longitude}`
						aruga.reply(from, husal, id)
							.catch(() => {
								aruga.reply(from, 'Error...', id)
							})
					})
						.catch(() => {
							aruga.reply(from, 'Maaf,wilayah yang anda cari tidak dapat ditemukan', id)
						})
					break
				case prefix + 'infogempa':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					const bmkg = await axios.get('https://arugaz.herokuapp.com/api/infogempa').then(res => {
						const hasil = `*INFO GEMPA*\n*Lokasi* : _${res.data.lokasi}_\n*Kedalaman* : _${res.data.kedalaman}_\n*Koordinat* : _${res.data.koordinat}_\n*Magnitude* : _${res.data.magnitude}_\n*Waktu* : _${res.data.waktu}_\n${res.data.potensi}`;
						aruga.sendFileFromUrl(from, res.data.map, 'img.jpg', hasil, id)
					})
					break
				case prefix + 'meme':
					if ((isMedia || isQuotedImage) && args.length >= 2) {
						const top = arg.split('|')[0]
						const bottom = arg.split('|')[1]
						const encryptMedia = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encryptMedia, uaOverride)
						const getUrl = await uploadImages(mediaData, false)
						const ImageBase64 = await meme.custom(getUrl, top, bottom)
						aruga.sendFile(from, ImageBase64, 'image.png', '', null, true)
						aruga.sendImageAsSticker(from, ImageBase64, { keepScale: true, author: authorr, pack: pack })
							.then(() => {
								aruga.reply(from, 'Ini makasih!', id)
							})
							.catch(() => {
								aruga.reply(from, 'Ada yang error!')
							})
					} else {
						await aruga.reply(from, `Tidak ada gambar! Silahkan kirim gambar dengan caption ${prefix}meme <teks_atas> | <teks_bawah>\ncontoh: ${prefix}meme teks atas | teks bawah`, id)
					}
					break
				case prefix + 'quotemaker':
					if (args.length == 0) return aruga.reply(from, `Membuat quote maker, gunakan ${prefix}quotemaker |quotes|author|theme\nContoh: ${prefix}quotemaker terlihatlah sudah|thoriq|aesthetic`, id)
					const qmaker = body.trim().split('|')
					if (qmaker.length >= 3) {
						const quotes = qmaker[1]
						const author = qmaker[2]
						const theme = qmaker[3]
						aruga.reply(from, 'Proses kak..', id)
						try {
							const hasilqmaker = await images.quote(quotes, author, theme)
							aruga.sendFileFromUrl(from, `${hasilqmaker}`, '', 'Ini kak..', id)
						} catch {
							aruga.reply('Yahh proses gagal, kakak isinya sudah benar belum?..', id)
						}
					} else {
						aruga.reply(from, `Pemakaian ${prefix}quotemaker |isi quote|author|theme\n\ncontoh: ${prefix}quotemaker |aku sayang kamu|-aruga|random\n\nuntuk theme nya pakai random ya kak..`)
					}
					break
				case prefix + 'foliokanan':
					if (args.length == 0) return aruga.reply(from, `Membuat bot menulis teks yang akan dikirim menjadi gambar`, id)
					const folkan = body.slice(12)
					await aruga.sendFileFromUrl(from, `http://zekais-api.herokuapp.com/foliokanan?text=${folkan}`, '', '', id)
					break
				case prefix + 'foliokiri':
					if (args.length == 0) return aruga.reply(from, `Membuat bot menulis teks yang akan dikirim menjadi gambar!`, id)
					const nulisfol1 = body.slice(11)
					await aruga.sendFileFromUrl(from, `http://zekais-api.herokuapp.com/foliokiri?text=${nulisfol1}`, '', '', id)
					break
				case prefix + 'nulis':
					if (args.length == 0) return aruga.reply(from, `Membuat bot menulis teks yang dikirim menjadi gambar\nPemakaian: ${prefix}nulis [teks]\n\ncontoh: ${prefix}nulis i love you 3000`, id)
					const nulisq = body.slice(7)
					const nulisp = await rugaapi.tulis(nulisq)
					await aruga.sendImage(from, `${nulisp}`, '', 'Nih...', id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break

				//Islam Command
				case prefix + 'listsurah':
					try {
						axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
							.then((response) => {
								let hehex = '╔══✪〘 List Surah 〙✪══\n'
								for (let i = 0; i < response.data.data.length; i++) {
									hehex += '╠➥ '
									hehex += response.data.data[i].name.transliteration.id.toLowerCase() + '\n'
								}
								hehex += '╚═〘 *A R U G A  B O T* 〙'
								aruga.reply(from, hehex, id)
							})
					} catch (err) {
						aruga.reply(from, err, id)
					}
					break
				case prefix + 'infosurah':
					if (args.length == 0) return aruga.reply(from, `*_${prefix}infosurah <nama surah>_*\nMenampilkan informasi lengkap mengenai surah tertentu. Contoh penggunan: ${prefix}infosurah al-baqarah`, message.id)
					var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
					var { data } = responseh.data
					var idx = data.findIndex(function (post, index) {
						if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
							return true;
					});
					var pesan = ""
					pesan = pesan + "Nama : " + data[idx].name.transliteration.id + "\n" + "Asma : " + data[idx].name.short + "\n" + "Arti : " + data[idx].name.translation.id + "\n" + "Jumlah ayat : " + data[idx].numberOfVerses + "\n" + "Nomor surah : " + data[idx].number + "\n" + "Jenis : " + data[idx].revelation.id + "\n" + "Keterangan : " + data[idx].tafsir.id
					aruga.reply(from, pesan, message.id)
					break
				case prefix + 'surah':
					if (args.length == 0) return aruga.reply(from, `*_${prefix}surah <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1\n\n*_${prefix}surah <nama surah> <ayat> en/id_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Inggris / Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1 id`, message.id)
					var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
					var { data } = responseh.data
					var idx = data.findIndex(function (post, index) {
						if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
							return true;
					});
					nmr = data[idx].number
					if (!isNaN(nmr)) {
						var responseh2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[1])
						var { data } = responseh2.data
						var last = function last(array, n) {
							if (array == null) return void 0;
							if (n == null) return array[array.length - 1];
							return array.slice(Math.max(array.length - n, 0));
						};
						bhs = last(args)
						pesan = ""
						pesan = pesan + data.text.arab + "\n\n"
						if (bhs == "en") {
							pesan = pesan + data.translation.en
						} else {
							pesan = pesan + data.translation.id
						}
						pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
						aruga.reply(from, pesan, message.id)
					}
					break
				case prefix + 'tafsir':
					if (args.length == 0) return aruga.reply(from, `*_${prefix}tafsir <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahan dan tafsirnya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}tafsir al-baqarah 1`, message.id)
					var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
					var { data } = responsh.data
					var idx = data.findIndex(function (post, index) {
						if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
							return true;
					});
					nmr = data[idx].number
					if (!isNaN(nmr)) {
						var responsih = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[1])
						var { data } = responsih.data
						pesan = ""
						pesan = pesan + "Tafsir Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + "\n\n"
						pesan = pesan + data.text.arab + "\n\n"
						pesan = pesan + "_" + data.translation.id + "_" + "\n\n" + data.tafsir.id.long
						aruga.reply(from, pesan, message.id)
					}
					break
				case prefix + 'alaudio':
					if (args.length == 0) return aruga.reply(from, `*_${prefix}ALaudio <nama surah>_*\nMenampilkan tautan dari audio surah tertentu. Contoh penggunaan : ${prefix}ALaudio al-fatihah\n\n*_${prefix}ALaudio <nama surah> <ayat>_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1\n\n*_${prefix}ALaudio <nama surah> <ayat> en_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Inggris. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1 en`, message.id)
					ayat = "ayat"
					bhs = ""
					var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
					var surah = responseh.data
					var idx = surah.data.findIndex(function (post, index) {
						if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
							return true;
					});
					nmr = surah.data[idx].number
					if (!isNaN(nmr)) {
						if (args.length > 2) {
							ayat = args[1]
						}
						if (args.length == 2) {
							var last = function last(array, n) {
								if (array == null) return void 0;
								if (n == null) return array[array.length - 1];
								return array.slice(Math.max(array.length - n, 0));
							};
							ayat = last(args)
						}
						pesan = ""
						if (isNaN(ayat)) {
							var responsih2 = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah/' + nmr + '.json')
							var { name, name_translations, number_of_ayah, number_of_surah, recitations } = responsih2.data
							pesan = pesan + "Audio Quran Surah ke-" + number_of_surah + " " + name + " (" + name_translations.ar + ") " + "dengan jumlah " + number_of_ayah + " ayat\n"
							pesan = pesan + "Dilantunkan oleh " + recitations[0].name + " : " + recitations[0].audio_url + "\n"
							pesan = pesan + "Dilantunkan oleh " + recitations[1].name + " : " + recitations[1].audio_url + "\n"
							pesan = pesan + "Dilantunkan oleh " + recitations[2].name + " : " + recitations[2].audio_url + "\n"
							aruga.reply(from, pesan, message.id)
						} else {
							var responsih2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
							var { data } = responsih2.data
							var last = function last(array, n) {
								if (array == null) return void 0;
								if (n == null) return array[array.length - 1];
								return array.slice(Math.max(array.length - n, 0));
							};
							bhs = last(args)
							pesan = ""
							pesan = pesan + data.text.arab + "\n\n"
							if (bhs == "en") {
								pesan = pesan + data.translation.en
							} else {
								pesan = pesan + data.translation.id
							}
							pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
							await aruga.sendFileFromUrl(from, data.audio.secondary[0])
							await aruga.reply(from, pesan, message.id)
						}
					}
					break
				case prefix + 'jsolat':
					if (args.length == 0) return aruga.reply(from, `Untuk melihat jadwal solat dari setiap daerah yang ada\nketik: ${prefix}jsolat [daerah]\n\nuntuk list daerah yang ada\nketik: ${prefix}daerah`, id)
					const solatx = body.slice(8)
					const solatj = await rugaapi.jadwaldaerah(solatx)
					await aruga.reply(from, solatj, id)
						.catch(() => {
							aruga.reply(from, 'Pastikan daerah kamu ada di list ya!', id)
						})
					break
				case prefix + 'daerah':
					const daerahq = await rugaapi.daerah()
					await aruga.reply(from, daerahq, id)
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				//Group All User
				case prefix + 'grouplink':
				case prefix + 'linkgc':
					if (!isBotGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
					if (isGroupMsg) {
						const inviteLink = await aruga.getGroupInviteLink(groupId);
						aruga.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}* Gunakan *${prefix}revoke* untuk mereset Link group`)
					} else {
						aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					}
					break
				case prefix + "revoke":
					if (!isGroupAdmins) return aruga.reply(from, 'Lu admin?', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
					if (isBotGroupAdmins) {
						aruga
							.revokeGroupInviteLink(from)
							.then((res) => {
								aruga.reply(from, `Berhasil Revoke Grup Link gunakan *${prefix}grouplink* untuk mendapatkan group invite link yang terbaru`, id);
							})
							.catch(() => {
								console.log(`[ERR] ${err}`);
							});
					}
					break;
				//Media
				case prefix + 'ytmp3':
					if (args.length == 0) return aruga.reply(from, `Untuk mendownload lagu dari youtube\nketik: ${prefix}ytmp3 [link_yt]`, id)
					aruga.reply(from, mess.wait, id)
					rugaapi.ymp3v2(body.slice(7))
						.then(async (res) => {
							if (res.status == false) return aruga.reply(from, res.result, id)
							await aruga.sendFileFromUrl(from, res.thumb, '', `「 *YOUTUBE MP3* 」\n\n*Title:* ${res.title}\n*Size:* ${res.size}\n*Quality:* ${res.quality}\n*Type:* ${res.ext}\n\n${mess.wait}`, id)
							const playlink = res.link
							await aruga.sendFileFromUrl(from, playlink, '', '', id)
								.catch(() => {
									aruga.reply(from, `Error nich`, id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'jadwalbola':
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
					aruga.reply(from, mess.wait, id)
					try {
						const jdbola = await fetch(`https://api.vhtear.com/jadwalbola&apikey=${vhtearkey}`)
						if (!jdbola.ok) throw new Error(`unexpected response ${jdbola.statusText}`)
						const jdbola2 = await jdbola.json()
						const { data } = await jdbola2.result
						let xixixi = `*「 JADWAL BOLA 」*\n\n`
						for (let i = 0; i < data.length; i++) {
							xixixi += `\n─────────────────\n\n*Kick-Off* : ${data[i].kickoff}\n*Pertandingan* : ${data[i].pertandingan}\n*Stasiun TV* : ${data[i].stasiuntv}`
						}
						await aruga.sendText(from, xixixi, id)
					} catch (err) {
						console.log(err)
						await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Jadwal tidak ditemukan')
					}
					break
				case prefix + 'shitposting':
					aruga.reply(from, mess.wait, id)
					aruga.sendFileFromUrl(from, `https://api.xteam.xyz/shitpost?APIKEY=db0e06bd9f096399`, 'gelap.mp4', '', id)
						.catch(() => {
							aruga.reply(from, 'Maaf, sistem sedang error', id)
						})
					break
				case prefix + 'emojisticker':
				case prefix + 'emojistiker':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}emojisticker [emoji]\nContoh : ${prefix}emojisticker 😫`, id)
					const emoji = emojiUnicode(q)
					await aruga.reply(from, `Wait....`, id)
					console.log(`Creating code emoji => ${emoji}`)
					aruga.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${vhtearkey}`)
						.catch((err) => {
							console.log(err)
							aruga.reply(from, 'Maaf, emoji yang kamu kirim tidak support untuk dijadikan sticker, cobalah emoji lain', id)
						})
					break
				case prefix + 'distance':
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
					if (args.length === 0) return aruga.reply(from, `[❗] Kirim perintah *${prefix}distance [ Daerah1|Daerah2 ]*\ncontoh : *${prefix}distance Jakarta|Bandung*`)
					aruga.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
					try {
						const dfdc1 = arg.split('|')[0]
						const dfdc2 = arg.split('|')[1]
						const dfdcres = await axios.get('https://api.vhtear.com/distance?from=' + dfdc1 + '&to=' + dfdc2 + '&apikey=' + vhtearkey)
						const { result } = dfdcres.data
						await aruga.reply(from, `*「 DRIVING-FLYING DISTANCE 」*\n\n${result.data}`, id)
					} catch (err) {
						console.error(err.message)
						await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Lokasi tidak ditemukan')
					}
					break
				case prefix + 'glitch':
					if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}glitch [ Teks1|Teks2 ]*, contoh *${prefix}glitch |Urbaeexyz|Dev Thoriq*`, id)
					try {
						aruga.reply(from, mess.wait, id)
						const glitch1 = q.split('|')[0]
						const glitch2 = q.split('|')[1]
						if (glitch1.length > 10) return aruga.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						if (glitch2.length > 15) return aruga.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 15 huruf!_', id)
						aruga.sendFileFromUrl(from, `https://api.zeks.xyz/api/gtext?text1=${glitch1}&text2=${glitch2}&apikey=${apikeyvinz}`, '', id)
							.catch(err => {
								console.log(err)
								aruga.reply(from, 'Terjadi kesalahan, silahkan coba lagi', id)
							})
					} catch (err) {
						aruga.reply(from, 'Format pesannya salah tuh', id)
					}
					break
				case prefix + 'javcosplay':
					await aruga.reply(from, mess.wait, id)
					rugaapi.cosplay()
						.then(async ({ result }) => {
							let jav = '-----[ *Jav Cosplay* ]-----'
							for (let i = 0; i < result.length; i++) {
								jav += `\n\n• *Title :* ${result[i].title}\n• *Detail :* ${result[i].detail}\n• *URL :* ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
							}
							await aruga.reply(from, jav, id)
							console.log('Succes Sending Jav Cosplay')
						})
						.catch(async (err) => {
							console.error(err)
							aruga.reply(from, 'Error....', id)
						})
					break
				case prefix + 'listnekopoi':
					await aruga.reply(from, mess.wait, id)
					rugaapi.listnek()
						.then(async ({ result }) => {
							let listnekopoi = '-----[ *NEKOPOI LIST* ]-----'
							for (let i = 0; i < result.length; i++) {
								listnekopoi += `\n\n• *Judul :* ${result[i].title}\n• *Seri :* ${result[i].seri}\n• *URL :* ${result[i].url}\n=_=_=_=_=_=_=_=_=_=_=_=_=`
							}
							await aruga.reply(from, listnekopoi, id)
							console.log('Succes Sending List Nekopoi')
						})
						.catch(async (err) => {
							console.error(err)
							aruga.reply(from, 'Error...', id)
						})
					break
				case prefix + 'randomquran':
					await aruga.reply(from, mess.wait, id)
					rugaapi.quran()
						.then(async (res) => {
							const jelasin = `Surah : ${res.nama}\nArti : ${res.arti}\nAsma : ${res.asma}\nAyat : ${res.ayat}\nDiturunkan di : ${res.type}\nNomor : ${res.nomor}\n Urutan Ke : ${res.urut}`
							await aruga.sendFileFromUrl(from, res.audio, '', '', id)
							aruga.reply(from, jelasin, id)
						})
					break
				case prefix + 'linknobg':
					if (args.length == 0) return aruga.reply(from, 'Kirim link untuk menjadikan sticker nobg', id)
					const linkid = body.slice(10)
					await aruga.sendFileFromUrl(from, `https://api.zeks.xyz/api/removebg?apikey=${apikeyvinz}&url=${linkid}`, 'img.jpg', 'nehh', id)
					await aruga.sendImageAsSticker(from, `https://api.zeks.xyz/api/removebg?apikey=${apikeyvinz}&url=${linkid}`)
						.catch(() => {
							aruga.reply(from, 'Error', id)
						})
					break
				case prefix + 'sketch':
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const encryptMedia = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encryptMedia, uaOverride)
						const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
						axios.get(`https://api.zeks.xyz/api/sketchf?img=${linkImg}&apikey=${apikeyvinz}`)
							.then(async (res) => {
								await aruga.sendFileFromUrl(from, res.data.result, 'img.jpg', '', id)
							})
					} else {
						await aruga.reply(from, 'Error njing', id)
					}
					break
				case prefix + '3dphoto':
					if (isMedia || isImage || isQuotedImage) {
						aruga.reply(from, mess.wait, id)
						const encrypt = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encrypt, uaOverride)
						const beimage = await uploadImages(mediaData, `${sender}_img`)
						await aruga.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/3dlinephoto/?urlgbr=${beimage}`, '', '', id)
							.catch(() => {
								aruga.reply(from, 'Kesalahan waktu mengupload foto, silahkan coba lagi', id)
							})
					} else {
						aruga.reply(from, 'Format pesan salah, silahkan post/reply foto', id)
					}
					break
				case prefix + 'imgbb':
					if (isMedia || isImage || isQuotedImage) {
						aruga.reply(from, mess.wait, id)
						const jajas = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(jajas, uaOverride)
						const uploadImg2 = await uploadImages(mediaData, `${sender.id}_img`)
						const namas = body.slice(7)
						axios.get(`https://videfikri.com/api/imgbb/?urlgbr=${uploadImg2}&title=${namas}`)
							.then(async (res) => {
								const besx = `Link: ${res.data.result.url}`
								aruga.sendFileFromUrl(from, res.data.result.url, '', besx, id)
									.catch(err => {
										aruga.reply(from, besx, id)
									})
							})
					} else {
						aruga.reply(from, 'Format pesan salah', id)
					}
					break
				case prefix + 'givecolor':
					if (isMedia || isImage || isQuotedImage) {
						aruga.reply(from, mess.wait, id)
						const qtmz = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(qtmz, uaOverride)
						const upsz = await uploadImages(mediaData, `${sender.id}_img`)
						await aruga.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/colorize-old-photo?image_url=${upsz}`, 'img.jpg', '', id)
							.catch(err => {
								console.log(err)
								aruga.reply(from, 'Terjadi kesalahan saat mengupload foto', id)
							})
					} else if (args[0]) {
						aruga.reply(from, mess.wait, id)
						const linksur = args[0]
						await aruga.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/colorize-old-photo?image_url=${args}`, 'img.jpg', '', '', id)
					} else {
						aruga.reply(from, `Kirim/reply foto dengan caption ${prefix}givecolor`, id)
					}
					break
				case prefix + 'pencilart':
				case prefix + 'artpencil':
				case prefix + 'pensilart':
					if (isMedia || isImage || isQuotedImage) {
						aruga.reply(from, mess.wait, id)
						const bamg = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(bamg, uaOverride)
						const uploadimg = await uploadImages(mediaData, `${sender.id}_img`)
						const beimgbb = await axios.get(`https://videfikri.com/api/imgbb/?urlgbr=${uploadimg}&title=Urbaeexyz`)
						const dataimage = beimgbb.data.result.url
						await aruga.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/editor/pencil?apikey=${lolhuman}&img=${dataimage}`, '', '', id)
							.catch(err => {
								console.log(err)
								aruga.reply(from, 'Terjadi kesalahan saat mengupload Foto', id)
							})
					} else if (args[0]) {
						aruga.reply(from, mess.wait, id)
						const textlink = args[0]
						await aruga.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/editor/pencil?apikey=${lolhuman}&img=${textlink}`, '', '', id)
					} else {
						aruga.reply(from, `kirim/reply foto dengan caption ${prefix}gambarpensil`, id)
					}
					break
				case prefix + 'pencil':
				case prefix + 'pensil':
					if (isMedia || isImage || isQuotedImage) {
						aruga.reply(from, mess.wait, id)
						const encrypt = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encrypt, uaOverride)
						const beimages = await uploadImages(mediaData, `${sender}_img`)
						await aruga.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/pencil/?urlgbr=${beimages}`, '', '', id)
							.catch(() => {
								aruga.reply(from, 'Kesalahan waktu mengupload foto, silahkan coba lagi', id)
							})
					} else {
						aruga.reply(from, 'Format pesan salah, silahkan post/reply foto', id)
					}
					break
				case prefix + 'pencil2':
				case prefix + 'pensil2':
					if (isMedia || isImage || isQuotedImage) {
						aruga.reply(from, mess.wait, id)
						const encrypt = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encrypt, uaOverride)
						const inimage = await uploadImages(mediaData, `${sender.id}_img`)
						aruga.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/pencildrawing/?urlgbr=${inimage}`, '', '', id)
							.catch(() => {
								aruga.reply(from, 'Kesalahan waktu mengupload foto, silahkan coba lagi', id)
							})
					} else {
						aruga.reply(from, 'Format pesan salah, silahkan post/reply foto', id)
					}
					break
				case prefix + 'thuglife':
					if (isMedia || isImage || isQuotedImage) {
						aruga.reply(from, mess.wait, id)
						const encrypt = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encrypt, uaOverride)
						const inimage = await uploadImages(mediaData, `${sender.id}_img`)
						await aruga.sendFileFromUrl(from, `http://zekais-api.herokuapp.com/thuglife?url=${inimage}`, 'thuglife.jpg', '', id)
							.catch(() => {
								aruga.reply(from, 'lagi error', id)
							})
					} else {
						aruga.reply(from, 'Format pesan salah, hanya bisa foto', id)
					}
					break
				case prefix + 'tobecontinue':
				case prefix + 'tobecontinued':
					if (isMedia || isImage || isQuotedImage) {
						aruga.reply(from, mess.wait, id)
						const encrypt = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encrypt, uaOverride)
						const inimage = await uploadImages(mediaData, `${sender.id}_img`)
						await aruga.sendFileFromUrl(from, `http://zekais-api.herokuapp.com/tobecontinue?url=${inimage}`, 'tobe.jpg', '', id)
							.catch(() => {
								aruga.reply(from, 'Lagi error', id)
							})
					} else {
						aruga.reply(from, 'Format pesan salah, kirim foto bukan video/gif', id)
					}
					break
				case prefix + 'imgtopdf':
				case prefix + 'topdf':
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const skript = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(skript, uaOverride)
						const linksx = await uploadImages(mediaData, `${sender.id}_img`)
						await aruga.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/convert/imgtopdf?apikey=${lolhuman}&img=${linksx}`, `${sender.id}`, '', id)
					} else {
						aruga.reply(from, 'Format pesan salah', id)
					}
					break
				case prefix + 'nobg':
				case prefix + 'stcnobg':
				case prefix + 'stikernobg':
				case prefix + 'stickernobg':
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const encryptMedia = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encryptMedia, uaOverride)
						const jadimg = await uploadImages(mediaData, false)
						aruga.sendImageAsSticker(from, `http://lolhuman.herokuapp.com/api/removebg?apikey=${lolhuman}&img=${jadimg}`, StickerMetadata)
					} else {
						aruga.reply(from, `Reply/post foto dengan caption ${prefix}nobg`, id)
					}
					break
				case prefix + 'textmaker':
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const textbot = body.slice(11)
						const skruap = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(skruap, uaOverride)
						const imgs = await uploadImages(mediaData, false)
						aruga.sendImageAsSticker(from, `https://api.memegen.link/images/custom/_/${textbot}.png?background=${imgs}`, StickerMetadata)
					} else {
						aruga.reply(from, 'Reply fotonya om', id)
					}
					break
				case prefix + 'imagetourl':
				case prefix + 'imgtourl':
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const encryptMedia = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encryptMedia, uaOverride)
						const linkImg = await uploadImages(mediaData, false)
						await aruga.reply(from, linkImg, id)
					} else {
						await aruga.reply(from, 'Format pesan salah...', id)
					}
					break
				case prefix + 'pinterest2':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}pinterest2 link url`, id)
					const argim = body.slice(12)
					axios.get(`http://docs-jojo.herokuapp.com/api/pinterest?url=${argim}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result, 'pin.mp4', '', id)
						})
					break
				case prefix + 'pinterest':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}pinterest link pinterest`, id)
					const pinUrl = body.slice(11)
					aruga.reply(from, mess.wait, id)
					axios.get(`https://api.vhtear.com/pinterestdl?link=${pinUrl}&apikey=${vhtearkey}`)
						.then(async (res) => {
							const datres = res.data.result
							await aruga.sendFileFromUrl(from, datres.fileUrl, 'pin.mp4', '', id)
							await aruga.sendStickerfromUrl(from, datres.fileUrl, 'pin.gif', '', id)
								.catch((err) => {
									aruga.reply(from, 'Error!', id)
								})
								.catch((err) => {
									aruga.reply(from, 'Error', id)
								})
						})
					break
				case prefix + 'ig':
				case prefix + 'instagram':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}ig [linkIg]*`, id)
					const igUrl = body.slice(4)
					axios.get(`https://zekais-api.herokuapp.com/igdl?url=${igUrl}`)
						.then(async (res) => {
							if (res.data.result[0].type == 'image') {
								aruga.sendFileFromUrl(from, res.data.result[0].url, 'ig.jpg', '', id)
							} else if (res.data.result[0].type == 'video') {
								await aruga.sendFileFromUrl(from, res.data.resul[0].url, 'ig.mp4', `*from: ${res.data.result.username}*\n*fullname: ${res.data.result.fullname}*\n*caption: ${res.data.result.caption}*`, id)
							} else {
								aruga.reply(from, 'Terjadi kesalahan', id)
							}
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, `Error\nSilahkan gunakan ${prefix}ig2 atau ${prefix}postigurl`, id)
						})
					break
				case prefix + 'doujin':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					if (args.length == 0) return aruga.reply(from, `Mencari doujin gunakan ${prefix}doujin judul\nContoh : ${prefix}doujin my sister`, id)
					const doujsearch = body.slice(8)
					const douj = await axios.get(`https://h4ck3rs404-api.herokuapp.com/api/doujin?q=${doujsearch}&apikey=${hackapi}`)
					const doujdata = douj.data
					if (doujdata.status == false) return aruga.reply(from, `Judul yang kamu cari tidak dapat ditemukan`, id)
					const { result } = await doujdata
					let doujtext = `*「  D O U J I N  」*\n`
					for (let i = 0; i < result.length; i++) {
						doujtext = + `\n─────────────────\n\n*•Judul:* ${result[i].title}\n*•Rating:* ${result[i].rating}\n*•Status:* ${result[i].status}\n*•Url:* ${result[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, doujtext, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Terjadi kesalahan, coba lagi nanti')
						})
					break
				case prefix + 'nhpdf':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (args.length == 0) return aruga.reply(from, `Kode nuklir tidak ditemukan\nUsage : ${prefix}nhpdf 20935`, id)
					rugaapi.nhpdf(args)
						.then(async (res) => {
							if (!isPrem && !isOwnerB) return aruga.reply(from, `Karena anda bukan user Premium, silahkan download menggunakan link\nLink: ${res.pdf_file}`, id)
							await aruga.sendFileFromUrl(from, `${res.pdf_file}`, '', `${res.title}`, id)
						})
						.catch(() => {
							aruga.reply(from, 'Error', id)
						})
					break
				case prefix + 'asupan6':
					aruga.reply(from, mess.wait, id)
					fetch('http://sansekai.my.id/sansekai.txt')
						.then(res => res.text())
						.then(body => {
							let asupantxt = body.split('\n')
							let asupanvid = asupantxt[Math.floor(Math.random() * asupantxt.length)]
							aruga.sendFileFromUrl(from, asupanvid, 'asupan.mp4', 'aahh wangy wangy', id)
								.then(() => console.log('Success sending Asupan Video'))
						})
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'asupan5':
					aruga.reply(from, mess.wait, id)
					axios.get(`http://lolhuman.herokuapp.com/api/asupan?apikey=${lolhuman}`)
						.then(async (res) => {
							if (res.data.status == 404) return aruga.reply(from, res.data.message, id)
							await aruga.sendFileFromUrl(from, res.data.result, `asupan.mp4`, `*R A N D O M  A S U P A N*`, id)
						})
						.catch(err => {
							aruga.reply(from, err.data, id)
						})
					break
				case prefix + 'asupan4':
					aruga.reply(from, mess.wait, id)
					axios.get(`http://zekais-api.herokuapp.com/ptlvid`)
						.then(async (res) => {
							aruga.sendFileFromUrl(from, res.data.result, '', '*R A N D O M  A S U P A N*', id)
								.catch(() => {
									console.log(err)
									aruga.reply(from, 'Error bang', id)
								})
						})
						.catch(err => {
							aruga.reply(from, 'Error bang', id)
						})
					break
				case prefix + 'asupanukhty':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/asupan/asupanukhty?apikey=${dapuhyapi}`, 'vid.mp4', '', id)
					break
				case prefix + 'asupan3':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/asupan/asupanbocil?apikey=${dapuhyapi}`, 'asupan.mp4', '', id)
					break
				case prefix + 'asupan2':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/asupan/asupansantuy?apikey=${dapuhyapi}`, 'vid.mp4', '', id)
					break
				case prefix + 'asupan':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/asupan/asupan?apikey=${dapuhyapi}`, 'vid.mp4', '', id)
					break
				/*case prefix+'ranal':
				aruga.reply(from, mess.wait, id)
				axios.get(`https://onlydevcity.herokuapp.com/api/asupanrana?apikey=${onlydev}`)
				.then(async(res) => {
					aruga.sendFileFromUrl(from, res.data.result.url, 'ranal.mp4', 'nihh Asupan Ranal Haddar', id)
					.catch(() => {
						aruga.reply(from, 'Error! mungkin server api sedang down', id)
					})
				})
				.catch(err => {
					console.log(err)
					aruga.reply(from, 'Errorr nich', id)
				})
				break
				case prefix+'kaiahelga':
				aruga.reply(from, mess.wait, id)
				axios.get(`https://onlydevcity.herokuapp.com/api/asupankaia?apikey=${onlydev}`)
				.then(async(res) => {
					aruga.sendFileFromUrl(from, res.data.result.url, 'kaia.mp4', 'nihh asupan Kaia Helga', id)
					.catch(() => {
						aruga.reply(from, mess.wait, id)
					})
				})
				.catch((err) => {
					console.log(err)
					aruga.reply(from, 'Lagi error', id)
				})
				break
				case prefix+'unaa':
				case prefix+'una':
				aruga.reply(from, mess.wait, id)
				axios.get(`https://onlydevcity.herokuapp.com/api/asupanuna?apikey=${onlydev}`)
				.then(async(res) => {
					aruga.sendFileFromUrl(from, res.data.result.url, 'unaa.mp4', 'nihh asupan Unaa', id)
					.catch(() => {
						aruga.reply(from, 'Lagi error', id)
					})
				})
				.catch(err => {
					console.log(err)
					aruga.reply(from, 'Errorrrrrr', id)
				})
				break*/
				case prefix + 'gheayoubi':
				case prefix + 'ghea':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://dapuhy-api.herokuapp.com/api/asupan/asupanghea?apikey=${dapuhyapi}`, 'ghea.mp4', '', id)
					break
				/*	case prefix+'jessicajane':
					case prefix+'jessica':
					case prefix+'jane':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://onlydevcity.herokuapp.com/api/asupanjane?apikey=${onlydev}`)
					.then(async(res) => {
						aruga.sendFileFromUrl(from, res.data.result.url, 'jes.mp4', 'nihh asupan Jessica Jane', id)
						.catch(() => {
							aruga.reply(from, 'Lagi error nih, server api sedang down kali', id)
						})
					})
					.catch(err => {
						console.log(err)
						aruga.reply(from, 'Lagi error', id)
					})
					break
					case prefix+'salwa':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://onlydevcity.herokuapp.com/api/asupansalwa?apikey=${onlydev}`)
					.then(async(res) => {
						aruga.sendFileFromUrl(from, res.data.result.url, 'salwa.mp4', 'nih asupann Salwa', id)
						.catch(() => {
							aruga.reply(from, 'Error, mungkin server api sedang down', id)
						})
					})
					.catch(err => {
						console.log(err)
						aruga.reply(from, 'Server api sedang down', id)
					})
					break
					case prefix+'ruby':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://onlydevcity.herokuapp.com/api/asupanruby?apikey=${onlydev}`)
					.then(async(res) => {
						aruga.sendFileFromUrl(from, res.data.result.url, 'ruby.mp4', 'nih asupan Ruby!', id)
						.catch(() => {
							aruga.reply(from, 'Error, mungkin server api sedang down', id)
						})
					})
					.catch(err => {
						console.log(err)
						aruga.reply(from, 'Lagi error', id)
					})
					break
					case prefix+'fahriskroep':
					case prefix+'fahri':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://onlydevcity.herokuapp.com/api/lordfahri?apikey=${onlydev}`)
					.then(async(res) => {
						aruga.sendFileFromUrl(from, res.data.result.url, 'fahri.mp4', 'nihh lord fahri skroepp', id)
						.catch(() => {
							aruga.reply(from, 'Error, mungkin server api sedang down', id)
						})
					})
					.catch(err => {
						console.log(err)
						aruga.reply(from, 'lagi error', id)
					})
					break*/
				case prefix + 'bioskop':
					if (args.length == 0) return aruga.reply(from, `Fitur untuk mencari bioskop yang ada dikota Kalian\nGunakan ${prefix}bioskop nama kota\nContoh: ${prefix}bioskop Pontianak`, id)
					const namabis = body.slice(9)
					try {
						const forbis = await fetch(`http://docs-jojo.herokuapp.com/api/bioskop?kota=${namabis}`)
						const fordat = await forbis.json()
						const { result } = await fordat
						let namabisa = `*「 BIOSKOP 」*\n`
						for (let i = 0; i < result.length; i++) {
							namabisa += `\n─────────────────\n\n*•Nama:* ${result[i].title}\n*•Alamat:* ${result[i].alamat}\n*•Bintang:* ${result[i].bintang}\n*•Url:* ${result[i].url}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].img, 'img.jpg', namabisa, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Error bang', id)
					}
					break
				case prefix + 'jadwaltvnow':
					aruga.reply(from, mess.wait, id)
					axios.get(`http://docs-jojo.herokuapp.com/api/jadwaltvnow`)
						.then(async (res) => {
							const nihcp = `*•Jam:* ${res.data.result.jam}\n\n*•Jadwal TV:* ${res.data.result.jadwalTV}`
							aruga.reply(from, nihcp, id)
								.catch(() => {
									aruga.reply(from, 'Error nih bang, mungkin server sedang maintenance', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'sindiran':
					axios.get(`https://leyscoders-api.herokuapp.com/api/skak?apikey=${leysapi}`)
						.then(async (res) => {
							aruga.reply(from, res.data.result, id)
								.catch(() => {
									aruga.reply(from, 'Maaf terjadi kesalahan, mungkin website sedang maintenance', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Terjadi kesalahan, silahkan coba ulangi', id)
						})
					break
				case prefix + 'infoloker':
					aruga.reply(from, mess.wait, id)
					try {
						const infolok = await fetch(`http://docs-jojo.herokuapp.com/api/infoloker`)
						const bejson = await infolok.json()
						const { result } = await bejson
						let infonich = `*「 INFO LOKER 」*\n`
						for (let i = 0; i < result.length; i++) {
							infonich += `\n─────────────────\n\n*•Nama Perusahaan:* ${result[i].perusahaan}\n*•Profesi:* ${result[i].profesi}\n*•Lokasi:* ${result[i].lokasi}\n*•Gaji:* ${result[i].gaji}\n*•Pengalaman:* ${result[i].pengalaman}\n*•Job Function:* ${result[i].jobFunction}\n*•Level Karir:* ${result[i].levelKarir}\n*•Edukasi:* ${result[i].edukasi}\n*•Syarat:* ${result[i].syarat}\n*•Link:* ${result[i].link}\n*•Deskripsi:* ${result[i].desc}\n`
						}
						await aruga.reply(from, infonich, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Terjadi kesalahan nich', id)
					}
					break
				case prefix + 'jadwaltv':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari jadwal sebuah channel tv, gunakan ${prefix}jadwaltv nama channel\nContoh: ${prefix}jadwaltv trans7\n${prefix}jadwaltv gtv`, id)
					const tvsearch = body.slice(10)
					aruga.reply(from, mess.wait, id)
					try {
						const fortv = await fetch(`http://docs-jojo.herokuapp.com/api/jadwaltv?ch=${tvsearch}`)
						const tojson = await fortv.json()
						const { result } = await tojson
						let betv = `*「 JADWAL TV ${tvsearch} 」*\n`
						for (let i = 0; i < result.length; i++) {
							betv += `\n${result[i]}\n`
						}
						await aruga.reply(from, betv, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Tv yang anda cari tidak tersedia`, id)
					}
					break
				case prefix + 'lk21new':
					aruga.reply(from, mess.wait, id)
					try {
						const new21 = await axios.get(`https://api-lk21.herokuapp.com/newupload`)
						const new2 = new21.data
						const { result } = new2
						let nw21 = `*「 LK21 NEW 」*\n`
						for (let i = 0; i < result.length; i++) {
							nw21 += `\n─────────────────\n\n*•Title:* ${result[i].title}\n*•Genre:* ${result[i].genre}\n*•Rating:* ${result[i].rating}\n*•Duration:* ${result[i].duration}\n*•Quality:* ${result[i].quality}\n*•Streaming:* ${result[i].watch}\n*•Trailer:* ${result[i].trailer}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumbnail, 'img.jpg', nw21, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Lagi Error', id)
					}
					break
				case prefix + 'lk21comingsoon':
					aruga.reply(from, mess.wait, id)
					try {
						const nws = await axios.get(`https://api-lk21.herokuapp.com/comingsoon`)
						const nwsa = nws.data
						const { result } = nwsa
						let nwss = `*「 LK21 COMING SOON 」*\n`
						for (let i = 0; i < result.length; i++) {
							nwss += `\n─────────────────\n\n*•Title:* ${result[i].title}\n*•Genre:* ${result[i].genre}\n*•Rating:* ${result[i].rating}\n*•Duration:* ${result[i].duration}\n*•Quality:* ${result[i].quality}\n*•Streaming:* ${result[i].watch}\n*•Trailer:* ${result[i].trailer}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumbnail, 'img.jpg', nwss, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Terjadi kesalahan, silahkan coba lagi nanti', id)
					}
					break
				case prefix + 'lk21seriestv':
					aruga.reply(from, mess.wait, id)
					try {
						const nwsx = await axios.get(`https://api-lk21.herokuapp.com/tv`)
						const nwsax = nwsx.data
						const { result } = nwsax
						let nwsz = `*「 LK21 SERIES TV 」*\n`
						for (let i = 0; i < result.length; i++) {
							nwsz += `\n─────────────────\n\n*•Title:* ${result[i].title}\n*•Genre:* ${result[i].genre}\n*•Rating:* ${result[i].rating}\n*•Duration:* ${result[i].duration}\n*•Quality:* ${result[i].quality}\n*•Streaming:* ${result[i].watch}\n*•Trailer:* ${result[i].trailer}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumbnail, 'img.jpg', nwsz, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Terjadi kesalahan, silahkan coba lagi nanti', id)
					}
					break
				case prefix + 'lk21negara':
					if (args.length == 0) return aruga.reply(from, `Mencari sebuah film berdasarkan negara, gunakan ${prefix}lk21negara negara\nContoh: ${prefix}lk21negara usa`, id)
					const tipex = body.slice(12)
					aruga.reply(from, mess.wait, id)
					try {
						const aish = await axios.get(`http://api-lk21.herokuapp.com/country?country=${tipex}`)
						const iash = aish.data
						const { result } = iash
						let nwsz = `*「 LK21 COUNTRY 」*\n`
						for (let i = 0; i < result.length; i++) {
							nwsz += `\n─────────────────\n\n*•Title:* ${result[i].title}\n*•Genre:* ${result[i].genre}\n*•Rating:* ${result[i].rating}\n*•Duration:* ${result[i].duration}\n*•Quality:* ${result[i].quality}\n*•Streaming:* ${result[i].watch}\n*•Trailer:* ${result[i].trailer}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumbnail, 'img.jpg', nwsz, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Film negara ${tipex} tidak ada didalam website`, id)
					}
					break
				case prefix + 'lk21genre':
					if (args.length == 0) return aruga.reply(from, `Mencari sebuah film berdasarkan genre, gunakan ${prefix}lk21genre genrenya\nContoh: ${prefix}lk21genre action`, id)
					const tipe = body.slice(11)
					aruga.reply(from, mess.wait, id)
					try {
						const nwz = await axios.get(`http://api-lk21.herokuapp.com/genre?genre=${tipe}`)
						const nwa = nwz.data
						const { result } = nwa
						let nwsz = `*「 LK21 GENRE 」*\n`
						for (let i = 0; i < result.length; i++) {
							nwsz += `\n─────────────────\n\n*•Title:* ${result[i].title}\n*•Genre:* ${result[i].genre}\n*•Rating:* ${result[i].rating}\n*•Duration:* ${result[i].duration}\n*•Quality:* ${result[i].quality}\n*•Streaming:* ${result[i].watch}\n*•Trailer:* ${result[i].trailer}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumbnail, 'img.jpg', nwsz, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Genre ${tipe} tidak ada didalam website!`, id)
					}
					break
				case prefix + 'faktaunik':
					aruga.reply(from, mess.wait, id)
					fetchJson('https://docs-jojo.herokuapp.com/api/fakta-unik')
						.then(async (res) => {
							aruga.reply(from, res.result, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Sedang error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.data, id)
						})
					break
				case prefix + 'ytplaylist':
				case prefix + 'playlistyt':
					if (args.length == 0) return aruga.reply(from, `mencari sebuah playlist dari youtube gunakan ${prefix}ytplaylist nama playlist\nContoh: ${prefix}ytplaylist good taste music`, id)
					const playlists = body.slice(12)
					aruga.reply(from, mess.wait, id)
					try {
						const ytplays = await fetchJson(`https://api.zeks.xyz/api/ytplaylist?apikey=${apikeyvinz}&q=${playlists}`)
						if (ytplays.status == false) return aruga.reply(from, 'Playlist yang anda cari tidak ada', id)
						const { result } = await ytplays
						let playsyt = `*「 YOUTUBE  PLAYLISTS  」*\n`
						for (let i = 0; i < result.length; i++) {
							playsyt += `\n─────────────────\n\n*•Playlist Name:* ${result[i].title}\n*•Video Count:* ${result[i].video_count}\n*•Playlist ID:* ${result[i].id}\n*•Username:* ${result[i].uploader.username}\n*Playlist Url:* ${result[i].url}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumbnail, 'thumbnail.jpg', playsyt, id)
					} catch (err) {
						console.log(err)
					}
					break
				case prefix + 'indoxxi':
					if (args.length == 0) return aruga.reply(from, `Mencari film dari website indoxxi, gunakan ${prefix}indoxxi judul film`, id)
					const inxxi = body.slice(9)
					aruga.reply(from, mess.wait, id)
					try {
						const indoxxii = await axios.get(`https://h4ck3rs404-api.herokuapp.com/api/film/indoxxi?q=${inxxi}&apikey=${hackapi}`)
						const indodata = indoxxii.data
						if (indodata.status == false) return aruga.reply(from, 'Film yang kamu cari tidak ada', id)
						const { result } = await indodata
						let indotext = `*「 INDO XXI  」*\n`
						for (let i = 0; i < result.length; i++) {
							indotext += `\n─────────────────\n\n*•Title:* ${result[i].judul}\n*•Duration:* ${result[i].durtion}\n*•Rating:* ${result[i].rating}\n*•Quality:* ${result[i].quality}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumb, 'thumb.jpg', indotext, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, err.message, id)
					}
					break
				case prefix + 'r18+':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					fetchJson(`https://h4ck3rs404-api.herokuapp.com/api/randomp?apikey=${hackapi}`)
						.then(async (res) => {
							if (res.status == false) return aruga.reply(from, 'something wrong, i can feel it:v', id)
							await aruga.sendFileFromUrl(from, res.result.url, '', `${pushname} mesum`, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'something wrong i can feel it:v', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'something wrong i can feel it:v', id)
						})
					break
				case prefix + 'trendfilm':
				case prefix + 'trendingfilm':
				case prefix + 'filmtrending':
				case prefix + 'filmtrend':
					aruga.reply(from, mess.wait, id)
					try {
						const trendata = await axios.get(`https://h4ck3rs404-api.herokuapp.com/api/news/filmtrending?apikey=${hackapi}`)
						const trenjs = trendata.data
						if (trenjs.status == false) return aruga.reply(from, 'Film yang kamu cari ngga ada', id)
						const { result } = await trenjs
						let trenword = `*「 TRENDING FILM  」*\n`
						for (let i = 0; i < result.length; i++) {
							trenword += `\n─────────────────\n\n*•Film:* ${result[i].title}\n*•Rank:* ${result[i].rank}\n*•Views:* ${result[i].penonton}\n*•Url:* ${result[i].link}\n`
						}
						await aruga.reply(from, trenword, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Terjadi kesalahan, silahkan coba lagi', id)
					}
					break
				case prefix + 'lk21':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari sebuah film dari website LK21, gunakan ${prefix}lk21 judul film`, id)
					const lksearch = body.slice(6)
					aruga.reply(from, mess.wait, id)
					try {
						const forlk21 = await axios.get(`http://api-lk21.herokuapp.com/search?query=${lksearch}`)
						const likejs = forlk21.data
						const { result } = await likejs
						let elka = `*「 LK 21 」*\n`
						for (let i = 0; i < result.length; i++) {
							elka += `\n─────────────────\n\n*•Judul:* ${result[i].title}\n*•Rating:* ${result[i].rating}\n*•Durasi:* ${result[i].duration}\n*•Genre:* ${result[i].genre}\n*•Streaming:* ${result[i].watch}\n*•Trailer:* ${result[i].trailer}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumbnail, 'thumb.jpg', elka, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Film ${lksearch} tidak ada diwebsite`, id)
					}
					break
				case prefix + 'drakorupdate':
					aruga.reply(from, mess.wait, id)
					try {
						const latest = await axios.get(`http://zekais-api.herokuapp.com/drakorlatest`)
						const belasts = latest.data
						if (belasts.status == 500) return aruga.reply(from, res.message, id)
						const { result } = belasts
						let latestdrak = `*「 DRAKOR UPDATE 」*\n`
						for (let i = 0; i < result.length; i++) {
							latestdrak += `\n─────────────────\n\n*•Title:* ${result[i].name}\n*•Uploaded:* ${result[i].upload}\n*•Tag:* ${result[i].tag}\n*•Content:* ${result[i].conten}\n\n*•Link Streaming:* ${result[i].url}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumb, 'korea.jpg', latestdrak, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Lagi error', id)
					}
					break
				case prefix + 'drakorapik':
					await aruga.reply(from, mess.wait, id)
					try {
						const apikdrak = await axios.get(`http://zekais-api.herokuapp.com/filmapikdrama`)
						const apikkz = apikdrak.data
						const { result } = apikkz
						let bedrak = `*「 FILM APIK DRAKOR 」*\n`
						for (let i = 0; i < result.length; i++) {
							bedrak += `\n─────────────────\n\n*•Judul:* ${result[i].name}\n*•Episode:* ${result[i].episode}\n*•Stars:* ${result[i].star}\n*•Url:* ${result[i].url}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumb, 'thumb.jpg', bedrak, id)
					} catch (err) {
						aruga.reply(from, 'Lagi error', id)
					}
					break
				case prefix + 'drakor':
					if (args.length == 0) return aruga.reply(from, `Mencari drakor gunakan ${prefix}drakorasia judul`, id)
					const caridrakor = body.slice(8)
					aruga.reply(from, mess.wait, id)
					try {
						const juduldrakor = await axios.get(`http://zekais-api.herokuapp.com/drakor?query=${caridrakor}`)
						const anjays = juduldrakor.data
						if (anjays.status == 500) return aruga.reply(from, anjays.message, id)
						const { download } = anjays
						let inidrakor = `*•Judul:* ${anjays.title}\n*•Genre:* ${anjays.genre}\n*•Tayang:* ${anjays.tayang}\n*•Director:* ${anjays.director}\n*•Total Episodes:* ${anjays.total_episode}\n*•Sinopsis:* ${anjays.sinopsis}\n`
						for (let i = 0; i < download.length; i++) {
							inidrakor += `\n─────────────────\n\n*•Nama:* ${download[i].name}\n\n*•Zippyshare:* ${download[i].Zippyshare}\n\n*•MirrorDrive:* ${download[i].MirrorDrive}\n\n*•Uptocloud:* ${download[i].Uptocloud}\n\n`
						}
						await aruga.sendFileFromUrl(from, anjays.thumb, 'drakor.jpg', inidrakor, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Drakor yang anda cari tidak ada', id)
					}
					break
				case prefix + 'manga':
					if (args.length == 0) return aruga.reply(from, 'Judulnya mana?', id)
					const mangasearch = body.slice(7)
					aruga.reply(from, mess.wait, id)
					try {
						const mangax = await axios.get(`https://onlydevcity.herokuapp.com/api/manga?search=${mangasearch}&apikey=${onlydev}`)
						const mangas = mangax.data.result
						const { downloads } = mangas
						let mangi = `*•Judul:* ${mangas.title}\n*•Nama:* ${mangas.name}\n*•Type:* ${mangas.type}\n*•Genre:* ${mangas.genre}\n*•Rating:* ${mangas.rating}\n*•Author:* ${mangas.author}\n*•Released Year:* ${mangas.released}\n*•Status:* ${mangas.status}\n*•Note:* ${mangas.note}\n*•Description:* ${mangas.description[0]}\n`
						for (let i = 0; i < downloads.length; i++) {
							mangi += `\n─────────────────\n\n*•Web:* ${downloads[i].title}\n*•Detail:* ${downloads[i].date}\n*•Link:* ${downloads[i].link}\n`
						}
						await aruga.reply(from, mangi, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Manga yang anda cari tidak ada', id)
					}
					break
				case prefix + 'topanime':
					aruga.reply(from, mess.wait, id)
					try {
						const topan = await axios.get(`https://onlydevcity.herokuapp.com/api/anime/topanime?apikey=${onlydev}`)
						const topani = topan.data.result
						const { data } = topani
						let topis = `*「 TOP ANIME 」*\n`
						for (let i = 0; i < data.length; i++) {
							topis += `\n─────────────────\n\n*•Title:* ${data[i].title}\n*•Studio:* ${data[i].studio}\n*•Peak:* ${data[i].stats.peak}\n*•Previously:* ${data[i].stats.previously}\n*•Weeks On Top:* ${data[i].stats.weeksOnTop}\n*•Status:* ${data[i].stats.status}\n*•Stats:* ${data[i].stats.stat}\n`
						}
						await aruga.sendFileFromUrl(from, data[0].imageUrl, 'image.jpg', topis, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Lagi error', id)
					}
					break
				case prefix + 'filmkat':
					if (args.length == 0) return aruga.reply(from, `Mencari sebuah kategori film dari website Film Apik, Gunakan ${prefix}filmkat kategori\nContoh: ${prefix}filmkat comedy\n\nGunakan bahasa inggris buat kategorinya`, id)
					const katsearch = body.slice(9)
					aruga.reply(from, mess.wait, id)
					try {
						const forkat = await axios.get(`https://api-filmapik.herokuapp.com/category?search=${katsearch}`)
						const bekat = forkat.data
						const { result } = await bekat
						let kat = `*「 FILM APIK CATEGORY 」*\n`
						for (let i = 0; i < result.length; i++) {
							kat += `\n─────────────────\n\n*•Title:* ${result[i].title}\n*•Rating:* ${result[i].rating}\n*•Quality:* ${result[i].quality}\n*•Id:* ${result[i].movieId}\n*•Views:* ${result[i].detail.views}\n*•Genre:* ${result[i].detail.genre}\n*•Director:* ${result[i].detail.director}\n*•Actors:* ${result[i].detail.actors}\n*•Country:* ${result[i].detail.country}\n*•Duration:* ${result[i].detail.duration}\n*•Released Year:* ${result[i].detail.release}\n*•Description:* ${result[i].detail.description}\n`
						}
						const thumbnailpot = result[0].thumbnailPotrait
						const thumbnailscp = result[0].detail.thumbnailLandscape
						if (thumbnailscp == '' || thumbnailscp == undefined || thumbnailscp == null) {
							var pfps = thumbnailpot
						} else {
							var pfps = thumbnailscp
						}
						await aruga.sendFileFromUrl(from, pfps, 'img.jpg', kat, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Kategori yang anda cari tidak ada didalam Website!`, id)
					}
					break
				case prefix + 'filmapiknew':
					aruga.reply(from, mess.wait, id)
					try {
						const forkats = await axios.get(`https://api-filmapik.herokuapp.com/latest`)
						const bekats = forkats.data
						const { result } = await bekats
						let kat = `*「 FILM APIK TERBARU 」*\n`
						for (let i = 0; i < result.length; i++) {
							kat += `\n─────────────────\n\n*•Title:* ${result[i].title}\n*•Rating:* ${result[i].rating}\n*•Quality:* ${result[i].quality}\n*•Id:* ${result[i].movieId}\n*•Views:* ${result[i].detail.views}\n*•Genre:* ${result[i].detail.genre}\n*•Director:* ${result[i].detail.director}\n*•Actors:* ${result[i].detail.actors}\n*•Country:* ${result[i].detail.country}\n*•Duration:* ${result[i].detail.duration}\n*•Released Year:* ${result[i].detail.release}\n*•Description:* ${result[i].detail.description}\n`
						}
						const thumbnailpots = result[0].thumbnailPotrait
						const thumbnailscps = result[0].detail.thumbnailLandscape
						if (thumbnailscps == '' || thumbnailscps == undefined) {
							var pfpz = thumbnailpots
						} else {
							var pfpz = thumbnailscps
						}
						await aruga.sendFileFromUrl(from, pfpz, 'img.jpg', kat, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Terjadi kesalahan pada sistem, silahkan coba lagi nanti`, id)
					}
					break
				case prefix + 'film':
					if (args.length == 0) return aruga.reply(from, `Format salah!\nKirim perintah ${prefix}film [judul film]\nContoh : ${prefix}film the conjuring`, id)
					const carifilm = body.slice(6)
					await aruga.reply(from, mess.wait, id)
					try {
						const filmlk = await axios.get(`https://api.vhtear.com/downloadfilm?judul=${carifilm}&apikey=${vhtearkey}`)
						const filmdata = filmlk.data.result
						const { data } = filmdata
						let lkfl = `*「 FILM 」*\n`
						for (let i = 0; i < data.length; i++) {
							lkfl += `\n─────────────────\n\n*•Resolusi:* ${data[i].resolusi}\n*•Url Download:* ${data[i].urlDownload}\n`
						}
						await aruga.reply(from, lkfl, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Film yang anda cari tidak ada didalam Website!`, id)
					}
					break
				case prefix + 'filmapik':
					if (args.length == 0) return aruga.reply(from, `Mencari sebuah film dari Website Film Apik!\nContoh : ${prefix}filmapik Revolutionary Love`, id)
					await aruga.reply(from, mess.wait, id)
					const pilem = body.slice(10)
					try {
						const scpik = await axios.get(`https://api-filmapik.herokuapp.com/search?q=${pilem}`)
						const apikjson = scpik.data
						const { result } = await apikjson
						let iniapik = `*「 FILM APIK 」*\n`
						for (let i = 0; i < result.length; i++) {
							iniapik += `\n─────────────────\n\n*•Title:* ${result[i].title}\n*•Rating:* ${result[i].rating}\n*•Quality:* ${result[i].quality}\n*•Episode:* ${result[i].episode}\n*•Id:* ${result[i].movieId}\n*•Views:* ${result[i].detail.views}\n*•Genre:* ${result[i].detail.genre}\n*•Duration:* ${result[i].detail.duration}\n*•Director:* ${result[i].detail.director}\n*•Actors:* ${result[i].detail.actors}\n*•Country:* ${result[i].detail.country}\n*•Released Year:* ${result[i].detail.release}\n*•Description:* ${result[i].detail.description}\n`
						}
						const thportrait = result[0].thumbnailPotrait
						const thlandscape = result[0].detail.thumbnailLandscape
						if (thlandscape == '' || thlandscape == undefined) {
							var thp = thportrait
						} else {
							var thp = thlandscape
						}
						await aruga.sendFileFromUrl(from, thp, 'img.jpg', iniapik, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Film yang anda cari tidak ada didalam website`, id)
					}
					break
				case prefix + 'randomkpop':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://tobz-api.herokuapp.com/api/randomkpop?apikey=${tobzapi}`)
						.then(async (res) => {
							aruga.sendFileFromUrl(from, res.data.result, 'img.jpg', `nehh ${pushname}`, id)
								.catch(() => {
									aruga.reply(from, 'Error, mungkin server sedang maintenance', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'drakorindo':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari drakor dari website Drakor Indo, gunakan ${prefix}drakorindo judul drakor`, id)
					const scdrak = body.slice(12)
					aruga.reply(from, mess.wait, id)
					try {
						const respo1 = await fetch(`https://tobz-api.herokuapp.com/api/drakorindo?q=${scdrak}&apikey=${tobzapi}`)
						const respo11 = await respo1.json()
						const { result } = await respo11
						let drk = `*「 DRAKOR INDO 」*\n`
						for (let i = 0; i < result.length; i++) {
							drk += `\n─────────────────\n\n• *Judul:* ${result[i].title}\n• *Upload:* ${result[i].upload}\n• *Link:* ${result[i].link}\n• *Sinopsis:* ${result[i].sinopsis}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].image, 'img.jpg', drk, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Drakor yang anda cari tidak ada didalam website`, id)
					}
					break
				case prefix + 'doramaindo':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari drakor dari website Dorama Indo, Gunakan ${prefix}doramaindo judul drakor`, id)
					const draksc = body.slice(12)
					aruga.reply(from, mess.wait, id)
					try {
						const resp1 = await fetch(`https://tobz-api.herokuapp.com/api/doramaindo?q=${draksc}&apikey=${tobzapi}`)
						const resp11 = await resp1.json()
						const { result } = await resp11
						let doramax = `*「 DORAMA INDO 」*\n`
						for (let i = 0; i < result.length; i++) {
							doramax += `\n─────────────────\n\n• *Judul:* ${result[i].title}\n• *Genre:* ${result[i].genre}\n• *Status:* ${result[i].status}\n• *Link:* ${result[i].link}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].image, 'img.jpg', doramax, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Drakor yang anda cari tidak tersedia diwebsite`, id)
					}
					break
				case prefix + 'xnxx':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					if (args.length == 0) return aruga.reply(from, `Mendapatkan detail video dari website xnxx, Gunakan ${prefix}xnxx link\nContoh: ${prefix}xnxx https://www.xnxx.com/video-kt0nb99/who_is_she_big_hot_girl_asia_japan_korean_jav`, id)
					const pcas = body.slice(6)
					axios.get(`http://lolhuman.herokuapp.com/api/xnxx?apikey=${lolhuman}&url=${pcas}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result.thumbnail, 'img.jpg', `「 *XNXX* 」\n\n*Title:* ${res.data.result.title}\n*Duration:* ${res.data.result.duration}\n*Views:* ${res.data.result.view}\n*Rating:* ${res.data.result.rating}\n*Like:* ${res.data.result.like}\n*Dislike:* ${res.data.result.dislike}\n*Comment:* ${res.data.result.comment}`, id)
							const inihasilvid = res.data.result.link[1].link
							await aruga.sendFileFromUrl(from, inihasilvid, 'vid.mp4', '', id)
								.catch(() => {
									aruga.reply(from, 'Url salah, silahkan masukkan url yang benar', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'xnxxsearch':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					if (args.length == 0) return aruga.reply(from, `Mencari video dari website XNXX, Gunakan ${prefix}xnxxsearch judul\nContoh: ${prefix}xnxxsearch japan`, id)
					const xsch = body.slice(12)
					aruga.reply(from, mess.wait, id)
					try {
						const fucth = await axios.get(`https://h4ck3rs404-api.herokuapp.com/api/xnxx-search?q=${xsch}&apikey=${hackapi}`)
						const fucth2 = fucth.data
						const { result } = fucth2
						let xsz = `*「 XNXX 」*\n`
						for (let i = 0; i < result.length; i++) {
							xsz += `\n─────────────────\n\n• *Title:* ${result[i].judul}\n• *Views:* ${result[i].viewers}\n• *Info:* ${result[i].info}\n• *Url:* ${result[i].url}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].thumb, 'thumb.jpg', xsz, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, `Mungkin hasil pencarian yang anda inginkan tidak ada didalam website`, id)
					}
					break
				case prefix + 'tebakanime':
					const animesoal = await fetchJson(`https://h4ck3rs404-api.herokuapp.com/api/kuis/tebakanime?apikey=${hackapi}`)
					if (animesoal.status == false) return aruga.reply(from, 'Lagi error', id)
					const imageanime = animesoal.result.image
					const jawabananime = `Result : ${animesoal.result.name}\nDeskripsi : ${animesoal.result.desc}`
					aruga.sendFileFromUrl(from, imageanime, 'image.jpg', `Tebak chara apa ini`, id)
					await sleep(10000)
					aruga.sendText(from, '_30 detik lagi_')
					await sleep(10000)
					aruga.sendText(from, '_20 detik lagi_')
					await sleep(10000)
					aruga.sendText(from, '_10 detik lagi_')
					await sleep(10000)
					aruga.reply(from, jawabananime, id)
					break
				case prefix + 'phsearch':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					if (args.length == 0) return aruga.reply(from, `Mencari bokep dari website Pornhub, gunakan ${prefix}phsearch judul\nContoh: ${prefix}phsearch step sister`, id)
					const phword = body.slice(10)
					aruga.reply(from, mess.wait, id)
					const phapi = await axios.get(`https://h4ck3rs404-api.herokuapp.com/api/phub-search?q=${phword}&apikey=${hackapi}`)
					const phdata = phapi.data
					if (phdata.status == false) return aruga.reply(from, 'Film yang anda cari tidak dapat ditemukan', id)
					const pornhubb = phdata.result
					let phtext = `*「 P O R N H U B 」*\n`
					for (let i = 0; i < pornhubb.length; i++) {
						phtext += `\n─────────────────\n\n•*Title:* ${result[i].title}\n•*Views:* ${result[i].views}\n•*Channel:* ${result[i].author}\n•*Uploaded:* ${result[i].publish}\n•*Url:* ${result[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, result[0].thumb, 'thumbnail.jpg', phtext, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Terjadi kesalahan, coba lagi nanti', id)
						})
					break
				case prefix + 'searchuser':
					if (args.length == 0) return aruga.reply(from, `Mencari user instagram gunakan ${prefix}searchuser query\nContoh: ${prefix}searchuser zennny`, id)
					const userinsta = body.slice(12)
					aruga.reply(from, mess.wait, id)
					const userapi = await axios.get(`https://h4ck3rs404-api.herokuapp.com/api/iguser?q=${userinsta}&apikey=${hackapi}`)
					const userdata = userapi.data
					const resultdata2 = userdata.result
					let instatext = `*「 INSTAGRAM USER 」*\n`
					for (let i = 0; i < resultdata2.length; i++) {
						instatext = `\n─────────────────\n\n• *Username:* ${resultdata2[i].username}\n• *Fullname:* ${resultdata2[i].full_name}\n• *Verified:* ${resultdata2[i].verified_user}\n• *Private:* ${resultdata2[i].private_user}\n`
					}
					await aruga.sendFileFromUrl(from, resultdata2[0].profile_pic, 'profile.jpg', instatext, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'cnnindonesia':
				case prefix + 'cnnindo':
					aruga.reply(from, mess.wait, id)
					const cnnapi = await axios.get(`https://zenzapi.xyz/api/cnnindonesia?apikey=${zenzapi}`)
					const cnndata = cnnapi.data
					const cnnresult = cnndata.result
					let cnntext = `*「 CNN INDONESIA 」*\n`
					for (let i = 0; i < cnnresult.length; i++) {
						cnntext += `\n─────────────────\n\n• *Berita:* ${cnnresult[i].judul}\n• *Tema:* ${cnnresult[i].tema}\n• *Rilis:* ${cnnresult[i].rilis}\n• *Url:* ${cnnresult[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, cnnresult[0].thumb, 'img.jpg', cnntext, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'nanimelatest':
					aruga.reply(from, mess.wait, id)
					const nanimeurl = await axios.get(`http://zekais-api.herokuapp.com/nanimenew`)
					const nanimedata = nanimeurl.data
					if (nanimedata.status == 500) return aruga.reply(from, nanimedata.result, id)
					const nanimeres = nanimedata.result
					let nanimetxt = `*「 NANIME LATEST 」*\n`
					for (let i = 0; i < nanimeres.length; i++) {
						nanimetxt += `\n─────────────────\n\n• *Judul:* ${nanimeres[i].name}\n• *Rating:* ${nanimeres[i].rating}\n• *Status:* ${nanimeres[i].status}\n• *Url:* ${nanimeres[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, nanimeres[0].thumb, 'thumb.jpg', nanimetxt, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'nanimesr':
					if (args.length == 0) return aruga.reply(from, `Mencari anime dari website Nanime gunakan ${prefix}nanimesr query\nContoh: ${prefix}nanimesr sword`, id)
					const sranime = body.slice(10)
					aruga.reply(from, mess.wait, id)
					const sranimeurl = axios.get(`http://zekais-api.herokuapp.com/nanimesr?query=${sranime}`)
					const srdatanime = sranimeurl.data
					if (srdatanime == 500) return aruga.reply(from, srdatanime.result, id)
					const resultnime = srdatanime.result
					let txtnanim = `*「 NANIME SEARCH 」*\n`
					for (let i = 0; i < resultnime.length; i++) {
						txtanim += `\n─────────────────\n\n• *Judul:* ${resultnime[i].name}\n• *Rating:* ${resultnime[i].rating}\n• *Status:* ${resultnime[i].status}\n• *Url:* ${resultnime[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, resultnime[0].thumb, 'thumb.jpg', txtanim, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'nanimeget':
					if (args.length == 0) return aruga.reply(from, `Masukan url nanime nya\nContoh: ${prefix}nanimeget https://nanime.biz/anime/sword-art-online-alicization-war-of-underworld-2nd-season`, id)
					const getnanime = body.slice(11)
					aruga.reply(from, mess.wait, id)
					const geturlnime = axios.get(`http://zekais-api.herokuapp.com/nanimeget?url=${getnanime}`)
					const nanimedata2 = geturlnime.data.result
					if (geturlnime.data.result.status == 500) return aruga.reply(from, geturlnime.data.result, id)
					const judulnanime = nanimedata2.title
					const thumbnanime = nanimedata2.thumb
					const descnanime = nanimedata2.desc
					aruga.sendFileFromUrl(from, thumbnanime, 'thumb.jpg', `Judul: ${judulnanime}\nDeskripsi: ${descnanime}`, id)
					const nameandurl = nanimedata2.url
					let nanimegetxt = `*「 NANIME INFO 」*\n`
					for (let i = 0; i < nanimedata2.length; i++) {
						nanimegetxt += `\n─────────────────\n\n• *Judul:* ${nanimedata2[i].name}\n• *Url:* ${nanimedata2[i].url}\n`
					}
					await aruga.reply(from, nanimegetxt, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'appstore':
					if (args.length == 0) return aruga.reply(from, `Mencari aplikasi dari AppStore!\nGunakan ${prefix}appstore nama aplikasi\nContoh: ${prefix}appstore instagram`, id)
					const apps = body.slice(10)
					aruga.reply(from, mess.wait, id)
					const appslink = await axios.get(`https://h4ck3rs404-api.herokuapp.com/api/appstore?q=${apps}&apikey=${hackapi}`)
					const appsdata = appslink.data
					const appstores = appsdata.result
					let apptext = `*「 App Store 」*\n`
					for (let i = 0; i < appstores.length; i++) {
						apptext += `\n─────────────────\n\n• *Nama Apk:* ${appstores[i].title}\n• *Deskripsi:* ${appstores[i].desc}\n• *Url:* ${appstores[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, appstores[0].thumb, 'thumb.jpg', apptext, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Terjadi kesalahan, coba lagi nanti', id)
						})
					break
				case prefix + 'ytsearch':
					if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}ytsearch [ Query ]*, Contoh : ${prefix}ytsearch alan walker alone`)
					const ytsher = body.slice(10)
					aruga.reply(from, mess.wait, id)
					try {
						const response2 = await fetch(`https://api.zeks.xyz/api/yts?q=${ytsher}&apikey=${apikeyvinz}`)
						if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
						const jsonserc = await response2.json()
						const { result } = await jsonserc
						let xixixi = `*「 YOUTUBE SEARCH 」*\n\n*Hasil Pencarian : ${ytsher}*\n`
						for (let i = 0; i < result.length; i++) {
							xixixi += `\n─────────────────\n\n• *Judul* : ${result[i].video.title}\n• *Ditonton* : ${result[i].video.views}\n• *Durasi* : ${result[i].video.duration} detik\n• *Uploaded* : ${result[i].video.upload_date}\n• *Channel* : ${result[i].uploader.username}\n• *Verified Channel* : ${result[i].uploader.verified}\n• *Url* : ${result[i].video.url}\n`
						}
						await aruga.sendFileFromUrl(from, result[0].video.thumbnail_src, 'thumbserc.jpg', xixixi, id)
					} catch (err) {
						console.log(err)
						await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
					}
					break

				//Primbon Menu
				case prefix + 'kalender':
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const encryptMedia = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encryptMedia, uaOverride)
						const imageLinka = await uploadImages(mediaData, `${sender.id}.jpg`)
						axios.get(`http://docs-jojo.herokuapp.com/api/calendar?image_url=${imageLinka}`)
							.then(async (res) => {
								await aruga.sendFileFromUrl(from, res.data.result, 'kalen.jpg', `nihh dah jadi`, id)
								console.log('Berhasil berhasil widirit oyeyy')
							})
							.catch(err => {
								console.log(err)
								aruga.reply(from, 'Error om', id)
							})
					} else {
						aruga.reply(from, `Format pesan salah\nReply atau post foto dengan menggunakan caption ${prefix}kalender`, id)
					}
					break
				case prefix + 'missing':
					if (args.length == 0) return aruga.reply(from, 'Format pesan salah')
					const atas = q.substring(0, q.indexOf('|') - 1)
					const tengah = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
					const bawah = q.substring(q.lastIndexOf('|') + 2)
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const encryptMedia = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encryptMedia, uaOverride)
						const imageLink = await uploadImages(mediaData, `missing.${sender.id}`)
						rugaapi.missing(atas, tengah, bawah, imageLink)
							.then(async ({ result }) => {
								await aruga.sendFileFromUrl(from, result.imgUrl, 'missing.jpg', '', id)
								console.log('Success sending image!')
							})
							.catch(async (err) => {
								console.error(err)
								await aruga.reply(from, 'Error!', id)
							})
					} else {
						await aruga.reply(from, 'Format pesan salah', id)
					}
					break
				case prefix + 'myzodiac':
				case prefix + 'myzodiak':
					if (args.length == 0) return await aruga.reply(from, `Kirim perintah ${prefix}myzodiak namazodiak\nContoh: ${prefix}myzodiak aquarius`, id)
					await aruga.reply(from, mess.wait, id)
					fetchJson(`https://zenzapi.xyz/api/zodiak-harian?query=${args[0]}&apikey=${zenzapi}`)
						.then(async (res) => {
							if (res.status == false) return aruga.reply(from, 'Zodiak yang kamu cari tidak ada', id)
							const zodiakmu = res.result.judul
							const thumbnailni = res.result.thumb
							const datezodiak = res.result.date
							const nohoky = res.result.no_hoki
							const teoriumum2 = res.result.teori.umum
							const teoricinta2 = res.result.teori.love
							const teoriduit2 = res.result.teori.keuangan
							const initextnya = `Zodiak: ${zodiakmu}\nTanggal: ${datezodiak}\nNo Hoki: ${nohoky}\nUmum: ${teoriumum2}\nPercintaan: ${teoricinta2}\nKeuangan: ${teoriduit2}`
							await aruga.sendFileFromUrl(from, thumbnailni, 'thumb.jpg', initextnya, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, err.message, id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.messsage, id)
						})
					break
				case prefix + 'zodiak':
					if (args.length !== 4) return aruga.reply(from, `Untuk mengecek zodiak, gunakan ${prefix}zodiak nama tanggallahir bulanlahir tahunlahir\nContoh: ${prefix}zodiak fikri 13 06 2004`, id)
					const cekzodiak = await rugaapi.cekzodiak(args[0], args[1], args[2])
					await aruga.reply(from, cekzodiak, id)
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'zodiakmingguan':
					if (args.length == 0) return aruga.reply(from, `Untuk mengecek zodiak mingguan, gunakan ${prefix}zodiakmingguan nama zodiak\nContoh: ${prefix}zodiakmingguan sagitarius`, id)
					fetchJson(`https://zenzapi.xyz/api/zodiak-harian?query=${args[0]}&apikey=${zenzapi}`)
						.then(async (res) => {
							if (res.status == false) return aruga.reply(from, 'Zodiak yang kamu cari tidak ada, pastikan ketik dengan benar', id)
							const namezod = res.result.judul
							const thumbzod = res.result.thumb
							const datezod = res.result.date
							const nohoki = res.result.no_hoki
							const teoriumum = res.result.teori.umum
							const teorilove = res.result.teori.love
							const teoriduit = res.result.teori.duit
							const bethetext = `Zodiak: ${namezod}\nTanggal: ${datezod}\nNo Hoki: ${nohoki}\nTeori Umum: ${teoriumum}\nTeori Cinta: ${teorilove}\nTeori Keuangan: ${teoriduit}`
							await aruga.sendFileFromUrl(from, thumbzod, 'thumbnail.jpg', bethetext, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, err.message, id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'artinama':
					if (args.length == 0) return aruga.reply(from, `Untuk mengetahui arti nama seseorang\nketik ${prefix}artinama namakamu`, id)
					rugaapi.artinama(body.slice(10))
						.then(async (res) => {
							await aruga.reply(from, `Arti : ${res}`, id)
								.catch(() => {
									aruga.reply(from, 'Sedang error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'cekjodoh':
					if (args.length == 0) return aruga.reply(from, `Untuk mengecek jodoh melalui nama\nketik: ${prefix}cekjodoh nama-kamu nama-pasangan\n\ncontoh: ${prefix}cekjodoh bagas siti\n\nhanya bisa pakai nama panggilan (satu kata)`, id)
					rugaapi.cekjodoh(args[0], args[1])
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
						})
					break

				// Random Kata
				case prefix + 'fiersa':
					fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/Fiersa-Besari/main/fiersa-besari.txt')
						.then(res => res.text())
						.then(body => {
							let ff = body.split('\n')
							let randomff = ff[Math.floor(Math.random() * ff.length)]
							aruga.reply(from, randomff, id)
						})
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'buatgrup':
					const bwtgrup = body.trim().split(' ')
					const gcnuma = bwtgrup[1]
					aruga.createGroup(gcnuma, sender.id)
					aruga.sendText(from, 'berhasil membuat grup', id)
					break
				case prefix + 'chika':
					await aruga.reply(from, `media sedang dikirim , tunggu sampe10-20 detik`, id)
					await aruga.sendFileFromUrlFrom(from, `https://pencarikode.xyz/api/chika?apikey=${paiskey}`, 'chika.mp4', '', id)
					break
				case prefix + 'tomp3':
					if (isMedia && isQuotedVideo || isQuotedFile) {
						await aruga.reply(from, mess.wait, id)
						const encryptMedia = isQuotedVideo || isQuotedFile ? quotedMsg : message
						const _mimetype = isQuotedVideo || isQuotedFile ? quotedMsg.mimetype : mimetype
						console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
						const mediaData = await decryptMedia(encryptMedia, uaOverride)
						const temp = './temp'
						const name = new Date() * 1
						const fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
						const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
						fs.writeFile(fileInputPath, mediaData, (err) => {
							if (err) return console.error(err)
							ffmpeg(fileInputPath)
								.format('mp3')
								.on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
								.on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
								.on('end', async () => {
									console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
									await aruga.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
									console.log(color('[WAPI]', 'green'), 'Success sending mp3!')
									setTimeout(() => {
										fs.unlinkSync(fileInputPath)
										fs.unlinkSync(fileOutputPath)
									}, 30000)
								})
								.save(fileOutputPath)
						})
					} else {
						await aruga.reply(from, 'Format pesan salah', id)
					}
					break
				case prefix + 'motivasi':
					fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/motivasi/main/motivasi.txt')
						.then(res => res.text())
						.then(body => {
							let splitmotivasi = body.split('\n')
							let randommotivasi = splitmotivasi[Math.floor(Math.random() * splitmotivasi.length)]
							aruga.reply(from, randommotivasi, id)
						})
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'urgay':
					if (args.length == 0) return aruga.reply(from, `Untuk mengetahui seberapa gay seseorang gunakan ${prefix}urgay namanya\n\nContoh: ${prefix}urgay burhan`, id)
					axios.get(`https://arugaz.herokuapp.com/api/howgay`)
						.then(res => {
							const gayy = res.data.desc
							aruga.reply(from, gayy, id)
						})
					break
				case prefix + 'fakta2':
					axios.get(`https://kocakz.herokuapp.com/api/random/text/faktaunik`).then(res => {
						const faktuy = `${res.data.result}`
						aruga.reply(from, faktuy, id)
					})
					break
				case prefix + 'fakta':
					fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
						.then(res => res.text())
						.then(body => {
							let splitnix = body.split('\n')
							let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
							aruga.reply(from, randomnix, id)
						})
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'katabijak':
					fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
						.then(res => res.text())
						.then(body => {
							let splitbijak = body.split('\n')
							let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
							aruga.reply(from, randombijak, id)
						})
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'fakboy':
					fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
						.then(res => res.text())
						.then(body => {
							let splitpantun = body.split('\n')
							let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
							aruga.reply(from, randompantun.replace(/aruga-line/g, "\n"), id)
						})
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'quote':
					const quotex = await rugaapi.quote()
					await aruga.reply(from, quotex, id)
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'cerpen':
					aruga.reply(from, mess.wait, id)
					axios.get(`http://zekais-api.herokuapp.com/cerpen`)
						.then(async (res) => {
							const ceritanya = `*Judul:* ${res.data.title}\n*Pengarang:* ${res.data.pengarang}\n*Kategori:* ${res.data.category}\n\n*Cerpen:* ${res.data.post}`
							await aruga.reply(from, ceritanya, id)
								.catch(err => {
									aruga.reply(from, 'Maaf, sistem sedang error', id)
								})
						})
						.catch((err) => {
							aruga.reply(from, err, id)
						})
					break
				case prefix + 'cersex':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					rugaapi.cersex()
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.img, 'image.jpg', `- Judul: ${res.judul}\nCerita : ${res.cersex}`, id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'puisi':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://api.vhtear.com/puisi_image&apikey=${vhtearkey}`, 'img.jpg', '', id)
					break

				//Random Images
				case prefix + 'anime':
					if (args.length == 0) return aruga.reply(from, `Untuk menggunakan ${prefix}anime\nSilahkan ketik: ${prefix}anime [query]\nContoh: ${prefix}anime random\n\nquery yang tersedia:\nrandom, waifu, husbu, neko`, id)
					if (args[0] == 'random' || args[0] == 'waifu' || args[0] == 'husbu' || args[0] == 'neko') {
						fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/' + args[0] + '.txt')
							.then(res => res.text())
							.then(body => {
								let randomnime = body.split('\n')
								let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
								aruga.sendFileFromUrl(from, randomnimex, '', 'Nee..', id)
							})
							.catch(() => {
								aruga.reply(from, 'Ada yang Error!', id)
							})
					} else {
						aruga.reply(from, `Maaf query tidak tersedia. Silahkan ketik ${prefix}anime untuk melihat list query`)
					}
					break
				case prefix + 'wallprogramming':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://urbaee-xyz.herokuapp.com/api/wallpaper/programming?apikey=Urbaeexyz`)
						.then(async (res) => {
							const berandom = res.data.result
							let thisrandom = berandom[Math.floor(Math.random() * berandom.length)]
							aruga.sendFileFromUrl(from, thisrandom, 'img.jpg', 'ichi ni san nya ari lasso', id)
								.catch(() => {
									aruga.reply(from, 'Error', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'kpop':
					if (args.length == 0) return aruga.reply(from, `Untuk menggunakan ${prefix}kpop\nSilahkan ketik: ${prefix}kpop [query]\nContoh: ${prefix}kpop bts\n\nquery yang tersedia:\nblackpink, exo, bts`, id)
					if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
						fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
							.then(res => res.text())
							.then(body => {
								let randomkpop = body.split('\n')
								let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
								aruga.sendFileFromUrl(from, randomkpopx, '', 'Nee..', id)
							})
							.catch(() => {
								aruga.reply(from, 'Ada yang Error!', id)
							})
					} else {
						aruga.reply(from, `Maaf query tidak tersedia. Silahkan ketik ${prefix}kpop untuk melihat list query`)
					}
					break
				case prefix + 'ppcp2':
				case prefix + 'ppcouple2':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://leyscoders-api.herokuapp.com/api/ppcouple?apikey=${leysapi}`)
						.then(async (res) => {
							aruga.sendFileFromUrl(from, res.data.result.male, 'img.jpg', '', id)
							aruga.sendFileFromUrl(from, res.data.result.female, 'img.jpg', '', id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Error', id)
								})
						})
					break
				case prefix + 'ppcp':
				case prefix + 'ppcouple':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://dapuhy-api.herokuapp.com/api/randomimage/couple?apikey=${dapuhyapi}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result.pria, 'cp.jpg', '', id)
							await aruga.sendFileFromUrl(from, res.data.result.wanita, 'cp.jpg', '', id)
								.catch(() => {
									aruga.reply(from, 'lagii error nich', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'memes':
					aruga.reply(from, mess.wait, id)
					aruga.sendFileFromUrl(from, `https://lindow-api.herokuapp.com/api/random/meme?apikey=${lindowapi}`, 'img.jpg', '', id)
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break

				// Search Any
				case prefix + 'dewabatch':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari anime batch dari Dewa Batch, ketik ${prefix}dewabatch judul\n\nContoh: ${prefix}dewabatch naruto`, id)
					rugaapi.dewabatch(args[0])
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}, id`)
						})
					break
				case prefix + 'infoalamat':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari suatu alamat\nUsage : ${prefix}infoalamat polresta`, id)
					rugaapi.ingfo(body.slice(12))
						.then(async (res) => {
							const ingf = `*Alamat :* ${res.result.data}\n\n*Keterangan :* ${res.result.deskripsi}`
							aruga.reply(from, ingf, id)
						})
						.catch(() => {
							aruga.reply(from, 'Errorr...', id)
						})
					break
				case prefix + 'kusonime':
					if (args.length == 0) return aruga.reply(from, `Mencari anime dari website Kusonime, gunakan ${prefix}kusonime judul anime`, id)
					const carianim = body.slice(10)
					aruga.reply(from, mess.wait, id)
					try {
						const kuson = await axios.get(`https://zahirr-web.herokuapp.com/api/anime/kusonime?search=${carianim}&apikey=zahirgans`)
						const kusondat = kuson.data.result
						const { download } = kusondat
						let kusonimx = `*Title:* ${kusondat.title}\n*Title JP:* ${kusondat.title_jp}\n*Genre:* ${kusondat.genre}\n*Season:* ${kusondat.season}\n*Producer:* ${kusondat.producer}\n*Type:* ${kusondat.type}\n*Status:* ${kusondat.status}\n*Score:* ${kusondat.score}\n*Duration:* ${kusondat.duration}\n*Released On:* ${kusondat.released_on}\n*Description:* ${kusondat.description}\n`
						for (let i = 0; i < download.length; i++) {
							kusonimx += `\n─────────────────\n\n*•Resolution:* ${download[i].resolution}\n*•Web Down:* ${download[i].download_list[0].downloader}\n*•Link Down:* ${download[i].download_list[0].download_link}\n`
						}
						await aruga.sendFileFromUrl(from, kusondat.thumbs, 'kusonime.jpg', kusonimx, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'anime yang anda cari tidak ada', id)
					}
					break
				/*
				case prefix+'kusonime':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari anime batch dari Kusonime, ketik ${prefix}kusonime judul\n\nContih : ${prefix}kusonime naruto`, id)
					rugaapi.kusonime(args[0])
					.then(async(res) => {
						await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}, id`)
					})
					break
					*/
				case prefix + 'images':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari gambar dari pinterest\nketik: ${prefix}images [search]\ncontoh: ${prefix}images naruto`, id)
					const cariwall = body.slice(8)
					const hasilwall = await images.fdci(cariwall)
					await aruga.sendFileFromUrl(from, hasilwall, '', '', id)
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'sreddit':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (args.length == 0) return aruga.reply(from, `Untuk mencari gambar dari sub reddit\nketik: ${prefix}sreddit [search]\ncontoh: ${prefix}sreddit naruto`, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					const carireddit = body.slice(9)
					const hasilreddit = await images.sreddit(carireddit)
					await aruga.sendFileFromUrl(from, hasilreddit, '', '', id)
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'ayatkursi':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://urbaee-xyz.herokuapp.com/api/muslim/ayatkursi?apikey=Urbaeexyz`)
						.then(async (res) => {
							const tafsr = `*Arab:* ${res.data.result.data.arabic}\n\n*Latin:* ${res.data.result.data.latin}\n\n*Arti:* ${res.data.result.data.translation}\n\n*Tafsir:* ${res.data.result.data.tafsir}`
							await aruga.reply(from, tafsr, id)
								.catch((err) => {
									aruga.reply(from, err, id)
									console.log(err)
								})
						})
					break
				case prefix + 'resep':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari resep makanan\nCaranya ketik: ${prefix}resep [search]\n\ncontoh: ${prefix}resep tahu`, id)
					const cariresep = body.slice(7)
					const hasilresep = await resep.resep(cariresep)
					await aruga.reply(from, hasilresep + '\n\nIni kak resep makanannya..', id)
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'quotesislamic':
				case prefix + 'quotesislam':
					axios.get(`https://urbaee-xyz.herokuapp.com/api/randomquote/muslim?apikey=Urbaeexyz`)
						.then(async (res) => {
							const islm = res.data.result.text_id
							aruga.reply(from, islm, id)
								.catch((err) => {
									aruga.reply(from, err, id)
									console.log(err)
								})
						})
					break
				case prefix + 'stalktiktok':
				case prefix + 'stalktik':
				case prefix + 'stalktt':
					if (args.length == 0) return aruga.reply(from, `Untuk men-stalk akun Tiktok seseorang\nUsage ${prefix}stalktiktok [username]\ncontoh : ${prefix}stalktiktok @itsandani`, id)
					aruga.reply(from, mess.wait, id)
					const stalktik = await rugaapi.stalktt(args[0])
					const pictt = await rugaapi.ttpict(args[0])
					await aruga.sendFileFromUrl(from, pictt, '', stalktik, id)
						.catch(() => {
							aruga.reply(from, 'Akun tidak dapat ditemukan...', id)
						})
					break
				case prefix + 'gsmarena':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari spefisikasi handphone dari Website GSMArena\nKetik ${prefix}gsmarena [jenishandphone]`, id)
					fetchJson(`https://api.zeks.me/api/gsmArena?apikey=${apikeyvinz}&q=${body.slice(10)}`)
						.then(async (res) => {
							if (res.status == false) return aruga.reply(from, 'Barang yang kamu cari tidak ada', id)
							const namabarang = res.data.title
							const linkbarang = res.data.link
							const thumbnailhp = res.data.thumb
							const stringnich = res.data.full_desc.string
							await aruga.sendFileFromUrl(from, thumbnailhp, '', `Nama: ${namabarang}\nLink: ${linkbarang}\n${stringnich}`, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, err.message, id)
								})
						})
					break
				case prefix + 'memeindo2':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/meme/memeindo?apikey=${lolhuman}`, 'img.jpg', '', id)
					break
				case prefix + 'memeindo':
					await axios.get(`https://api.zeks.xyz/api/memeindo?apikey=${apikeyvinz}`).then(res => {
						aruga.sendFileFromUrl(from, `${res.data.result}`, 'image.jpg', 'nehh njeng', id)
						console.log('Success')
					})
						.catch((err) => {
							aruga.reply(from, err, id)
						})
					break
				case prefix + 'darkjokes':
					aruga.reply(from, mess.wait, id)
					await axios.get(`https://api.zeks.xyz/api/darkjokes?apikey=${apikeyvinz}`).then(res => {
						aruga.sendFileFromUrl(from, `${res.data.result}`, 'image.jpg', 'nehh njeng', id)
					})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'goldpb':
					if (args.length == 0) return aruga.reply(from, `Bot akan mengirimkan Gold Play Button dengan nama yang kalian custom sendiri\nContoh : ${prefix}goldpb Urbaee`, id)
					const yuza = body.slice(8)
					await aruga.sendFileFromUrl(from, `https://api.zeks.me/api/gplaybutton?apikey=${apikeyvinz}&text=${yuza}`, 'img.jpg', `Congrats *${yuza} for passed 1M Subscribers`, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'silverpb':
					if (args.length == 0) return aruga.reply(from, `Bot akan mengirimkan Silver Play Button dengan kata yang anda masukkan\nContoh : ${prefix}silverpb Urbaee`, id)
					const silsc = body.slice(10)
					await aruga.sendFileFromUrl(from, `https://api.zeks.me/api/splaybutton?apikey=${apikeyvinz}&text=${silsc}`, '', `Congrats ${silsc} for passing 100K Subscribers`, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'stalktwit':
				case prefix + 'stalktwitter':
					if (args.length == 0) return aruga.reply(from, `Untuk men-stalk akun Burung Biru/Twitter seseorang\nketik ${prefix}stalktwit [username]\ncontoh : ${prefix}stalktwit anakbabi123`, id)
					const usernya = body.slice(11)
					await aruga.reply(from, mess.wait, id)
					axios.get(`https://api.vhtear.com/twittprofile?username=${usernya}&apikey=${vhtearkey}`)
						.then(async (res) => {
							const cptntw = `*Username:* ${res.data.result.username}\n*Full Name:* ${res.data.result.name}\n*Location:* ${res.data.result.location}\n*Followers:* ${res.data.result.followers_count}\n*Following:* ${res.data.result.folowed_count}\n*Favorites:* ${res.data.result.favourites_count}\n*Post:* ${res.data.result.media_count}\n\n*Desc:* ${res.data.result.description}`
							await aruga.sendFileFromUrl(from, res.data.result.profile_image, 'img.jpg', cptntw, id)
								.catch(() => {
									aruga.reply(from, 'Error', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'stalkig':
				case prefix + 'stalking':
					if (args.length == 0) return aruga.reply(from, `Untuk men-stalk akun instagram seseorang\nketik ${prefix}stalkig [username]\ncontoh: ${prefix}stalkig ini.arga`, id)
					aruga.reply(from, mess.wait, id)
					fetchJson(`https://api.zeks.xyz/api/igstalk?apikey=${apikeyvinz}&username=${body.slice(9)}`)
						.then(async (res) => {
							const picture = res.profile_pic
							const igverif = res.is_verified
							const igprivate = res.is_private
							const Biodata = res.bio
							const followers1 = res.follower
							const businessacc = res.is_bussiness
							const following1 = res.following
							const highlights = res.highlight_count
							const jumlahpost = res.post_count
							const nameig = res.fullname
							const UsernameIG = res.username
							const cption = `• *Username:* ${UsernameIG}\n• *Name:* ${nameig}\n• *Verified:* ${igverif}\n• *Private:* ${igprivate}\n• *Bussiness:* ${businessacc}\n• *Followers:* ${followers1}\n• *Following:* ${following1}\n• *Total Post:* ${jumlahpost}\n• *Highlights:* ${highlights}\n\n• *Bio:* ${Biodata}`
							await aruga.sendFileFromUrl(from, picture, '', cption, id)
								.catch(() => {
									aruga.reply(from, 'Akun tidak dapat ditemukan...', id)
								})
						})
						.catch(err => {
							console.log(err)
						})
					break
				case prefix + 'lyrics':
				case prefix + 'lirik':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari lirik dari sebuah lagu\bketik: ${prefix}lirik [judul_lagu]`, id)
					axios.get(`https://zenzapi.xyz/api/liriklagu?query=${body.slice(7)}&apikey=${zenzapi}`)
						.then(async (res) => {
							if (res.data.status == false) return aruga.reply(from, 'Lirik yang kamu cari tidak ada', id)
							await aruga.sendFileFromUrl(from, res.data.result.thumb, 'thumb.jpg', `Judul : ${res.data.result.judul}\nPenyanyi : ${res.data.result.penyanyi}\nLirik : ${res.data.result.lirik}`, id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'rcosplay':
				case prefix + 'cosplayer':
				case prefix + 'cosplayers':
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://zenzapi.xyz/api/random/cosplay?apikey=${zenzapi}`, 'cosplay.jpg', '', id)
					break
				case prefix + 'creepypasta':
				case prefix + 'creepyfact':
					axios.get(`https://zenzapi.xyz/api/creepyfact?apikey=${zenzapi}`)
						.then(async (res) => {
							if (res.data.status == false) return aruga.reply(from, 'Lagi error', id)
							aruga.reply(from, res.data.result.message, id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'chord':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari lirik dan chord dari sebuah lagu\bketik: ${prefix}chord [judul_lagu]`, id)
					const chordq = body.slice(7)
					axios.get(`https://docs-jojo.herokuapp.com/api/chord?q=${chordqq}`)
						.then(async (res) => {
							if (res.data.status == false) return aruga.reply(from, res.data.error, id)
							const textchord = `Chord Guitar : ${chordq}\n\n${res.data.result}`
							aruga.reply(from, textchord, id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'ssweb':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}ssweb [link website]\nContoh: ${prefix}ssweb2 https://github.com/Urbaeexyz/wa-bot`, id)
					const webss = body.slice(7)
					aruga.reply(from, mess.wait, id)
					await aruga.sendFileFromUrl(from, `https://h4ck3rs404-api.herokuapp.com/api/ssweb?url=${webss}&apikey=${hackapi}`, 'img.jpg', `nih screenshot-an ${webss} nya`, id)
					break
				case prefix + 'fb3':
				case prefix + 'facebook3':
					if (args.length == 0) return aruga.reply(from, 'Linknya mana?', id)
					fetchJson(`https://h4ck3rs404-api.herokuapp.com/api/fbdown/?url=${body.slice(5)}&apikey=${hackapi}`)
						.then(async (res) => {
							if (res.result.error == true) return aruga.reply(from, res.result.message, id)
							await aruga.sendFileFromUrl(from, res.result.url, 'res.mp4', `Judul: ${res.result.title}`, id)
								.catch(() => {
									aruga.reply(from, 'Error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'fb2':
				case prefix + 'fbvid':
					if (args.length == 0) return aruga.reply(from, `Untuk mendownload sebuah video dari Facebook, Ketik ${preifx}fb2 [linkvideo]\n\nNote: Link yang valid hanya bisa dari facebook web`, id)
					aruga.reply(from, '_Scrapping Metadata..._', id)
					axios.get(`https://fzn-gaz.herokuapp.com/api/fbdl?url=${body.slice(5)}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.kualitasHD, '', '', id)
								.catch(() => {
									aruga.reply(from, 'Error...', id)
								})
						})
					break
				case prefix + 'fb':
				case prefix + 'facebook':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}fb [linkfb]*`, id)
					aruga.reply(from, '_Scrapping Metadata...._', id)
					axios.get(`https://videfikri.com/api/fbdl/?urlfb=${body.slice(4)}`)
						.then(async (res) => {
							const linkvid = res.data.result.url
							const linkah = await axios.get(`http://docs-jojo.herokuapp.com/api/shorturl-at?url=${linkvid}`)
							const jadiinlink = linkah.data.result
							if (!isPrem && !isOwnerB) return aruga.reply(from, `Karena anda bukan user Premium, silahkan download menggunakan link\n\nLink: ${jadiinlink}`, id)
							await aruga.sendFileFromUrl(from, linkvid, '', '', id)
								.catch(() => {
									aruga.reply(from, `Error...`, id)
								})
						})
					break
				case prefix + 'ig2':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}ig2 linkig`, id)
					aruga.reply(from, '_Scrapping Metadataa..._', id)
					axios.get(`http://lolhuman.herokuapp.com/api/instagram2?apikey=${lolhuman}&url=${body.slice(5)}`)
						.then(async (res) => {
							aruga.sendFileFromUrl(from, res.data.result.media[0], 'ig.mp4', '', id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Error njing', id)
								})
						})
					break
				case prefix + 'twitter':
					if (args.length == 0) return aruga.reply(from, `Kirim Perintah ${prefix}twitter [linktwitter]`, id)
					aruga.reply(from, mess.wait, id)
					const anjayx = body.slice(9)
					axios.get(`http://docs-jojo.herokuapp.com/api/twitter?url=${anjayx}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result.media[0].download, '', `*caption: ${res.data.result.caption}*\n*quality: ${res.data.result.media[0].quality}*`, id)
								.catch(() => {
									aruga.reply(from, 'error njing', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'tiktok3':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}tiktok3 link tiktok`, id)
					const belink = body.slice(9)
					aruga.reply(from, mess.wait, id)
					axios.get(`http://zekais-api.herokuapp.com/tiktok?url=${belink}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result, '', '', id)
								.catch(() => {
									aruga.reply(from, 'Link salah, silahkan masukkan link yang baik dan benar:v', id)
								})
						})
						.catch(err => {
							console.log(err)
						})
					break
				case prefix + 'lolivid': //BY : piyo
					aruga.reply(from, mess.wait, id)
					fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/loli.txt')
						.then(res => res.text())
						.then(body => {
							let lolipiyo = body.split('\n')
							let papololi = lolipiyo[Math.floor(Math.random() * lolipiyo.length)]
							aruga.sendFileFromUrl(from, papololi, 'loli.mp4', 'Nih asu', id)
								.then(() => console.log('Success sending Video Loli'))
						})
						.catch(() => {
							aruga.reply(from, 'Ada yang Error!', id)
						})
					break
				case prefix + 'tiktok':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}tiktok [linkTiktok]*`, id)
					const bodynya = body.slice(8)
					aruga.reply(from, mess.wait, id)
					axios.get(`https://docs-jojo.herokuapp.com/api/tiktok_nowm?url=${bodynya}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.download, '', `*from:* ${res.data.from}\n*caption:* ${res.data.caption}`, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Rest Api sedang Error!', id)
								})
						})
						.catch((err) => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'tiktoknowm':
					if (args.length == 0) return aruga.reply(from, `Untuk mendownload video dari tiktok, gunakan ${prefix}tiktoknowm link`, id)
					const lika = body.slice(12)
					aruga.reply(from, mess.wait, id)
					axios.get(`https://api.zeks.xyz/api/tiktok?url=${lika}&apikey=${apikeyvinz}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.no_watermark, '', `*music name: ${res.data.music_name}*`, id)
							await aruga.sendFileFromUrl(from, res.data.audio, '', '', id)
								.catch(() => {
									aruga.reply(from, 'Mungkin url anda salah', id)
								})
						})
						.catch(err => {
							console.log(err)
						})
					break
				case prefix + 'tiktok2':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah *${prefix}tiktok [linkTiktok]*`, id)
					const linktik = body.slice(9)
					aruga.reply(from, mess.wait, id)
					axios.get(`https://zenzapi.xyz/api/downloader/tiktok?url=${linktik}&apikey=${zenzapi}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result.nowatermark, '', '', id)
								.catch(() => {
									aruga.reply(from, `Error nich\nTolong report error dengan menggunakan ${prefix}reportbug detail bug/error`, id)
								})
						})
						.catch(err => {
							console.log(err)
						})
					break
				case prefix + 'ytmp4':
					if (args.length == 0) return aruga.reply(from, `Untuk mendownload video dari youtube\nketik: ${prefix}ytmp4 [link_yt]`, id)
					rugaapi.ymp4v2(body.slice(7))
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.thumb, 'thumb.jpg', `「 *YOUTUBE MP4* 」\n\n*Title:* ${res.title}\n*Size:* ${res.size}\n*Quality:* ${res.quality}\n*Type:* ${res.ext}\n\n${mess.wait}`, id)
							await aruga.sendFileFromUrl(from, res.link, `${title}.mp4`, `*Title: ${res.title}*`, id)
								.catch(() => {
									aruga.reply(from, 'Terjadi kesalahan, silahkan coba lagi', id)
								})
						})
						.catch((err) => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'nekopoi':
					axios.get(`https://arugaz.my.id/api/anime/nekopoi/random`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, `${res.data[0].image}`, '', `「 *NEKOPOI* 」\n\n*Judul :* ${res.data[0].title}\n*Link :* ${res.data[0].link}`, id)
								.catch(() => {
									aruga.reply(from, 'Error njing', id)
								})
						})
					break
				case prefix + 'joox':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari lagu dari Joox\n\nUsage : ${prefix}joox judul lagu\nContoh: ${prefix}joox akad`, id)
					axios.get(`https://api.vhtear.com/music?query=${body.slice(6)}&apikey=${vhtearkey}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, `${res.data.result[0].linkImg}`, 'img.jpg', `「 *JOOX* 」\n\n*Judul :* ${res.data.result[0].judul}\n*Penyanyi :* ${res.data.result[0].penyanyi}\n*Album :* ${res.data.result[0].album}\n*Size :* ${res.data.result[0].filesize}\n*Durasi :* ${res.data.result[0].duration}`)
							await aruga.sendFileFromUrl(from, `${res.data.result[0].linkMp3}`, '', '', id)
							const liruk = `${res.data.result[0].lirik}`
							aruga.reply(from, `Lirik dari ${body.slice(6)}\n\n${res.data.result[0].lirik}`)
								.catch(() => {
									aruga.reply(from, `Maaf, lagu yang anda cari tidak ditemukan, maklum joox mah ga lengkap`, id)
								})
						})
					break
				case prefix + 'playapik':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari detail film dan link download film gunakan ${prefix}playapik id movie\nContoh : ${prefix}playapik 142455`, id)
					axios.get(`https://api-filmapik.herokuapp.com/play?id=${body.slice(10)}`)
						.then(async (res) => {
							const linkapik = res.data.link
							await aruga.sendLinkWithAutoPreview(from, linkapik)
								.catch(() => {
									aruga.reply(from, 'Error', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'ytdl':
					if (args.length == 0) return aruga.reply(from, 'Kirim perintah /ytdl <query>\nContoh : /ytdl slow dancing in the dark', id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					const pncrian = body.slice(6)
					axios.get(`https://api.vhtear.com/ytmp3?query=${pncrian}&apikey=${vhtearkey}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, `${res.data.result.image}`, '', `「 *Youtube Download* 」\n\nJudul: ${res.data.result.title}\nDurasi: ${res.data.result.duration}\nSize: ${res.data.result.size}\nURL: ${res.data.result.url}\n\n*_Waitt, sedang di prosess oleh Bot!_*`, id)
							const saveit2 = await fetch(res.data.result.mp3)
							const bufflah = await saveit2.buffer();
							await sleep(1000)
							fs.writeFile('./media/lagu.mp3', bufflah)
							await aruga.sendFile(from, './media/lagu.mp3', '', '', id)
							rugaapi.ymp4(`https://youtu.be/${res.data.result.id}`)
								.then(async (res) => {
									await aruga.sendFileFromUrl(from, res.result, '', '', id)
										.catch(() => {
											aruga.reply(from, 'Maaf, terjadi kesalahan', id)
										})
								})
						})
					break
				case prefix + 'igstory':
				case prefix + 'instastory':
					if (args.length == 0) return aruga.reply(from, `Mencari story dari username, Gunakan ${prefix}igstory username|jumlahyangingindidownload\nContoh: ${prefix}igstory ewkharis|2`, id)
					const xas1 = q.split('|')[0]
					const xas2 = q.split('|')[1]
					aruga.reply(from, mess.wait, id)
					try {
						const xas3 = await axios.get(`https://api.zeks.xyz/api/igs?apikey=${apikeyvinz}&username=${xas1}`)
						const xas4 = xas3.data
						if (xas2 > 11) return aruga.reply(from, 'Maksimal 10!', id)
						for (let i = 0; i < xas2; i++) {
							await aruga.sendFileFromUrl(from, xas4.data[i].url, '', '', id)
						}
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Maaf, username salah, silahkan masukkan username yang benar', id)
					}
					break
				case prefix + 'stickerline':
				case prefix + 'stikerline':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}stickerline link|jumlah\nContoh: ${prefix}stickerline https://store.line.me/stickershop/product/13619/id | 3`, id)
					const linkstik = body.slice(13)
					try {
						aruga.reply(from, mess.wait, id)
						const jadistik = await axios.get(`http://zekais-api.herokuapp.com/stickerline?url=${linkstik}`)
						const bedaz = jadistik.data.result.stickers
						let randstik = bedaz[Math.floor(Math.random() * bedaz.length)]
						const thislink = await axios.get(`http://zekais-api.herokuapp.com/webptomp4?url=${randstik}`)
						const linkres = thislink.data.result
						await aruga.sendMp4AsSticker(from, linkres, gifxyz, StickerMetadata)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Error bang', id)
					}
					break
				case prefix + 'wallhd':
					if (args.length == 0) return aruga.reply(from, `Fitur untuk mencari wallpaper HD gunakan ${prefix}wallhd nama image.jumlah\nContoh: ${prefix}wallhd aesthetic.3`, id)
					const wew2 = q.split('.')[0]
					const wew3 = q.split('.')[1]
					aruga.reply(from, mess.wait, id)
					try {
						const wew4 = await axios.get(`https://api.vhtear.com/walpaper?query=${wew2}&apikey=${vhtearkey}`)
						const wew5 = wew4.data
						if (wew3 > 7) return aruga.reply(from, `Maksimal 7 image!`, id)
						for (let i = 0; i < wew3; i++) {
							await aruga.sendFileFromUrl(from, wew5.result[i].LinkImg, '', '', id)
						}
					} catch (err) {
						console.log(err)
					}
					break
				case prefix + 'findsticker':
				case prefix + 'findstiker':
					if (args.length == 0) return aruga.reply(from, `Format pesan salah!\nContoh : ${prefix}findstiker gore|4`, id)
					await aruga.reply(from, mess.wait, id)
					const namstik = q.split('|')[0]
					const jumstik = q.split('|')[1]
					try {
						const nihah = await axios.get(`https://api.vhtear.com/wasticker?query=${namstik}&apikey=${vhtearkey}`)
						const beres = nihah.data
						for (let i = 0; i < jumstik; i++) {
							await aruga.sendStickerfromUrl(from, beres.result.data[i], { author: authorr, pack: pack, keepScale: true })
						}
					} catch (err) {
						aruga.reply(from, 'Mungkin stiker yang anda cari tidak ada', id)
						console.log(err)
					}
					break
				case prefix + 'postigurl':
					if (args.length == 0) return aruga.reply(from, `Silahkan kirim perintah ${prefix}postigurl linkurl jumlah\nfitur ini untuk mendownload jumlah yang ingin didownload\nContoh: ${prefix}postigurl https://www.instagram.com/p/CP3QRfTpUGN/ 2`, id)
					const jams = args[0]
					const jamss = args[1]
					if (jamss > 11) return aruga.reply(from, 'Maksimal 10', id)
					aruga.reply(from, mess.wait, id)
					try {
						const beasin = await axios.get(`https://zekais-api.herokuapp.com/igdl?url=${jams}`)
						const beasin2 = beasin.data
						if (beasin2.status == 500) return aruga.reply(from, `Link tidak valid`, id)
						for (let i = 0; i < jamss; i++) {
							await aruga.sendFileFromUrl(from, beasin2.result[i].url, '', `*from: ${beasin2.owner_user}*\n*uploaded: ${beasin2.date}*\n*caption:* ${beasin2.capt}*`, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, err.message, id)
								})
						}
					} catch (err) {
						console.log(err)
						aruga.reply(from, err.message, id)
					}
					break
				case prefix + 'postig':
					if (args.length == 0) return aruga.reply(from, `Fitur untuk mencari post dari instagram seseorang\nketik ${prefix}postig username|jumlah\ncontoh: ${prefix}postig yourrkayesss|3`, id)
					const wall1 = body.slice(8)
					const jml = q.split('|')[0]
					const jml2 = q.split('|')[1]
					aruga.reply(from, mess.wait, id)
					try {
						const wall = await axios.get(`http://docs-jojo.herokuapp.com/api/insta_v2?username=${jml}`)
						const wall2 = wall.data
						if (jml2 > 7) return aruga.reply(from, 'Maksimal 7!', id)
						for (let i = 0; i < jml2; i++) {
							await aruga.sendFileFromUrl(from, wall2.resource[i].url, '', '', id)
						}
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Terjadi kesalahan pada sistem, silahkan coba lagi!', id)
					}
					break
				case prefix + 'carimanga':
				case prefix + 'mangasearch':
					if (args.length == 0) return aruga.reply(from, `Menampilkan list mangatoon dari query\nContoh: ${prefix}mangasearch love`, id)
					const carimanga = args[0]
					aruga.reply(from, mess.wait, id)
					const datamanga = await axios.get(`http://zekais-api.herokuapp.com/mangatoonsr?query=${carimanga}`)
					const resmanga = datamanga.data
					const manres = resmanga.result
					let mangatext = `*「 M A N G A T O O N 」*\n`
					for (let i = 0; i < manres.length; i++) {
						mangatext += `\n─────────────────\n\n*•Title:* ${manres[i].title}\n*•Genre:* ${manres[i].genre}\n*•Url:* ${manres[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, manres[0].thumb, 'thumb.jpg', mangatext, id)
						.catch(() => {
							aruga.reply(from, 'Manga yang kamu cari tidak ada', id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'readmanga':
				case prefix + 'bacamanga':
					if (args.length == 0) return aruga.reply(from, 'linknya mana?', id)
					const linkmanga = args[0]
					aruga.reply(from, mess.wait, id)
					const downmanga = await axios.get(`http://zekais-api.herokuapp.com/getmangatoon?url=${linkmanga}`)
					const downdata = downmanga.data
					const mangaresult = downdata.result
					const replys = `*•Judul:* ${downdata.title}\n*•Genre:* ${downdata.genre}\n*•Author:* ${downdata.author}\n*•Rating:* ${downdata.score}\n*•Views:* ${downdata.view_count}\n*•Likes:* ${downdata.like_count}\n*•Desc:* ${downdata.desc}`
					await aruga.sendFileFromUrl(from, downmanga.thumb, 'thumb.jpg', replys, id)
					let mangatext2 = `*「 M A N G A T O O N 」*\n`
					for (let i = 0; i < mangaresult.length; i++) {
						mangatext2 += `\n─────────────────\n\n*•Episode 1:* ${mangaresult[i].episode}\n*•Url:* ${mangaresult[i].url}\n`
					}
					await aruga.reply(from, mangatext2, id)
						.catch(() => {
							aruga.reply(from, 'Manga yang kamu cari tidak ada', id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'javhd':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					if (args.length == 0) return aruga.reply(from, `Fitur untuk mencari yaa you know lah mwehehe\nUsage : ${prefix}javhd title\nContoh: ${prefix}javhd big tits`, id)
					const carijav = body.slice(7)
					aruga.reply(from, mess.wait, id)
					const javapi = await axios.get(`https://dapuhy-api.herokuapp.com/api/search/javhdd?query=${carijav}&apikey=${dapuhyapi}`)
					const javdata = javapi.data
					const javres = javdata.result
					let javtext = `*「 J A V  H D 」*\n`
					for (let i = 0; i < javres.length; i++) {
						javtext += `\n─────────────────\n\n*•Judul:* ${javres[i].title}\n*•Kualitas:* ${javres[i].quality}\n*•Url:* ${javres[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, javres[0].thumb, 'img.jpg', javtext, id)
						.catch(() => {
							aruga.reply(from, `Query yang anda cari tidak dapat ditemukan`, id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'javporn':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					if (args.length == 0) return aruga.reply(from, `Fitur untuk mencari yaa you know lah mwehehe\nUsage : ${prefix}javporn title\nContoh: ${prefix}javporn mom`, id)
					const cariporn = body.slice(9)
					aruga.reply(from, mess.wait, id)
					const javpornapi = await axios.get(`https://dapuhy-api.herokuapp.com/api/search/javhdporn?query=${cariporn}&apikey=${dapuhyapi}`)
					const javporndata = javpornapi.data
					const pornres = javporndata.result
					let porntext = `*「 J A V  P O R N 」*\n`
					for (let i = 0; i < pornres.length; i++) {
						porntext += `\n─────────────────\n\n*•Judul:* ${pornres[i].title}\n*•Views:* ${pornres[i].viewers}\n*•Durasi:* ${pornres[i].duration}\n*•Kualitas:* ${pornres[i].quality}\n*•Url:* ${pornres[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, pornres[0].thumb, 'thumb.jpg', porntext, id)
						.catch(() => {
							aruga.reply(from, 'Query yang kamu cari tidak ada', id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'spotifysearch':
				case prefix + 'searchspotify':
					if (args.length == 0) return aruga.reply(from, `Menampilkan list spotify yang anda cari!\nGunakan ${prefix}spotifysearch judul lagu\nContoh: ${prefix}spotifysearch young`, id)
					const carispotify = body.slice(15)
					aruga.reply(from, mess.wait, id)
					const spotifyapi = await axios.get(`https://zekais-api.herokuapp.com/spotifysr?query=${carispotify}`)
					const spotifydata = spotifyapi.data
					const spotres = spotifydata.result
					let spotifytext = `*「 S P O T I F Y 」*\n`
					for (let i = 0; i < spotres.length; i++) {
						spotifytext += `\n─────────────────\n\n*•Title:* ${spotres[i].title}\n*•Artists:* ${spotres[i].artists}\n*•Popularity:* ${spotres[i].popularity}\n*•Release Date:* ${spotres[i].release_date}\n*•Url:* ${spotres[i].url}\n`
					}
					await aruga.sendFileFromUrl(from, spotres[0].thumb, 'img.jpg', spotifytext, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Terjadi kesalahan, silahkan ulangi', id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'spotifydown':
					if (args.length == 0) return aruga.reply(from, `Mendownload lagu dari spotify menggunakan link spotify\nPenggunaan : ${prefix}spotifydown url track\nContoh : ${prefix}spotifydown https://open.spotify.com/track/3OP8UeYimRl9HCNxMg7Ihl`, id)
					const linkspot = body.slice(13)
					aruga.reply(from, mess.wait, id)
					rugaapi.spotify(linkspot)
						.then(async (res) => {
							if (res.status == 404) return aruga.reply(from, res.message, id)
							aruga.sendFileFromUrl(from, res.result.thumbnail, 'thumb.jpg', `「 *SPOTIFY* 」\n\n*•Title:* ${res.result.title}\n*•Duration:* ${res.result.duration} Sec\n*•Artists:* ${res.result.artists}\n*•Popularity:* ${res.result.popularity}\n\n*_Waitt, lemme send this fuckin' audio_*`, id)
							aruga.sendFileFromUrl(from, res.result.link, '', '', id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Meng-error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'spotify':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari lagu dari spotify, gunakan ${prefix}spotify judul lagu`, id)
					const carispot = body.slice(9)
					const spos = await axios.get(`http://lolhuman.herokuapp.com/api/spotifysearch?apikey=${lolhuman}&query=${carispot}`)
					aruga.reply(from, mess.wait, id)
					rugaapi.spotify(spos.data.result[0].link)
						.then(async (res) => {
							aruga.sendFileFromUrl(from, res.result.thumbnail, 'thumb.jpg', `「 *SPOTIFY* 」\n\n*•Title:* ${res.result.title}\n*•Duration:* ${res.result.duration} Sec\n*•Artists:* ${res.result.artists}\n*•Popularity:* ${res.result.popularity}\n\n*_Waitt, lemme send this fuckin' audio_*`, id)
							aruga.sendFileFromUrl(from, res.link, '', '', id)
								.catch(() => {
									aruga.reply(from, 'Error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Error tuh', id)
						})
					break
				case prefix + 'exec':
					if (!isOwner) return aruga.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Bot!`, id)
					if (!q) return await aruga.reply(from, `Masukkan kode command prompt`, id)
					//const execute = require("child_process")
					var spawn = require('child_process').exec;
					function os_func() {
						this.execCommand = function (command) {
							return new Promise((resolve, reject) => {
								spawn(command, (error, stdout) => {
									if (error) {
										reject(error);
										return;
									}
									resolve(stdout)
								});
							})
						}
					}
					var oz = new os_func();
					oz.execCommand(q).then((res) => {
						aruga.reply(from, `> root@Urbaeexyz:~ # ${res}`, id)
					}).catch(err => {
						return aruga.reply(from, `> root@Urbaeexyz:~ # ${err}`, id)
						//console.log("os >>>", err);
					})
					break
				case prefix + 'play3':
					if (args.length == 0) return aruga.reply(from, `what are u looking for?`, id)
					const linuxsc = body.slice(7)
					fetchJson(`https://api.zeks.xyz/api/yts?apikey=${apikeyvinz}&q=${linuxsc}`)
						.then(async (res) => {
							console.log(color(`Nickname : ${pushname}\nNomor : ${serial.replace('@c.us', '')}\nJudul: ${res.result[0].video.title}\nDurasi: ${res.result[0].video.duration} detik`, 'aqua'))
							await aruga.sendFileFromUrl(from, res.result[0].video.thumbnail_src, 'thumb.jpg', `「 *PLAY* 」\n\n*Title:* ${res.result[0].video.title}\n*Duration:* ${res.result[0].video.duration} detik\n*Views:* ${res.result[0].video.views}\n*Uploaded:* ${res.result[0].video.upload_date}\n*Channel:* ${res.result[0].uploader.username}\n*Url:* ${res.result[0].video.url}\n\n*_Waitt, lagi ngirim Audionyaa_*`, id)
							rugaapi.playlinux(linuxsc)
							if (res.status == false) return aruga.reply(from, res.message, id)
							aruga.sendFileFromUrl(from, res.url, 'song.mp3', '', id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, err.message, id)
								})
						})
					break
				case prefix + 'play'://silahkan kalian custom sendiri jika ada yang ingin diubah
					if (args.length == 0) return aruga.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: ${prefix}play judul lagu`, id)
					axios.get(`http://docs-jojo.herokuapp.com/api/yt-search?q=${body.slice(6)}`)
						//fetchJson(`https://api.zeks.xyz/api/yts?apikey=${apikeyvinz}&q=${body.slice(6)}`)
						.then(async (res) => {
							console.log(color(`Nickname : ${pushname}\nNomor : ${serial.replace('@c.us', '')}\nJudul: ${res.data.result.result[0].title}\nDurasi: ${res.data.result.result[0].duration} detik`, 'aqua'))
							await aruga.sendFileFromUrl(from, res.data.result.result[0].thumbnails[0].url, ``, `「 *PLAY* 」\n\nJudul: ${res.data.result.result[0].title}\nDurasi: ${res.data.result.result[0].duration} detik\nViews: ${res.data.result.result[0].viewCount.text}\nUploaded: ${res.data.result.result[0].publishedTime}\nChannel: ${res.data.result.result[0].channel.name}\n\n*_Wait, lagi ngirim Audionya_*`, id)
							//await aruga.sendFileFromUrl(from, res.result[0].video.thumbnail_src, 'thumb.jpg', `「 *PLAY* 」\n\n*Title:* ${res.result[0].video.title}\n*Duration:* ${res.result[0].video.duration} detik\n*Views:* ${res.result[0].video.views}\n*Uploaded:* ${res.result[0].video.upload_date}\n*Channel:* ${res.result[0].uploader.username}\n*Verified Channel:* ${res.result[0].uploader.verified}\n*Url:* ${res.result[0].video.url}\n\n*_Waitt, lagi ngirim Audionyaa_*`, id)
							rugaapi.ymp3v2(`https://youtu.be/${res.data.result.result[0].id}`)
								.then(async (res) => {
									if (res.status == false) return aruga.reply(from, res.result, id)
									const playlink = res.link
									aruga.sendFileFromUrl(from, playlink, '', '', id)
										.catch(() => {
											aruga.reply(from, 'Error', id)
										})
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'trendingtwit':
				case prefix + 'trendtwit':
					await aruga.reply(from, mess.wait, id)
					rugaapi.trend()
						.then(async ({ result }) => {
							let trend = '-----[ *TRENDING TWITTER* ]-----'
							for (let i = 0; i < result.length; i++) {
								trend += `\n\n➸ *Hashtag :* ${result[i].hastag}\n➸ *Trending Number :* ${result[i].rank}\n➸ *Jumlah Tweets :* ${result[i].tweet}\n➸ *Link :* ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
							}
							await aruga.reply(from, trend, id)
							console.log('Success sending Trending Tweets')
						})
						.catch(async (err) => {
							console.error(err)
							await aruga.reply(from, 'Error!', id)
						})
					break
				case prefix + 'ytshorts':
					if (args.length == 0) return aruga.reply(from, `Untuk mendownload video dari snap youtube, gunakan ${prefix}ytshorts link snap`, id)
					axios.get(`https://api.vhtear.com/youtube_short_download?link=${body.slice(10)}&apikey=${vhtearkey}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result.image, 'img.jpg', `「 *YOUTUBE SHORTS* 」\n\n*Title:* ${res.data.result.title}\n*Views:* ${res.data.result.view_count}\n*Uploader:* ${res.data.result.uploader}\n\n*_Waitt, lagi ngirim Videonyaa`, id)
							await aruga.sendFileFromUrl(from, res.data.result.url_video, '', '', id)
								.catch(() => {
									aruga.reply(from, 'Linknya salah tuh', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Error', id)
						})
					break
				case prefix + 'play2'://silahkan kalian custom sendiri jika ada yang ingin diubah
					if (args.length == 0) return aruga.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: ${prefix}play judul lagu`, id)
					axios.get(`http://docs-jojo.herokuapp.com/api/yt-search?q=${body.slice(7)}`)
						//fetchJson(`https://api.zeks.xyz/api/yts?apikey=${apikeyvinz}&q=${body.slice(7)}`)
						.then(async (res) => {
							console.log(color(`Nickname : ${pushname}\nNomor : ${serial.replace('@c.us', '')}\nJudul: ${res.data.result.result[0].title}\nDurasi: ${res.data.result.result[0].duration} detik`, 'aqua'))
							await aruga.sendFileFromUrl(from, res.data.result.result[0].thumbnails[0].url, ``, `「 *PLAY* 」\n\nJudul: ${res.data.result.result[0].title}\nDurasi: ${res.data.result.result[0].duration} detik\nViews: ${res.data.result.result[0].viewCount.short}\nUploaded: ${res.data.result.result[0].publishedTime}\nChannel: ${res.data.result.result[0].channel.name}\n\n*_Wait, lagi ngirim Audionya_*`, id)
							//await aruga.sendFileFromUrl(from, res.result[0].video.thumbnail_src, 'thumb.jpg', `「 *PLAY* 」\n\n*Title:* ${res.result[0].video.title}\n*Duration:* ${res.result[0].video.duration} detik\n*Views:* ${res.result[0].video.views}\n*Uploaded:* ${res.result[0].video.upload_date}\n*Channel:* ${res.result[0].uploader.username}\n*Verified Channel:* ${res.result[0].uploader.verified}\n*Url:* ${res.result[0].video.url}\n\n*_Waitt, lagi ngirim Audionyaa_*`, id)
							//await aruga.sendFileFromUrl(from, thumbnih, 'thumb.jpg', `「 *PLAY* 」\n\n*Title:* ${res.result.result[0].title}\n*Duration:* ${res.result.result[0].duration} detik\n*Views:* ${res.result.result[0].viewCount.short}\n*Uploaded:* ${res.result.result[0].publishedTime}\n*Channel:* ${res.result.result[0].channel.name}\n*Url:* ${res.result.result[0].link}\n\n*_Waitt, lagi ngirim Audionyaa_*`, id)
							rugaapi.ymp4v2(`https://youtu.be/${res.data.result.result[0].id}`)
								.then(async (res) => {
									aruga.sendFileFromUrl(from, res.link, '', '', id)
										.catch(() => {
											aruga.reply(from, 'Error bang', id)
										})
								})
						})
					break
				case prefix + 'whatanime':
					if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
						if (isMedia) {
							var mediaData = await decryptMedia(message, uaOverride)
						} else {
							var mediaData = await decryptMedia(quotedMsg, uaOverride)
						}
						const fetch = require('node-fetch')
						const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
						aruga.reply(from, 'Searching....', id)
						fetch('https://trace.moe/api/search', {
							method: 'POST',
							body: JSON.stringify({ image: imgBS4 }),
							headers: { "Content-Type": "application/json" }
						})
							.then(respon => respon.json())
							.then(resolt => {
								if (resolt.docs && resolt.docs.length <= 0) {
									aruga.reply(from, 'Maaf, saya tidak tau ini anime apa, pastikan gambar yang akan di Search tidak Buram/Kepotong', id)
								}
								const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
								teks = ''
								if (similarity < 0.92) {
									teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
								}
								teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
								teks += `➸ *R-18?* : ${is_adult}\n`
								teks += `➸ *Eps* : ${episode.toString()}\n`
								teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
								var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
								aruga.sendFileFromUrl(from, video, 'anime.mp4', teks, id).catch(() => {
									aruga.reply(from, teks, id)
								})
							})
							.catch(() => {
								aruga.reply(from, 'Ada yang Error!', id)
							})
					} else {
						aruga.reply(from, `Maaf format salah\n\nSilahkan kirim foto dengan caption ${prefix}whatanime\n\nAtau reply foto dengan caption ${prefix}whatanime`, id)
					}
					break

				// Other Command
				case prefix + 'resi':
					if (args.length !== 2) return aruga.reply(from, `Maaf, format pesan salah.\nSilahkan ketik pesan dengan ${prefix}resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`, id)
					const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
					if (!kurirs.includes(args[0])) return aruga.sendText(from, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
					console.log('Memeriksa No Resi', args[1], 'dengan ekspedisi', args[0])
					cekResi(args[0], args[1]).then((result) => aruga.sendText(from, result))
					break
				case prefix + 'tts':
					if (args.length == 0) return aruga.reply(from, `Mengubah teks menjadi sound (google voice)\nketik: ${prefix}tts <kode_bahasa> <teks>\ncontoh : ${prefix}tts id halo\nuntuk kode bahasa cek disini : https://anotepad.com/note/read/5xqahdy8\n\nAtau kalian bisa menggunakan command ${prefix}kodebahasa`, id)
					const ttsGB = require('node-gtts')(args[0])
					const dataText = body.slice(8)
					if (dataText === '') return aruga.reply(from, 'apa teksnya syg..', id)
					try {
						ttsGB.save('./media/tts.mp3', dataText, function () {
							aruga.sendPtt(from, './media/tts.mp3', id)
							setTimeout(() => {
								fs.unlinkSync('./media/tts.mp3')
							}, 30000)
						})
					} catch (err) {
						aruga.reply(from, err, id)
					}
					break
				case prefix + 'searchwp':
					if (args.length == 0) return aruga.reply(from, `Mencari wallpaper dengan query, gunakan ${prefix}searchwp2 query`, id)
					const cariwp2 = body.slice(10)
					aruga.reply(from, mess.wait, id)
					axios.get(`http://lolhuman.herokuapp.com/api/wallpaper2?apikey=${lolhuman}&query=${cariwp2}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result, '', '', id)
								.catch(() => {
									aruga.reply(from, 'Query yang anda cari tidak dapat ditemukan', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Terjadi kesalahan, silahkan coba ulangi', id)
						})
					break
				case prefix + 'covid19':
				case prefix + 'corona':
					rugaapi.corona()
						.then(async (res) => {
							await aruga.reply(from, `${res}`, id)
						})
					break
				case prefix + 'covidindo':
					rugaapi.covidindo()
						.then(async (res) => {
							await aruga.reply(from, `${res}`, id)
						})
					break
				case prefix + 'ceklokasi':
					if (quotedMsg.type !== 'location') return aruga.reply(from, `Maaf, format pesan salah.\nKirimkan lokasi dan reply dengan caption ${prefix}ceklokasi`, id)
					console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
					const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
					if (zoneStatus.kode !== 200) aruga.sendText(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
					let datax = ''
					for (let i = 0; i < zoneStatus.data.length; i++) {
						const { zone, region } = zoneStatus.data[i]
						const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
						datax += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
					}
					const text = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${datax}`
					aruga.sendText(from, text)
					break
				case prefix + 'shortlink':
					if (args.length == 0) return aruga.reply(from, `ketik ${prefix}shortlink <url>`, id)
					axios.get(`https://api.vhtear.com/shortener?link=${body.slice(11)}&apikey=vhtearkey`).then(res => {
						const shortin = `${res.data.result.Short}`
						aruga.reply(from, shortin, id)
							.catch(() => {
								aruga.reply(from, 'Error njing', id)
							})
					})
					break
				case prefix + 'bapakfont':
					if (args.length == 0) return aruga.reply(from, `Mengubah kalimat menjadi alayyyyy\n\nketik ${prefix}bapakfont kalimat`, id)
					rugaapi.bapakfont(body.slice(11))
						.then(async (res) => {
							await aruga.reply(from, `${res}`, id)
						})
					break
					
				// Group Commands (group admin only)
				case prefix + 'add':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!, Member mah gosah sok keras', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gua admin', id)
					if (args.length !== 1) return aruga.reply(from, `Untuk menggunakan ${prefix}add\nPenggunaan: ${prefix}add <nomor>\ncontoh: ${prefix}add 628xxx`, id)
					try {
						await aruga.addParticipant(from, `${args[0]}@c.us`)
					} catch {
						aruga.reply(from, 'Target hilang diradar, Enemies Ahead!', id)
					}
					break
				case prefix + 'pkick':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin, member mah gausah sok keras', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gw admin', id)
					if (mentionedJidList.length === 0) return aruga.reply(from, 'Maaf, format pesan salah.\nSilahkan tag satu atau lebih orang yang akan dikeluarkan', id)
					if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mengeluarkan akun bot sendiri', id)
					await aruga.sendTextWithMentions(from, `Done!, mengeluarkan ${mentionedJidList.map(x => `@${x.replace('@c.us', '')} agar menjadi anak pungut`).join('\n')}`)
					for (let i = 0; i < mentionedJidList.length; i++) {
						if (ownerNumber.includes(mentionedJidList[i])) return aruga.reply(from, 'Siapa lu mau ngekick Owner gua?', id)
						if (groupAdmins.includes(mentionedJidList[i])) return await aruga.reply(from, 'GOBLOK, Mana bisa ngekick admin tolol', id)
						await aruga.removeParticipant(groupId, mentionedJidList[i])
					}
					break
				case prefix + 'kick':
					var qmid2 = quotedMsgObj.sender.id
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin, member mah gausah sok keras', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gw admin', id)
					try {
						if (ownerNumber.includes(qmid2)) return aruga.reply(from, 'Siapa lu mau ngekick Owner gua?', id)
						if (botNumber.includes(qmid2)) return aruga.reply(from, 'mau ngekick gua kah akwoakwoo', id)
						await aruga.removeParticipant(groupId, qmid2)
					} catch {
						aruga.reply(from, 'Maaf, terjadi kesalahan', id)
					}
					break
				case prefix + 'opromote':
					var senderx = quotedMsgObj.sender.id
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya bisa digunakan didalam Grup!', id)
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Admin Grup!', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Fitur ini hanya bisa digunakan ketika Bot menjadi Admin', id)
					await aruga.promoteParticipant(groupId, senderx)
					await aruga.sendText(from, `Donee!\n\nCieee diangkat derajatnya xixi`)
					break
				case prefix + 'promote':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin, member mah gausah sok keras', id)
					if (!isBotGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini jadiin gw admin', id)
					if (mentionedJidList.length !== 1) return aruga.reply(from, 'Maaf, hanya bisa mempromote 1 user', id)
					if (groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'GOBLOG, tuh anak udah jadi admin bego.', id)
					if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mempromote akun bot sendiri', id)
					await aruga.promoteParticipant(groupId, mentionedJidList[0])
					await aruga.sendTextWithMentions(from, `Done, ciee, @${mentionedJidList[0].replace('@c.us', '')} Diangkat derajatnyaaa xixi.`)
					break
				case prefix + 'demoteme':
					if (!isGroupAdmins) return aruga.reply(from, 'cuman bisa dipake sama Admin!', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Jadiin admin dulu', id)
					await aruga.demoteParticipant(groupId, serial)
					await aruga.sendText(from, `request diterima, ${pushname} ingin jadi babi karna dia kepengen`)
					await aruga.promoteParticipant(groupId, serial)
					await aruga.sendText(from, `Prank boiss, jadi admin lagi kok`)
					break
				case prefix + 'odemote':
					var sendis = quotedMsgObj.sender.id
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, fitur ini hanya bisa digunakan didalam Grup!', id)
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama Admin', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Silahkan tambahkan bot menjadi admin agar bisa mendemote seseorang', id)
					await aruga.demoteParticipant(groupId, sendis)
					await aruga.sendText(from, `Donee!, mampus jadi Babi lu kan`)
					break
				case prefix + 'demote':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin, member mah gausah sok keras', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gw admin', id)
					if (mentionedJidList.length !== 1) return aruga.reply(from, 'Maaf, hanya bisa mendemote 1 user', id)
					if (!groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'GOBLOG, tuh anak udah belom jadi admin mau lu demote. mana bisa tolol.', id)
					if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mendemote akun bot sendiri', id)
					await aruga.demoteParticipant(groupId, mentionedJidList[0])
					await aruga.sendTextWithMentions(from, `Done, Mampus lu @${mentionedJidList[0].replace('@c.us', '')} Jadi babi lu kan awkowko`)
					break
				case prefix + 'bye':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin, member mah gausah sok keras', id)
					aruga.sendText(from, 'Jahat kelen sama aku... ( ⇀‸↼‶ )').then(() => aruga.leaveGroup(groupId))
					break
				case prefix + 'del':
				case prefix + 'delete':
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Gagal, fitur ini bakalan work kalo dipake sama admin, member mah gausah sok keras', id)
					if (!quotedMsg) return aruga.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
					if (!quotedMsgObj.fromMe) return aruga.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
					aruga.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
					break
				case prefix + 'sandwriting':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}sandwriting [ Teks ]*\nContoh *${prefix}sandwriting Urbae Ganteng*`, id)
					const swrt = body.slice(13)
					try {
						const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt + '&apikey=' + vhtearkey)
						const { imgUrl } = swrt2.data.result
						const swrt3 = `*「 SAND WRITING 」*
*Text : ${swrt}*`
						const pictk = await bent("buffer")(imgUrl)
						const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
						aruga.sendImage(from, base64, swrt3)
					} catch (err) {
						console.error(err.message)
						await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
						aruga.sendText(from, 'Sand Writing Error : ' + err)
					}
					break
				case prefix + 'artimimpi':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					if (args.length === 0) return aruga.reply(from, `Kirim perintah *${prefix}artimimpi [mimpi]*\nContoh : *${prefix}artimimpi ular*`, id)
					try {
						const resp = await axios.get('https://api.vhtear.com/artimimpi?query=' + body.slice(10) + '&apikey=' + vhtearkey)
						if (resp.data.error) return aruga.reply(from, resp.data.error, id)
						const anm2 = `➸ Artimimpi : ${resp.data.result.hasil}`
						aruga.reply(from, anm2, id)
					} catch (err) {
						console.error(err.message)
						await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Mimpi tidak ditemukan')
						aruga.sendText(from, 'Artimimpi Error : ' + err)
					}
					break
				case prefix + 'attp':
					if (args.length == 0) return aruga.reply(from, 'teksnya mana sayang?', id)
					const txtx = body.slice(6)
					const beattp = await axios.get(`https://api.xteam.xyz/attp?text=${txtx}`)
					const beresult = beattp.data.result
					aruga.sendRawWebpAsSticker(from, beresult, { author: authorr, pack: pack }, id)
					break
				case prefix + 'trigger':
				case prefix + 'triggered':
					if (isMedia && isImage || isQuotedImage) {
						var encryptMedia = isQuotedImage ? quotedMsg : message
						var pepa = await decryptMedia(encryptMedia, uaOverride)
						canvas.Canvas.trigger(pepa)
							.then(async (buffer) => {
								canvas.write(buffer, `${sender.id}_trigger.jpg`)
								await aruga.sendImageAsSticker(from, `${sender.id}_trigger.jpg`, { author: authorr, pack: pack })
								fs.unlinkSync(`${sender.id}_trigger.jpg`)
							})
					} else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
						const mediaData = await decryptMedia(quotedMsg, uaOverride)
						canvas.Canvas.trigger(mediaData)
							.then(async (buffer) => {
								canvas.write(buffer, `${sender.id}_trigger.jpg`)
								await aruga.sendImageAsSticker(from, `${sender.id}_trigger.jpg`, { author: authorr, pack: pack })
								fs.unlinkSync(`${sender.id}_trigger.jpg`)
							})
					} else {
						aruga.reply(from, 'format pesan salah', id)
					}
					break
				case prefix + 'wanted':
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
					const wantedd = body.slice(8)
					try {
						if (isMedia && isImage || isQuotedImage) {
							var encryptMedia = isQuotedImage ? quotedMsg : message
							var ppRaww = await decryptMedia(encryptMedia, uaOverride)
							canvas.Canvas.wanted(ppRaww)
								.then(async (buffer) => {
									canvas.write(buffer, `${sender.id}_wanted.png`)
									await aruga.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
									fs.unlinkSync(`${sender.id}_wanted.png`)
								})
						} else if (wantedd == "me") {
							var ppRaww = await aruga.getProfilePicFromServer(sender.id)
							if (ppRaww == undefined) {
								aruga.reply(from, 'Foto tidak ada atau mungkin bersifat private', id)
							} else {
								canvas.Canvas.wanted(ppRaww)
									.then(async (buffer) => {
										canvas.write(buffer, `${sender.id}_wanted.png`)
										await aruga.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
										fs.unlinkSync(`${sender.id}_wanted.png`)
									})
							}
						} else if (args[0] === 'nih') {
							var qmbans = quotedMsgObj.sender.id
							var jss = await aruga.getProfilePicFromServer(qmbans)
							if (jss == undefined) {
								aruga.reply(from, 'Foto profil kosong/Private nih', id)
							}
							else {
								canvas.Canvas.wanted(jss)
									.then(async (buffer) => {
										canvas.write(buffer, `${sender.id}_wanted.png`)
										await aruga.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
										fs.unlinkSync(`${sender.id}_wanted.png`)
									})
							}
						} else {
							var texnugmm = body.slice(8)
							var getnomberr = await aruga.checkNumberStatus(texnugmm)
							var useriqq = getnomberr.id.replace('@', '') + '@c.us'
							var jnck = await aruga.getProfilePicFromServer(useriqq)
							if (jnck == undefined) {
								aruga.reply(from, 'Foto profil kosong atau private', id)
							}
							else {
								canvas.Canvas.wanted(jnck)
									.then(async (buffer) => {
										canvas.write(buffer, `${sender.id}_wanted.png`)
										await aruga.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
										fs.unlinkSync(`${sender.id}_wanted.png`)
									})
							}
						}
					} catch (err) {
						console.log(err)
						await aruga.reply(from, 'Error!', id)
					}
					break
				case prefix + 'arrowsigns':
					if (args.length == 0) return aruga.reply(from, `Membuat text menjadi foto petunjuk arah, gunakan ${prefix}arrowsigns nama1 nama2\nContoh: ${prefix}arrowsigns Urbaee Xyz`, id)
					const ahshit = args[0]
					const ahshit2 = args[1]
					if (ahshit.length > 7) return aruga.reply(from, `Maksimal 7 huruf!`, id)
					if (ahshit2.length > 7) return aruga.reply(from, `Maksimal 7 Huruf!`, id)
					aruga.reply(from, mess.wait, id)
					axios.get(`https://fzn-gaz.herokuapp.com/api/arrow-signs?text=${ahshit}&text2=${ahshit2}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result, 'arrow.jpg', `nehhh ${pushname} dah jadi`, id)
								.catch(() => {
									aruga.reply(from, 'Error!, mungkin server sedang maintenance', id)
								})
						})
						.catch(err => {
							console.log(err)
						})
					break
				case prefix + 'tahta':
					const jreng = body.slice(7)
					if (!jreng) return aruga.reply(from, `Kirim perintah *${prefix}tahta [teks]*\n\nContoh *${prefix}tahta elaina*`, id)
					if (jreng.length > 7) return aruga.reply(from, 'Maksimal 7 Huruf!', id)
					aruga.reply(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
					const tahtuy = `https://api.zeks.xyz/api/hartatahta?text=${jreng}&apikey=${apikeyvinz}`
					aruga.sendFileFromUrl(from, tahtuy, `${jreng}.jpg`, `*_Harta_*\n*_Tahta_*\n*_${jreng}_*`, id)
					aruga.sendImageAsSticker(from, tahtuy, { author: author, pack: pack, keepScale: true })
						.catch(() => {
							aruga.reply(from, 'Error', id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'family100':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					try {
						const resp = await axios.get('https://api.vhtear.com/family100&apikey=' + vhtearkey)
						if (resp.data.error) return aruga.reply(from, resp.data.error, id)
						const anm2 = `➸ Soal : ${resp.data.result.soal}\n_Silahkan DiJawab_`
						const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
						aruga.reply(from, anm2, id)
						aruga.sendText(from, `30 Detik Lagi...`, id)
						await sleep(10000)
						aruga.sendText(from, `20 Detik Lagi...`, id)
						await sleep(10000)
						aruga.sendText(from, `10 Detik Lagi...`, id)
						await sleep(10000)
						aruga.reply(from, jwban, id)
					} catch (err) {
						console.error(err.message)
						await aruga.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
						aruga.sendText(ownerNumber, 'Family100 Error : ' + err)
					}
					break
				case prefix + 'stalkyt':
					if (args.length == 0) return aruga.reply(from, `Untuk menstalk akun youtube seseorang\nKetik ${prefix}stalkyt nama channel\nContoh: ${prefix}stalkyt CUCO`, id)
					aruga.reply(from, mess.wait, id)
					const ytstlk = body.slice(9)
					axios.get(`http://lolhuman.herokuapp.com/api/ytchannel?apikey=${lolhuman}&query=${ytstlk}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result[0].channel_picture.medium.url, 'img.jpg', `*Nama Channel:* ${res.data.result[0].channel_name}\n*Tentang Channel:* ${res.data.result[0].channel_about}\n*Id Channel:* ${res.data.result[0].channel_id}\n*Channel Created:* ${res.data.result[0].channel_created}`, id)
								.catch(() => {
									aruga.reply(from, 'Error om', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'tiktokpic':
					if (args.length == 0) return await aruga.reply(from, `Untuk mendapatkan foto dari username tiktok\nUsage : ${prefix}tiktokpic itsandani`, id)
					const namaih = body.slice(11)
					aruga.reply(from, mess.wait, id)
					aruga.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/pptiktok/${namaih}?apikey=${lolhuman}`, 'img.jpg', '', id)
						.catch(() => {
							aruga.reply(from, 'error', id)
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'sfiledown':
					if (args.length == 0) return aruga.reply(from, `Untuk mendapatkan hasil download, silahkan gunakan ${prefix}sfiledown link sfile`, id)
					const downsf = body.slice(11)
					aruga.reply(from, mess.wait, id)
					axios.get(`https://fzn-gaz.herokuapp.com/api/sfiledl?url=${downsf}`)
						.then(async (res) => {
							const dock = res.data.result
							const tobelink = await axios.get(`https://lindow-api.herokuapp.com/api/short/tiny?url=${dock}&apikey=${lindowapi}`)
							const link1 = tobelink.data.result.link
							if (!isPrem && !isOwnerB) return aruga.reply(from, `Maaf karna anda bukan user premium, silahkan download melalui link dibawah\n\nLink: ${link1}`, id)
							await aruga.sendFileFromUrl(from, dock, '', '', id)
								.catch(() => {
									aruga.reply(from, 'Lagi error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'Linknya ga valid kali atau gada diweb', id)
						})
					break
				case prefix + 'gabut':
					axios.get(`https://h4ck3rs404-api.herokuapp.com/api/gabut?apikey=${hackapi}`)
						.then(async (res) => {
							aruga.reply(from, `Aktivitas: ${res.data.result.activity}\nTipe: ${res.data.result.type}`)
								.catch(err => {
									console.log(err)
									aruga.reply(from, err.message, id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'sfile':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari file/config di website Sfile, kirim perintah ${prefix}sfile nama config/file`, id)
					const cariconfig = body.slice(7)
					await aruga.reply(from, mess.wait, id)
					try {
						const becon = await axios.get(`https://dapuhy-api.herokuapp.com/api/search/sfile?query=${cariconfig}&apikey=${dapuhyapi}`)
						const configdat = becon.data
						const gapapa = configdat.result
						let confa = `*「 SFILE 」*\n`
						for (let i = 0; i < gapapa.length; i++) {
							confa += `\n─────────────────\n\n*•Title:* ${gapapa[i].title}\n*•Size:* ${result[i].size}\n*•Link:* ${result[i].link}\n`
						}
						await aruga.reply(from, confa, id)
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Lagi error', id)
					}
					break
				case prefix + 'googleimg':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}googleimg aesthetic|jumlah`, id)
					const searchimage = q.split('|')[0]
					const jumlahimage = q.split('|')[1]
					if (jumlahimage > 13) return aruga.reply(from, 'Maksimal 13', id)
					aruga.reply(from, mess.wait, id)
					try {
						const imageaxios = await axios.get(`https://lindow-api.herokuapp.com/api/googleimg?q=${searchimage}&apikey=${lindowapi}`)
						const imagedata = imageaxios.data
						for (let i = 0; i < jumlahimage; i++) {
							await aruga.sendFileFromUrl(from, imagedata.result[i], '', '', id)
						}
					} catch (err) {
						console.log(err)
						aruga.reply(from, 'Image yang anda cari tidak ada', id)
					}
					break
				case prefix + 'bot':
					if (args.length == 0) return aruga.reply(from, 'Kirim perintah */bot [teks]*\nContoh : */ halo*', id)
					const que = body.slice(5)
					const sigo = await axios.get(`https://lindow-api.herokuapp.com/api/simi?text=${que}&lang=id&apikey=${lindowapi}`)
					console.log(color(`${que}`, 'green'))
					const sigot = sigo.data.response.text
					aruga.reply(from, sigot, id)
					console.log(color(`${sigot}`, 'green'))
					break
				case prefix + 'github':
				case prefix + 'githubstalk':
					if (args.length == 0) return aruga.reply(from, `Untuk men-stalk akun Github seseorang\nKetik : ${prefix}github [username]\nContoh : ${prefix}github Urbaee`, id)
					const gitstalk = await rugaapi.github(args[0])
					const gitpict = await rugaapi.githubpict(args[0])
					await aruga.sendFileFromUrl(from, gitpict, '', gitstalk, id)
						.catch(() => {
							aruga.reply(from, 'Username salah, silahkan masukkan username yang benar', id)
						})
					break
				case prefix + 'reverseword':
					if (args.length == 0) return aruga.reply(from, `Fitur untuk membalikkan huruf\nContoh : ${prefix}reverseword kok kebalik hurufnya`, id)
					const rev = body.slice(13)
					axios.get(`https://videfikri.com/api/hurufterbalik/?query=${rev}`).then(res => {
						console.log(rev)
						const balikin = `${res.data.result.kata}`
						aruga.reply(from, balikin, id)
						console.log(balikin)
					})
					break
				case prefix + 'prediksicuaca':
					if (args.length == 0) return aruga.reply(from, `Untuk memprediksi cuaca Kota gunakan ${prefix}prediksicuaca [namakota]\nContoh : ${prefix}prediksicuaca Pontianak`, id)
					const predik = await axios.get(`https://api.vhtear.com/weather?city=${body.slice(15)}&apikey=${vhtearkey}`)
					const iksi = predik.data.result
					const resil = `${iksi.weather}\n\n${iksi.location}`
					aruga.reply(from, resil, id)
						.catch(() => {
							return aruga.reply(from, 'Kota yang anda ketik tidak ditemukan...', id)
						})
					break
				case prefix + 'happymod':
					if (args.length == 0) return aruga.reply(from, `Fitur untuk mencari sebuah aplikasi mod dari Happymod\nContoh : ${prefix}happymod pubg`, id)
					const happymod = await axios.get(`https://zekais-api.herokuapp.com/happymodsr?query=${body.slice(10)}`)
					const hppy = happymod.data
					const modo = hppy.result
					if (modo.length == 0) return aruga.reply(from, 'Tidak dapat menemukan hasil', id)
					let resmod = `*「 HAPPY MOD 」*\n`
					for (let i = 0; i < modo.length; i++) {
						resmod += `\n─────────────────\n\n• *Title:* ${modo[i].name}\n• *Rating:* ${modo[i].rating}\n• *Url:* ${modo[i].url}\n`
					}
					aruga.sendFileFromUrl(from, modo[0].thumb, 'HAPPYMOD.jpg', resmod, id)
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'burn':
					if (args.length == 0) return aruga.reply(from, `textnya mana sayang?`, id)
					const initextnya = body.slice(6)
					await aruga.sendFileFromUrl(from, `http://zekais-api.herokuapp.com/sbburn?text=${initextnya}`, '', '', id)
					break
				case prefix + 'wikihow':
					aruga.reply(from, mess.wait, id)
					axios.get(`http://zekais-api.herokuapp.com/wikihow`)
						.then(async (res) => {
							const freply = res.data.title
							await aruga.sendFileFromUrl(from, res.data.url, 'img.jpg', freply, id)
								.catch(() => {
									aruga.reply(from, 'Lagi error', id)
								})
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, 'lagi error', id)
						})
					break
				case prefix + 'tobijak':
					if (args.length == 0) return aruga.reply(from, `Membuat kata bijak dari query\nContoh: ${prefix}tobijak sayang`, id)
					axios.get(`https://zenzapi.xyz/api/buatkata?query=${body.slice(9)}&apikey=${zenzapi}`)
						.then(async (res) => {
							if (res.data.status == false) return aruga.reply(from, 'Kata yang kamu masukkan tidak dapat ditemukan', id)
							aruga.reply(from, `${res.data.result.message}\n- ${res.data.result.by}`, id)
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'simi':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}bot [teks]\nContoh : ${prefix}bot halo`, id)
					const arbu = body.slice(6)
					axios.get(`https://zenzapi.xyz/api/simih?text=${arbu}&apikey=${zenzapi}`).then(res => {
						console.log(color(`${arbu}`, 'green'))
						const segey = res.data.result.message
						aruga.reply(from, segey, id)
						console.log(color(`${res.data}`, 'green'))
					})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'simi2':
					if (args.length == 0) return aruga.reply(from, `Kirim perintah ${prefix}simi2 halo anjing`, id)
					const anjg = body.slice(7)
					axios.get(`https://api.zeks.xyz/api/simi?apikey=${apikeyvinz}&text=${anjg}`).then(res => {
						console.log(color(`${anjg}`, 'green'))
						const babuy = `${res.data}`
						aruga.reply(from, babuy, id)
						console.log(color(`${babuy}`, 'green'))
					})
					break
				case prefix + 'wame':
					const gethosts = await aruga.getProfilePicFromServer(sender.id)
					if (gethosts == undefined) {
						var pfp = errorurl
					} else {
						var pfp = gethosts
					}
					await aruga.sendFileFromUrl(from, pfp, '', `wa.me/${serial.replace(/@c.us/g, '')}`, id)
					break
				case prefix + 'oedotensei':
					var qmes = quotedMsgObj.sender.id
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Admin Grup!', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Fitur ini hanya bisa digunakan ketika Bot menjadi Admin', id)
					try {
						if (ownerNumber.includes(qmes)) return aruga.reply(from, 'Siapa lu mau ngekick Owner gua?', id)
						if (botNumber.includes(qmes)) return aruga.reply(from, 'mau ngekick gua kah? akwoakwoa', id)
						await aruga.removeParticipant(groupId, qmes)
						await sleep(1000)
						await aruga.addParticipant(from, qmes)
					} catch {
						aruga.reply(from, 'Maaf, terjadi kesalahan', id)
					}
					break
				case prefix + 'edotensei':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
					if (mentionedJidList.length === 0) return aruga.reply(from, 'Fitur untuk menghapus member lalu menambahkan member kembali,kirim perintah ${prefix}edotensei @tagmember', id)
					for (let i = 0; i < mentionedJidList.length; i++) {
						if (groupAdmins.includes(mentionedJidList[i])) return aruga.reply(from, mess.error.Ki, id)
						if (ownerNumber.includes(mentionedJidList[i])) return aruga.reply(from, 'Tidak bisa mengeluarkan owner Bot')
						await aruga.removeParticipant(groupId, mentionedJidList[i])
						await sleep(1000)
						await aruga.addParticipant(from, `${mentionedJidList}`)
					}
					break
				case prefix + 'infoall':
				case prefix + 'everyone':
				case prefix + 'tagall':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins & !isOwnerB) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
					const textInfo = body.slice(8)
					const namagcnih = name
					const memchu = chat.groupMetadata.participants.length
					const groupMem = await aruga.getGroupMembers(groupId)
					let hehex = `Name Group : *${namagcnih}*\n\nTotal Members : *${memchu}*\n\n╔══✪〘 Mention All 〙✪══\n╠\n`
					for (let i = 0; i < groupMem.length; i++) {
						hehex += `╠➥`
						hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
					}
					hehex += '╠\n╚═〘 *U R B A E  B O T* 〙'
					await aruga.sendTextWithMentions(from, `Info dari : @${sender.id.replace(/@c.us/g, '')}\n\n` + textInfo + '\n\n' + hehex)
					break
				case prefix + 'mutegrup':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
					if (args.length !== 1) return aruga.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`, id)
					if (args[0] == 'on') {
						aruga.setGroupToAdminsOnly(groupId, true).then(() => aruga.sendText(from, 'Berhasil mengubah agar hanya admin yang dapat chat!'))
					} else if (args[0] == 'off') {
						aruga.setGroupToAdminsOnly(groupId, false).then(() => aruga.sendText(from, 'Berhasil mengubah agar semua anggota dapat chat!'))
					} else {
						aruga.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`, id)
					}
					break
				case prefix + 'seticon':
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
					if (isMedia && type == 'image' || isQuotedImage) {
						const dataMedia = isQuotedImage ? quotedMsg : message
						const _mimetype = dataMedia.mimetype
						const mediaData = await decryptMedia(dataMedia, uaOverride)
						const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
						await aruga.setGroupIcon(groupId, imageBase64)
					} else if (args.length === 1) {
						if (!isUrl(url)) { await aruga.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
						aruga.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
							? aruga.reply(from, 'Maaf, link yang kamu kirim tidak memuat gambar.', id)
							: aruga.reply(from, 'Berhasil mengubah profile group', id))
					} else {
						aruga.reply(from, `Commands ini digunakan untuk mengganti icon/profile group chat\n\n\nPenggunaan:\n1. Silahkan kirim/reply sebuah gambar dengan caption ${prefix}setprofile\n\n2. Silahkan ketik ${prefix}setprofile linkImage`)
					}
					break

				//Owner Group
				case prefix + 'kickall': //mengeluarkan semua member
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					let isOwnerGroup = sender.id === chat.groupMetadata.owner
					if (!isOwnerGroup) return aruga.reply(from, 'Maaf, perintah ini hanya dapat digunakan oleh Owner Grup!', id)
					if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
					const allMem = await aruga.getGroupMembers(groupId)
					for (let i = 0; i < allMem.length; i++) {
						if (groupAdmins.includes(allMem[i].id)) {

						} else {
							await aruga.removeParticipant(groupId, allMem[i].id)
						}
					}
					aruga.reply(from, 'Success kick all member', id)
					break

				//Owner Bot	
				case prefix + 'oblock':
					if (!isOwnerB) return aruga.reply(from, 'Maaf, perintah ini hanya bisa digunakan oleh Owner Bot!', id)
					var qmblock = quotedMsgObj.sender.id
					aruga.contactBlock(qmblock)
					aruga.reply(from, 'Berhasil blokir kontak', id)
					break
				case prefix + 'oaddprem':
					var qmbann = quotedMsgObj.sender.id
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
					try {
						prem.push(qmbann)
						fs.writeFileSync('./lib/database/prem.json', JSON.stringify(prem))
						aruga.reply(from, 'Success add member to Premium user!', id)
					} catch {
						aruga.reply(from, 'Maaf, terjadi kesalan', id)
					}
					break
				case prefix + 'unblock':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh owner Bot!', id)
					var qmunblok = quotedMsgObj.sender.id
					aruga.contactUnblock(qmunblok)
					aruga.reply(from, 'Berhasil unblock kontak', id)
					break
				case prefix + 'unblocked':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh owner bot!', id)
					aruga.contactUnblock(args[0] + '@c.us')
					aruga.reply(from, 'Berhasil unblock kontak', id)
					break
				case prefix + 'odelprem':
					var qmban2 = quotedMsgObj.sender.id
					if (!isOwnerB) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Owner Bot!', id)
					try {
						let xnxx = prem.indexOf(qmban2)
						prem.splice(xnxx, 1)
						fs.writeFileSync('./lib/database/prem.json', JSON.stringify(prem))
						aruga.reply(from, 'Success delete Premium member!', id)
					} catch {
						aruga.reply(from, 'Maaf, terjadi kesalahan saat membanned member', id)
					}
					break
				case prefix + 'block':
					if (!isOwnerB) return aruga.reply(from, 'Maaf, perintah ini hanya bisa digunakan oleh owner bot!', id)
					aruga.contactBlock(args[0] + '@c.us')
					aruga.reply(from, 'Berhasil memblokir kontak', id)
					break
				case prefix + 'addprem':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Owner Bot!', id)
					if (args.length == 0) return aruga.reply(from, `Untuk menambah seseorang menjadi member premium`, id)
					prem.push(args[0] + '@c.us')
					fs.writeFileSync('./lib/database/prem.json', JSON.stringify(prem))
					aruga.reply(from, 'success add', id)
					break
				case prefix + 'trash':
					if (isMedia || isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const encryptMedia = isQuotedImage ? quotedMsg : message
						const mediaData = await decryptMedia(encryptMedia, uaOverride)
						const uploadImagex = await uploadImages(mediaData, `${sender.id}_img`)
						aruga.sendFileFromUrl(from, `http://zekais-api.herokuapp.com/delete?url=${uploadImagex}`, '', '', id)
					} else {
						aruga.reply(from, 'Format pesan salah', id)
					}
					break
				case prefix + 'addcecan':
					if (!isOwnerB) return aruga.reply(from, 'Maaf, fitur ini hanya bisa digunakan oleh Owner Bot!', id)
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const encryptMedia2 = isQuotedImage ? quotedMsg : message
						const medta2 = await decryptMedia(encryptMedia2, uaOverride)
						const linkpic2 = await uploadImages(medta2, `${sender.id}_img`)
						const linknyes = linkpic2
						cecann.push(linknyes)
						fs.writeFileSync('./lib/helper/cecan.json', JSON.stringify(cecann))
						aruga.reply(from, 'Foto berhasil disimpan didalam database!', id)
					} else {
						aruga.reply(from, 'Terjadi kesalahan saat menambahkan foto ke database', id)
					}
					break
				case prefix + 'addcogan':
					if (!isOwnerB) return aruga.reply(from, 'Maaf, fitur ini hanya bisa digunakan oleh Owner Bot!', id)
					if (isMedia && isImage || isQuotedImage) {
						await aruga.reply(from, mess.wait, id)
						const encrypt = isQuotedImage ? quotedMsg : message
						const medta = await decryptMedia(encrypt, uaOverride)
						const linkpic = await uploadImages(medta, `${sender.id}_img`)
						const linkah = linkpic
						cogann.push(linkah)
						fs.writeFileSync('./lib/helper/cogan.json', JSON.stringify(cogann))
						aruga.reply(from, 'Foto berhasil disimpan ke dalam database', id)
					} else {
						aruga.reply(from, 'Terjadi kesalahan saat menambahkan foto ke database!', id)
					}
					break
				case prefix + 'pban':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
					if (args.length == 0) return aruga.reply(from, `Untuk banned seseorang agar tidak bisa menggunakan commands\n\nCaranya ketik: \n${prefix}ban add 628xx --untuk mengaktifkan\n${prefix}ban del 628xx --untuk nonaktifkan\n\ncara cepat ban banyak digrup ketik:\n${prefix}ban @tag @tag @tag`, id)
					try {
						banned.push(args + '@c.us')
						fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
						aruga.reply(from, 'Mampus ke BAN! awkowkowko', id)
					} catch {
						aruga.reply(from, 'Terjadi kesalahan', id)
					}
					break
				case prefix + 'punban':
					if (!isOwnerB) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Owner bot & Member Premium', id)
					try {
						let xnxx = banned.indexOf(args + '@c.us')
						banned.splice(xnxx, 1)
						fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
						aruga.reply(from, 'Kasian, makanya ku unban', id)
					} catch {
						aruga.reply(from, 'Terjadi kesalahan', id)
					}
					break
				case prefix + 'afk':
					if (!isGroupMsg) return await aruga.reply(from, 'Maaf, fitur ini hanya bisa digunakan didalam Grup!', id)
					if (isAfkOn) return await aruga.reply(from, `${pushname} sekarang sedang *AFK (AWAY FROM KEYBOARD)*\n\nReason: ${reason}`, id)
					addAfk(sender.id, time, reason)
					aruga.sendTextWithMentions(from, `*@${sender.id.replace(/@c.us/g, '')} SEKARANG SEDANG AFK! (AWAY FROM KEYBOARD)*\n\n*Alasan: ${reason}*`)
					break
				case prefix + 'left':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa digunakan didalam Grup!', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Admin Grup!', id)
					if (args.length === 0) return aruga.reply(from, 'Pilih enable atau disable tod', id)
					if (args[0].toLowerCase() === 'enable') {
						left.push(chat.id)
						fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
						aruga.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
					} else if (args[0].toLowerCase() === 'disable') {
						var thisgc = left.indexOf(groupId)
						left.splice(thisgc, 1)
						fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
						aruga.reply(from, 'Fitur left berhasil di nonaktifkan di group ini!', id)
					} else {
						aruga.reply(from, 'Pilih enable atau disable!', id)
					}
					break
				case prefix + 'deleteleft':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Owner Bot!', id)
					let index = left.includes(chats)
					left.splice(index)
					fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
					aruga.reply(from, 'berhasil mendelete semua id grup didalam database left.json', id)
					break
				case prefix + 'deleteban':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Owner Bot!', id)
					let delban = banned.includes(chats)
					banned.splice(delban)
					fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
					aruga.reply(from, 'Berhasil menghapus semua user banned', id)
					break
				case prefix + 'deletewelcome':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Owner Bot!', id)
					let walcm = welkom.includes(chats)
					welkom.splice(walcm)
					fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
					aruga.reply(from, 'berhasil mendelete semua id didalam database welcome.json', id)
					break
				case prefix + 'nsfw':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam grup', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Admin Grup!', id)
					if (args[0] === 'on') {
						if (_nsfw.includes(groupId)) return aruga.reply(from, mess.nsfwalready, id)
						_nsfw.push(groupId)
						fs.writeFileSync('./lib/database/group/nsfw.json', JSON.stringify(_nsfw))
						aruga.reply(from, mess.nsfwon, id)
					} else if (args[0] === 'off') {
						var nsfwsplice = _nsfw.indexOf(groupId)
						_nsfw.splice(nsfwsplice, 1)
						fs.writeFileSync('./lib/database/group/nsfw.json', JSON.stringify(_nsfw))
						aruga.reply(from, mess.nsfwoff, id)
					} else {
						aruga.reply(from, 'Pilih on atau off admin', id)
					}
					break
				case prefix + 'welcome':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan didalam Grup!', id)
					if (!isGroupAdmins) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Admin Grup!', id)
					if (args.length === 0) return aruga.reply(from, 'Pilih enable atau disable', id)
					if (args[0].toLowerCase() === 'enable') {
						welkom.push(chat.id)
						fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
						aruga.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
					} else if (args[0].toLowerCase() === 'disable') {
						var thisgc = welkom.indexOf(groupId)
						welkom.splice(thisgc, 1)
						fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
						aruga.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
					} else {
						aruga.reply(from, 'Pilih enable atau disable!', id)
					}
					break
				case prefix + 'ban':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
					var qmban = quotedMsgObj.sender.id
					try {
						banned.push(qmban)
						fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
						aruga.reply(from, 'Mampus ke BAN! awkowkowko', id)
					} catch {
						aruga.reply(from, 'Maaf, terjadi kesalahan saat membanned member', id)
					}
					break
				case prefix + 'unban':
				case 'prefix+odelprem':
					var qmban2 = quotedMsgObj.sender.id
					if (!isOwnerB) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh Owner Bot!', id)
					try {
						let xnxx = banned.indexOf(qmban2)
						banned.splice(xnxx, 1)
						fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
						aruga.reply(from, 'Kasian, makanya ku unban', id)
					} catch {
						aruga.reply(from, 'Maaf, terjadi kesalahan saat membanned member!', id)
					}
					break
				case prefix + 'delprem':
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya bisa digunakan oleh Owner Bot!', id)
					if (args.length == 0) return aruga.reply(from, `Untuk mendelete seseorang menjadi member biasa`, id)
					let prsl = prem.indexOf(args[0] + '@c.us')
					prem.splice(prsl, 1)
					fs.writeFileSync('./lib/database/prem.json', JSON.stringify(prem))
					aruga.reply(from, 'Success delete prem member', id)
					break
				case prefix + 'google':
					const googleQuery = body.slice(8)
					if (googleQuery == undefined || googleQuery == ' ') return aruga.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
					google({ 'query': googleQuery }).then(results => {
						let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
						for (let i = 0; i < results.length; i++) {
							vars += `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
						}
						aruga.reply(from, vars, id);
					}).catch(e => {
						console.log(e)
						aruga.sendText(ownerNumber, 'Google Error : ' + e);
					})
					break
				case prefix + 'crygif':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://tobz-api.herokuapp.com/api/cry?apikey=${tobzapi}`).then(res => {
						aruga.sendFileFromUrl(from, res.data.result, 'img.jpg', '', id)
						aruga.sendStickerfromUrl(from, res.data.result, `cry.gif`, '', id)
					})
					break
				case prefix + 'tickle':
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/tickle').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url)
					})
					break
				case prefix + 'cuddle':
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/cuddle').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url)
					})
					break
				case prefix + 'trapnime':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/trap').then(res => {
						aruga.sendFileFromUrl(from, res.data.url, 'img.jpg', '', id)
					})
					break
				case prefix + 'kuni':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/kuni').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'classic':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/classic').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'spank':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/spank').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'randomhentai':
					if (!isNsfwOn) return aruga.reply(from, mess.nsfwoff, id)
					if (!isPrem && !isOwnerB) return aruga.reply(from, mess.prem, id)
					aruga.sendText(from, mess.wait);
					aruga.sendFileFromUrl(from, `https://zenzapi.xyz/api/morensfw/hentai?apikey=${zenzapi}`, '', '', id)
					break
				case prefix + 'randompat':
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/pat').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
						.catch((err) => {
							aruga.reply(from, `Error`, id)
						})
					break
				case prefix + 'pokegif':
					aruga.reply(from, mess.wait, id)
					axios.get('https://nekos.life/api/v2/img/poke').then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'rwink':
					aruga.reply(from, mess.wait, id)
					axios.get(`https://some-random-api.ml/animu/wink`).then(res => {
						aruga.sendStickerfromUrl(from, res.data.link, StikerMetadata)
					})
						.catch((err) => {
							aruga.reply(from, 'Error!', id)
						})
					break
				case prefix + 'randomhug':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					aruga.sendText(from, mess.wait);
					axios.get(`https://nekos.life/api/v2/img/hug`).then(res => {
						aruga.sendStickerfromUrl(from, res.data.url, StickerMetadata)
					})
					break
				case prefix + 'pinimg':
					if (args.length == 0) return aruga.reply(from, `Untuk mencari Foto dari Pinterest gunakan ${prefix}pinimg image`, id)
					aruga.reply(from, mess.wait, id)
					try {
						const bodys = body.slice(8)
						const topin = await axios.get(`https://api.vhtear.com/pinterest?query=${bodys}&apikey=${vhtearkey}`)
						const tomg = topin.data.result
						let pup2 = tomg[Math.floor(Math.random() * tomg.length)]
						aruga.sendFileFromUrl(from, pup2, '', 'nihh om', id)
					} catch (err) {
						aruga.reply(from, 'Gada kali om di pinterest', id)
						console.log(err)
					}
					break
				case prefix + 'ptl':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg", "https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg", "https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg", "https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg", "https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg", "https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg", "https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg", "https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg", "https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg", "https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg", "https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg", "https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg", "https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg", "https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg", "https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg", "https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg", "https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg", "https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg", "https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg", "https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg", "https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg", "https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg", "https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg", "https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg", "https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg", "https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg", "https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg", "https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg", "https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg", "https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg", "https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
					let pep = pptl[Math.floor(Math.random() * pptl.length)]
					aruga.sendFileFromUrl(from, pep, 'pptl.jpg', 'nihh ngab', id)
					break
				case prefix + 'groupicon':
				case prefix + 'gcicon':
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa digunakan didalam grup!`, id)
					var groupic = await aruga.getProfilePicFromServer(chat.id)
					if (groupic == undefined) {
						var pfp = 'https://i.ibb.co/DthYrSB/a256bae0f5ed.jpg'
					} else {
						var pfp = groupic
					}
					await aruga.sendFileFromUrl(from, pfp, 'group.jpg', '', id)
					break
				case prefix + 'groupinfo':
				case prefix + 'gcinfo':
				case prefix + 'grupinfo':
				case prefix + 'infogroup':
				case prefix + 'infogrup':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					var totalMem = chat.groupMetadata.participants.length
					var desc = chat.groupMetadata.desc
					var groupname = name
					var timestp = chat.groupMetadata.creation
					var date = moment(timestp * 1000).format('dddd, DD MMMM YYYY')
					var timeh = moment(timestp * 1000).format('HH:mm:ss')
					var ownerwoi = chat.groupMetadata.owner
					var grplink = antilink.includes(chat.id)
					var botadmin = isBotGroupAdmins ? 'Admin' : 'Member'
					var grouppic = await aruga.getProfilePicFromServer(chat.id)
					if (grouppic == undefined) {
						var pfp = errorurl
					} else {
						var pfp = grouppic
					}
					await aruga.sendFileFromUrl(from, pfp, 'group.png', `*「 GROUP INFO 」*
*➸ Name : ${groupname}*

Group ini didirikan sejak *${date}* Pukul *${timeh}* oleh @${ownerwoi.replace('@c.us', '')}


*➸ Members : ${totalMem}*
*➸ Antilink Status : ${grplink ? 'On' : 'Off'}*
*➸ Bot Group Status : ${botadmin}*
*➸ Group Description* 
${desc}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
_Desc di update oleh : @${chat.groupMetadata.descOwner.replace('@c.us', '')} pada *${moment(chat.groupMetadata.descTime * 1000).format('dddd, DD MMMM YYYY')}* pukul ${moment(chat.groupMetadata.descTime * 1000).format('HH:mm:ss')}_`)

					break
				case prefix + 'grupbot':
				case prefix + 'gcbot':
					const ch = `https://chat.whatsapp.com/GB1q8SGBHsNHGW8kkzZd90\n\nSkuyy joinn`
					await aruga.sendLinkWithAutoPreview(from, ch)
					break
				case prefix + 'discordserver':
					const serverdiscord = 'https://discord.gg/bvq3gAZh5J\n\nSini join'
					await aruga.sendLinkWithAutoPreview(from, serverdiscord)
					break
				case prefix + 'discord':
					await aruga.reply(from, `English :\nNew feature is discord emoji, if u send code emoji from discord, bot will send it to be a sticker\nIndonesian :\nFitur terbaru adalah emoji discord, jika kamu mengirim kode emoji dari discord, Bot akan mengirimkan emoji berupa stiker\nExample: :veryangry:`, id)
					break
				case prefix + 'tiktokaudio':
					if (args.length == 0) return aruga.reply(from, `Fitur untuk mengkonversi Video menjadi Audio!\nKirim perintah ${prefix}tiktokaudio link tiktok`, id)
					const linktk = body.slice(13)
					aruga.reply(from, mess.wait, id)
					axios.get(`http://docs-jojo.herokuapp.com/api/tiktok_audio?url=${linktk}`)
						.then(async (res) => {
							await aruga.sendFileFromUrl(from, res.data.result, '', '', id)
								.catch(() => {
									aruga.reply(from, 'error', id)
								})
						})
						.catch((err) => {
							console.log(err)
						})
					break
				case prefix + 'math':
				case prefix + 'mtk':
					if (args.length === 0) return aruga.reply(from, `Fitur untuk bermain soal matematika\nGunakan ${prefix}mtk [mode]\nContoh: ${prefix}mtk easy\n\nMode yang tersedia :\n- noob\n- easy\n- medium\n- hard\n- extreme\n- impossible\n- impossible2\n- pro`, id)
					axios.get(`https://h4ck3rs404-api.herokuapp.com/api/kuis/math?mode=${args[0]}&apikey=${hackapi}`)
						.then(async (res) => {
							if (res.data.status == false) return aruga.reply(from, res.data.message, id)
							const pertanyaan = `Jawab soal berikut\nSoal : ${res.data.result.soal}\nPoin : ${res.data.result.poin}`
							const jawabanmtk = `Jawaban : ${res.data.result.jawaban}`
							aruga.reply(from, pertanyaan, id)
							await sleep(10000)
							aruga.sendText(from, '_50 detik lagi_', id)
							await sleep(10000)
							aruga.sendText(from, '_40 detik lagi_', id)
							await sleep(10000)
							aruga.sendText(from, '_30 detik lagi_', id)
							await sleep(10000)
							aruga.sendText(from, '_20 detik lagi_', id)
							await sleep(10000)
							aruga.sendText(from, '_10 detik lagi_', id)
							await sleep(10000)
							aruga.reply(from, `Timeout!!\n${jawabanmtk}`, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Terjadi kesalahan', id)
								})
						})
					break
				case prefix + 'twister':
					fetchJson(`https://h4ck3rs404-api.herokuapp.com/api/kuis/twister?apikey=${hackapi}`)
						.then(async (res) => {
							if (res.status == false) return aruga.reply(from, 'Terjadi kesalahan, silahkan ulangi', id)
							aruga.reply(from, res.result, id)
								.catch(err => {
									console.log(err)
									aruga.reply(from, 'Sedang error', id)
								})
						})
					break
				case prefix + 'kalkulator':
					if (args.length === 0) return aruga.reply(from, `[❗] Kirim perintah *${prefix}kalkulator [ Angka ]*\nContoh : ${prefix}kalkulator 12 * 12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`)
					const mtk = body.slice(12)
					axios.get(`https://api.vhtear.com/calculator?value=${mtk}&apikey=${vhtearkey}`)
						.then(async (res) => {
							const jawabannya = res.data.result.data
							const salah = res.data.result.data
							aruga.reply(from, jawabannya, id)
								.catch((err) => {
									aruga.reply(from, salah, id)
								})
						})
					break
				case prefix + 'screen': {
					if (!isOwnerB) return await aruga.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')
					const snap = await aruga.getSnapshot()
					aruga.sendImage(from, snap, 'snapshot.png', 'Session Snapshot')
				}
					break
				case prefix + 'listbacot':
					const bacul = dbcot
					let bacotanmu = `╔══✪〘 *List Bacot!* 〙✪══\n`
					for (let i = 0; i < bacul.length; i++) {
						bacotanmu += '╠➥'
						bacotanmu += ` ${bacul[i]}\n`
					}
					bacotanmu += '╚═〘 *U R B A E  B O T* 〙'
					await aruga.reply(from, bacotanmu, id)
					break
				case prefix + 'premlist':
					const premlist = prem
					let kuntul = `╔══✪〘 *Prem Member!* 〙✪══\n╠➥Total Premium user : ${prem.length}\n`
					for (let i = 0; i < premlist.length; i++) {
						kuntul += `╠➥`
						kuntul += `${premlist[i].replace(/@c.us/g, '')}\n`
					}
					kuntul += '╚═〘 *U R B A E  B O T* 〙'
					await aruga.reply(from, kuntul, id)
					break
				case prefix + 'listcecan':
					const ccn = cecann
					let xoxi = `List Foto Cecan\n\n`
					for (let i = 0; i < ccn.length; i++) {
						xoxi += '-'
						xoxi += `${ccn[i]}\n`
					}
					await aruga.reply(from, xoxi, id)
					break
				case prefix + 'listcogan':
					const cgn = cogann
					let xoxo = `List Foto Cogan\n\n`
					for (let i = 0; i < cgn.length; i++) {
						xoxo += '-'
						xoxo += `${cgn[i]}\n`
					}
					await aruga.reply(from, xoxo, id)
					break
				case prefix + 'listleft':
					if (!isOwnerB) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh owner bot!', id)
					const lefting = left
					let lefs = `List ID Grup\n\n`
					for (let i = 0; i < lefting.length; i++) {
						lefs += '-'
						lefs += `${lefting[i]}\n`
					}
					await aruga.reply(from, lefs, id)
					break
				case prefix + 'listwelcome':
					if (!isOwnerB) return aruga.reply(from, 'Fitur ini hanya bisa digunakan oleh owner bot!', id)
					const wulcum = welkom
					let wels = `List ID Grup\n\n`
					for (let i = 0; i < wulcum.length; i++) {
						wels += '-'
						wels += `${wulcum[i]}\n`
					}
					await aruga.reply(from, wels, id)
					break
				case prefix + 'listimg':
					const imagick = listimg
					let kemtull = `╔══✪〘 *List Image!* 〙✪══\n`
					for (let i = 0; i < imagick.length; i++) {
						kemtull += '╠➥'
						kemtull += `${imagick[i]}\n`
					}
					kemtull += '╚═〘 *U R B A E  B O T* 〙'
					await aruga.reply(from, kemtull, id)
					break
				case prefix + 'listvn':
					const vnlist = listvn
					let kemtul = `╔══✪〘 *List VN!* 〙✪══\n`
					for (let i = 0; i < vnlist.length; i++) {
						kemtul += '╠➥'
						kemtul += `${vnlist[i]}\n`
					}
					kemtul += '╚═〘 *U R B A E  B O T* 〙'
					await aruga.reply(from, kemtul, id)
					break
				case prefix + 'liststiker':
					const stiklist = liststicker
					let kumtul = `╔══✪〘 *List Sticker!* 〙✪══\n`
					for (let i = 0; i < stiklist.length; i++) {
						kumtul += '╠➥'
						kumtul += `${stiklist[i]}\n`
					}
					kumtul += '╚═〘 *U R B A E  B O T* 〙'
					await aruga.reply(from, kumtul, id)
					break
				case prefix + 'saylist':
					const saylest = dsay
					let kimtil = `╔══✪〘 *Say List!* 〙✪══\n`
					for (let i = 0; i < saylest.length; i++) {
						kimtil += '╠➥'
						kimtil += `${saylest[i]}\n`
					}
					kimtil += '╚═〘 *U R B A E  B O T* 〙'
					await aruga.sendText(from, kimtil)
					break
				case prefix + 'addsay': {
					if (!args.length >= 1) return aruga.reply(from, 'Kalimatnya manaa?', id)
					const say = body.slice(8)
					dsay.push(say)
					fs.writeFileSync('./lib/database/say.json', JSON.stringify(dsay))
					aruga.reply(from, `Done add say ke database\nTotal add say : *${dsay.length - 1}* ,`, id)
				}
					break
				case prefix + 'addbacot': {
					if (!args.length >= 1) return aruga.reply(from, 'BACOTAN NYA MANA ANJING?? DASAR BODOH!', id)
					const bacot = body.slice(10)
					dbcot.push(bacot)
					fs.writeFileSync('./lib/database/bacot.json', JSON.stringify(dbcot))
					aruga.reply(from, `Sukses menambahkan Kata bacot ke database\nTotal data bacot sekarang : *${dbcot.length - 1}*`, id)
				}
					break
				case prefix + 'delbacot':
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa di gunakan didalam grup!`, id)
					const delbd = dbcot.indexOf(body.slice(12))
					dbcot.splice(delbd, 1)
					fs.writeFileSync('./lib/database/bacot.json', JSON.stringify(dbcot))
					aruga.reply(from, `Success Menghapus Bacot!`, id)
					break
				case prefix + 'bacot':
					if (args.length == 1) {
						const no = args[0]
						const cekdb = dbcot.length
						if (cekdb <= no) return await aruga.reply(from, `Total data saat ini hanya sampai *${cekdb - 1}*`, id)
						const res = dbcot[Math.floor(Math.random() * (dbcot.length))]
						aruga.sendreply(from, res, id)
					} else {
						const kata = dbcot[Math.floor(Math.random() * (dbcot.length))];
						aruga.reply(from, kata, id)
					}
					break
				case prefix + 'say':
					if (args.length == 1) {
						const wuh = args[0]
						const sayur = dsay.length
						if (sayur <= wuh) return await aruga.reply(from, `Total database saat ini hanya sampe *${sayur - 1}`, id)
						const lahs = dsay[wuh]
						aruga.sendText(from, lahs)
					} else {
						const kata = dsay[Math.floor(Math.random() * (dsay.length))];
						aruga.reply(from, kata, id)
					}
					break
				case prefix + 'delprem':
					if (!isOwnerB) return aruga.reply(from, `Perintah ini hanya bisa digunakan oleh Owner Bot`, id)
					const delprem = prem.indexOf(body.slice(9) + '@c.us')
					prem.splice(delprem, 1)
					fs.writeFileSync('./lib/database/prem.json', JSON.stringify(prem))
					aruga.reply(from, `Success delete premium member`, id)
					break
				case prefix + 'delsay':
					if (!isGroupMsg) return aruga.reply(from, `Perintah ini hanya bisa di gunakan didalam grup!`, id)
					const delsay = dsay.indexOf(body.slice(8))
					dsay.splice(delsay, 1)
					fs.writeFileSync('./lib/database/say.json', JSON.stringify(dsay))
					aruga.reply(from, `Success Menghapus Say!`, id)
					break
				case prefix + 'iplocation':
					if (args.length == 0) return aruga.reply(from, `Tidak ada ip Address, silahkan masuk ip address anda\nContoh : ${prefix}iplocation 180.242.215.107`, id)
					axios.get(`https://ipapi.co/${body.slice(12)}/json/`)
						.then(async (res) => {
							const addr = `• *Ip :* ${res.data.ip}\n• *Ip Version :* ${res.data.version}\n• *Negara :* ${res.data.country_name}\n• *Kode Negara :* ${res.data.country_code}\n• *Ibu Kota :* ${res.data.country_capital}\n• *Wilayah :* ${res.data.region}\n• *Kode Wilayah :* ${res.data.region_code}\n• *Postal :* ${res.data.postal}\n• *Latitude :* ${res.data.latitude}\n• *Longitude :* ${res.data.longitude}\n• *Timezone :* ${res.data.timezone}\n• *Utc Offset :* ${res.data.utc_offset}\n• *Kode Panggilan Negara :* ${res.data.country_calling_code}\n• *Mata Uang :* ${res.data.currency_name}\n• *Kode Mata Uang :* ${res.data.currency}\n• *Bahasa :* ${res.data.languages}\n• *Jumlah Wilayah :* ${res.data.country_area}\n• *Populasi Negara :* ${res.data.country_population}\n• *ASN :* ${res.data.asn}\n• *Provider :* ${res.data.org}`
							aruga.reply(from, addr, id)
						})
					break
				case prefix + 'matauang':
					const matung = `List Currency : btc, usd, eur, gbp, aud, cad, chf, cny, jpy, sgd, nzd, pkr, hkd, krw, mxn, nok, egp, clp, ngn, brl, rub, uah, thb, pln, inr, eth, xmr, dash, doge, ltc, str, xrp`
					aruga.reply(from, matung, id)
					break
				case prefix + 'nyenye':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa digunakan didalam Grup!', id)
					if (args.length = 0) return aruga.reply(from, `kirim ${prefix}nyenye kalimat\ncontoh: ${prefix}nyenye nisa cantik', id`)
					const teksnya = body.slice(8)
					const uwoyis = await axios.get(`https://api.i-tech.id/tools/hilih?key=qTOfqt-6mDbIq-8lJHaR-Q09mTR-D6pAtD&kata=${teksnya}`).then(res => {
						const ihih = `${res.data.result}`
						aruga.reply(from, ihih, id)
					})
					break
				case prefix + 'convertduit':
					if (args.length == 0) return aruga.reply(from, `Untuk mengkonversi uang dari negara luar menjadi IDR\nContoh : ${prefix}convertduit usd|2000\n\nDan untuk mengecek mata uang bisa gunakan ${prefix}matauang`, id)
					const duit1 = arg.split('|')[0]
					const duit2 = arg.split('|')[1]
					await axios.get('https://api.terhambar.com/r=' + duit1 + '&bal=' + duit2).then(res => {
						const duitnya = `Konversi mata uang ${res.data.result.currency} dari ${duit2}\n\nBalance Currency : *${res.data.result.balanceCurrency}*\n\nHasil Dirupiahkan : *${res.data.result.resultConvert}*`
						aruga.reply(from, duitnya, id)
					})
					break
				case prefix + 'translate':
					if (args.length == 0) return aruga.reply(from, `Untuk translate kata gunakan ${prefix}translate [kode bahasa]|Kata kata\n\nContoh : ${prefix}translate en|Bagaimana kabarmu?`, id)
					const suway1 = arg.split('|')[0]
					const suway2 = arg.split('|')[1]
					await axios.get(`https://amm-api-translate.herokuapp.com/translate?engine=google&text=${suway2}&to=${suway1}`).then(res => {
						const texttr = res.data.data.result
						aruga.reply(from, texttr, id)
					})
					break
				case prefix + 'santet': //work
					if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (mentionedJidList.length === 0) return aruga.reply(from, 'Tag member yang mau disantet, contoh : /santet @wahyu | karena dia gay', id)
					if (args.length === 1) return aruga.reply(from, 'Masukkan alasan kenapa menyantet dia!!', id)
					const target = arg.split('|')[0]
					const alasan = arg.split('|')[1]
					await aruga.sendTextWithMentions(from, `Santet terkirim ke ${target}, Dengan alasan : ${alasan}`)
					break
				case prefix + 'doggo':
					const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg", "https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg", "https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg", "https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg", "https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg", "https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg", "https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg", "https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg", "https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg", "https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg", "https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg", "https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg", "https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg", "https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg", "https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg", "https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg", "https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg", "https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg", "https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg", "https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg", "https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg", "https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg", "https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg", "https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg", "https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg", "https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg", "https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg", "https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg", "https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg", "https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg", "https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg", "https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg", "https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg", "https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg", "https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg", "https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg", "https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg", "https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg", "https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg", "https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg", "https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg", "https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg", "https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg", "https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg", "https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg", "https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg", "https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg", "https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg", "https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg", "https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg", "https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg", "https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg", "https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg", "https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg", "https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg", "https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg", "https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg", "https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg", "https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg", "https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg", "https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg", "https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg", "https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg", "https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg", "https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg", "https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg", "https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg", "https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg", "https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg", "https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg", "https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg", "https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg", "https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg", "https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg", "https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg", "https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg", "https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg", "https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg", "https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg", "https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg", "https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg", "https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg", "https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg", "https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg", "https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg", "https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg", "https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg", "https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg", "https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg", "https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg", "https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg", "https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg", "https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg", "https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg", "https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg", "https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg", "https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg", "https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg", "https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg", "https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
					let kya = list[Math.floor(Math.random() * list.length)]
					aruga.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Doggo sparkles', id)
					break
				case prefix + 'wpanime':
					aruga.reply(from, mess.wait, id)
					aruga.sendFileFromUrl(from, `https://lindow-api.herokuapp.com/api/wallpaper/mobile?apikey=${lindowapi}`, 'img.jpg', '', id)
					break
				case prefix + 'aiquote':
					const aiquote = await axios.get("http://inspirobot.me/api?generate=true")
					await aruga.sendFileFromUrl(from, aiquote.data, 'quote.jpg', 'FOLLOW NGAB \ :V https://www.instagram.com/_l_.lawliet_/', id)
					break
				case prefix + 'ttp':
					if (args.length == 0) return aruga.reply(from, 'textnya mana?', id)
					const beword = body.slice(5)
					//axios.get(`https://api.areltiyan.site/sticker_maker?text=${beword}`)
					aruga.sendStickerfromUrl(from, `http://lolhuman.herokuapp.com/api/ttp?apikey=${lolhuman}&text=${beword}`, 'get', StickerMetadata)
						.then(async () => {
							console.log(color(`Text To Image processed for ${processTime(t, moment())} seconds`, 'aqua'))
						})
						.catch(err => {
							console.log(err)
							aruga.reply(from, err.message, id)
						})
					break
				case prefix + 'kapan':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					if (args.length == 0) return aruga.reply(from, `Tidak ada Kata!\n Contoh : ${prefix}kapan kamu mati?`, id)
					const when = args.join(' ')
					const ans = kapan[Math.floor(Math.random() * (kapan.length))]
					if (!when) aruga.reply(from, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
					await aruga.sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
					break
				case prefix + 'nilai':
				case prefix + 'rate':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					if (args.length == 0) return aruga.reply(from, `Fitur untuk menilai yang kalian katakan\n Contoh : ${prefix}rate kegantenganku`, id)
					const rating = args.join(' ')
					const awr = rate[Math.floor(Math.random() * (rate.length))]
					if (!rating) aruga.reply(from, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
					await aruga.sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
					break
				case prefix + 'apakah':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					if (args.length == 0) return aruga.reply(from, `Tidak ada Kata!\nContoh : ${prefix}apakah dia cantik?`, id)
					const nanya = args.join(' ')
					const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
					if (!nanya) aruga.reply(from, '⚠️ Format salah! Ketik */menu* untuk penggunaan.')
					await aruga.sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
					break
				case prefix + 'bisakah':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					if (args.length == 0) return aruga.reply(from, `Tidak ada Kata!\nContoh : ${prefix}bisakah dia mencintaiku?`, id)
					const bsk = args.join(' ')
					const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
					if (!bsk) aruga.reply(from, '⚠️ Format salah! Ketik */menu* untuk penggunaan.')
					await aruga.sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
					break
				case prefix + 'listmuted':
				case prefix + 'listmute':
					let inmuted = `This is list of Muted grup\nTotal : ${muted.length}\n`
					for (let i of muted) {
						inmuted += `-\n`
					}
					await aruga.reply(from, inmuted, id)
					break
				case prefix + 'listban':
					let bened = `This is list of banned number\nTotal : ${banned.length}\n`
					for (let i of banned) {
						bened += `➸ ${i.replace(/@c.us/g, '')}\n`
					}
					await aruga.reply(from, bened, id)
					break
				case prefix + 'me':
					if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisad digunakan didalam Grup!', id)
					if (isBanned) return false
					if (isGroupMsg) {
						if (!quotedMsg) {
							var pic = await aruga.getProfilePicFromServer(author)
							var namae = pushname
							var sts = await aruga.getStatus(author)
							var adm = isGroupAdmins
							const userLevel = level.getLevelingLevel(sender.id, _level)
							const myXp = level.getLevelingXp(sender.id, _level)
							const reqXp = 5 * Math.pow(userLevel, 2) + 50 * 1 + 100
							const { status } = sts
							if (pic == undefined) {
								var pfp = errorImg
							} else {
								var pfp = pic
							}
							await aruga.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➸ *Username: ${namae}*\n\n➸ *Level: ${userLevel}*\n\n➸ *Xp : ${myXp} / ${reqXp}*\n\n➸ *User Info: ${status}*\n\n➸ *Admin Group: ${adm}*\n\n`)
						} else if (quotedMsg) {
							var qmid = quotedMsgObj.sender.id
							var pic = await aruga.getProfilePicFromServer(qmid)
							var namae = quotedMsgObj.sender.name
							var sts = await aruga.getStatus(qmid)
							var adm = isGroupAdmins
							const userLevel = level.getLevelingLevel(qmid, _level)
							const myXp = level.getLevelingXp(qmid, _level)
							const reqXp = 5 * Math.pow(userLevel, 2) + 50 * 1 + 100
							const { status } = sts
							if (pic == undefined) {
								var pfp = errorImg
							} else {
								var pfp = pic
							}
							await aruga.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➸ *Username: ${namae}*\n\n➸ *Level: ${userLevel}*\n\n➸ *Xp : ${myXp} / ${reqXp}*\n\n➸ *User Info: ${status}*\n\n➸ *Admin Group: ${adm}*\n\n`)
						}
					}
					break
				case prefix + 'listblock':
					let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
					for (let i of blockNumber) {
						hih += `➸ ${i.replace(/@c.us/g, '')}\n`
					}
					await aruga.reply(from, hih, id)
					break
				case prefix + 'bc':
					if (!isOwnerB) return aruga.reply(from, `Perintah ini hanya untuk Owner Urbae`, id)
					bctxt = body.slice(4)
					txtbc = `〘 *U R B A E  B O T* 〙\n\n${bctxt}`
					const semuagrup = await aruga.getAllChatIds();
					if (quotedMsg && quotedMsg.type == 'image') {
						const mediaData = await decryptMedia(quotedMsg)
						const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						for (let grupnya of semuagrup) {
							var cekgrup = await aruga.getChatById(grupnya)
							if (!cekgrup.isReadOnly) aruga.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
						}
						aruga.reply('Broadcast sukses!')
					} else if (quotedMsg && quotedMsg.type == 'audio' || quotedMsg && quotedMsg.type == 'ptt') {
						const mediaData = await decryptMedia(quotedMsg)
						const audiobase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						for (let grupnya of semuagrup) {
							var cekgrup = await aruga.getChatById(grupnya)
							if (!cekgrup.isReadOnly) aruga.sendPtt(grupnya, audiobase64, 'audio.mp3')
						}
						aruga.reply(from, 'Broadcast audio sukses', id)
					} else if (quotedMsg && quotedMsg.type == 'sticker') {
						const mediaData = await decryptMedia(quotedMsg)
						const stickbase = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						for (let grupnya of semuagrup) {
							var cekgrup = await aruga.getChatById(grupnya)
							if (!cekgrup.isReadOnly) aruga.sendImageAsSticker(grupnya, stickbase, StickerMetadata)
						}
						aruga.reply(from, 'Broadcast stiker berhasil', id)
					} else {
						for (let grupnya of semuagrup) {
							var cekgrup = await aruga.getChatById(grupnya)
							if (!cekgrup.isReadOnly && isMuted(grupnya)) aruga.sendText(grupnya, txtbc)
						}
						aruga.reply('Broadcast Success!')
					}
					break
				case prefix + 'leaveall': //mengeluarkan bot dari semua group serta menghapus chatnya
					if (!isOwnerB) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot', id)
					const allChatso = await aruga.getAllChatIds()
					const loadedx = await aruga.getAmountOfLoadedMessages()
					const allGroupq = await aruga.getAllGroups()
					for (let gclist of allGroupq) {
						await aruga.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, Total Grup yang Bot join saat ini sebanyak: *${allGroupq.length}*\n\nSilahkan invite bot lagi jika dibutuhkan`)
						sleep(1000)
						await aruga.leaveGroup(gclist.contact.id)
					}
					aruga.reply(from, 'Success leave all group!', id)
					break
				case prefix + 'clearall': //menghapus seluruh pesan diakun bot
					if (!isOwnerBot) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot', id)
					const allChatx = await aruga.getAllChats()
					for (let dchat of allChatx) {
						await aruga.deleteChat(dchat.id)
					}
					aruga.reply(from, 'Success clear all chat!', id)
					break
				default:
					if (isCmd) {
						const slh = body.trim().split(' ')
						aruga.reply(from, `Maaf *_${pushname}_*, Command *${slh[0]}* tidak ada didalam menu!\n\nSilahkan ketik *${prefix}menu* Untuk menampilkan command`, id)
					}
					break
				case prefix + 'adminlist':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					let mimin = `*LIST ADMIN FROM ${name}*\n`
					for (let admon of groupAdmins) {
						mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
					}
					await aruga.sendTextWithMentions(from, mimin, id)
					break
				case prefix + 'howmuch':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa digunakan dalam Grup')
					const tulul = name
					const yaelah = chat.groupMetadata.participants.length
					await aruga.sendText(from, `Total Member in *${tulul}* is : *${yaelah}*`)
					break
				case prefix + 'ownergc':
					if (!isGroupMsg) return aruga.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
					const Owner_ = chat.groupMetadata.owner
					await aruga.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
					break
			}

			// Simi-simi function
			if ((!isCmd && isGroupMsg && isSimi) && message.type === 'chat') {
				axios.get(`https://arugaz.herokuapp.com/api/simisimi?kata=${encodeURIComponent(message.body)}&apikey=${apiSimi}`)
					.then((res) => {
						if (res.data.status == 403) return aruga.sendText(ownerNumber, `${res.data.result}\n\n${res.data.pesan}`)
						aruga.reply(from, `Simi berkata: ${res.data.result}`, id)
					})
					.catch((err) => {
						aruga.reply(from, `${err}`, id)
					})
			}
		}
	} catch (err) {
		console.log(color('[EROR]', 'red'), err)
	}
}
