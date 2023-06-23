const express = require('express');
const axios = require('axios');
const path = require("path");
const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))

app.get('/', async (req, res) => {
    try {
    const response = await axios.get('https://api.sheety.co/2ced0fac717ca592890c6bcdaaa1e3ec/fortuneGpt/%E7%BE%8E%E4%B8%BD%E8%B4%A2%E5%AF%8C%E4%BF%9D%E9%99%A9%E4%B8%89%E5%8D%81%E9%97%AE');
    res.render('table', { data: response.data });
    //res.json(response.data);
  } catch (error) {
    res.json({error: error.message});
  }
});
// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
    .end()
})

module.exports = app
