const express = require('express');
const app = express();
const PORT = 8080;
function generateRandomString(){
    let randomStr = "";
    let arrayCharsAndNums = ['A', 'B', 'C' , 'D', 'E', 'F', 'G', 'H', 'a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7'];
    for(let i = 0; i < 6;  i++){
       randomStr += arrayCharsAndNums[Math.floor((Math.random() * (arrayCharsAndNums.length  - 1)))];
    }
    return randomStr;
}

const urlDatabase = {
    'b2xVn2': 'http://www.lighthouselabs.ca',
    '9sm5xK': 'http://www.google.ca'
}
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.post('/urls', (req, res) => {
   let shUrl = generateRandomString()
   urlDatabase[shUrl] = req.body.longURL
   res.redirect(`/urls/${shUrl}`);
});

app.set('view engine', 'ejs');

app.get('/urls/new', (req, res) => {
    res.render('urls_new')
});
// app.get('/urls', (req, res) => {
//     let templateUrl = {urls: urlDatabase}
//     res.render('urls_index', templateUrl);
// });
app.get('/u/:shortURL', (req, res) => {
    let templateVar = {shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]}
    res.redirect(templateVar.longURL);
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