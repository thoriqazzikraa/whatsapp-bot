const cheerio = require("cheerio")
const axios = require("axios")
const qs = require("qs")
const pdfkit = require('pdfkit')
const fetch = require('node-fetch')
const sizes = require('./pdfSize.json')
const request = require('request')

const pickrandom = async (ext) => {
	return ext[Math.floor(Math.random() * ext.length)]
}

function igstalk(username) {
	return new Promise(async (resolve, reject) => {
		let {
		    data
		} = await axios('http://instagram.com/' + username + '/?__a=1', {
			'method': 'GET',
			'headers': {
				'user-agent': 'Mozilla/5.0(Windows NT 10.0; WOW64) AppleWebKit/537.76(KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
				'cookie': 'ig_did=77ADA31F-4AB0-4D19-8875-522C891A60E6; ig_nrcb=1; csrftoken=Zuy4R9169ejQY0R20InUOfeh2fCh7cfW; ds_user_id=8779859677; sessionid=8779859677%3Az2RfuCb1tsxTh1%3A26; shbid="10275\0548779859677\0541665541164:01f7683f87e5d1e3c2db8b41bfad455d2718c549ac0aeba033c00ae0e25647a7d8b87ee1"; shbts="1634005164\0548779859677\0541665541164:01f7df3ebca9d4ae3ecdb5f3b25d845142e5f462409976c5c140ba803c85bdd15fe0d45e"; rur="EAG\0548779859677\0541665541186:01f7c8bdbba6bfaf1f0fc03d5b843fe864bb908dc49069cc77dd546a9c6b50302d83b608"'
				}
			})
			let user = data.graphql.user
			let json = {
				creator: 'thoriqazzikraa',
				status: 'OK',
				code: 200,
				username: user.username,
				fullname: user.full_name,
				verified: user.is_verified,
				followers: user.edge_followed_by.count,
				following: user.edge_follow.count,
				thumbnail: user.profile_pic_url_hd,
				bio: user.biography,
				info: data.seo_category_infos
			}
			resolve(json)
		})
	}


function igdl(link) {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'POST',
			url: 'https://downloadgram.org/#downloadhere',
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
				},
				formData: {
					url: link,
					submit: '',
					}
				}
				request(options, async function(error, response, body) {
					if (error) throw new Error(error)
					const $ = cheerio.load(body)
					const result = [];
					$('#downloadBox > a').each(function(a, b) {
						result.push($(b).attr('href'))
						})
						resolve(result)
					})
				})
			}

