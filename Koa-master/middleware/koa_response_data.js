const path = require('path')
//导入读取文件的包并用其函数
const getFileJsonData = require('../utils/file_utils')
module.exports = async (ctx, next) => {
    const url = ctx.request.url;
    //访问seller.json
    let filepath = '../data' + url + '.json'
    filepath = path.join(__dirname, filepath)
    //不捕获错误的话，页面会返回not found
    try {
        //此处要用await 不然返回的是promise对象
        const ret = await getFileJsonData(filepath)
        ctx.response.body = ret
    } catch (error) {
        //设置到响应体
        //自定义错误内容
        const errMessage = {
            message: '读取文件内容失败，文件资源不存在',
            status: 404
        }
        ctx.response.body = JSON.stringify(errMessage)
    }
    await next()
}