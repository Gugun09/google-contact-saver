const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const open = require('open').default; // ✅ fix di sini

async function authorize(credentialsPath, tokenPath) {
  const credentials = JSON.parse(fs.readFileSync(credentialsPath));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, "urn:ietf:wg:oauth:2.0:oob");

  if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/contacts'],
  });

  console.log('🔑 Buka URL ini untuk login:', authUrl);
  await open(authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const code = await new Promise(resolve => rl.question('Masukkan kode dari Google: ', resolve));
  rl.close();

  const { tokens } = await oAuth2Client.getToken(code);
  fs.writeFileSync(tokenPath, JSON.stringify(tokens));
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

module.exports = { authorize };
