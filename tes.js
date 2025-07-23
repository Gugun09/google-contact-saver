const { simpanKontak } = require('./index'); // atau langsung dari package jika sudah publish

(async () => {
  const result = await simpanKontak({
    nama: 'Gugun Bot',
    nomor: '081234567890'  // boleh 08 atau +62
  });

  console.log('📦 Result:', result);
})();
