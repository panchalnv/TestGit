const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/uc', {
      target: 'https://drive.google.com',
      changeOrigin: true,
      //ws: true, // proxy websockets
    }),
  );
  app.use(
    createProxyMiddleware('/.netlify/functions/', {
      target: 'http://localhost:9000',
      changeOrigin: true,
      //ws: true, // proxy websockets
      pathRewrite: {
        '^/\\.netlify/functions': '',
        '/uc': 'https://drive.google.com',
      },
    }),
  );
};
