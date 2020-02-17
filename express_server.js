const express = require('express');
const app = express();
const PORT = 8080;

const urlDatabase = {
    'b2xVn2': 'www.lighthouselabs.ca',
    '9sm5xK': 'www.google.ca'
}
app.get('/', (req, res) => {
    res.send('Hello!');
});

app.get('/urls.json', (req, res) => {
    res.send(urlDatabase);
});

app.get('/hello', (req, res) => {
    res.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});