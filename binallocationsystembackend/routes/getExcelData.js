var express = require('express');
var router = express.Router();
const { google } = require("googleapis")

/* GET home page. */
router.get('/', async (req, res, next) => {

    let credentials = JSON.parse(process.env.CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
        credentials,
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: 'v4',
        auth: client
    });


    const spreadsheetId = "1_QFwKMJ2wPv7T7Vq6gwgNm02IYIYfs09hC7Cr_fT8t4"
    const values = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1"
    })
    console.log(req.query)
    res.send(values);
});

module.exports = router;