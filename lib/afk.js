const fs = require('fs')
const _afk = JSON.parse(fs.readFileSync('./lib/database/afk.json'))


const addAfk = (userId, time) => {
    let obj = { id: `${userId}`, time: Date.now(), reason: `${reason}` }
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

const getAfkPosition = (userId) => {
    let position = false
    Object.keys(_afk).forEach((i) => {
        if (_afk[i].id == userId) {
            position = i
        }
    })
    return position
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

module.exports = {
    addAfk,
    getAfk,
    getAfkPosition,
    getAfkReason,
    getAfkTime,
    getAfkId
}