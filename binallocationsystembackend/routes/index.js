var express = require('express');
var router = express.Router();
const { google } = require("googleapis")

/* GET home page. */
router.get('/', async (req, res, next) => {


  const auth = new google.auth.GoogleAuth({
    keyFilename: 'credentials.json',
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: 'v4',
    auth: client
  });


  const spreadsheetId = "1_QFwKMJ2wPv7T7Vq6gwgNm02IYIYfs09hC7Cr_fT8t4"
  const values = await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: "Sheet1!A:C",
    resource: { values: [["tm834Z", "wef", "10-034-B"]] },
    valueInputOption: "USER_ENTERED",
  })
  console.log(values)
  res.send(values);
});

module.exports = router;
