const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let { bookid, openid, comment, phone, location } = ctx.request.body// post请求的内容
    try {
        await mysql('comments').insert({ bookid, openid, comment, phone, location })
        ctx.state.data = {
            msg: '添加成功'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '添加失败' + e.sqlMessage
            }
        }
    }
}
