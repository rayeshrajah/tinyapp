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

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});