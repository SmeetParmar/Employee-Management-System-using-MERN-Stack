const express = require('express');
require('dotenv').config();

const { getHandler } = require('./apiHandlers')
const { connectToDB } = require('./database')

const app = express();

const portNumber = process.env.PORT || 5500;

getHandler(app);

(async () => {
    await connectToDB();
    app.listen(portNumber, function () {
        console.log('API server started on port ' + portNumber);
    });
})();