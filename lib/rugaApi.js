const axios = require('axios')
const { fetchJson, fetchText } = require('../utils/fetcher')
const fs = require('fs-extra')
const link = 'https://arugaz.herokuapp.com'
const mehh = 'https://api.i-tech.id/dl/yt?key=eT16a3-P3Gvx4-8JwS8r-N4jEB2-c9VIz4'
const fileyt = 'https://raw.githubusercontent.com/ArugaZ/scraper-results/main/20201111_230923.jpg'
const eroryt = 'https://raw.githubusercontent.com/ArugaZ/scraper-results/main/20201111_234624.jpg'

const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
let {
    vhtearkey,
    apiKey,
    keepSave,
    zenzapi,
    caliph,
    iTechApi,
    tobzapi,
    lindowapi,
    apikeyvinz,
    onlydev,
    lolhuman,
    fahmiapi,
    zekais,
    leysapi,
    dapuhyapi
} = setting

const ymp3v2 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.dapuhy.xyz/api/socialmedia/ytmp3v2?url=${url}&apikey=${dapuhyapi}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const ymp4v2 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.dapuhy.xyz/api/socialmedia/ytmp4v2?url=${url}&apikey=${dapuhyapi}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const playlinux = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://dapuhy-api.herokuapp.com/api/socialmedia/ytplaymp3v2?query=${url}&apikey=${dapuhyapi}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const silver = async (teks) => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/splaybutton?text=${teks}&apikey=apivinz`)
        .then(res => {
            resolve(res.data.result)
        })
        .catch(err => {
            reject(err)
        })
})

