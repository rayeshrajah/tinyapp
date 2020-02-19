const express = require('express');
const app = express();
const PORT = 8080;
const body = require("body-parser");
const cookieParser = require("cookie-parser")
app.use(cookieParser());
app.use(body.urlencoded({extended: true}));

function generateRandomString(){
    let randomStr = "";
    let arrayCharsAndNums = ['A', 'B', 'C' , 'D', 'E', 'F', 'G', 'H', 'a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7'];
    for(let i = 0; i < 6;  i++){
       randomStr += arrayCharsAndNums[Math.floor((Math.random() * (arrayCharsAndNums.length  - 1)))];
    }
    return randomStr;
}
//userDatabase
let usersDatabase = {

};

app.set('view engine', 'ejs');

app.get('/urls/new', (req, res) => {
    const templateUrl = {
        userID: getTemplateUserObj(req)
    }
    res.render('urls_new', templateUrl)
});

/*!!!!!!USER - Authentication Routes!!!!!*/
//gets the userId object fucntion 
const getTemplateUserObj = (req) => {
    return usersDatabase[req.cookies['userID']];
 }

app.get('/login', (req, res) => {
    let templateUrl = {
        userID: getTemplateUserObj(req)
    }
    res.render('urls_login', templateUrl)
});

//Going to make some changes to this post request after. LEave it there for now
app.post('/login', (req, res) => {
   const email = req.body['email'];
   const password = req.body['password'];
   let user = null;
   for(let id in usersDatabase){
       console.log(usersDatabase[id].email);
        if(usersDatabase[id].email === email && usersDatabase[id].password === password){
            user = usersDatabase[id].userID;
            res.cookie('userID', user);
            res.redirect('/urls');
        }
   }
});

//Change it later, because this will work for now
app.post('/logout', (req, res) => {
    res.clearCookie('userID', getTemplateUserObj(req));
    res.redirect('/login');
});

//renders the registration page
app.get('/register', (req, res) => {
    let templateUrl = {
        userID: getTemplateUserObj(req)
    }
    res.render('urls_register', templateUrl);
});
//After the user clicks the login in the registration page redirects them to the urls page.
app.post('/register', (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
    for(const id in usersDatabase){
        if(usersDatabase[id].email === email){
            res.end('Email is the same trying another email, Thank you');
        }
    }
     if(email === "" || password === ""){
        res.end('400 bad request');
    }else{
    const randomId = generateRandomString();
    usersDatabase[randomId] = {
            'userID': randomId,
            'email': email,
            'password': password
            }
    res.cookie('userID', usersDatabase[randomId].userID);
    res.redirect('/urls'); 
    console.log(usersDatabase)
    }
});

/*!!!!!!!!!URL - Routings!!!!!!!!!!!*/

//urlDatabase
let urlDatabase = {

};

//gets the /urls and renders the urls_index.ejs file from views
 app.get('/urls', (req, res) => {
    let templateUrl = {userID: getTemplateUserObj(req), urls: urlDatabase}
    res.render('urls_index', templateUrl); });

app.post('/urls', (req, res) => {
   let shUrl = generateRandomString()
   urlDatabase[shUrl] = req.body.longURL
   res.redirect(`/urls/${shUrl}`);
});

app.post('/urls/:shortURL/delete', (req, res) => {
    delete urlDatabase[req.params.shortURL];
    res.redirect('/urls');
});
//Bring you to the correct editing Url page dpending on which one you want to edit.
app.post('/urls/:shortURL/pageEdit', (req, res) => {
    const stURL = req.params.shortURL
    res.redirect(`/urls/${stURL}`);
});

app.post('/urls/:shortURL/edit', (req, res) => {
    const shrtURL = req.params.shortURL;
    const newLongURL = req.body[shrtURL];
    urlDatabase[shrtURL] = newLongURL;
    res.redirect(`/urls`);
})

app.get('/urls/:shortURL', (req, res) => {
    let templateUrl = {userID: getTemplateUserObj(req), shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]}
    res.render('urls_show', templateUrl);
});

// app.get('/urls/:shortURL', (req, res) => {
//     let templateVar = {shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]}
//     res.redirect(templateVar.longURL);
// });

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
