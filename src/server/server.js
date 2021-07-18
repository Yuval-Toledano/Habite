
const path = require('path');
const express = require('express');
const { Console } = require('console');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../../', 'src');
// const publicPath = path.join('../../', 'public');
// add to json of package.json: "start": "node src/server/server.js",
// console.info(__dirname);

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.js'));
 });

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
 });