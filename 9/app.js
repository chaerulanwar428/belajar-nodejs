//core module

//file system

const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

//menuliskan string ke file (synchonus)

// try {
//   fs.writeFileSync('data/test.txt', 'Hello world secara syncronus');
// } catch (e) {
//   console.log(e);
// }

//menuliskan string ke file(asynchronus)

// fs.writeFile('data/test.txt', 'Hello world secara Asynchronus', (e) => {
//   console.log(e);
// });

//membaca isi file (syncronus)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

//membaca file secara asyncronus
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

//core module readline

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('Masukan email anda: ', (email) => {
//       resolve(email);
//     });
//   });
// };

const main = async () => {
  const nama = await tulisPertanyaan('Masukan nama anda : ');
  const email = await tulisPertanyaan('Masukan email anda: ');
  const noHP = await tulisPertanyaan('Masukan no HP anda: ');

  const contact = { nama, email, noHP };
  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
  console.log('Terimakasih sudah memasukan data.');
  rl.close();
};

main();

// rl.question('masukan nama anda:', (nama) => {
//   rl.question('Masukan no HP anda : ', (noHP) => {
//     const contact = { nama, noHP };
//     const file = fs.readFileSync('data/contacts.json', 'utf-8');
//     const contacts = JSON.parse(file);

//     contacts.push(contact);

//     fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//     console.log('Terimakasih sudah memasukan data.');
//     rl.close();
//   });
// });
