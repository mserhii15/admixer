const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const target = 'http://integration-api-stage.admixer.net'; // target server

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use('/TestTask', createProxyMiddleware({
  target,
  changeOrigin: true,
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // add CORS header
  },
}));

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});
