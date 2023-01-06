const { rejects } = require('assert');
const fs = require('fs');
const validator = require('validator');

//membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contact.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('Masukan email anda: ', (email) => {
//       resolve(email);
//     });
//   });
// };

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
  console.log('Terimakasih sudah memasukan data.');
};

module.exports = {
  simpanContact,
};
