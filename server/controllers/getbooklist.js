const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page, openid} = ctx.request.query
    let bookSelect = mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'openId', 'open_id')
        .limit(10).offset(Number(page) * 10).orderBy('id', 'desc')
    let books
    if (openid && page) {
        books = await bookSelect.where('openid', openid)
    } else if (page) {
        books = await bookSelect
    }
    ctx.state = {// 连表查询相当于就是把对应的的值已经存到books里了
        code: 0,
        data: {// 精彩
            bookList: books.map(v => {
                const info = JSON.parse(v.user_info)
                return Object.assign({}, v, {
                    userInfo: {
                        nickName: info.nickName,
                        avatarUrl: info.avatarUrl
                    }
                })
            })
        }
    }
}
