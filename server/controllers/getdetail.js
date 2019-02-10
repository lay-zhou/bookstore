const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const list = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info') // 连表查询
        .join('cSessionInfo', 'openId', 'open_id') // 怎么个连法 后面是筛选条件
        .where('id', id)
        .first()
    const userinfo = JSON.parse(list.user_info)
    ctx.state.data = Object.assign({}, list, {
        tags: list.tags.split(','),
        summary: list.summary.split('\n'),
        user_info: {
            name: userinfo.nickName,
            image: userinfo.avatarUrl
        }
    })

    await mysql('books')
        .select('count')
        .where('id', id) // 在库里找哪个文件，筛选
        .increment('count', 1)// 请求一次加一次
}
