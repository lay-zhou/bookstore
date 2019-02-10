const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {bookid, openid} = ctx.request.query
    let Formysql = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'openid', 'open_id')
    let comments
    if (bookid) {
        comments = await Formysql.where('bookid', bookid)
    } else if (openid) {
        comments = await Formysql.where('openid', openid)
    }
    ctx.state.data = {
        comments: comments.map(v => {
            return Object.assign({}, JSON.parse(v.user_info), v)
        })
    }
}