const yutub = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/ytmp3/2?url=${url}&apikey=apivinz`)
        .then(res => {
            resolve(res.data.result)
        })
        .catch(err => {
            reject(err)
        })
})

const cekzodiak = async (nama, tgl, bln, thn) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/getzodiak?nama=${nama}&tgl-bln-thn=${tgl}-${bln}-${thn}`)
        .then((res) => {
            const text = `Nama: ${res.data.nama}\nLahir: ${res.data.lahir}\nUmur: ${res.data.usia}\nUltah: ${res.data.ultah}\nZodiak: ${res.data.zodiak}`
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const quran = () => new Promise((resolve, reject) => {
    axios.get('https://api.zeks.me/api/randomquran')
        .then(res => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const brainly = async (query) => new Promise((resolve, reject) => {
    axios.get(`https://api.vhtear.com/branly?query=${query}&apikey=${vhtearkey}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const play = async (lagu) => new Promise((resolve, reject) => {
    axios.get(`http://docs-jojo.herokuapp.com/api/ytmp3?url=${lagu}`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})

const movie = async (url) => new Promise((resolve, reject) => {
    console.log('Get Movie from Query')
    fetchJson(`https://api.zeks.me/api/film?q=${url}&apikey=apivinz`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const youwatch = async (url) => new Promise((resolve, reject) => {
    console.log('Get Drakor from Query')
    axios.get(`https://tobz-api.herokuapp.com/api/youwatch?q=${url}&apikey=${tobzapi}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const wp = async (url) => new Promise((resolve, reject) => {
    console.log('Get Story from Wattpad!')
    fetchJson(`http://docs-jojo.herokuapp.com/api/wattpad_search?q=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const filmapik = async (url) => new Promise((resolve, reject) => {
    console.log('Get Filmapik From Query')
    axios.get(`https://api-filmapik.herokuapp.com/search?q=${url}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const nhpdf = async (query) => new Promise((resolve, reject) => {
    axios.get(`https://api.vhtear.com/nhentaipdfdownload?query=${query}&apikey=${vhtearkey}`)
        .then(res => {
            resolve(res.data.result)
        })
        .catch(err => {
            reject(err)
        })
})

const ig = async (url) => new Promise((resolve, reject) => {
    axios.get(`http://keepsaveit.com/api/?api_key=${keepSave}&url=${url}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})


const ssweb = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.i-tech.id/tools/ssweb?key=qTOfqt-6mDbIq-8lJHaR-Q09mTR-D6pAtD&link=${url}`)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
})

const listnek = () => new Promise((resolve, reject) => {
    console.log('Getting Nekopoi List')
    fetchJson(`https://api.vhtear.com/nekojavlist&apikey=${vhtearkey}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const cosplay = () => new Promise((resolve, reject) => {
    console.log('Getting Cosplay')
    fetchJson(`https://api.vhtear.com/nekojavcosplay&apikey=${vhtearkey}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const trend = () => new Promise((resolve, reject) => {
    console.log('Getting Trending Twitter')
    fetchJson(`https://docs-jojo.herokuapp.com/api/trendingtwitter`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const twit = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://kocakz.herokuapp.com/api/media/twvid?url=${url}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const yt3 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/ytplaymp3?q=${url}&apikey=apivinz`)
        .then(res => {
            resolve(res.data.result)
        })
        .catch(err => {
            reject(err)
        })
})

/**
 * Search for IG Story.
 * @param {String} query
 * @returns {Object}
 */
const its = (query) => new Promise((resolve, reject) => {
    console.log('Searching for IG Story...')
    fetchJson(`https://api.vhtear.com/igstory?query=${query}&apikey=${vhtearkey}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})


/**
 * Search for WhatsApp sticker.
 * @param {String} query 
 * @returns {Object}
 */
const sticker = (query) => new Promise((resolve, reject) => {
    console.log('Searching for sticker...')
    fetchJson(`https://api.vhtear.com/wasticker?query=${query}&apikey=${vhtearkey}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const fb2 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://kocakz.herokuapp.com/api/media/facebook?url=${url}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const fb = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.vhtear.com/fbdl?link=${url}&apikey=${vhtearkey}`)
        .then(res => {
            resolve(res.data.result)
        })
        .catch(err => {
            reject(err)
        })
})

/**
 * Get fresh videos from TikTok.
 */
const asupan = () => new Promise((resolve, reject) => {
    console.log('Fetching video...')
    fetchText('http://sansekai.my.id/sansekai.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const kusonime = async (judul) => new Promise((resolve, reject) => {
    axios.get(`https://docs-jojo.herokuapp.com/api/kuso?q=${judul}`)
        .then((res) => {
            const initext = `*Judul :* ${res.data.title}\n*Sinopsis :* ${res.data.sinopsis}\n*Info :* ${res.data.info}\n\n*Link Download* : _${res.data.link_dl}_`
            resolve({ link: res.data.thumb, text: initext })
        })
        .catch((err) => {
            reject(err)
        })
})


const dewabatch = async (judul) => new Promise((resolve, reject) => {
    axios.get(`https://docs-jojo.herokuapp.com/api/dewabatch?q=${judul}`)
        .then((res) => {
            const textdew = `${res.data.result}\n\nSinopsis: ${res.data.sinopsis}`
            resolve({ link: res.data.thumb, text: textdew })
        })
        .catch((err) => {
            reject(err)
        })
})

const maps = async (jalan) => new Promise((resolve, reject) => {
    axios.get(`https://mnazria.herokuapp.com/api/maps?search=${jalan}`)
        .then((res) => {
            resolve(res.data.gambar)
        })
        .catch((err) => {
            reject(err)
        })
})

const cooltext = async (teks) => new Promise((resolve, reject) => {
    axios.get(`https://api.haipbis.xyz/randomcooltext?text=${teks}`)
        .then((res) => {
            const textc = `Teks: ${res.data.text}\nGambar: ${res.data.image}`
            resolve({ link: res.data.image, text: textc })
        })
        .catch((err) => {
            reject(err)
        })
})

const story = async (query) => new Promise((resolve, reject) => {
    axios.get(`https://api.vhtear.com/igstory?query=${query}&apikey=${vhtearkey}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const ig2 = async (url) => new Promise((resolve, reject) => {
    axios.get(`http://docs-jojo.herokuapp.com/api/insta?url=${url}`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})
const cerpen = async () => new Promise((resolve, reject) => {
    axios.get(`http://docs-jojo.herokuapp.com/api/cerpen`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const cersex = async () => new Promise((resolve, reject) => {
    axios.get(`https://docs-jojo.herokuapp.com/api/cersex`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const puisi = async () => new Promise((resolve, reject) => {
    const puiti = ['1', '3']
    const ranisi = puiti[Math.floor(Math.random() * puiti.length)]
    axios.get(`${link}/api/puisi${ranisi}`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})

const ytmp3 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://st4rz.herokuapp.com/api/yta2?url=${url}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const spotify2 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.clph.me/spotifydl?apikey=${caliph}&url=${url}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const spotify = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.zekais.com/spotifydl?url=${url}&apikey=${zekais}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const ymp3 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://zenzapi.xyz/api/downloader/ytmp3?url=${url}&apikey=${zenzapi}`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})

const ytmp4 = async (url) => new Promise((resolve, reject) => {
    axios.get(`http://hujanapi.xyz/api/ytdl?url=${url}&apikey=vWI9FfcmTlL2yx8`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const ingfo = async (query) => new Promise((resolve, reject) => {
    axios.get(`https://api.vhtear.com/infoalamat?query=${query}&apikey=${vhtearkey}`)
        .then((res) => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

/**
 * Search for movie.
 * @param {String} title
 * @returns {Object}
 */
const film = (title) => new Promise((resolve, reject) => {
    console.log(`Searching for Movie ${title}...`)
    axios.get(`https://api.vhtear.com/downloadfilm?judul=${title}&apikey=${vhtearkey}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const neo = async (title) => new Promise((resolve, reject) => {
    console.log(`Searching Anime ${title}`)
    axios.get(`http://docs-jojo.herokuapp.com/api/neonime_search?q=${title}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})


const jam = async (query) => new Promise((resolve, reject) => {
    axios.get(`https://api.i-tech.id/tools/jam?key=qTOfqt-6mDbIq-8lJHaR-Q09mTR-D6pAtD&kota=${query}`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})

const ymp4 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://zenzapi.xyz/api/downloader/ytmp4?url=${url}&apikey=${zenzapi}`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})

const kbbi = async (url) => new Promise((resolve, reject) => {
    axios.get(`http://enznoire.herokuapp.com/kbbi?kata=${url}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const stalktt = async (url) => new Promise((resolve, reject) => {
    axios.get(`http://zekais-api.herokuapp.com/tiktokstalk?query=${url}&apikey=${zekais}`)
        .then((res) => {
            if (res.data.error) resolve(res.data.error)
            const ttxt = `*Username:* ${res.data.username}\n*Name:* ${res.data.nickname}\n*Verified:* ${res.data.isverified}\n*Followers:* ${res.data.follower}\n*Following:* ${res.data.following}\n*Total Videos:* ${res.data.videoCount}\n*Total Likes:* ${res.data.likes}\n*Create:* ${res.data.createTime}\n\n*Bio:* ${res.data.bio}`
            resolve(ttxt)
        })
        .catch((err) => {
            reject(err)
        })
})

const stalktwit = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://kocakz.herokuapp.com/api/media/stalktwitt?user=${url}`)
        .then((res) => {
            if (res.data.error) resolve(res.data.error)
            const ttas = `*Username :* ${res.data.username}\n*Full Name :* ${res.data.fullname}\n*Follower :* ${res.data.follower}\n*Following :* ${res.data.following}\n*Bio :* ${res.data.descText}\n*Bio URL :* ${res.data.descUrl}`
            resolve(ttas)
        })
        .catch((err) => {
            reject(err)
        })
})

const stikig = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.vhtear.com/igprofile?query=${url}&apikey=${vhtearkey}`)
        .then((res) => {
            if (res.data.error) resolve(res.data.error)
            const tuxt = `*Username :* ${res.data.result.username}\n*Fullname :* ${res.data.result.full_name}\n*Followers :* ${res.data.result.follower}\n*Following :* ${res.data.result.follow}\n*Private Account :* ${res.data.result.is_private}\n*Jumlah Post :* ${res.data.result.post_count}\n\n*Bio :* ${res.data.result.biography}`
            resolve(tuxt)
        })
        .catch((err) => {
            reject(err)
        })
})

const stalkig = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.xteam.xyz/dl/igstalk?nama=${url}&APIKEY=db0e06bd9f096399`)
        .then((res) => {
            if (res.data.error) resolve(res.data.error)
            const text = `*Username :* ${res.data.result.user.username}\n*Full Name :* ${res.data.result.user.full_name}\n*Private Account:* ${res.data.result.user.is_private}\n*Followers :* ${res.data.result.user.follower_count}\n*Following :* ${res.data.result.user.following_count}\n*Total Post:* ${res.data.result.user.media_count}\n*Total IGTV Videos:* ${res.data.result.user.total_igtv_videos}\n\n\n*Biography :* ${res.data.result.user.biography}`
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})


/**
 * Create missing person image.
 * @param {String} text1
 * @param {String} text2
 * @param {String} text3
 * @param {String} url
 * @returns {Object}
 */
const missing = (text1, text2, text3, url) => new Promise((resolve, reject) => {
    console.log('Creating image...')
    fetchJson(`https://api.vhtear.com/missingperson?text1=${text1}&text2=${text2}&text3=${text3}&link=${url}&apikey=${vhtearkey}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ttpict = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://zekais-api.herokuapp.com/tiktokstalk?query=${url}&apikey=${zekais}`)
        .then((res) => {
            if (res.data.error) resolve('https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg')
            resolve(`${res.data.prof_pic}`)
        })
        .catch((err) => {
            reject(err)
        })
})


const quote = async () => new Promise((resolve, reject) => {
    axios.get(`https://kocakz.herokuapp.com/api/random/text/quotes`)
        .then((res) => {
            const text = `*Author : Thoriq Azzikra*\n\nQuote : ${res.data.result.quote}`
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const githubpict = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${url}`)
        .then((res) => {
            if (res.data.error) resolve('https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg')
            resolve(`${res.data.avatar_url}`)
        })
        .catch((err) => {
            reject(err)
        })
})

const github = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${url}`)
        .then((res) => {
            const ahaha = `- *Name :* ${res.data.name}\n- *Username:* ${res.data.login}\n- *Followers :* ${res.data.followers}\n- *Following :* ${res.data.following}\n- *Location :* ${res.data.location}\n- *Twitter Username :* ${res.data.twitter_username}\n- *Company :* ${res.data.company}\n- *Email :* ${res.data.email}\n- *Public Repos :* ${res.data.public_repos}\n- *Public Gists :* ${res.data.public_gists}\n- *Joined On:* ${res.data.created_at}\n- *Last Update:* ${res.data.updated_at}\n\n- *Bio :* ${res.data.bio}\n- *Url Profile :* ${res.data.html_url}`
            resolve(ahaha)
        })
        .catch((err) => {
            reject(err)
        })
})

const wiki = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://kocakz.herokuapp.com/api/edu/idwiki?query=${url}`)
        .then((res) => {
            resolve(res.data.results)
        })
        .catch((err) => {
            reject(err)
        })
})

const daerah = async () => new Promise((resolve, reject) => {
    axios.get(`${link}/daerah`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const jadwaldaerah = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.haipbis.xyz/jadwalsholat?daerah=${url}`)
        .then((res) => {
            if (res.data.error) resolve(res.data.error)
            const text = `Jadwal Sholat ${url}\n\nImsyak: ${res.data.Imsyak}\nSubuh: ${res.data.Subuh}\nDzuhur: ${res.data.Dzuhur}\nAshar: ${res.data.Ashar}\nMaghrib: ${res.data.Maghrib}\nIsya: ${res.data.Isya}`
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const cuaca = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://rest.farzain.com/api/cuaca.php?id=${url}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`)
        .then((res) => {
            if (res.data.respon.cuaca == null) resolve('Maaf daerah kamu tidak tersedia')
            const text = `Cuaca di: ${res.data.respon.tempat}\n\nCuaca: ${res.data.respon.cuaca}\nAngin: ${res.data.respon.angin}\nDesk: ${res.data.respon.deskripsi}\nKelembapan: ${res.data.respon.kelembapan}\nSuhu: ${res.data.respon.suhu}\nUdara: ${res.data.respon.udara}`
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const chord = async (url) => new Promise((resolve, reject) => {
    axios.t(`http://docs-jojo.herokuapp.com/api/chord?q=${url}`)
        .then((res) => {
            if (res.data.error) resolve(res.data.error)
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})

const tulis = async (teks) => new Promise((resolve, reject) => {
    axios.get(`https://alfians-api.herokuapp.com/nulis?text=${teks}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const artinama = async (nama) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/artinama?nama=${nama}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const cekjodoh = async (nama, pasangan) => new Promise((resolve, reject) => {
    axios.get(`http://zekais-api.herokuapp.com/cekjodoh?nama=${nama}&pasangan=${pasangan}&apikey=${zekais}`)
        .then((res) => {
            const textc = `Nama: ${res.data.namaAnda}\nPasangan: ${res.data.namaPasangan}\nPositif: ${res.data.sisiPositif}\nSisi Negatif: ${res.data.sisiNegatif}\nRamal: ${res.data.deskripsi}`
            resolve({ text: textc })
        })
        .catch((err) => {
            reject(err)
        })
})

const corona = () => new Promise((resolve, reject) => {
    axios.get(`https://api.terhambar.com/negara/World`)
        .then((res) => {
            const sushi = `Info Covid-19 ${res.data.negara}\n\n*Kasus Baru :* ${res.data.kasus_baru}\n*Total Kasus :* ${res.data.total}\n*Sembuh :* ${res.data.sembuh}\n*Penanganan :* ${res.data.penanganan}\n*Meninggoy :* ${res.data.meninggal}\n*Meninggal Baru :* ${res.data.meninggal_baru}\n\n*Update :* ${res.data.terakhir}`
            resolve(sushi)
        })
        .catch((err) => {
            reject(err)
        })
})

const covidindo = () => new Promise((resolve, reject) => {
    axios.get(`https://api.terhambar.com/negara/Indonesia`)
        .then((res) => {
            const textv = `Info Covid-19 ${res.data.negara}\n\n*Kasus Baru :* ${res.data.kasus_baru}\n*Total Kasus :* ${res.data.total}\n*Sembuh :* ${res.data.sembuh}\n*Penanganan :* ${res.data.penanganan}\n*Meninggoy :* ${res.data.meninggal}\n*Meninggal Baru :* ${res.data.meninggal_baru}\n\n*Update :* ${res.data.terakhir}`
            resolve(textv)
        })
        .catch((err) => {
            reject(err)
        })
})
const bapakfont = async (kalimat) => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/alaymaker?kata=${kalimat}&apikey=apivinz`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const lirik = async (judul) => new Promise((resolve, reject) => {
    axios.get(`https://scrap.terhambar.com/lirik?word=${judul}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})




const instagram = async (url) => new Promise(async (resolve) => {
    const api = `https://api.vhtear.com/instadl?link=${url}&apikey=${vhtearkey}`
    axios.get(api).then(async (res) => {
        const st = res.data.result
        if (st.status === false) {
            resolve(`Media Tidak Di Temukan`)
        } else {
            resolve(st)
        }
    }).catch(err => {
        console.log(err)
        resolve(`Maaf, Server Sedang Error`)
    })
})



module.exports = {
    ytmp3,
    ymp3v2,
    ymp4v2,
    youwatch,
    spotify2,
    yutub,
    silver,
    ig,
    quran,
    brainly,
    ymp3,
    stalktwit,
    corona,
    cekzodiak,
    its,
    ymp4,
    ytmp4,
    nhpdf,
    stalkig,
    quote,
    wiki,
    daerah,
    jadwaldaerah,
    cuaca,
    chord,
    tulis,
    film,
    stalktt,
    ttpict,
    sticker,
    wp,
    play,
    ig2,
    artinama,
    trend,
    playlinux,
    cekjodoh,
    covidindo,
    github,
    githubpict,
    bapakfont,
    lirik,
    movie,
    jam,
    twit,
    cerpen,
    cersex,
    puisi,
    cooltext,
    dewabatch,
    neo,
    kbbi,
    maps,
    instagram,
    filmapik,
    fb,
    fb2,
    kusonime,
    cosplay,
    listnek,
    ingfo,
    stikig,
    spotify,
    asupan,
    yt3,
    ssweb,
    story,
    missing
}