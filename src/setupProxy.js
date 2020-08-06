const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/uc', {
      target: 'https://drive.google.com',
      changeOrigin: true,
      //ws: true, // proxy websockets
    }),    
  );
};
