//core module

//file system

const fs = require('fs');

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
const data = fs.readFileSync('data/test.txt', 'utf-8');
console.log(data);