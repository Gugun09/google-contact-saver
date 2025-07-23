const path = require('path');
const { authorize } = require('./src/auth');
const { simpanKontak } = require('./src/contactSaver');

const CREDENTIALS_PATH = process.env.GCRED_PATH || path.resolve('./google-credentials.json');
const TOKEN_PATH = process.env.GTOKEN_PATH || path.resolve('./token.json');

async function tambahKontak({ nama, nomor }) {
  const auth = await authorize(CREDENTIALS_PATH, TOKEN_PATH);
  return simpanKontak(auth, { nama, nomor });
}

module.exports = {
  simpanKontak: tambahKontak
};
