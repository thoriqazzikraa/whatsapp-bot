const httpProxy = require('http-proxy')
const express = require('express')
const { igApi } = require('insta-fetcher')
const sessionId = 'ig_did=C8B73274-F442-4F83-A752-C2AC0BEDCFF0; ig_nrcb=1; mid=Y1hG1wALAAGWplAK3kx8jJxus6X9; shbid="11722,40194017622,1698265708:01f78bd22b57f8f3ed445b64daec848c50f6b1589debbca7bda4c3185f9c64c98c863412"; shbts="1666729708,40194017622,1698265708:01f76099b08f6841ee1c0eaf0060596c55d0cffb7eda7251c49f8b107a9b0a1a6154f4de"; datr=60ZYY8cuQe3zPQh_F54rjMmP; csrftoken=gWRfj0KVNjMIZRCdGR1O8JuJgr1ocUZn; sessionid=56220214914:Oxu0lyvxMBIy8b:22:AYchFIYsnO_ac27zhGPwlKRJE6yGjJlcNNdEglDdWw; ds_user_id=56220214914; rur="NAO,56220214914,1698490434:01f714d9d20e8d6e1011572b2b0d71a539540de31e8aefb4154c2a1f512fab954bf88f4f"'

const proxi = httpProxy.createProxyServer({})
const app = express()
app.get('*', function(req, res) {
	console.log('Request', req.method, req.url)
	proxi.web(req, res, { target: `${req.protocol}://${req.hostname}` })
})

const server = app.listen(8000)
const options = {
	host: 'localhost',
	port: 8000,
	protocol: 'http'
}
const ig = new igApi(sessionId, false, { options })

module.exports = { ig }