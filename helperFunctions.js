/*Helper functions*/
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
  const userUrlDatabase = function(req, database, database2) {
    let userUrlObject = {};
    for (let url in database) {
        console.log(url);
      if (database[url].userID === getTemplateUserObjId(req, database2)['userID']) {
        userUrlObject[url] = {
            longUrl:database[url].longUrl,
            userID: getTemplateUserObjId(req, database2)['userID']
          }
        }
      }
    return userUrlObject
  };

const getTemplateUserObjId = (req, database) => {
    return database[req.session.userID];
  };

const checkForUser = function(req, database, database2){
    for(let url in database){
    if (database[url].userID === getTemplateUserObjId(req, database2).userID){
        return true;
        }
    }
}

  module.exports = { generateRandomString, userUrlDatabase, getTemplateUserObjId, checkForUser }
 
  