const Koa = require('koa');
//导入响应耗时中间件
const resDurationMiddleware = require('./middleware/koa_response_duration');
//响应头中间件
const resHeaderMiddleware = require('./middleware/koa_response_header')
//处理业务逻辑的中间件
const resDataMiddleware = require('./middleware/koa_response_data')
const app = new Koa();
app.use(resDurationMiddleware);
app.use(resHeaderMiddleware);
app.use(resDataMiddleware)
app.listen(3000)

const WebSocketService = require('./service/ws_service')
WebSocketService.listen()