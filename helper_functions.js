/*Helper functions*/

//Generates a randomId 
function generateRandomString() {
    let randomStr = "";
    let arrayCharsAndNums = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ];
    for (let i = 0; i < 6; i++) {
      randomStr +=
        arrayCharsAndNums[
          Math.floor(Math.random() * (arrayCharsAndNums.length - 1))
        ];
    }
    return randomStr; 
  }
  //gives an url object of specific user who is logged and the urls a visible to that user only
  const userUrlDatabase = function(req, database, database2) {
    let userUrlObject = {};
    for (let url in database) {
      if (database[url].userID === getTemplateUserObjId(req, database2)['userID']) {
        userUrlObject[url] = {
            longUrl:database[url].longUrl,
            userID: getTemplateUserObjId(req, database2)['userID']
          }
        }
      }
    return userUrlObject
  };
//Gets the userId of the user whose logged in.
const getTemplateUserObjId = (req, database) => {
    return database[req.session.userID];
  };
//check for the user if its the right user return true.
const checkForUser = function(req, database, database2){
    for(let url in database){
    if (database[url].userID === getTemplateUserObjId(req, database2).userID){
        return true;
        }
    }
    return false;
}
//Boolean whether the email registered and email loggin is the same.
const getUserEmail = (req, database) => {
    for(let id in database){
        if(database[id].email === req.body['email']){
        return true;
        }
    }return false;
}

//Exporting functions.
module.exports = { generateRandomString, userUrlDatabase, getTemplateUserObjId, checkForUser, getUserEmail }
 
  