function youtubedown(link) {
	return new Promise((resolve, reject) => {
		const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
		if (ytIdRegex.test(link)) {
			let url = ytIdRegex.exec(link)
			let config = {
				'url': 'https://www.youtube.be/' + url,
				'q_auto': 0,
				'ajax': 1
			}
			let headerss = {
				"sec-ch-ua": '"Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"Cookie": 'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}'
			}
			axios('https://www.y2mate.com/mates/en68/analyze/ajax', {
				method: 'POST',
				data: new URLSearchParams(Object.entries(config)),
				headers: headerss
			})
				.then(({ data }) => {
					const $ = cheerio.load(data.result)
					let img = $('div.thumbnail.cover > a > img').attr('src');
					let title = $('div.thumbnail.cover > div > b').text();
					let size = $('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
					let size_mp3 = $('#audio > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
					let id = /var k__id = "(.*?)"/.exec(data.result)[1]
					let configs = {
						type: 'youtube',
						_id: id,
						v_id: url[1],
						ajax: '1',
						token: '',
						ftype: 'mp4',
						fquality: 480
					}
					axios('https://www.y2mate.com/mates/en68/convert', {
						method: 'POST',
						data: new URLSearchParams(Object.entries(configs)),
						headers: headerss
					})
						.then(({ data }) => {
							const $ = cheerio.load(data.result)
							let link = $('div > a').attr('href')
							let configss = {
								type: 'youtube',
								_id: id,
								v_id: url[1],
								ajax: '1',
								token: '',
								ftype: 'mp3',
								fquality: 128
							}
							axios('https://www.y2mate.com/mates/en68/convert', {
								method: 'POST',
								data: new URLSearchParams(Object.entries(configss)),
								headers: headerss
							})
								.then(({ data }) => {
									const $ = cheerio.load(data.result)
									let audio = $('div > a').attr('href')
									resolve({
										id: url[1],
										title: title,
										size: size,
										quality: '480p',
										thumb: img,
										link: link,
										size_mp3: size_mp3,
										mp3: audio
									})
								})
						})
				})
				.catch(reject)
		} else reject('Link Invalid')
	})
}

async function randomTiktok(query) {
	return new Promise(async (resolve, reject) => {
		await axios.get('https://brainans.com/search?query=' + query).then(response => {
			const $ = cheerio.load(response.data)
			const User = $('#search-container > div:nth-child(1) > div.content__text > a').attr('href')
			axios.get('https://brainans.com/' + User).then(respon => {
				const soup = cheerio.load(respon.data)
				const Vidlink = []
				const main = soup('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div > div > a')
				main.each(function () {
					const Vlink = 'https://brainans.com/' + soup(this).attr('href')
					Vidlink.push(Vlink)
				})
				pickrandom(Vidlink).then(res => {
					axios.get(res).then(resp => {
						const ch = cheerio.load(resp.data)
						const result = {
							username: ch('#card-page > div > div.row > div > div > div > div > div.main__user-desc.align-self-center.ml-2 > a').text(),
							caption: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__list').text(),
							likes: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div > div:nth-child(1) > span').text(),
							comment: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(2) > span').text(),
							share: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(3) > span').text(),
							video: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__image-container > div > video').attr('src')
						}
						resolve(result)
					})
				}).catch(resolve)
			}).catch(resolve)
		}).catch(resolve)
	})
}

async function ttUser(url) {
	return new Promise(async (resolve, reject) => {
		axios.get(url).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div')
			main.each(function () {
				const idVid = 'https://brainans.com' + $(this).find('a').attr('href')
				const upload_at = $(this).find('span').text()
				const desc = $(this).find('p').text()
				const user = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > div > a > h1').text()
				const username = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > div > h4').text()
				const video_count = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1) > strong').text()
				const followers = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2) > strong').text()
				const following = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3) > strong').text()
				const likes = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(4) > strong').text()
				const bio = $('#user-page > div.user.container > div > div.col-md-5.my-3 > div').text()
				const thumb = $('#user-page > div.user.container > div > div.col-md-3.col-4.my-3 > div').attr('style').replace("background-image: url('", '').replace("');", '')
				result.push({ idVid, upload_at, desc })
				const hasil = {
					user: user,
					username: username,
					video_count: video_count,
					followers: followers,
					following: following,
					likes: likes,
					bio: bio,
					thumb: thumb,
					video: result
				}
				resolve(hasil)
			})
		}).catch(reject)
	})
}

async function mediaFire(link) {
	return new Promise(async (resolve, reject) => {
		axios.get(link).then(res => {
			const $ = cheerio.load(res.data)
			const link = $('a#downloadButton').attr('href')
			const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
			const seplit = link.split('/')
			const nama = seplit[5]
			mime = nama.split('.')
			mime = mime[1]
			const hasil = {
				title: nama,
				size: size,
				link: link
			}
			resolve(hasil)
				.catch(reject)
		})
			.catch(reject)
	})
}

/**
 * 
 * @param {Array} images of array image
 * @param {String} Size default 4
 * @returns
 */

function toPDF(images = [], size = 'A4') {
	return new Promise(async (resolve, reject) => {
		if (!Array.isArray(images)) throw new TypeError('images must be an array');
		let _size = sizes[size];
		if (!_size) throw new Error('Size is invalid!');
		let buffs = [];
		const doc = new pdfkit({ margin: 0, size: sizes[size] });
		for (let img of images) {
			const resp = await fetch(img);
			const data = await resp.buffer();
			//const metadata = await sharp(data).metadata();
			doc.image(data, 0, 0, {
				fit: _size,
				align: 'center',
				valign: 'center',
			});
			doc.addPage();
		}
		// let write = stream2buffer();
		doc.on('data', (chunk) => buffs.push(chunk));
		doc.on('end', () => resolve(Buffer.concat(buffs)));
		doc.on('error', (err) => reject(err));
		// let filepath = path.join(__dirname, '../tmp/' + (new Date() + 1) + '.pdf');
		// let stream = fs.createWriteStream(filepath);
		// doc.pipe(write);
		// write.on('finish', function () {
		//   resolve(Buffer.concat(this.data));
		// });
		doc.end();
	});
}

module.exports = {
	youtubedown,
	igdl,
	igstalk,
	toPDF,
	ttUser,
	randomTiktok,
	mediaFire,
}
