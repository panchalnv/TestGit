const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/uc', {
      target: 'https://drive.google.com',
      changeOrigin: true,
      //ws: true, // proxy websockets
    }),
    createProxyMiddleware('https://panchal.netlify.app/resume', {
      target: 'https://drive.google.com/uc',
      changeOrigin: true,
      //ws: true, // proxy websockets
    }),    
  );
};
