const express = require('express');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');

const urlDatabase = {
    'b2xVn2': 'www.lighthouselabs.ca',
    '9sm5xK': 'www.google.ca'
}
// app.get('/urls', (req, res) => {
//     let templateUrl = {urls: urlDatabase}
//     res.render('urls_index', templateUrl);
// });
app.get(`/urls/:shortURL`, (req, res) => {
    let templateVar = {shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]}
    res.render('urls_show.ejs', templateVar);
});

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});

// app.get('/', (req, res) => {
//     res.send('Hello!');
// });

// app.get('/urls.json', (req, res) => {
//     res.send(urlDatabase);
// });

// app.get('/hello', (req, res) => {
//     res.send('<html><body>Hello <b>World</b></body></html>\n');
// });

// app.get('/set', (req, res) => {
//     const a = 1
//     res.send(`Assigning a variable \'a\'  which contains the number 1 in this path: ${a}`);
// });

// app.get('/fetch', (req, res) => {
//     res.send(`fetching some stuff from \'\set\' path: ${a}`);
// });