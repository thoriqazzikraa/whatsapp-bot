const { fetchJson } = require('../function/fetcher.js')

const ytPlay = (query) => new Promise((resolve, reject) => {
    console.log(`Searching for song in YouTube...`)
    fetchJson(`https://videfikri.com/api/ytplay?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const igtv = (url) => new Promise((resolve, reject) => {
    console.log(`Searching Instagram TV for: ${url}...`)
    fetchJson(`https://videfikri.com/api/igtv/?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ytmp3 = (query) => new Promise((resolve, reject) => {
    console.log(`Converting YT to MP3 from ${query}...`)
    fetchJson(`https://videfikri.com/api/ytmp3/?url=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ytmp4 = (query) => new Promise((resolve, reject) => {
    console.log(`Converting YT to MP4 from ${query}...`)
    fetchJson(`https://videfikri.com/api/ytmp4/?url=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    ytPlay,
    igtv,
    ytmp3,
    ytmp4
}