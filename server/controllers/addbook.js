const https = require('https')
const {mysql} = require('../qcloud')
// 取到数据
// 转换成对象
// 传进来

module.exports = async (ctx) => {
    const {isbn, openId} = ctx.request.body
    if (isbn && openId) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -2,
                data: {
                    msg: '图书已经存在了'
                }
            }
            return
        }
        let url = `https://api.douban.com/v2/book/isbn/${isbn}`
        const bookInfo = await getJSON(url)
        const rate = bookInfo.rating.average
        const {image, alt, publisher, title, summary, price} = bookInfo
        const author = bookInfo.author.join(',')
        const tags = bookInfo.tags.map((item) => {
            return `${item.name} ${item.count}`
        }).join(',')// 在每个数组的元素后面加
        try {
            await mysql('books').insert({
                isbn, openId, image, alt, publisher, title, summary, price, tags, rate, author
            })
            ctx.state = {
                code: 0,
                data: {
                    title,
                    msg: `success`
                }
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: `${e.sqlMessage}`
                }
            }
        }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                let bookInfo = JSON.parse(urlData)
                if (bookInfo.title) {
                    resolve(bookInfo)
                }
                reject(bookInfo)
            })
        })
    })
}
