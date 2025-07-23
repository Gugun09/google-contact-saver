#!/usr/bin/env node

const path = require('path');
const { authorize } = require('../src/auth');

const credentialsPath = path.resolve(process.cwd(), 'google-credentials.json');
const tokenPath = path.resolve(process.cwd(), 'token.json');

(async () => {
  try {
    await authorize(credentialsPath, tokenPath);
    console.log('🎉 Login berhasil. Siap menyimpan kontak.');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
