const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/angular-blog-app'));
ngApp.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, '/dist/angular-blog-app/index.html'));
});
ngApp.listen(8080);
