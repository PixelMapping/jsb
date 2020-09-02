/**
 * 使用  http-proxy-middleware  配置反向代理    =>   解决跨域问题
 * 
 */
// import config from "./config/base.conf"
const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * 统一使用 base.conf 中的 ip:端口
 */
// import config from "./config/base.conf"

module.exports = (app) => {
    // proxy第一个参数为要代理的路由
    // 第二参数中target为代理后的请求网址，changeOrigin是否改变请求头，其他参数请看官网
    app.use(createProxyMiddleware('/api', {
        // target: `${config.host}:${config.port}`,
        // target:"http://47.116.4.10:8870",
        target: "http://jtest.shunshuitong.net",
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }))
}