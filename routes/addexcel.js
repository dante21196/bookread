const express = require('express');
const router = express.Router();

const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');

const xlsx = require('xlsx');


router.post('/', async(req,res) => {
    try {
        let {id,avname,pscore} = req.body;
        const auth = new google.auth.GoogleAuth({
            keyFile : 'jsonkeys.json',
            scopes: "https://www.googleapis.com/auth/spreadsheets"
        })
        const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    const spreadsheetId = "1C_g_LGUpo-l58gfgid0Lb8o3aHH9cYj7XgzASQD--64"; 
    const data = await googleSheetsInstance.spreadsheets.values.append({
        auth, 
        spreadsheetId,
        range: "Sheet1!A:C",
        valueInputOption: "USER_ENTERED", 
        resource: {
            values: [
                [id, avname,pscore]
            ],
        },
    });
    res.status(200).send('Success!!');
    console.log(data)
    } catch (error) {
        res.status(500).send('Some Error Occured!')
    
    }
}
)


module.exports =router