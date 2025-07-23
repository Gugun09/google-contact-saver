const { google } = require('googleapis');

function normalizePhone(number) {
  const raw = number.replace(/\D/g, '');
  if (raw.startsWith('0')) return '62' + raw.slice(1);
  if (raw.startsWith('8')) return '62' + raw;
  return raw;
}

async function simpanKontak(auth, { nama, nomor }) {
  const result = {
    success: false,
    alreadyExists: false,
    contact: null,
    message: '',
  };

  try {
    const service = google.people({ version: 'v1', auth });
    const target = normalizePhone(nomor);

    const existing = await service.people.connections.list({
      resourceName: 'people/me',
      personFields: 'names,phoneNumbers',
      pageSize: 2000
    });

    const alreadyExists = existing.data.connections?.some(person =>
      person.phoneNumbers?.some(phone =>
        normalizePhone(phone.value) === target
      )
    );

    if (alreadyExists) {
      result.success = true;
      result.alreadyExists = true;
      result.message = `Kontak ${nama} (+${target}) sudah ada`;
      console.log(`ℹ️ ${result.message}`);
      return result;
    }

    const response = await service.people.createContact({
      requestBody: {
        names: [{ givenName: nama }],
        phoneNumbers: [{ value: `+${target}` }]
      }
    });

    result.success = true;
    result.contact = response.data;
    result.message = `Kontak ${nama} (+${target}) berhasil disimpan`;
    console.log(`✅ ${result.message}`);
    return result;

  } catch (err) {
    result.message = `Gagal menyimpan kontak ${nama} (${nomor})`;
    result.error = err.message;
    console.error(`❌ ${result.message}: ${err.message}`);
    return result;
  }
}

module.exports = { simpanKontak };
