const { google } = require("googleapis")

const auth = new docs.auth.GoogleAuth({
    keyFilename: './credentials.json',
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const authClient = auth.getClient();

const googlesheets = docs.docs({
    version: 'v4',
    auth: authClient
});

export { googlesheets, auth }