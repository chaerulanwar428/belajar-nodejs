//core module

//file system

// const fs = require('fs');

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
rl.question('masukan nama anda:', (nama) => {
  rl.question('Masukan no HP anda : ', (noHP) => {
    console.log(`Terimakasih ${nama}, sudah menginputkan ${noHP}`);
    rl.close();
  });
});
