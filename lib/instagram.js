const httpProxy = require('http-proxy')
const express = require('express')
const { igApi } = require('insta-fetcher')
const sessionId = 'ig_did=C8B73274-F442-4F83-A752-C2AC0BEDCFF0; ig_nrcb=1; mid=Y1hG1wALAAGWplAK3kx8jJxus6X9; csrftoken=KL5lUffoxcBepaAs8LhK9kJr2Owe9nuV; sessionid=40194017622:V9xvzHWqOBPo6y:5:AYc3juBOjkIRKcivYxSiJ2xUWbczHoewC_WMxLt83g; ds_user_id=40194017622; shbid="11722,40194017622,1698265708:01f78bd22b57f8f3ed445b64daec848c50f6b1589debbca7bda4c3185f9c64c98c863412"; shbts="1666729708,40194017622,1698265708:01f76099b08f6841ee1c0eaf0060596c55d0cffb7eda7251c49f8b107a9b0a1a6154f4de"; datr=60ZYY8cuQe3zPQh_F54rjMmP; rur="PRN,40194017622,1698265770:01f733cd6a7da358958d996640742545f02409d6382e2ce97e931b442faf0f112c4bdc50"'

const proxy = httpProxy.createProxyServer({})
const app = express()
app.get('*', function(req, res) {
	proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` })
})
const server = app.listen(8000)
const ig = new igApi(sessionId, false, {
	proxy: {
		hostname: 'localhost',
		port: 8000,
		auth: { username: 'thoriqazzikraa', password: 'urbae' }
	}
})
module.exports = { ig }