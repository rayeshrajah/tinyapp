const express = require("express");
const helper = require('./helperFunctions');
const app = express();
const PORT = 8080;
const body = require("body-parser");
const cookieParser = require("cookie-parser");
var cookieSession = require('cookie-session')
app.use(cookieParser());
app.use(body.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const bcrypt = require('bcrypt');
let hashedPassword = "";

app.use(cookieSession({
  name: 'session',
  keys: ['donna haraway', 'medusa', 'plastic shoes', 'unbreakable!'],
  maxAge: 1000 * 60 * 60 * 24 // 24 hours in miliseconds
}));

//Databases that are changeable.
let urlDatabase = {};
let usersDatabase = {};

/*!!!!!!USER - Authentication Routes!!!!!*/
//gets the userId object fucntion
app.get("/login", (req, res) => {
  let templateUrl = {
    userID: helper.getTemplateUserObjId(req, usersDatabase)
  };
  res.render("urls_login", templateUrl);
});

//log's in if the user is registered.
app.post("/login", (req, res) => {
  const email = req.body["email"];
  const password = req.body["password"];
  let user = null;
  for (let id in usersDatabase) {
    if (
      usersDatabase[id]['email'] === email &&
      bcrypt.compareSync(password, usersDatabase[id]['password'])
    ) {
      user = usersDatabase[id].userID;
      req.session.userID =  user;
      res.redirect("/urls");
    }else{
      let templateUrl = {
        userID: helper.getTemplateUserObjId(req, usersDatabase)
      };
      res.render('url_failed_login', templateUrl);
    }
  }
});

//Logout Route
app.post("/logout", (req, res) => {
  delete req.session.userID;
  res.redirect("/login");
});

//renders the registration page
app.get("/register", (req, res) => {
  let templateUrl = {
    userID: helper.getTemplateUserObjId(req, usersDatabase)
  };
  res.render("urls_register", templateUrl);
});
//After the user clicks the login in the registration page redirects them to the urls page.
app.post("/register", (req, res) => {
  const email = req.body["email"];
   hashedPassword = bcrypt.hashSync(req.body["password"], 10);
  if(helper.getUserEmail(req, usersDatabase)){
    res.end("Email is the same trying another email, Thank you");
  }else if (email === "" || hashedPassword === "") {
    res.end("400 bad request");
  } else {
    const randomId = helper.generateRandomString();
    req.session.userID = randomId;
    usersDatabase[req.session.userID] = {
      userID: req.session.userID,
      email: email,
      password: hashedPassword
    };
    console.log(usersDatabase);
    res.redirect("/urls")
  }
});

/*!!!!!!!!!URL - Routings!!!!!!!!!!!*/

app.get("/urls/new", (req, res) => {
  const templateUrl = {
    userID: helper.getTemplateUserObjId(req, usersDatabase)
  };
  if (templateUrl.userID === undefined) {
    res.redirect("/login");
  } else {
    res.render("urls_new", templateUrl);
  }
});

//gets the /urls and renders the urls_index.ejs file from views
app.get("/urls", (req, res) => {
  if (!helper.getTemplateUserObjId(req, usersDatabase)) {
    res.redirect("/login");
  } else {
   const templateUrl = {userID: helper.getTemplateUserObjId(req, usersDatabase), urls: helper.userUrlDatabase(req, urlDatabase, usersDatabase)};
    res.render("urls_index", templateUrl);
  }
});

app.post("/urls", (req, res) => {
  let shUrl = helper.generateRandomString();
  urlDatabase[shUrl] = {
    longUrl: req.body.longURL,
    userID: helper.getTemplateUserObjId(req, usersDatabase)['userID']
  };
  console.log(urlDatabase);
  res.redirect(`/urls/${shUrl}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  if(helper.checkForUser(req, urlDatabase, usersDatabase)){
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
  }
});
//Bring you to the correct editing Url page dpending on which one you want to edit.
app.post("/urls/:shortURL/pageEdit", (req, res) => {
  const stURL = req.params.shortURL;
  res.redirect(`/urls/${stURL}`);
});

app.post("/urls/:shortURL/edit", (req, res) => {
  if(helper.checkForUser(req, urlDatabase, usersDatabase)){
  const shrtURL = req.params.shortURL;
  const newLongURL = req.body[shrtURL];
  urlDatabase[shrtURL]['longUrl'] = newLongURL;
  res.redirect(`/urls`);
  }
});

app.get("/urls/:shortURL", (req, res) => {
  let templateUrl = { 
    userID: helper.getTemplateUserObjId(req, usersDatabase),
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL].longUrl
  };
  res.render("urls_show", templateUrl);
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});