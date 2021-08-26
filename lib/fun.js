const { fetchJson } = require('../function/fetcher.js')

const simsimi = (query) => new Promise((resolve, reject) => {
    console.log(`Get SimSimi text from: ${query}...`)
    fetchJson(`https://videfikri.com/api/simsimi/?teks=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    simsimi
}