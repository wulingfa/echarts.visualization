// 引入websocket
const WebSocket = require('ws')
// 创建websocket对象，绑定端口号
const path = require("path")
const getFileJsonData = require('../utils/file_utils')
const wss = new WebSocket.Server({
    port: 9998
})
module.exports.listen = () => {
    // 对客户端的连接事件进行监听
// client 代表的是客户端的socket对象
wss.on('connection', client => {
    console.log('客户端连接成功~')
    // 对客户的连接对象进行message事件的监听
    // msg 由客户端发送给服务端的数据
    client.on('message', async msg => {
        console.log("客户端发送数据给服务端了：" + msg);
        let payload = JSON.parse(msg)
        const action = payload.action
        if (action === 'getData') {
            let filepath = '../data/' + payload.chartName + '.json'
            filepath = path.join(__dirname, filepath)
            const ret = await getFileJsonData(filepath)
            payload.data = ret
            client.send(JSON.stringify(payload))
        } else {
            wss.clients.forEach(client => {
                client.send(JSON.stringify(payload))
            })
        }
        
    })
})
}