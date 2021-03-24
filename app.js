const {google} = require('googleapis');
const fs = require('fs');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';//server id adress
const port = 8000;//port

//info needed to use the api correctly
const CLIENT_ID = '1049007617447-refin5u1b74j5gs7ch8gn4uvb9lk5li7.apps.googleusercontent.com';
const CLIENT_SECRET ='26drLm0TLuL_2hWOHo2u5KHx';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const API_KEY = 'AIzaSyBNHHFAu4_8MhgbHT4zpjLbME0gs8MhA-g';
const REFRESH_TOKEN = '1//04YWheItwKtalCgYIARAAGAQSNwF-L9IryuRSsKXgPte5R3YLMyXS4kyBiHIls2aCX9GF_C3MvfwNr2ZF7Uc91vGDoQlR173XTWY';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

//helps to get information from the form 
app.use(express.urlencoded({
  extended: true
}))

//Getting form information from the form to use in the parameters
app.post('/', (req, res) => {
  const fileName = req.body.name;
  const mime = req.body.mime;
  const des = req.body.des;
  const sub = req.body.sub;

  //The variable with the parameters to make the objects
  var fileMetadata = {
    'name': fileName,
    'mimeType': mime,
    'description': des
  };
  
  //the function to create and put the object into your drive
  function createFiles(auth) {
    const accessToken = oAuth2Client.getAccessToken();
    const drive = google.drive({version: 'v3', auth});
    drive.files.create({
    resource: fileMetadata,
    fields: 'id',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken,
    key: API_KEY
  },  (err, file) => {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Folder Id: ', file.id);
      
    }
  });
  }
  createFiles(oAuth2Client);

/*//conformation page
function confirm(){
  return res.redirect('/fileCreated');
}*/

res.redirect('/fileCreated');
      
  res.end()
});

//Writing the data on to the website page from my index.html
app.get('/',(req, res) => {
 
  
    fs.readFile('index.html', function(err, data){
      if(err) throw err;
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
        return res.end();
    });
  
});
//Writing the data on to the website page from my sus.html
app.get('/fileCreated',(req, res) => {
 
 
    fs.readFile('sus.html', function(err, data){
      if(err) throw err;
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data); 
        return res.end();
    });

  
});







  
  
//starting up the server
  app.listen(port,hostname,()=>{
 console.log('Server runnit @ ' +hostname+ ':' + port);
});