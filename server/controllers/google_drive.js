const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const CLIENT_ID = process.env.GOGLE_DRIVE_CLIENT_ID
const CLIENT_SECRET = process.env.GOGLE_DRIVE_CLIENT_SECRET
const REDIRECT_URI = process.env.GOGLE_DRIVE_REDIRECT_URI
const REFRESH_TOKEN = process.env.GOGLE_DRIVE_REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/

const filePath = path.join(__dirname, "../drivefiles/deepak.png");

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: Date.now(), //This can be name of your choice
                mimeType: "image/png",
            },
            media: {
                mimeType: "image/png",
                body: fs.createReadStream(filePath),
            },
        });

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

// UploadFile();
async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: "1e_TlZ-RrP7h_QAu0SlsBz7IW-jhrgLP3",
        });
        console.log(response.data, response.status); // 204
    } catch (error) {
        console.log(error.message);
    }
}

// DeleteFile(); 
async function generatePublicUrl() {
    try {
        const fileId = "1_TmeXsogYFp8A-Zv56upFIPrkFyWV-P3";
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });

        /* 
        webViewLink: View the file in browser
        webContentLink: Direct download link 
        */
        const result = await drive.files.get({
            fileId: fileId,
            fields: "webViewLink, webContentLink",
        });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}

// generatePublicUrl()