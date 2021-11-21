const express = require('express');
const path = require('path');
const app = express();
console.log('server.js started');
app.use(express.static(__dirname + '/dist/iherb-client'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/iherb-client/index.html'));
});
app.listen(process.env.PORT || 8080);
