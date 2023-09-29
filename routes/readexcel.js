const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const xlsx = require('xlsx');             

router.get('/',async(req,res)=>{
 try{
    const auth = new google.auth.GoogleAuth({
        keyFile: 'jsonkeys.json',
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    const spreadsheetId = "1C_g_LGUpo-l58gfgid0Lb8o3aHH9cYj7XgzASQD--64"; 
   const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, 
    spreadsheetId,
    range : "Sheet1!A:C"
})

res.status(200).send(readData.data)}
catch(err){
    res.status(500).send('Some Error Occured!')
}

})
module.exports = router